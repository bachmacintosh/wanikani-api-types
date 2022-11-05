import type { Application, PageEvent, RenderTemplate } from "typedoc";
import { DeclarationReflection, DefaultTheme, ReflectionKind, UrlMapping } from "typedoc";

interface TemplateMapping {
    /**
     * {@link DeclarationReflection.kind} this rule applies to.
     */
    kind: ReflectionKind[];

    /**
     * The name of the directory the output files should be written to.
     */
    directory: string;

    /**
     * The name of the template that should be used to render the reflection.
     * 
     */
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any -- Adapted from typedoc default theme. */
    template: RenderTemplate<PageEvent<any>>;
}


export class MethodsTheme extends DefaultTheme{
	public myMappings: TemplateMapping[] = [
        {
            kind: [ReflectionKind.Class],
            directory: "classes",
            template: this.reflectionTemplate,
        },
        {
            kind: [ReflectionKind.Interface],
            directory: "interfaces",
            template: this.reflectionTemplate,
        },
        {
            kind: [ReflectionKind.Enum],
            directory: "enums",
            template: this.reflectionTemplate,
        },
        {
            kind: [ReflectionKind.Namespace, ReflectionKind.Module],
            directory: "modules",
            template: this.reflectionTemplate,
        },
        {
            kind: [ReflectionKind.TypeAlias],
            directory: "types",
            template: this.reflectionTemplate,
        },
        {
            kind: [ReflectionKind.Function],
            directory: "methods",
            template: this.reflectionTemplate,
        },
        {
            kind: [ReflectionKind.Variable],
            directory: "variables",
            template: this.reflectionTemplate,
        },
    ];

	public buildUrls(reflection: DeclarationReflection, urls: UrlMapping[]): UrlMapping[] {
		const mapping = this._getMyMapping(reflection);
		if (mapping) {
            if ( typeof reflection.url === "undefined" || !DefaultTheme.URL_PREFIX.test(reflection.url)) {
                const url = [mapping.directory, `${DefaultTheme.getUrl(reflection)}.html`].join("/");
                urls.push(new UrlMapping(url, reflection, mapping.template));

                reflection.url = url;
                reflection.hasOwnDocument = true;
            }

            reflection.traverse((child) => {
                if (child instanceof DeclarationReflection) {
                    this.buildUrls(child, urls);
                } else {
                    DefaultTheme.applyAnchorUrl(child, reflection);
                }
                return true;
            });
        } else if (reflection.parent) {
            DefaultTheme.applyAnchorUrl(reflection, reflection.parent);
        }

        return urls;
	}

	private _getMyMapping(reflection: DeclarationReflection): TemplateMapping | undefined {
        return this.myMappings.find((mapping) => {
					return reflection.kindOf(mapping.kind)}
					);
    }
}

export function load(app: Application): void {
	app.renderer.defineTheme("methodsTheme", MethodsTheme);
}