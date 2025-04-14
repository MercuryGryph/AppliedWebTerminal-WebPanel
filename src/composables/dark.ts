import {useDark, useToggle} from '@vueuse/core'

export const isDark = useDark()

export const toggleDark = () => {
    useToggle(isDark) // WHY NOT WORKING ???

    document.documentElement.classList.toggle('dark')
    isDark.value = !isDark.value
}
