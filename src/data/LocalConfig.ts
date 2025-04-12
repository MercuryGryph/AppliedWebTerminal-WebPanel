interface LocalConfig {
  language: string;
}

export default LocalConfig;

export function defaultLocalConfigValue(): LocalConfig {
  return {
    language: "en_us",
  }
}
