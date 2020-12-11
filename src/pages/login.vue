<template>
  <div class="container">
    <a-form class="login-wrap">
      <a-form-item label="用户名：">
        <a-input v-model="userName" placeholder="用户名"></a-input>
      </a-form-item>
      <a-form-item label="密码：">
        <a-input
          type="password"
          v-model="password"
          placeholder="密码"
        ></a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="handleLogin">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import LoginServices from "@/api/user.js";
export default {
  data() {
    return {
      userName: "library",
      password: "123456"
    };
  },
  methods: {
    handleLogin() {
      // 登录示例
      LoginServices.login(this.userName, this.password)
        .then(res => {
          console.log("res", res);
          if (res.code === 0) {
            this.$router.push("/home"); // 登录成功，跳转至首页
          } else {
            console.info("===============");
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          console.info("===============++++++++++");
          console.info(err.msg);
          this.$message.error(err.msg);
        });
    }
  },
  created() {},
  mounted() {}
};
</script>

<style scoped>
.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-wrap {
  width: 600px;
  height: 300px;
}
</style>
