class Component {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    obfuscated?: boolean;
    color?: string;

    text?: string;
    translate?: string;
    with?: string[];
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
}

export default Component;
