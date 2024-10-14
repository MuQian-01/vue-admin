<template>
  <div class="login-container">
    <div class="logo" />
    <div class="form">
      <h1>登录</h1>
      <el-card shadow="never" class="login-card">
        <!--登录表单-->
        <el-form :model="loginForm" :rules="loginFormRules" ref="loginForm">
          <el-form-item prop="username">
            <el-input placeholder="请输入用户名" v-model="loginForm.username" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="请输入密码" v-model="loginForm.password" />
          </el-form-item>
          <el-form-item prop="isAgree">
            <el-checkbox v-model="loginForm.isAgree">
              用户平台使用协议
            </el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" style="width:350px" type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      loginForm: {
        username: '',
        password: '',
        // 是否同意协议
        isAgree: false
      },
      // 表单的验证规则
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        // 自定义校验规则
        isAgree: [
          // rule: 规则
          // value: 需要校验的数据
          // callback: 是否放行
          {
            validator: (rule, value, callback) => {
              value ? callback() : callback(new Error('请勾选协议'))
            }
          }
        ]
      }
    }
  },
  methods: {
    // 登录
    async login() {
      // 更改登录按钮的样式
      this.loading = true;
      // 如果表单验证都通过了
      if (await this.$refs.loginForm.validate()) {
        try {
          // 发送登录请求 => 调用vuex中的actions的方法
          await this.$store.dispatch('user/login', this.loginForm)
          // 跳转到首页
          this.$router.push('/')
        } catch (error) {
          this.loading = false
        }
      } else {
        console.log('error submit!!')
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  align-items: stretch;
  height: 100vh;

  .logo {
    flex: 3;
    background: rgba(38, 72, 176) url(../../assets/common/login_back.png) no-repeat center / cover;
    border-top-right-radius: 60px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    padding: 0 100px;

    p {
      color: #fff;
      font-size: 18px;
      margin-top: 20px;
      width: 300px;
      text-align: center;
    }
  }

  .form {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 146px;

    .el-card {
      border: none;
      padding: 0;
    }

    h1 {
      padding-left: 20px;
      font-size: 24px;
    }

    .el-input {
      width: 350px;
      height: 44px;

      .el-input__inner {
        background: #f4f5fb;
      }
    }

    .el-checkbox {
      color: #606266;
    }
  }
}
</style>