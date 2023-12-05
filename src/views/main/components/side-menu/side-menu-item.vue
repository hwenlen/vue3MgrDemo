<template>
  <div class="menu-item-wrap">
    <menuItem :name="menuItem.name" :to="menuItem.path">
      <Icon :type="(menuItem.meta&&menuItem.meta.icon) || menuItem.icon" />
      {{ showTitle(menuItem) }}
    </menuItem>
  </div>
</template>
<script lang='ts' setup>
import { showTitle } from './mixin'

defineProps<{
  menuItem: any
}>()
</script>
<style scoped lang='less'>
.menu-item-wrap {
  position: relative;
  :deep(.ivu-menu-item) {
    box-sizing: border-box;
    font-size: 12px;
  }
}
</style>