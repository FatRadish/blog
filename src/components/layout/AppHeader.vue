<script setup lang='ts'>
import { useAppStore , uesUserStore } from '@/store'

const [appStore, userStore, router, route] = [useAppStore(),uesUserStore(),useRouter(),useRoute()]

const menuOptions = [
  {
    text:'首页',
    icon:'mdi:home',
    path:'/'
  },
  {
    text: '发现',
    icon: 'mdi:apple-safari',
    subMenu: [
      {
        text: '归档',
        icon: 'mdi:archive',
        path: '/archives',
      },
      {
        text: '分类',
        icon: 'mdi:menu',
        path: '/categories',
      },
      {
        text: '标签',
        icon: 'mdi:tag',
        path: '/tags',
      },
    ],
  },
  {
    text: '娱乐',
    icon: 'mdi:gamepad-circle',
    subMenu: [
      {
        text: '相册',
        icon: 'mdi:view-gallery',
        path: '/albums',
      },
    ],
  },
  {
    text: '友链',
    icon: 'mdi:vector-link',
    path: '/links',
  },
  {
    text: '关于',
    icon: 'mdi:information-outline',
    path: '/about',
  },
  {
    text: '留言',
    icon: 'mdi:forum',
    path: '/message',
  },
]

const navClass = ref('nav')
const barShow = ref(true)

// * 监听 y 效果比添加 scroll 监听器效果更好
const { y }  = useWindowScroll()
const preY = ref(0) //记录上一次的 y 滚动距离

watch(y,()=>{
  if(Math.abs(preY.value - y.value) >= 50){
    barShow.value = (y.value < preY.value)
    navClass.value = (y.value > 60) ? 'nav-fixed' : 'nav'
    preY.value = y.value
  }
})

function logout() {
  userStore.logout()
  if(route.name === 'User')
    router.push('/')
  window.$notification?.success({title:'退出登录成功',duration:1500})
}

const blogTitle = import.meta.env.VITE_APP_TITLE

</script>

<template>
  <Transition name="slide-fade" appear>
    <div v-if="barShow" :class="navClass" fixed z-11 inset-x-0 top-0 h-60>
      <div h-full px-36 flex items-center justify-between>
        <!-- 左上角标题 -->
        <RouterLink to="/" text-18 font-bold cursor-pointer>
          {{ blogTitle }}
        </RouterLink>
        <!-- 右上角菜单 -->
        <div flex items-center text-6xl>
          <!-- 搜索 -->
          <div class="menus-item">
            <a class="menu-btn" flex items-center @click="appStore.setSearchFlag(true)">
              <TheIcon icon="mdi:magnify" :size="18"/>
              <span ml-4> 搜索 </span>
            </a>
          </div>
          <!-- 根据数组生成 -->
          <div v-for="item of menuOptions" :key="item.text" class="menus-item">
            <!-- 不包含子菜单 -->
            <RouterLink v-if="!item.subMenu" :to="item.path" class="menu-btn" flex items-center>
              <TheIcon :icon="item.icon" :size="18"/>
              <span ml-4>{{ item.text }}</span>
            </RouterLink>
            <!-- 包含子菜单 -->
            <div v-else class="menu-btn">
              <div flex items-center>
                <TheIcon :icon="item.icon" :size="18" />
                <span mx-4>{{ item.text }}</span>
                <TheIcon icon="ep:arrow-down-bold" :size="18" />
              </div>
              <ul class="menus-submenu">
                <RouterLink v-for="sub of item.subMenu" :key="sub.text" :to="sub.path">
                  <div flex items-center>
                    <TheIcon :icon="sub.icon" :size="18" />
                    <span ml-4>{{ sub.text }}</span>
                  </div>
                </RouterLink>
              </ul>
            </div>
          </div>
          <!-- 登录 -->
          <div class="menus-item">
            <a v-if="!userStore.userId" class="menu-btn" @click="appStore.setLoginFlag(true)">
              <div flex items-center> <i-ph:user-bold text-18 mr-4 /> 登录 </div>
            </a>
            <template v-else>
              <n-avatar
                :size="28" :src="userStore.avatar" round
                fallback-src="https://static.talkxj.com/avatar/user.png"
              />
              <ul class="menus-submenu">
                <router-link to="/user">
                  <div flex items-center>
                    <i-mdi:account-circle text-18 mr-4 /> 个人中心
                  </div>
                </router-link>
                <a @click="logout">
                  <i-mdi:logout text-18 /> 退出登录
                </a>
              </ul>
            </template>
          </div>
        </div>

      </div>
    </div>
  </Transition>
</template>

<style scoped lang = 'scss' >
.nav {
  transition: all 0.8s;
  color: #fff;
  background: rgba(0, 0, 0, 0) !important;
}
.nav-fixed {
  transition: all 0.8s;
  color: #000;
  background: rgba(255, 255, 255, 0.8) !important;
  box-shadow: 0 5px 6px -5px rgba(133, 133, 133, 0.6);
  & .menu-btn:hover {
    color: #49b1f5 !important;
  }
}
.menus-item {
  position: relative;
  display: inline-block;
  margin: 0 0 0 3.8rem;
  a {
    transition: all 0.2s;
  }
  a::after {
    position: absolute;
    bottom: -5px;
    left: 0;
    z-index: -1;
    width: 0;
    height: 3px;
    background-color: #80c8f8;
    content: "";
    transition: all 0.3s ease-in-out;
  }
  .menu-btn {
    &:hover::after {
      width: 100%;
    }
  }
}
.menus-item:hover .menus-submenu {
  display: block;
}
.menus-submenu {
  position: absolute;
  display: none;
  right: 0;
  width: max-content;
  margin-top: 8px;
  box-shadow: 0 5px 20px -4px rgba(0, 0, 0, 0.5);
  background-color: #fff;
  animation: submenu 0.3s 0.1s ease both;

  &::before {
    position: absolute;
    top: -8px;
    left: 0;
    width: 100%;
    height: 20px;
    content: "";
  }
  a {
    line-height: 2;
    color: #4c4948 !important;
    text-shadow: none;
    display: block;
    padding: 6px 14px;
  }
  a:hover {
    background: #4ab1f4;
  }
}

@keyframes submenu {
  0% {
    opacity: 0;
    // filter: alpha(opacity=0);
    transform: translateY(10px);
  }

  100% {
    opacity: 1;
    // filter: none;
    transform: translateY(0);
  }
}
// Transition 的动画
.slide-fade-enter-active {
  transition: all 0.5s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-50px);
  opacity: 0;
}
</style>