<script setup lang='ts'>
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { useAppStore } from '@/store'

dayjs.extend(duration)
const { blogInfo } = storeToRefs(useAppStore())

//每秒刷新时间
const runTime = ref('')

//每秒刷新当前时间
setInterval(()=>{
  const createtime = dayjs(blogInfo.value.blog_config?.website_createtime)
  runTime.value = dayjs.duration(dayjs().diff(createtime)).format('D 天 H 时 m 分 s 秒')
},1000)
</script>

<template>
  <div
   bg-white p-15 rounded-2rem 
    transition-600 hover:shadow-2xl animate-zoom-in
   >
    <p flex items-center ml-4>
      <i-icon-park:analysis mr-5 text-18 class="animate-bang" />
      <span text-16> 网站咨询 </span>
    </p>
    <p my-10 mx-10 text-14>
      <span> 运行时间： </span>
      <span float-right> {{ runTime }} </span>
    </p>
    <p text-14 mx-10>
      <span> 总访问量： </span>
      <span float-right> {{ blogInfo.view_count }} </span>
    </p>
  </div>
</template>

<style lang = 'scss' scoped>
.animate-bang {
  animation: bang 0.8s linear infinite;
}

@keyframes bang {
  0%,
  100% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(0.9);
  }
}
</style>