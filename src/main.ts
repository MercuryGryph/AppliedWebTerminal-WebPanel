// import {UserModule} from "~/types";
// import {ViteSSG} from "vite-ssg";

// import "~/styles/element/index.scss";

import ElementPlus from "element-plus";

// import all element css, uncommented next line
// import "element-plus/dist/index.css";
// or use cdn, uncomment cdn link in `index.html`
import {routes} from 'vue-router/auto-routes'
import App from './App.vue'

import '~/styles/index.scss'

import 'uno.css'
// If you want to use ElMessage, import it.
import 'element-plus/theme-chalk/src/message.scss'
import 'element-plus/theme-chalk/src/message-box.scss'

// if you do not need ssg:
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import { createPinia } from "pinia";

const app = createApp(App);

const pinia = createPinia();

app.use(createRouter({
  history: createWebHistory(),
  routes,
}))

app.use(ElementPlus)

app.use(pinia)

app.mount("#app");

// https://github.com/antfu/vite-ssg
// export const createApp = ViteSSG(
//   App,
//   {
//     routes,
//     base: import.meta.env.BASE_URL,
//   },
//   (ctx) => {
//     // install all modules under `modules/`
//     Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
//       .forEach(i => i.install?.(ctx))
//     // ctx.app.use(Previewer)
//   },
// )
