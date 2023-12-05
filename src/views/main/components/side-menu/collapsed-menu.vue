<template>
  <Dropdown @on-click="handleClick" class="drop-menu" transer :placement="Index < 15 ?'right-start': 'right-end'">
    <a type="text">
      <Icon :size="rootIconSize" color="#fff" :type="(menuItem.meta&&menuItem.meta.icon) || menuItem.icon"/>
    </a>
    <template #list>
      <DropdownMenu>
        <template v-for="child in menuItem.children" :key="`drop-${child.name}`">
          <DropdownItem :name="child.name">
            <Icon :size="iconSize" :type="(child.meta&&child.meta.icon) || child.icon"/>
            <span class="menu-title">{{ showTitle(child) }}</span>
          </DropdownItem>
        </template>
      </DropdownMenu>
    </template>
  </Dropdown>
</template>
<script lang='ts' setup>
import { showTitle } from './mixin'
const Emits = defineEmits(['on-click'])
defineProps({
  menuItem: {
    type: Object,
    default () {
      return {}
    }
  },
  Index: {
    type: Number,
    default: 0
  },
  rootIconSize: {
    type: Number,
    default: 20
  },
  iconSize: {
    type: Number,
    default: 16
  }
})

const handleClick = (name: string) => {
  Emits('on-click', name)
}
</script>
<style scoped lang='less'>

.drop-menu {
  display: block;
  a {
    display: block;
    color: #fff;
    padding: 6px 15px;
    text-align: center;
  }
  .menu-title {
    margin-left: 6px;
    font-size: 12px;
  }
}
</style>