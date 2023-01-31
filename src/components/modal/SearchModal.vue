<script setup lang='ts'>
import { useAppStore } from '@/store'
const appStore = useAppStore()

const searchFlag = computed({
  get: () => appStore.searchFlag,
  set: val => appStore.setSearchFlag(val),
})

// 搜索关键字
const keyword = ref('')
watch(keyword, () => {
  handleSearch()
})

// TODO:
function handleSearch() {
  window.$message?.info('搜索还在开发中...')
}
</script>

<template>
  <n-modal
    v-model:show="searchFlag"
    display-directive="show"
    preset="card"
    title="本地搜索"
    :block-scroll=false
    transform-origin="center"
    max-w-600 px-10 h-full
  >
    <n-input 
      v-model:value="keyword"
      placeholder="请输入文章标题内容..."
      clearable
      round
    >
      <template #prefix>
        <i-mdi:flash text-20 text-yellow />
      </template>
    </n-input>
    <hr my-25 border-dashed border-2px border-color="#d2ebfd">
    <div h-400>
      搜索内容: {{ keyword }}
    </div>
  </n-modal>
</template>
