// @ts-check
import { Converter, ReflectionKind } from "typedoc";
/** @typedef { import("typedoc").Application } Application */

/**
 * @param {Application} app
 */
export function load(app) {
  app.converter.on(Converter.EVENT_CREATE_DECLARATION, (context, refl) => {
    // Remove any Valibot schemas from the documentation
    if (refl.kindOf(ReflectionKind.Variable) && refl.type?.type === "reference" && refl.type.package === "valibot") {
      context.project.removeReflection(refl);
    }
  });
}
