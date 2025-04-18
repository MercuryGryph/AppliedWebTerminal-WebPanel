import type {ProxyOptions} from 'vite';
import path from 'node:path'
import Vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import {defineConfig} from 'vite'

const proxyRedirectConfigDefault: ProxyOptions = {
    target: 'http://localhost:11451',
    changeOrigin: true,
}

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '~/': `${path.resolve(__dirname, 'src')}/`,
        },
    },

    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "~/styles/element/index.scss" as *;`,
                api: 'modern-compiler',
            },
        },
    },

    plugins: [
        Vue(),

        AutoImport({
            resolvers: [
                ElementPlusResolver(),
            ]
        }),

        Components({
            // allow auto load markdown components under `./src/components/`
            extensions: ['vue', 'md'],
            // allow auto import and register components used in markdown
            include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
            resolvers: [
                ElementPlusResolver({
                    importStyle: 'sass',
                }),
            ],
            dts: 'src/components.d.ts',
        }),

        // https://github.com/antfu/unocss
        // see uno.config.ts for config
        Unocss(),
    ],
    server: {
        proxy: {
            '/settings': proxyRedirectConfigDefault,
            '/list': proxyRedirectConfigDefault,

            '/login': proxyRedirectConfigDefault,
            '/validate': proxyRedirectConfigDefault,

            '/translate': proxyRedirectConfigDefault,
            '/registries': proxyRedirectConfigDefault,

            '/storage': proxyRedirectConfigDefault,
            '/crafting': proxyRedirectConfigDefault,
            '/aeResource': proxyRedirectConfigDefault,

            '/cpuMonitor' : proxyRedirectConfigDefault
        }
    },
})
