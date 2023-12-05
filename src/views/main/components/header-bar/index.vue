<template>
  <Header class="page-header">
    <div class="header-left">
      <div class="sider-tigger" :class="{'collapsed': collapsed}" @click="handleCollpasedChange">
        <Icon type="ios-menu" size="26" />
      </div>
      <div class="custom-bread-crumb">
        <Breadcrumb>
          <BreadcrumbItem :to="item.to" v-for="(item, index) in breadCrumbList" :key="index">
            <Icon :type="item.icon"></Icon> {{ item.meta.title }}
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
    </div>
    <div class="header-right">
      <slot></slot>
      <user></user>
    </div>
  </Header>
</template>
<script lang='ts' setup>
import user from './user.vue'
import { breadCrumb } from '@/types'
const Props = defineProps<{
  breadCrumbList: breadCrumb[];
  collapsed: boolean
}>()

const Emits = defineEmits(['handleCollpasedChange'])

const handleCollpasedChange = () => {
  Emits('handleCollpasedChange', !Props.collapsed)
}
</script>
<style scoped lang='less'>
.page-header {
  width: 100%;
  background: #FFF;
  padding: 0 20px;
  position: sticky;
  top: 0;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  .header-left {
    display: flex;
    align-items: center;
  }
  .header-right {
    padding-right: 20px;
    display: flex;
    align-items: center;
  }
  .sider-tigger {
    cursor: pointer;
    transition: transform 0.2s;
    &.collapsed {
      transform: rotateZ(90deg);
    }
    i {
      display: block;
    }
  }
  .custom-bread-crumb {
    margin-left: 10px;
  }
}
</style>