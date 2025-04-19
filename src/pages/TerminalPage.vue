<script setup lang="ts">

import type {MECraftingServiceStatusBundle} from "~/core/data/ae/MECraftingStatusBundle";
import type LocalConfig from "~/data/LocalConfig";
import {ElMessage} from "element-plus";
import {onUnmounted, ref} from "vue";
import {createSetUpdateIntervalCommand} from "~/core/data/ae/command/Commands";
import {tr} from "~/core/I18nService";
import {ConfigSubsciber, Subscriber} from "~/core/Subscriber"
import WebSocketService from "~/core/WebSocketService";
import {useAppStorage} from "~/data/AppStorage";
import {useConfig} from "~/data/Config";
import CraftingPage from "~/pages/terminal/CraftingPage.vue";
import StoragePage from "~/pages/terminal/StoragePage.vue";

const appStorage = useAppStorage()
const localConfig = useConfig()

enum Page {
    Storage, Crafting
}

const selectedPage = ref<Page>(Page.Storage);
const currentBusyCpu = ref<number | undefined>()
const websocket = new WebSocketService()
const messageSubscriber = new Subscriber<MECraftingServiceStatusBundle>()
const stateSubscriber = new Subscriber<boolean>()
let connected = false
const messageSender = (msg: any) => {
    const str = JSON.stringify(msg)
    if (connected) {
        websocket.send(str)
    }
}

const onConfigChanged = (it: LocalConfig) => {
    messageSender(createSetUpdateIntervalCommand(it.refreshInterval))
}
ConfigSubsciber.subscribe(onConfigChanged)

messageSubscriber.subscribe(it => {
    if (it) {
        const busyCount = it.cpus.filter(it1 => it1.busy).length
        currentBusyCpu.value = busyCount === 0 ? undefined : busyCount
    }
})

websocket.setToken(appStorage.token!)

websocket.addOnErrorListener("1", it => {
    connected = false
    stateSubscriber.accept(connected)
    displayFailure(tr("websocket.connection.error", it))
})

websocket.addOnOpenListener("1", _it => {
    connected = true
    stateSubscriber.accept(connected)
    displaySuccess(tr("websocket.connection.established"))
    messageSender(createSetUpdateIntervalCommand(localConfig.localConfig.refreshInterval))
})

websocket.addOnCloseListener("1", it => {
    connected = false
    stateSubscriber.accept(connected)
    if (it.code !== 1000) {
        displayFailure(tr("websocket.connection.disconnected", it.code, it.reason))
    }
})

websocket.addOnMessageListener("1", it => {
    const msg = JSON.parse(it.data) as MECraftingServiceStatusBundle
    console.log("websocket accept: ", msg)
    messageSubscriber.accept(msg)
})

websocket.connect()

function displaySuccess(message: string) {
    ElMessage({
        showClose: true,
        message,
        type: "success"
    })
}

function displayFailure(message: string) {
    ElMessage({
        showClose: true,
        message,
        type: "error"
    })
}

onUnmounted(() => {
    websocket.close()
    ConfigSubsciber.remove(onConfigChanged)
})

</script>

<template>
    <div class="terminal_page m-4 mx-a max-w-1000px min-w-300px w-80% font-bold">
        <el-card class="z-500 bg-transparent backdrop-blur-lg">
            <el-row justify="space-between">
                <el-row>
                    <el-text size="large" type="primary">
                        {{ appStorage.currentTerminal!.name }}
                    </el-text>
                </el-row>

                <el-row class="">
                    <el-button-group>
                        <el-button
                            :type="selectedPage === Page.Storage ? 'primary' : 'default'"
                            :disabled="selectedPage === Page.Storage"
                            @click="() => { selectedPage = Page.Storage }"
                        >
                            {{ tr('terminal.button.storage_page') }}
                        </el-button>
                        <el-badge :value="currentBusyCpu" :max="99" color="#91C5FC">
                            <el-button
                                :type="selectedPage === Page.Crafting ? 'primary' : 'default'"
                                :disabled="selectedPage === Page.Crafting"
                                @click="() => { selectedPage = Page.Crafting }"
                            >
                                {{ tr('terminal.button.crafting_page') }}
                            </el-button>
                        </el-badge>
                    </el-button-group>
                </el-row>
            </el-row>
        </el-card>
        <div>
            <StoragePage v-if="selectedPage === Page.Storage"/>
            <CraftingPage v-else-if="selectedPage === Page.Crafting" :sender="messageSender" :message-subscriber="messageSubscriber"/>
        </div>
    </div>
</template>
