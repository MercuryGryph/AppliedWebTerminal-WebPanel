import {useDark, useToggle} from '@vueuse/core'

export const isDark = useDark()

export const toggleDark = () => {
    useToggle(isDark) // WHY NOT WORKING ???

    document.getElementsByTagName('html')[0].classList.toggle('dark')
    isDark.value = !isDark.value
}
