import ElementPlus from "element-plus";
import {createPinia} from "pinia";
import {createApp} from "vue";
import {initTranslate} from "~/core/I18nService";
import Logger from "~/utils/Logger";
import App from './App.vue'
import '~/styles/index.scss'
import 'uno.css'
import 'element-plus/theme-chalk/src/message.scss'
import 'element-plus/theme-chalk/src/message-box.scss'


const app = createApp(App);

const pinia = createPinia();

app.use(ElementPlus)
app.use(pinia)

initTranslate().then(() => {
    Logger.info("init translates")
    app.mount("#app");
})
