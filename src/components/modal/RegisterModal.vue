<script setup lang='ts'>
import { useRegister } from './hooks/useLoginRegister';
import { useAppStore } from '@/store';

const appStore = useAppStore()
const {handleRegister, openLogin, formModel, rules, registerFlag} = useRegister(appStore)
</script>

<template>
  <n-modal
    v-model:show="registerFlag"
    display-directive="show"
    preset="card"
    title="注册"
    :block-scroll="false"
    transform-origin="center"
    w-460
    px-10
  >
    <n-form
      :model="formModel"
      :rules="rules"
      label-placement="left"
      label-width="auto"
      require-mark-placement="right-hanging"
    >
      <n-form-item label="用户名" path="username">
        <n-input
          v-model:value="formModel.username"
          placeholder="用户名"
          clearable
        />
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
      <div text-center px-15 mt="-15">
        <button
          w-full
          py-7
          rounded-1rem
          text-white
          bg-red
          hover:bg-orange
          @click="handleRegister"
        >
          注册
        </button>
        <div mt-25 mb-10 text-left>
          已有账号？
          <button @click="openLogin">登录</button>
        </div>
        <!-- TODO: 第三方登录 -->
        <!-- <div text-center text-10 color="#aaa">
          社交帐号登录
        </div> -->
      </div>
    </template>
  </n-modal>
</template>

<style lang = 'less' scoped>

</style>