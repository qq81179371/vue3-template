<template>
  <div class="login_wrap">
    <div class="login_form">
      <h2>管理员登录</h2>
      <el-form
        :model="loginParm"
        :rules="loginRules"
        ref="loginForm"
      >
        <el-form-item prop="username" class="f_item">
          <p>用户名</p>
          <el-input
            size="medium"
            v-model="loginParm.username"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item prop="password" class="f_item">
          <p>密码</p>
          <el-input
            size="medium"
            v-model="loginParm.password"
            type="password"
            placeholder="请输入密码"
          />
        </el-form-item>
      </el-form>
      <el-button size="medium" class="f_item" @click="handleLogin"
        >登录</el-button
      >
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { userLogin } from '@/api/login'

export default defineComponent({
  setup() {
    const router = useRouter()
    const store = useStore()
    const loginForm = ref(null)
    const loginParm = reactive({
      username: '',
      password: '',
      zhiHuiYunMaToken: ''
    })
    const loginRules = reactive({
      username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
      password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
    })
    const handleLogin = () => {
      loginForm.value.validate(async valid => {
        try {
          if (valid) {
            const res = await userLogin(loginParm)
            await store.dispatch('user/handleSetUserInfo', res.data)
            router.push({
              name: 'home'
            })
          }
        } catch (err) {
        // err
        }
      })
    }
    return {
      loginForm,
      loginParm,
      loginRules,
      handleLogin
    }
  }
})
</script>

<style lang="scss" scoped>
.login_wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f2f2f2;
  .login_form {
    width: 600px;
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // padding: 0 100px;
    height: 400px;
    border-radius: 20px;
    box-shadow: 0px 0px 5px rgba($color: #333, $alpha: 0.1);
    h2 {
      margin-bottom: 30px;
      font-size: 30px;
    }
    .f_item {
      p {
        margin-bottom: 10px;
      }
      .el-input {
        width: 350px;
      }
      &.el-button {
        width: 200px;
      }
    }
  }
}
</style>
