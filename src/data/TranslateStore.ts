import {defineStore} from "pinia";
import Logger from "~/utils/Logger";

// 1 hour
const CACHE_EXPIRY_TIME = 60 * 60 * 1000;

interface Translate {
    value: string;
    timestamp: number;
}

export const useTranslateStore = defineStore('translate', {
    state: () => ({
        translations: new Map() as Map<string, Translate>,
    }),
    actions: {
        async getTranslation(language: string, key: string): Promise<string> {
            const cacheKey = `${language}_${key}`;
            const currentTime = new Date().getTime();
            if (this.translations.has(cacheKey) && currentTime - this.translations.get(cacheKey)!.timestamp < CACHE_EXPIRY_TIME) {
                Logger.info('use cached translate')
                return this.translations.get(cacheKey)!.value
            }

            // 检查 LocalStorage
            const cachedTranslation = localStorage.getItem(cacheKey);
            if (cachedTranslation) {
                const cachedTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);
                if (cachedTimestamp && currentTime - Number(cachedTimestamp) < CACHE_EXPIRY_TIME) {
                    Logger.info('use localStorage translate')
                    this.translations.set(cacheKey, {value: cachedTranslation, timestamp: Number(cachedTimestamp)})
                    return cachedTranslation;
                }
            }

            // 尝试使用api请求
            try {
                const response = await fetch(`/translate/${language}/${key}`);
                if (response.ok) {
                    const translatedText = await response.text()
                    if (translatedText !== key) {
                        this.translations.set(cacheKey, {value: translatedText, timestamp: currentTime})
                        localStorage.setItem(cacheKey, translatedText)
                        localStorage.setItem(`${cacheKey}_timestamp`, currentTime.toString())
                    }
                    return translatedText;
                }
            } catch (e) {
                Logger.error('Could not find translate text');3
                Logger.error(e);
            }
            return key
        }
    }
})