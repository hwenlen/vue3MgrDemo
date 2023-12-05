<template>
  <div class="tag-nav">
    <div class="close-box">
      <Dropdown transfer @on-click="handleTagsOption">
        <Button size="small" type="text">
          <Icon :size="18" type="ios-close-circle" />
        </Button>
        <template #list>
          <DropdownMenu>
            <DropdownItem name="close-all" >关闭所有</DropdownItem>
            <DropdownItem name="close-others">关闭其他</DropdownItem>
          </DropdownMenu>
        </template>
      </Dropdown>
    </div>
    <div class="btn-arrow left-btn">
      <Button icon="md-arrow-dropleft" type="text" @click="handleWheelScroll(240)"></Button>
    </div>
    <div class="btn-arrow right-btn">
      <Button icon="md-arrow-dropright" type="text" @click="handleWheelScroll(-240)"></Button>
    </div>
    <div class="scroll-outer" ref="scrollOuter"  @DOMMouseScroll="handleScroll" @mousewheel="handleScroll">
      <div ref="scrollBody" class="scroll-body" :style="{left: tagBodyLeft + 'px'}">
        <transition-group name="taglist-moving-animation">
          <Tag 
            type="dot" 
            v-for="item in List"
            :key="`tag-nav-${item.name}`"
            :name="item.name"
            @on-close="handleClose"
            :closable="item.name !== 'home'"
            :color="item.name === Route.name ? 'primary' : ''"
            @click.native="handleClick(item)">{{ item.meta.title }}</Tag>
        </transition-group>
      </div>
    </div>
  </div>
</template>
<script lang='ts' setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router'
const Route = useRoute()
interface tagItem {
  name: string;
  meta: {title: string};
  path: string;

}
const Emits = defineEmits(['input', 'on-close']);
const Props = defineProps({
  List: {
    type: Array<tagItem>,
    default () {
      return []
    }
  }
})

let tagBodyLeft = ref(0)
let scrollOuter = ref()
let scrollBody = ref()

const handleWheelScroll = (offset: number) => {
  if (offset > 0) {
    tagBodyLeft.value = Math.min(0, tagBodyLeft.value + offset)
  } else {
    if (scrollOuter.value.offsetWidth < scrollBody.value.offsetWidth) {
      if (tagBodyLeft.value < -(scrollBody.value.offsetWidth - scrollOuter.value.offsetWidth)) {
        tagBodyLeft.value = tagBodyLeft.value
      } else {
        tagBodyLeft.value = Math.max(tagBodyLeft.value + offset, scrollOuter.value.offsetWidth - scrollBody.value.offsetWidth)
      }
    } else {
      tagBodyLeft.value = 0
    }
  }
}

const handleScroll = (e: any) => {
  var type = e.type
  let delta = 0
  if (type === 'DOMMouseScroll' || type === 'mousewheel') {
    delta = (e.wheelDelta) ? e.wheelDelta : -(e.detail || 0) * 40
  }
  handleWheelScroll(delta)
}

const handleClick = (item: any) => {
  Emits('input', item)
}

const handleClose = (_event: any, name: any) => {
  let res = Props.List.filter((item: any) => item.name !== name)
  Emits('on-close', res, undefined, name)
}


const handleTagsOption = (type: string) => {
  console.log(1111111111)
  if (type === 'close-all') {
    // 关闭所有，除了home
    let res = Props.List.filter(item => item.name === 'home')
    Emits('on-close', res, 'all')
  } else {
    // 关闭除当前页和home页的其他页
    let res = Props.List.filter(item => item.name === Route.name || item.name === 'home')
    Emits('on-close', res, 'others')
  }
}

</script>
<style scoped lang='less'>
.tag-nav {
  position: relative;
  height: 40px;
  .close-box {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 32px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
  }
  .btn-arrow {
    position: absolute;
    top: 0px;
    bottom: 0;
    background: #fff;
    padding-top: 3px;
    z-index: 10;
    &.left-btn {
      left: 0;
    }
    &.right-btn {
      right: 32px;
      border-right: 1px solid #F0F0F0;
    }
    :deep(.ivu-btn-text:focus) {
      box-shadow: none;
    }
  }
  .scroll-outer {
    position: absolute;
    left: 32px;
    right: 61px;
    top: 0;
    bottom: 0;
    -webkit-box-shadow: 0px 0 3px 2px rgba(100, 100, 100, 0.1) inset;
    box-shadow: 0px 0 3px 2px rgba(100, 100, 100, 0.1) inset;
  }
  .scroll-body {
    height: calc(100% - 1px);
    display: inline-block;
    padding: 1px 4px 0;
    position: absolute;
    overflow: visible;
    white-space: nowrap;
    -webkit-transition: left .3s ease;
    transition: left .3s ease;
    :deep(.ivu-tag) {
      cursor: pointer;
    }
  }
}
</style>