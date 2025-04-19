interface Component {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    obfuscated?: boolean;
    color?: string;

    text?: string;
    translate?: string;
    with?: string[];
    extra: Component[]
}

export default Component;
