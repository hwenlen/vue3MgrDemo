<template>
  <div class="login">
    <div class="login-content">
      <Card icon="log-in" :title="'欢迎登录'+loginName" :bordered="false">
        <Form ref="loginForm" :model="formData"   :rules="rules">
          <FormItem prop="username">
            <Input v-model="formData.username" placeholder="请输入手机号">
              <template #prepend>
                <Icon :size="18" type="md-person"></Icon>
              </template>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" v-model="formData.password" @keydown.enter.native="handleSubmit" placeholder="请输入密码">
              <template #prepend>
                <Icon :size="18" type="md-lock"></Icon>
              </template>
            </Input>
          </FormItem>
          <FormItem>
            <Button @click="handleSubmit" size="large" type="primary" long>登录</Button>
          </FormItem>
        </Form>
      </Card>
    </div>
  </div>
</template>
<script lang='ts' setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/user'

const loginName = '摩易后台'
const router = useRouter()
const userStore = useUserStore()

const formData = reactive({
  username: 'admin',
  password: '123456'
})

const rules = {
  username: [
    { required: true, message: '账号不能为空', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' }
  ]
}

const loginForm = ref()

const handleSubmit = () => {
  loginForm.value.validate((valid: Boolean) => {
    if (valid) {
      userStore.handleLogin(formData).then(() => {
        console.log(1111)
        localStorage.setItem('userId', '123')
        router.push({
          name: 'home'
        })
      })
      
    }
  })
}



</script>
<style scoped lang='less'>
.login {
  width: 100%;
  height: 100%; // background: #6bcc97;
  background: linear-gradient(to bottom right, #3058dc 0%, #b76590 45%, #5f5dc0 80%, #b76590 100%); // background: linear-gradient(to top right, #6bcc97 0%, #c37e4a 45%, #3bffed 100%);
  background-size: cover;
  background-position: center;
  position: relative;
}
.login-content {
  position: absolute;
  right: 0;
  left: 0;
  top: 20%;
  bottom: 0;
  width: 380px;
  margin: 0 auto;

  :deep(.ivu-input) {
    height: 40px;
  }
  :deep(.ivu-btn) {
    margin-top: 16px;
  }
}
</style>