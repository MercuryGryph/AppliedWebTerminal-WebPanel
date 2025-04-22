import {useConfig} from "~/data/Config";

class Component {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    obfuscated?: boolean;
    color?: string;

    text?: string;
    translate?: string;
    with?: any[];
    extra?: Component[]

    withColor(color: string) {
        this.color = color
        return this;
    }

    withBold(bold: boolean = true) {
        this.bold = bold;
        return this;
    }

    withUnderline(underline: boolean = true) {
        this.underline = underline;
        return this;
    }

    withStrikethrough(strikethrough: boolean = true) {
        this.strikethrough = strikethrough;
        return this;
    }

    append(component: Component) {
        if (!this.extra) {
            this.extra = []
        }
        this.extra?.push(component)
        return this;
    }

    static literal(text: string): Component {
        const component = new Component()
        component.text = text
        return component
    }

    static translatable(key: string, ...args: string[]): Component {
        const component = new Component()
        component.translate = key
        component.with = args
        return component
    }

    static createFromJson(json: any): Component {
        const component = new Component()
        component.bold = json.bold
        component.italic = json.italic
        component.underline = json.underline
        component.strikethrough = json.strikethrough
        component.obfuscated = json.obfuscated
        component.color = json.color

        component.text = json.text
        component.translate = json.translate
        component.with = json.with

        component.extra = json.extra?.map((extraJson: any) => Component.createFromJson(extraJson))

        return component
    }
}

interface Style {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    obfuscated?: boolean;
    color?: string;
}

function createStyle(component: Component) {
    return {
        bold: component.bold,
        italic: component.italic,
        underline: component.underline,
        strikethrough: component.strikethrough,
        obfuscated: component.obfuscated,
        color: component.color
    }
}

const FORMAT_PATTERN = /%(?:(\d+)\$)?([A-Za-z%]|$)/

interface TranslatableContainer {
    isComponent: boolean
    component?: Component
    literal?: string
}

function createHtml(component: Component, parentStyle: Style) {
    const config = useConfig()
    if (component.translate) {
        let translatedContent = decomposeTranslatable(
            component.translate,
            (i) => component.with![i]
        )
    }

}

function decomposeTranslatable(
    formatTemplate: string,
    argumentSupplier: (i: number) => any,
): TranslatableContainer[] {
    let ret = new Array<TranslatableContainer>()
    try {
        let i = 0
        let j = 0;

        let match: RegExpExecArray | null;
        while ((match = FORMAT_PATTERN.exec(formatTemplate)) !== null) {
            const k = match.index;
            const l = FORMAT_PATTERN.lastIndex;

            if (k > j) {
                const s = formatTemplate.substring(j, k);
                if (s.includes('%')) {
                    throw new Error();
                }
                ret.push({
                    literal: s,
                    isComponent: false
                })
            }

            const s4 = match[2];
            const s1 = formatTemplate.substring(k, l);

            if (s4 === '%' && s1 === '%%') {
                ret.push({
                    literal: "%",
                    isComponent: false
                })
            } else {
                if (s4 !== 's') {
                    throw new Error(`Unsupported format: '${s1}'`);
                }

                const s2 = match[1];
                const i1 = s2 ? parseInt(s2, 10) - 1 : i++;
                let arg = argumentSupplier(i1)
                try {
                    ret.push({
                        isComponent: true,
                        component: JSON.parse(arg),
                        literal: undefined
                    })
                } catch (e) {
                    ret.push(arg.toString())
                }
            }

            j = l;
        }

        if (j < formatTemplate.length) {
            const s3 = formatTemplate.substring(j);
            if (s3.includes('%')) {
                throw new Error('IllegalArgumentException');
            }
            ret.push({
                literal: "%",
                isComponent: false
            });
        }
    } catch (e) {
        throw new Error("Error while parsing: " + formatTemplate, {cause: e})
    }
    return ret
}

export default Component;
