// @ts-check
import { Application, Converter, KindRouter, ReflectionKind } from "typedoc";

class CloudflareRouter extends KindRouter {
  /** @type Map<ReflectionKind, string> */
  directories = new Map([
    [ReflectionKind.Class, "classes"],
    [ReflectionKind.Interface, "interfaces"],
    [ReflectionKind.Enum, "enums"],
    [ReflectionKind.Namespace, "modules"],
    [ReflectionKind.Module, "modules"],
    [ReflectionKind.TypeAlias, "types"],
    [ReflectionKind.Function, "methods"],
    [ReflectionKind.Variable, "variables"],
    [ReflectionKind.Document, "documents"],
  ]);

  /**
   *
   * @param {Application} app
   */
  constructor(app) {
    super(app);
    this.application.logger.info("Using Cloudflare Router");
  }
}

/**
 * @param {Application} app
 */
export function load(app) {
  app.on(Application.EVENT_BOOTSTRAP_END, () => {
    app.renderer.defineRouter("cloudflare", CloudflareRouter);
  });

  app.converter.on(Converter.EVENT_CREATE_DECLARATION, (context, refl) => {
    // Remove any Valibot schemas from the documentation
    if (
      refl.kindOf(ReflectionKind.Variable) &&
      ((refl.type?.type === "reference" && refl.type.package === "valibot") ||
        (refl.type?.type === "intersection" &&
          refl.type.types[0].type === "reference" &&
          refl.type.types[0].name === "Omit" &&
          refl.type.types[0].typeArguments?.[0].type === "reference" &&
          refl.type.types[0].typeArguments[0].package === "valibot"))
    ) {
      context.project.removeReflection(refl);
    }
  });
}
