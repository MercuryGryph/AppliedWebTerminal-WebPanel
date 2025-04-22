import {useConfig} from "~/data/Config";
import {fetchTranslation} from "~/core/JsonTextUtils";
import {h, VNode} from "vue";

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

export async function createHtml(component: Component): Promise<VNode[]> {
    let elements = new Array<VNode>()
    await visitComponent(component, createStyle(component), it => elements.push(it))
    return elements
}

function parseStyle(c: Style): string {
    let result = ""
    if (c.bold) {
        result += "font-weight: bold;\n"
    }

    if (c.italic) {
        result += "font-style: italic;\n"
    }

    if (c.underline && c.strikethrough) {
        result += "text-decoration: underline line-through;\n"
    } else if (c.underline) {
        result += "text-decoration: underline;\n"
    } else if (c.strikethrough) {
        result += "text-decoration: line-through;\n"
    }

    if (c.color) {
        let color;
        switch (c.color) {
            case "black":
                color = "#000000"
                break;
            case "dark_blue":
                color = "#0000aa"
                break;
            case "dark_green":
                color = "#00aa00"
                break;
            case "dark_aqua":
                color = "#00aaaa"
                break;
            case "dark_red":
                color = "#aa0000"
                break;
            case "dark_purple":
                color = "#aa00aa"
                break;
            case "gold":
                color = "#ffaa00"
                break;
            case "gray":
                color = "#aaaaaa"
                break;
            case "dark_gray":
                color = "#555555"
                break;
            case "blue":
                color = "#5555ff"
                break;
            case "green":
                color = "#55ff55"
                break;
            case "aqua":
                color = "#55ffff"
                break;
            case "red":
                color = "#ff5555"
                break;
            case "light_purple":
                color = "#ff55ff"
                break;
            case "yellow":
                color = "#ffff55"
                break;
            case "white":
                color = "#ffffff"
                break;
            default:
                color = c.color
                break;
        }
        result += `color: ${color}\n`
    }
    return result
}

function composeStyle(a: Style, b: Style): Style {
    return {
        bold: a.bold ? a.bold : b.bold,
        italic: a.italic ? a.italic : b.italic,
        underline: a.underline ? a.underline : b.underline,
        strikethrough: a.strikethrough ? a.strikethrough : b.strikethrough,
        obfuscated: a.obfuscated ? a.obfuscated : b.obfuscated,
        color: a.color ? a.color : b.color
    }
}

function visitLiteral(literal: string, style: Style, appender: (it: VNode) => void) {
    const parsedStyle = parseStyle(style)
    appender(
        h(
            "span",
            {
                style: parsedStyle,
            },
            literal
        )
    )
}

async function visitComponent(component: Component, parentStyle: Style, appender: (it: VNode) => void) {
    const config = useConfig()
    const style = composeStyle(createStyle(component), parentStyle)
    if (component.translate) {
        let tr = await fetchTranslation(component.translate, config.localConfig.language)
        let translatedContent = decomposeTranslatable(
            tr,
            (i) => component.with![i]
        )
        for (let it of translatedContent) {
            if (it.isComponent && it.component) {
                await visitComponent(it.component, composeStyle(it.component, style), appender)
            }
            if (it.literal) {
                visitLiteral(it.literal, style, appender)
            }
        }
    }
    if (component.text) {
        visitLiteral(component.text, style, appender)
    }
    if (component.extra) {
        for (let c of component.extra) {
            await visitComponent(c, style, appender)
        }
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
        while ((match = FORMAT_PATTERN.exec(formatTemplate.substring(j))) !== null) {
            const k = match.index;
            const l = match.index + match[0].length - 1;

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
            const s1 = formatTemplate.substring(k, l + 1);

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
                if (typeof arg === "string" || typeof arg === "number") {
                    ret.push({
                        isComponent: false,
                        literal: arg.toString()
                    })
                } else {
                    ret.push({
                        isComponent: true,
                        component: Component.createFromJson(arg),
                        literal: undefined
                    })
                }
            }

            j = l + 1;
        }

        if (j < formatTemplate.length) {
            const s3 = formatTemplate.substring(j);
            if (s3.includes('%')) {
                throw new Error('IllegalArgumentException');
            }
            ret.push({
                literal: s3,
                isComponent: false
            });
        }
    } catch (e) {
        throw new Error("Error while parsing: " + formatTemplate, {cause: e})
    }
    return ret
}

export default Component;
