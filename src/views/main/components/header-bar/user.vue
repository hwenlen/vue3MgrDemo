<template>
  <Dropdown @on-click="handleClick">
    <Avatar  hape="square" icon="ios-person" />
    <template #list>
      <DropdownMenu>
        <DropdownItem name="downcenter">下载中心</DropdownItem>
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </template>
  </Dropdown>
</template>
<script lang='ts' setup>
import { useRouter } from 'vue-router';
import {useUserStore} from '@/store/user'

const userStore = useUserStore()
const Router = useRouter()

const handleClick = (name: string) => {
  switch (name) {
    case 'downcenter':
      // 点击生成下载文件
      // exportSign().then(res => {
      //   if (res.code === 0) {
      //     let signData = res.result
      //     var a = document.createElement('a')
      //     a.setAttribute('href', signData.resultUrl)
      //     a.setAttribute('target', '_blank')
      //     a.click()
      //   } else {
      //     this.$Message.error(res.msg)
      //   }
      // })
      break
    case 'logout':
    userStore.handleLogOut().then(() => {
      Router.push({
        name: 'login'
      })
    })
    break
  }
}
</script>
<style scoped lang='less'>
</style>