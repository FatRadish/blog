<script setup lang='ts'>
import {useLogin} from './hooks/useLoginRegister'
import { useAppStore, uesUserStore } from '@/store/index'
const [appStore, userStore] = [useAppStore(), uesUserStore()]
const { 
        loginFlag,
        formModel, 
        rules, 
        handleLogin, 
        openRegister, 
        openForget
      } = useLogin(appStore,userStore)
</script>

<template>
  <n-modal
    v-model:show="loginFlag"
    display-directive="show"
    preset="card"
    title="登录"
    :block-scroll="false"
    transform-origin="center"
    w-460 px-10
  >
    <n-form
      :model="formModel"
      :rules="rules"
      label-placement="left"
      label-width="auto"
      require-mark-placement="right-hanging"
    >
      <n-form-item label="用户名" path="username">
        <n-input v-model:value="formModel.username" placeholder="用户名" clearable />
      </n-form-item>
      <n-form-item label="密码" path="password">
        <n-input
          v-model:value="formModel.password"
          type="password"
          show-password-on="click"
          placeholder="密码"
          clearable
        />
      </n-form-item>
    </n-form>
    <template #footer>
      <div text-center mt="-15">
        <button
          w-full py-7 rounded-1rem bg-blue text-white hover:bg-light-blue
          @click="handleLogin"
        >
          登录
        </button>
        <div mt-25 mb-10 flex justify-between>
          <button @click="openRegister">
            立即注册
          </button>
          <button @click="openForget">
            忘记密码？
          </button>
        </div>
          <!-- TODO: 第三方登录 -->
          <!-- <div text-center text-10 color="#aaa">
              社交帐号登录
            </div> -->
        </div>
    </template>
  </n-modal>
</template>

