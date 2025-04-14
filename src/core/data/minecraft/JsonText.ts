interface JsonText {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  obfuscated?: boolean;
  color?: string;

  text?: string;
  translate?: string;
  with?: string[];
}

export default JsonText;
