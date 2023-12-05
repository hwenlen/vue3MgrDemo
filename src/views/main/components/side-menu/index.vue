<template>
  <div class="slide-menu-wrap">
    <slot></slot>
    <Menu theme="dark" accordion width="220px" v-show="!collapsed" :active-name="activeName" :open-names="openNames">
      <template v-for="item in menuList">
        <template v-if="item.children && item.children.length > 1">
          <Submenu :name="item.name">
            <template #title>
                <Icon :type="(item.meta&&item.meta.icon) || item.icon" />
                {{ showTitle(item) }}
            </template>
            <template v-for="it in item.children">
              <slideMenuItem :menuItem="it"></slideMenuItem>
            </template>
          </Submenu>
        </template>
        <template v-else-if="item.children && item.children.length == 1">
          <menu-item class="menu-title" :name="item.children[0].name" :to="item.children[0].path">
            <Icon :type="item.children[0].icon" />
            {{ showTitle(item.children[0]) }}
          </menu-item>
        </template>
        <template v-else>
          <menu-item class="menu-title" :name="item.name" :to="item.path">
            <Icon :type="item.icon" />
            {{ showTitle(item) }}
          </menu-item>
        </template>
      </template>
    </Menu>
  </div>
  <div class="menu-collapsed" v-show="collapsed">
    <template v-for="(item, index) in menuList">
      <collapsed-menu v-if="item.children && item.children.length >= 1" @on-click="handleClick(item.path)" hide-title :root-icon-size="20" :icon-size="16" theme="dark" :menuItem="item" :Index="index" :key="`drop-menu-${item.name}`"></collapsed-menu>
    </template>
  </div>
</template>
<script lang='ts' setup>
import { ref, watch, Ref } from 'vue'
import { useRouter, useRoute, RouteRecordName } from 'vue-router'
import { showTitle } from './mixin'
import slideMenuItem from './side-menu-item.vue'
import collapsedMenu from './collapsed-menu.vue'

const Router = useRouter();
const Route = useRoute();

const Props = defineProps<{
  menuList: any,
  collapsed: boolean,
  activeName: RouteRecordName | null | undefined
}>()

let openNames: Ref<(RouteRecordName | undefined)[]>= ref([])

const getOpenedNamesByActiveName =  (name: RouteRecordName | null | undefined) => {
  return Route.matched.map(item => item.name).filter(item => item !== name)
}

watch(
  () => Props.activeName, (newVal) => {
    openNames.value = getOpenedNamesByActiveName(newVal)
  }, { immediate: true }
)

const handleClick = (path: string) => {
  Router.push({
    path: path
  })
}

</script>
<style scoped lang='less'>
.slide-menu-wrap {
  background-color: @menu-dark-title;
  :deep(.ivu-layout-sider), :deep(.ivu-menu-dark){
    background-color: @menu-dark-title;
  }
  :deep(.ivu-menu-opened){
    background-color: @menu-dark-active-bg !important;
    .ivu-menu-submenu-title {
      background-color: @menu-dark-title !important;
      color: #fff;
    }
  }
  :deep(.ivu-menu-submenu-title:hover){
    background-color: @menu-dark-title !important;
    color: #fff;
  }
  .no-children {
    :deep(.ivu-menu-submenu-title-icon) {
      display: none;
    }
  }
  .menu-title {
    &:hover {
      background-color: @menu-dark-title !important;
    }
    &.ivu-menu-item-active {
      background-color: @menu-dark-title !important;
      color: #fff !important;
    }
    i {
      margin-right: 8px;
    }
  }
}

.menu-collapsed {
  height: 100%;
  background-color: @menu-dark-title;
}

</style>