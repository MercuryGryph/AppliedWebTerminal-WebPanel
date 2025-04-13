interface JsonText {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  obfuscated?: boolean;
  text: string;
  with?: string[];
}

export default JsonText;
