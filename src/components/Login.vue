<template>
  <div class="log_div">
    <div class="center_div">
      <div class="center_left">
        <img src="../../static/img/u9035.png" alt />
      </div>
      <div class="center_right">
        <div class="more_div">
          <!-- 登录div -->
          <transition name="pro-right">
            <div class="center_right_l" v-show="log_show">
              <h1>衣特宝商城 | 后台管理</h1>
              <div>
                <el-input
                  v-model="phone"
                  maxlength="11"
                  @input="check_num"
                  @blur="check_phone"
                  placeholder="请输入手机号"
                ></el-input>
                <img class="user_img" src="../../static/img/u9045.png" alt />
              </div>
              <div>
                <el-input v-model="pwd" :type="pwd_type" placeholder="请输入登陆密码" show-password></el-input>
                <!-- <i class="el-icon-view eyes" @click="show_pwd"></i> -->
                <img class="pwd_img" src="../../static/img/u9047.png" alt />
              </div>
              <div>
                <el-button @click="log('员工')">员工登陆</el-button>
                <el-button @click="log">商户登陆</el-button>
              </div>
              <p class="pwd">
                <span @click="forget">忘记密码？</span>
                <span @click="regist">商户注册</span>
              </p>
            </div>
          </transition>
          <!-- 注册div -->
          <transition name="pro-left">
            <div class="center_right_z" v-show="reg_show">
              <h1>商户注册</h1>
              <div>
                <el-input
                  v-model="phone"
                  maxlength="11"
                  v-model.number="r_phone"
                  @blur="check_phone"
                  placeholder="请输入手机号"
                ></el-input>
                <img class="user_img" src="../../static/img/u9045.png" alt />
              </div>
              <div>
                <el-input placeholder="请输入验证码"></el-input>
                <img class="user_img" src="../../static/img/u9045.png" alt />
                <button :disabled="disabled" class="btn reg_code" @click="get_code">{{r_count}}</button>
              </div>
              <div>
                <el-input v-model="r_pwd" :type="pwd_type" placeholder="请输入登陆密码" show-password></el-input>
                <!-- <i class="el-icon-view eyes" @click="show_pwd"></i> -->
                <img class="pwd_img" src="../../static/img/u9047.png" alt />
              </div>
              <div>
                <el-button @click="reg">商户注册</el-button>
              </div>
              <p>
                <span @click="regist">返回登录</span>
              </p>
            </div>
          </transition>
          <!-- 忘记密码div -->
          <transition name="pro-left">
            <div class="center_right_z" v-show="forget_show">
              <h1>重置密码</h1>
              <div>
                <el-input
                  maxlength="11"
                  v-model.number="f_phone"
                  @blur="check_phone"
                  placeholder="请输入手机号"
                ></el-input>
                <img class="user_img" src="../../static/img/u9045.png" alt />
              </div>
              <div>
                <el-input placeholder="请输入验证码"></el-input>
                <img class="user_img" src="../../static/img/u9045.png" alt />
                <button
                  :disabled="disabled"
                  @click="get_code('forget')"
                  class="btn reg_code"
                >{{f_count}}</button>
              </div>
              <div>
                <el-input v-model="f_pwd" :type="pwd_type" placeholder="请输入新密码" show-password></el-input>
                <!-- <i class="el-icon-view eyes" @click="show_pwd"></i> -->
                <img class="pwd_img" src="../../static/img/u9047.png" alt />
              </div>
              <div>
                <el-button @click="forgot">重置密码</el-button>
              </div>
              <p>
                <span @click="forget">返回登录</span>
              </p>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// debugger
import * as axios from "@/http/http.js";
export default {
  inject: ["reload"],
  data() {
    return {
      phone: "",
      pwd: "",
      r_phone: "",
      r_pwd: "",
      r_code: "",
      r_count: "获取验证码",
      disabled: false,
      f_phone: "",
      f_pwd: "",
      f_code: "",
      f_count: "获取验证码",
      pwd_type: "password", //判断密码框
      log_show: true,
      reg_show: false,
      forget_show: false
    };
  },
  methods: {
    //校验手机号格式
    check_phone() {
      // if (this.phone != "") {
      //   if (!/^1[3|4|5|6|7|8|9]\d{9}$/.test(this.phone)) {
      //     this.$message.error("手机号格式错误");
      //     return;
      //   }
      // }
    },
    //校验输入内容为数字
    check_num(e) {
      this.phone = this.phone.replace(/[^\d]/g, "");
    },
    //点击登录按钮
    log(type) {
      // if (this.phone == "") {
      //   this.$message.error("手机号不能为空");
      //   return;
      // }
      // if (!/^1[3|4|5|6|7|8|9]\d{9}$/.test(this.phone)) {
      //   this.$message.error("手机号格式错误");
      //   return;
      // }
      // if (this.pwd == "") {
      //   this.$message.error("密码不能为空");
      //   return;
      // }
      let login_data = {
        phone: this.phone,
        pwd: this.pwd
      };
      if (type == "员工") {
        login_data.bwType = "0";
        axios.employeesLogin(login_data).then(res => {
          console.log(res);
          if (res.data.status == "200") {
            sessionStorage.setItem("token", res.data.data);
            this.$router.push({ path: "/index" });
          } else {
            this.$message.error(res.data.msg);
          }
        });
      } else {
        axios.Login(login_data).then(res => {
          console.log(res);
          if (res.data.status == "200") {
            sessionStorage.setItem("token", res.data.data);
            this.$router.push({ path: "/index" });
          } else {
            this.$message.error(res.data.msg);
          }
        });
      }
    },
    //获取注册的手机验证码
    get_code(type) {
      this.disabled = true;
      let num = 5;

      if (type == "forget") {
        let ti = setInterval(() => {
          num--;
          this.f_count = num + "s";
          if (num <= 0) {
            clearInterval(ti);
            this.f_count = "获取验证码";
            this.disabled = false;
          }
        }, 1000);
      } else {
        let ti = setInterval(() => {
          num--;
          this.r_count = num + "s";
          if (num <= 0) {
            clearInterval(ti);
            this.r_count = "获取验证码";
            this.disabled = false;
          }
        }, 1000);
      }
    },
    //点击注册按钮
    reg() {
      // if (this.phone == "") {
      //   this.$message.error("手机号不能为空");
      //   return;
      // }
      // if (!/^1[3|4|5|6|7|8|9]\d{9}$/.test(this.phone)) {
      //   this.$message.error("手机号格式错误");
      //   return;
      // }
      // if (this.pwd == "") {
      //   this.$message.error("密码不能为空");
      //   return;
      // }
      let login_data = {
        phone: this.r_phone,
        pwd: this.r_pwd
      };
      axios.Reg(login_data).then(res => {
        console.log(res);
        if (res.data.status == "200") {
          this.$message.success("注册成功");
          this.reload();
        } else {
          this.$message.error(res.data.msg);
        }
      });
      //
      // this.$router.push({ path: "/index" });
    },
    //点击重置密码按钮
    forgot() {
      // if (this.phone == "") {
      //   this.$message.error("手机号不能为空");
      //   return;
      // }
      // if (!/^1[3|4|5|6|7|8|9]\d{9}$/.test(this.phone)) {
      //   this.$message.error("手机号格式错误");
      //   return;
      // }
      // if (this.pwd == "") {
      //   this.$message.error("密码不能为空");
      //   return;
      // }
      let login_data = {
        phone: this.f_phone,
        pwd: this.f_pwd
      };
      console.log(login_data);
      axios.Forget(login_data).then(res => {
        console.log(res);
        if (res.data.status == "200") {
          this.$message.success("重置密码成功");
          this.reload();
        } else {
          this.$message.error(res.data.msg);
        }
      });
      //
      // this.$router.push({ path: "/index" });
    },
    //密码的显示与隐藏
    show_pwd() {
      this.pwd_type = this.pwd_type === "password" ? "text" : "password";
    },
    regist() {
      if (this.log_show == true) {
        this.log_show = false;
        this.reg_show = true;
      } else {
        this.log_show = true;
        this.reg_show = false;
      }
    },
    forget() {
      if (this.log_show == true) {
        this.log_show = false;
        this.forget_show = true;
      } else {
        this.log_show = true;
        this.forget_show = false;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.log_div {
  height: 100vh;
  width: 100vw;
  min-width: 106.5rem;
  background: url("../../static/img/u9031.png");
  background-size: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.center_div {
  width: 101.8rem;
  height: 500px;
  margin: auto;
  float: left;
}
.center_left,
.center_right {
  width: 51.4rem;
  height: 500px;
  float: left;
}
.center_right_l,
.center_right_z {
  width: 38rem;
  position: absolute;
  div {
    margin: auto;
    width: 32rem;
  }
}

.center_right_z {
  h1 {
    height: 95px !important;
    line-height: 150px !important;
  }
  p {
    text-align: right;
    width: 30rem;
    margin: auto;
  }

  .reg_code {
    position: relative;
    top: -90px;
    left: 190px;
    background-color: rgba(184, 181, 253, 1);
    width: 96px;
  }
}

.center_left {
  background: url("../../static/img/u9033.png") no-repeat;
  background-size: 51.4rem 500px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.center_right {
  position: relative;
  overflow: hidden;
  background: url("../../static/img/u9037.png") no-repeat;
  background-size: 51.4rem 500px;
  margin-left: -18px;
  display: flex;
  justify-content: center;
  .more_div {
    width: 45rem;
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: center;
  }
  span {
    color: #0066ff;
  }
  span:hover {
    cursor: pointer;
  }
  h1 {
    width: 38rem;
    font-size: 3.8rem;
    font-weight: 700;
    height: 165px;
    line-height: 180px;
    margin: auto;
    color: #d3d1fe;
    text-align: center;
  }

  .eyes {
    position: relative;
    top: -102%;
    left: 90%;
    font-size: 16px;
    vertical-align: middle;
  }
}
.pwd {
  text-align: center;
  width: 30rem;
  margin: auto;
  display: flex;
  justify-content: space-between;
  span {
    display: inline-block;
  }
  span:nth-child(1) {
    text-align: left;
  }
  span:nth-child(1) {
    text-align: right;
  }
}
//登录
.center_right_l div,
.center_right_z div {
  height: 90px;
  line-height: 90px;
  .el-button {
    background: linear-gradient(
      90deg,
      rgba(170, 217, 255, 1) 0%,
      rgba(170, 217, 255, 1) 32%,
      rgba(184, 181, 253, 1) 66%,
      rgba(184, 181, 253, 1) 100%
    );
    width: 45%;
    height: 50px;
    color: #fff;
    margin-left: 3%;
  }
  .el-input {
    height: 50px;
  }
}
//注册
.center_right_z div {
  .el-button {
    width: 94%;
  }
}

.user_img {
  position: relative;
  top: -103%;
  left: 5%;
}
.pwd_img {
  position: relative;
  top: -102%;
  left: 5%;
}
</style>
<style lang="less">
.log_div .el-input__inner {
  border-radius: 20px;
  height: 50px;
  line-height: 50px;
  padding: 0 15px;
  padding-left: 50px;
}
</style>
<style lang="">
.pro-right-enter-active,
.pro-right-leave-active,
.pro-left-enter-active,
.pro-left-leave-active {
  transition: all 1s;
}
.pro-right-enter,
.pro-right-leave-to {
  opacity: 0;
  width: 0px;
  transform: translateX(-200px);
}
.pro-left-enter,
.pro-left-leave-to {
  opacity: 0;
  width: 0px;
  transform: translateX(200px);
}
</style>