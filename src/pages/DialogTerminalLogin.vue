<script setup lang="ts">
import type { TerminalLoginError } from "~/core/TerminalUtils";

import { ElMessageBox } from "element-plus";
import { ref } from 'vue'
import { loginTerminal } from "~/core/TerminalUtils";
import { useAppStorage } from "~/data/AppStorage";

const appStorage = useAppStorage()

const isLoggingIn = ref(false)

const model = ref(true)

const password = ref('')

function onCloseRequest(): void {
  if (isLoggingIn.value) return
  appStorage.currentTerminal = undefined
}

function onConfirmRequest(): void {
  isLoggingIn.value = true
  loginTerminal(
      appStorage.currentTerminal!.uuid,
      password.value,
  ).then((response: string | TerminalLoginError) => {
    if (typeof response === 'string') {
      appStorage.webSocketService.setToken(response)
      appStorage.inTerminalPage = true
    } else {
      ElMessageBox.alert(
        `Error on login request: ${response}`,
        'Login Failed',
        {
          type: 'error',
          confirmButtonText: 'OK',
          beforeClose: (_, __, done) => {
            isLoggingIn.value = false
            done()
          }
        }
      ).then(() => {
        isLoggingIn.value = false
      })
    }
  })
}


</script>

<template>
  <el-dialog
    v-model="model"
    title="Login Terminal"
    width="350px"
    :before-close="onCloseRequest"
  >
    <el-text type="info" size="small" class="font-italic">
      Terminal Name:
    </el-text>
    <el-text
      size="large"
      class="mx-2 my-2 block b-s-2 b-#555 b-s-solid p-2 font-bold"
    >
      {{ appStorage.currentTerminal!.name }}
    </el-text>

    <el-input
      v-model="password"
      type="password"
      show-password
      autocomplete="off"
      placeholder="Password"
      :disabled="isLoggingIn"
      @keydown="(e: KeyboardEvent) => {
        if (e.key === 'Enter') {
          onConfirmRequest()
        }
      }"
      class="my-2"
    />

    <template #footer>
      <el-row justify="end">
        <el-button
          class="w-100px"
          :disabled="isLoggingIn"
          @click="onCloseRequest"
        >
          Cancel
        </el-button>
        <el-button
          type="primary"
          class="w-100px"
          :disabled="isLoggingIn"
          @click="onConfirmRequest"
        >
          Login
        </el-button>
      </el-row>
    </template>
  </el-dialog>
</template>