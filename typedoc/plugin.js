/*
This code was adapted from: https://github.com/mkljczk/typedoc-plugin-valibot
The above repository was forked from: https://github.com/Gerrit0/typedoc-plugin-zod

The forked code was licensed under the MIT License.

Copyright 2023 Gerrit Birkeland

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

// @ts-check
import {
  Comment,
  CommentTag,
  Converter,
  DeclarationReflection,
  ReferenceType,
  ReflectionKind,
  TypeScript,
  makeRecursiveVisitor,
} from "typedoc";
/** @typedef { import("typedoc").Application } Application */
/** @typedef { import("typedoc").Context } Context */

/**
 * @param {Application} app
 */
export function load(app) {
  /** @type Map<DeclarationReflection, ReferenceType> */
  const schemaTypes = new Map();

  /** @type Map<string, Comment | undefined> */
  const schemaComments = new Map();

  app.converter.on(Converter.EVENT_CREATE_DECLARATION, onCreateDeclaration);
  app.converter.on(Converter.EVENT_END, (context) => {
    const typeCleanup = makeRecursiveVisitor({
      reflection: (type) => {
        context.project.removeReflection(type.declaration);
      },
    });

    for (const [inferredType, refOrig] of schemaTypes) {
      if (refOrig.reflection instanceof DeclarationReflection && refOrig.reflection.type instanceof ReferenceType) {
        refOrig.reflection.type.typeArguments?.forEach((t) => t.visit(typeCleanup));
        refOrig.reflection.type.typeArguments = [
          ReferenceType.createResolvedReference(inferredType.name, inferredType, context.project),
        ];
      }
    }

    schemaTypes.clear();
  });

  /**
   * @param {Context} context
   * @param {DeclarationReflection} refl
   */
  function onCreateDeclaration(context, refl) {
    // Remove any Valibot schemas from the documentation by adding @ignore tags
    if (
      (refl.kindOf(ReflectionKind.Variable) || refl.kindOf(ReflectionKind.Property)) &&
      refl.type?.type === "reference" &&
      refl.type.package === "valibot"
    ) {
      if (refl.type.qualifiedName === "SchemaWithPipe") {
        refl.type.typeArguments?.forEach((typeArgument) => {
          if (typeArgument.type === "tuple") {
            typeArgument.elements.forEach((element) => {
              if (element.type === "reference" && typeof element.typeArguments !== "undefined") {
                if (
                  element.qualifiedName === "DescriptionAction" &&
                  typeof element.typeArguments[1] !== "undefined" &&
                  element.typeArguments[1].type === "literal" &&
                  typeof element.typeArguments[1].value === "string"
                ) {
                  if (typeof refl.comment === "undefined") {
                    refl.comment = new Comment([{ kind: "text", text: element.typeArguments[1].value }]);
                  } else {
                    refl.comment.summary = [{ kind: "text", text: element.typeArguments[1].value }];
                  }
                } else if (
                  element.qualifiedName === "MetadataAction" &&
                  typeof element.typeArguments[1] !== "undefined" &&
                  element.typeArguments[1].type === "reflection"
                ) {
                  element.typeArguments[1].declaration.children?.forEach((child) => {
                    if (child.name === "link" && typeof child.defaultValue === "string") {
                      if (typeof refl.comment === "undefined") {
                        refl.comment = new Comment(
                          [],
                          [
                            new CommentTag("@see", [
                              { kind: "inline-tag", tag: "@link", text: child.defaultValue.replaceAll(`"`, "") },
                            ]),
                          ],
                        );
                      } else {
                        refl.comment.blockTags.push(
                          new CommentTag("@see", [
                            { kind: "inline-tag", tag: "@link", text: child.defaultValue.replaceAll(`"`, "") },
                          ]),
                        );
                      }
                    } else if (
                      child.name === "categories" &&
                      child.type?.type === "typeOperator" &&
                      child.type.target.type === "tuple"
                    ) {
                      child.type.target.elements.forEach((category) => {
                        if (category.type === "literal" && typeof category.value === "string") {
                          if (typeof refl.comment === "undefined") {
                            refl.comment = new Comment(
                              [],
                              [
                                new CommentTag("@category", [
                                  { kind: "text", text: category.value.replaceAll(`"`, "") },
                                ]),
                              ],
                            );
                          } else {
                            refl.comment.blockTags.push(
                              new CommentTag("@category", [{ kind: "text", text: category.value.replaceAll(`"`, "") }]),
                            );
                          }
                        }
                      });
                    }
                  });
                }
              }
            });
          }
        });
      }
      schemaComments.set(refl.name, refl.comment);
      refl.comment = new Comment([], [], new Set(["@ignore"]));
    }

    // Walks through any Valibot InferOutput type aliases, and pulls the actual type
    if (
      refl.kindOf(ReflectionKind.TypeAlias) &&
      refl.type?.type === "reference" &&
      refl.type.package === "valibot" &&
      refl.type.qualifiedName === "InferOutput"
    ) {
      const originalRef = refl.type.typeArguments?.[0]?.visit({
        query: (t) => t.queryType,
      });

      const declaration = refl.project
        .getSymbolFromReflection(refl)
        ?.getDeclarations()
        ?.find(TypeScript.isTypeAliasDeclaration);
      if (!declaration) return;

      const type = context.getTypeAtLocation(declaration);
      refl.type.visit(
        makeRecursiveVisitor({
          reflection: (reflectionType) => {
            context.project.removeReflection(reflectionType.declaration);
          },
        }),
      );
      refl.type = context.converter.convertType(context, type);

      refl.comment = schemaComments.get(refl.name);

      if (originalRef) {
        schemaTypes.set(refl, originalRef);
      }
    }
  }
}
