<template>
  <Layout style="height: 100%;" class="main">
    <Sider hide-trigger collapsible class="scroll-sider" :width="220" :collapsed-width="64" v-model="collapsed">
      <side-menu :activeName="Route.name" :collapsed="collapsed" :menu-list="menuList">
        <div class="logo">
          <p v-show="!collapsed"  >欢迎登录</p>
        </div>
      </side-menu>
    </Sider>
    <Layout class="container-wrap">
      <header-bar :collapsed="collapsed" :breadCrumbList="breadCrumbList" @handleCollpasedChange="handleCollpasedChange">
        <div class="role-box" >
          <span> 账户：{{userStore.userName==''?"未知":userStore.userName}}</span>
          <span> 账户角色：{{roleName==''?"未知":roleName}}</span>
        </div>
      </header-bar>
      <Content>
        <Layout>
          <div class="tag-nav-wrap">
            <tag-nav :List="tagNavList" @input="handleTagClick" @on-close="handleTagClose" />
          </div>
          <Content class="content-wrapper">
            <keep-alive>
              <router-view v-if="$route.meta.keepAlive"/>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"/>
          </Content>
        </Layout>
      </Content>
    </Layout>
  </Layout>
    
</template>
<script lang='ts' setup>
import { ref, computed, watch, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SideMenu from './components/side-menu/index.vue'
import headerBar from './components/header-bar/index.vue'
import tagNav from './components/tag-nav/index.vue'
import { useUserRouteList } from '@/store/routeData'
import { useUserStore } from '@/store/user'
import { getNewTagList, getNextName } from '@/libs/util'
import { breadCrumb } from '@/types'


let collapsed = ref(false)
const Route = useRoute()
const Router = useRouter()
const userRouteData = useUserRouteList()
const userStore = useUserStore()

const roleName = sessionStorage.getItem('roleName');

// const menuList = computed(() => {
//   // return JSON.parse(sessionStorage.getItem('menuList') as string)
//   return userRouteData.menuList
// })
const menuList = userRouteData.menuList.filter(item => {
  return item.meta && !item.meta!.hideInMenu
})


const breadCrumbList  = computed(() => {
  return userRouteData.breadCrumbList
})

watch(
  Route, (newVal) => {
    userRouteData.setBreadCrumb(newVal.matched)
    userRouteData.setTagNavList(getNewTagList(userRouteData.tagNavList || [], newVal as breadCrumb))
  }, { immediate: true }
)

const handleCollpasedChange = (value: boolean) => {
  collapsed.value = value
}

const tagNavList = computed(() => {
  return userRouteData.tagNavList
})

const turnToPage = (name: string) => {
  Router.push({
    name: name
  })
}
const handleTagClick = (item: any) => {
  turnToPage(item.name)
}
const handleTagClose = (res: any, type: string | undefined, name: string) => {
  const nextName = getNextName(tagNavList.value, name)
  userRouteData.setTagNavList(res)
  if (type === 'all') turnToPage('home')
  else if (Route.name === name) Router.push({ name: nextName })
}
</script>
<style lang="less" scoped>
.scroll-sider {
  :deep(&.ivu-layout-sider) {
    background-color: @layout-sider-background;
  }
  :deep(.ivu-layout-sider-children) {
    overflow-y: auto;
    overflow-x: hidden;
  }
}
.logo {
  color: #fff;
  line-height: 64px;
  height: 64px;
  font-size: 16px;
  text-align: center;
}
.container-wrap {
  min-width: 1200px;
}

.tag-nav-warp {
  background: #F0F0F0;
  position: sticky;
  top: 0;
} 

.content-wrapper {
  padding: 16px;
}

.role-box {
  font-size: 15px;
  color: #333;
  margin-right: 10px;
  span{
    margin-left: 10px;
  }
}
</style>