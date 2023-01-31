<script setup lang='ts'>
// 无限加载组件
import api from '@/api';
import InfiniteLoading from 'v3-infinite-loading'

import HomeBanner from './components/HomeBanner.vue'
import TalkingCarousel from './components/TalkingCarousel.vue'
import ArticleCard from './components/ArticleCard.vue'
import AuthorInfo from './components/AuthorInfo.vue'
import Announcement from './components/Announcement.vue'
import WebsiteInfo from './components/WebsiteInfo.vue'

const articleList = ref<any>([])
const loading = ref(false)

// 无限加载文章
const params = reactive({page_size:5, page_num: 1})
const getArticlesInfinite = async ($state:any)=>{
  if(loading.value)
    return
  
  try{
    const res = await api.getArticles(params)

    //加载完成
    if(!res.data.length){
      $state.complete()
      return
    }
    console.log(res.data)
    // 非首次加载，都是往列表中添加数据
    articleList.value.push(...res.data)
    params.page_num++
    $state.loaded()
  }catch{
    $state.error()
  }
}
onMounted(async () => {
  loading.value = true
  // 首次加载
  const res = await api.getArticles(params)
  articleList.value = res.data
  params.page_num++
  loading.value = false
})
</script>

<template>
  <!-- 首页轮播图 -->
  <HomeBanner/>
  <div flex-col justify-center>
    <div max-w-1200 mx-auto mb-40 style="margin-top: calc(100vh + 30px);">
      <n-grid :x-gap="12" :y-gap="8" cols="12">
        <n-gi span="9">
          <!-- 说说轮播 -->
          <TalkingCarousel/>
          <!-- 文章列表 -->
          <ArticleCard v-for="(item , idx) of articleList"  :article="item" :idx="idx"/>
          <!-- 无限加载 -->
          <div f-c-c mt-35>
            <InfiniteLoading @infinite="getArticlesInfinite">
              <!-- TODO: 优化界面 -->
              <template #spinner>
                <i-eos-icons:bubble-loading text-30 />
              </template>
              <template #complete>
                <span text-gray>
                  没有更多文章啦!
                </span>
              </template>
            </InfiniteLoading>
          </div>
        </n-gi>
        <n-gi span="3">
          <div sticky top-20>
            <AuthorInfo/>
            <!-- 公告 -->
            <Announcement my-25 />
            <!-- 网站资讯 -->
            <WebsiteInfo />
          </div>
        </n-gi>
      </n-grid>
    </div>
    <AppFooter/>
  </div>
</template>

<style lang = 'less' scoped>

</style>