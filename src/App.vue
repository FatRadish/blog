<template>
  <AppProvider>
    <div wh-full flex-col>
      <AppHeader></AppHeader>
      <!-- 中间内容(包含底部信息) -->
      <article flex-1 flex-col>
        <router-view v-slot="{ Component, route }">
          <component :is="Component" :key="route.path" />
        </router-view>
      </article>
    </div>
    <!-- 回到顶部 -->
    <BackToTop/>
    <GlobModal/>
  </AppProvider>
</template>

<script setup lang='ts'>
import { useAppStore,uesUserStore } from '@/store'
import GlobModal from '@/components/modal/index.vue'

const [appStore,userStore] = [useAppStore(),uesUserStore()]

appStore.getBlogInfo()
userStore.getUserInfo()


</script>

<style lang = 'less' scoped>

</style>