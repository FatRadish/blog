<template>
  <AppProvider>
    <div wh-full flex-col>
      111
    </div>
  </AppProvider>
</template>

<script setup lang='ts'>
import { useAppStore,uesUserStore } from '@/store'

const [appStore,userStore] = [useAppStore(),uesUserStore()]

appStore.getBlogInfo()
userStore.getUserInfo()


</script>

<style lang = 'less' scoped>

</style>