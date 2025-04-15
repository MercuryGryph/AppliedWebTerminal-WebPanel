import {useConfig} from "~/data/Config";

type AppStringKey =
    'common.button.cancel' |
    'common.button.confirm' |
    'main.terminals.title' |
    'main.terminals.login.title' |
    'main.terminals.login.label.terminal_name' |
    'main.terminals.login.button.login' |
    'main.terminals.login.placeholder.password' |
    'main.terminals.login.button.remember_password' |
    'language.selector.title' |
    'language.selector.button.add' |
    'language.add.title' |
    'language.add.placeholder.lang' |
    'language.add.label.test' |
    'language.add.button.test' |
    'language.add.placeholder.test_key' |
    'language.add.placeholder.result' |
    'language.add.button.add' |
    'terminal.button.storage_page' |
    'terminal.button.crafting_page'

type AppTranslate = {
    [key in AppStringKey]: string;
}

const enUs: AppTranslate = {
    "common.button.cancel": "Cancel",
    "common.button.confirm": "Confirm",
    "main.terminals.title": "Select A Terminal",
    "main.terminals.login.title": "Login Terminal",
    "main.terminals.login.label.terminal_name": "Terminal Name:",
    "main.terminals.login.button.login": "Login",
    'main.terminals.login.placeholder.password': "Password",
    "main.terminals.login.button.remember_password": "Remember Password",
    "language.selector.title": "Language",
    "language.selector.button.add": "Add",
    "language.add.title": "Add Language",
    "language.add.placeholder.lang": "Language ID",
    "language.add.label.test": "Test",
    "language.add.button.test": "Test",
    "language.add.button.add": "Add",
    "language.add.placeholder.test_key": "(key)",
    "language.add.placeholder.result": "(result)",
    "terminal.button.crafting_page": "Crafting Status",
    "terminal.button.storage_page": "Storage",
}

const zhCn: AppTranslate = {
    "common.button.cancel": "取消",
    "common.button.confirm": "确认",
    "main.terminals.title": "选择终端",
    "main.terminals.login.title": "登录终端",
    "main.terminals.login.label.terminal_name": "终端：",
    "main.terminals.login.button.login": "登录",
    'main.terminals.login.placeholder.password': "密码",
    "main.terminals.login.button.remember_password": "记住密码",
    "language.selector.title": "语言",
    "language.selector.button.add": "添加",
    "language.add.title": "添加语言",
    "language.add.placeholder.lang": "语言 ID",
    "language.add.label.test": "测试",
    "language.add.button.test": "测试",
    "language.add.button.add": "添加",
    "language.add.placeholder.test_key": "(key)",
    "language.add.placeholder.result": "(结果)",
    "terminal.button.crafting_page": "合成状态",
    "terminal.button.storage_page": "存储",
}

const enUd: AppTranslate = {
    "common.button.cancel": "lǝɔuɐƆ",
    "common.button.confirm": "ɯɹᴉɟuoƆ",
    "main.terminals.title": "lɐuᴉɯɹǝ┴ ∀ ʇɔǝlǝS",
    "main.terminals.login.title": "lɐuᴉɯɹǝ┴ uᴉƃo˥",
    "main.terminals.login.label.terminal_name": ":ǝɯɐN lɐuᴉɯɹǝ┴",
    "main.terminals.login.button.login": "uᴉƃo˥",
    'main.terminals.login.placeholder.password': "pɹoʍssɐԀ",
    "main.terminals.login.button.remember_password": "pɹoʍssɐԀ ɹǝqɯǝɯǝɹ",
    "language.selector.title": "ǝƃɐnƃuɐ˥",
    "language.selector.button.add": "pp∀",
    "language.add.title": "ǝƃɐnƃuɐ˥ pp∀",
    "language.add.placeholder.lang": "pI ǝƃɐnƃuɐ˥",
    "language.add.label.test": "ʇsǝ┴",
    "language.add.button.test": "ʇsǝ┴",
    "language.add.button.add": "pp∀",
    "language.add.placeholder.test_key": "(ʎǝʞ)",
    "language.add.placeholder.result": "(ʇlnsǝɹ)",
    "terminal.button.crafting_page": "snʇɐʇS ƃuᴉʇɟɐɹƆ",
    "terminal.button.storage_page": "ǝƃɐɹoʇS",
}

export function stringOf(
    key: AppStringKey,
    lang?: string
): string {
    if (lang === undefined) {
        const config = useConfig()
        return stringOf(key, config.localConfig.language)
    }

    let res: string

    switch (lang) {
        case 'en_us':
            res = enUs[key]
            break
        case 'zh_cn':
            res = zhCn[key]
            break
        case 'en_ud':
            res = enUd[key]
            break
        default:
            res = enUs[key]
    }

    if (res !== undefined) {
        return res
    } else if (lang === 'en_us') {
        return key
    } else {
        return stringOf(key, 'en_us')
    }
}
