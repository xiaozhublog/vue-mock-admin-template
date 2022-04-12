<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      size="medium"
    >
      <div class="title-container">
        <h3>{{ title }}</h3>
      </div>
      <el-form-item prop="username">
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
        >
          <template slot="prepend"> <svg-icon icon-class="user" /></template>
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          @keyup.enter.native="handleLogin"
        >
          <template slot="prepend">
            <svg-icon icon-class="password"
          /></template>
          <template slot="append">
            <svg-icon
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
              @click="showPwd"
            />
          </template>
        </el-input>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 20px"
        @click.native.prevent="handleLogin"
        >登录</el-button
      >

      <div class="tips">
        <span>username: admin</span>
        <span>password: any</span>
      </div>
      <div class="tips">
        <span>username: editor</span>
        <span>password: any</span>
      </div>
    </el-form>
  </div>
</template>
<script>
import Ribbons from "@/assets/js/ribbon.js"; //丝带动画
export default {
  name: "loginPage",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请填写用户名"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请填写密码"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "admin",
        password: "111111",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
      title: "欢迎登录",
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true,
    },
  },
  mounted() {
    Ribbons.start();
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router
                .push({
                  path: this.redirect || "/",
                  query: this.otherQuery,
                })
                .catch(() => {});
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
  },
  beforeDestroy() {
    Ribbons.stop();
  },
};
</script>
<style lang="scss" scoped>
.login-container {
  width: 500px;
  height: 305px;
  box-sizing: border-box;
  padding: 20px 50px;
  border-radius: 5px;
  box-shadow: 0px 2px 12px 0px rgba(105, 105, 105, 0.07);
  background: rgba(255, 255, 255, 0.5);
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: mymove 1s ease-in-out alternate;
  overflow: hidden;
  .login-form {
    max-width: 100%;
    .title-container {
      text-align: center;
    }
    .tips {
      font-size: 14px;
      margin-bottom: 5px;
      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }
  }
}
@keyframes mymove {
  0% {
    width: 0px;
    height: 5px;
  }
  50% {
    width: 500px;
    height: 5px;
  }
  100% {
    height: 305px;
  }
}
</style>
