<script setup lang='ts'>
import { useAppStore } from '@/store';

const { blogInfo } = storeToRefs(useAppStore())

function addToFavourites(){
  window.$message?.info('按 CTRL + D 将本页加入书签')
}
</script>

<template>
  <n-card hoverable size="small" text-center rounded-2rem animate-zoom-in>
    <n-image 
      width="110" :src="blogInfo.blog_config?.website_avatar"
      duration-600 hover:rotate-360 py-15
      rounded-full
    />
    <p text-24>
      {{ blogInfo.blog_config?.website_author || '阵、雨' }}
    </p>
    <p text-14 my-5>
      {{ blogInfo.blog_config?.website_intro || '往事随风而去' }}
    </p>
        <div flex justify-center py-15 text-15>
      <router-link to="/archives" flex-1>
        <p>文章</p>
        <p text-18>
          {{ blogInfo.article_count || 0 }}
        </p>
      </router-link>
      <router-link to="/categories" flex-1>
        <p>分类</p>
        <p text-18>
          {{ blogInfo.category_count || 0 }}
        </p>
      </router-link>
      <router-link to="/tags" flex-1>
        <p>标签</p>
        <p text-18>
          {{ blogInfo.tag_count || 0 }}
        </p>
      </router-link>
    </div>
    <!-- 收藏按钮 -->
    <div flex justify-center text-center>
      <button
        f-c-c leading-32 h-32 w="7/8" text-14 rounded-1rem
        text-white bg-blue-600 hover:bg-orange-600
        transition-500 ease-in-out
        transform hover:-translate-y-1 hover:scale-110
        @click="addToFavourites"
      >
        <i-material-symbols:bookmark text-18 mr-5 /> 加入书签
      </button>
    </div>
    <!-- 社交信息 -->
    <div flex justify-evenly text-24 my-15 px-40>
      <a :href="blogInfo.blog_config?.qq" target="_blank">
        <i-mdi:qqchat hover-text-red-500 />
      </a>
      <a :href="blogInfo.blog_config?.github" target="_blank">
        <i-mdi:github hover:text-red-500 />
      </a>
      <a :href="blogInfo.blog_config?.gitee" target="_blank">
        <i-simple-icons:gitee hover:text-red-500 />
      </a>
    </div>
  </n-card>
</template>

<style lang = 'scss' scoped>

</style>