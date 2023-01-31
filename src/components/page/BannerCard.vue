<script setup lang='ts'>
interface Props{
  title?:string
  bannerImg?:string
  showFooter?:boolean
  loading?:boolean
}

const {
  bannerImg = 'https://static.talkxj.com/config/83be0017d7f1a29441e33083e7706936.jpg',
  showFooter = true,
  loading = false
} = defineProps<Props>()

if (loading){
  window.$loadingBar?.start()
}
watch(() => loading , (newVal)=>{
  if(!newVal)
    window.$loadingBar?.finish()
})

const styleVal = ref(`background: url('${bannerImg}') center center / cover no-repeat;`)

const route = useRoute()
</script>

<template>
  <div 
    :style="styleVal"
    absolute inset-x-0 top-0 h-400
    flex items-center justify-center
    class="banner-fade-down"
  >
    <h1 text-40 font-bold text-light>
      {{ title || route.meta?.title }}
    </h1>
  </div>
  <!-- 主题内容 -->
  <main flex-1>
    <n-spin :show="loading" size="large">
      <n-card
        hoverable
        shadow-2xl rounded-2rem
        max-w-970 py-50 px-25
        mt-440 mb-40 mx-auto
        class="card-fade-up"
      >
        <!-- <n-skeleton v-if="loading" :height="100" width="100%" /> -->
        <slot v-if="!loading" />
      </n-card>
    </n-spin>
  </main>
    <!-- 底部(可选) -->

  <AppFooter v-if="showFooter" />

</template>

<style lang = 'less' scoped>

</style>