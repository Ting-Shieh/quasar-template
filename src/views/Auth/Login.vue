<template>
  <div class="">
    <!-- <div class="fgu-auth-background ">
      <img
        src="https://lh3.googleusercontent.com/proxy/4vqy6HlnWHbx7Nt-QnHsx5A8mdYcnE6mPU_35A6mWwmI8NlYnFVl6ZgyRliIvex9JeT-d_ojvrHXvk00LpRol2fV_wU9QgY_kpMiKz0m"
        class="fgu-auth-background-image"
      />
    </div> -->
    <div style="height:50px;background-color:rgb(12,77,161);">
      
    </div>
    <div
      class="q-pa-md content"
      :style="$q.screen.lt.sm ? 'margin-top:100px;' : 'margin-top:10%;'"
    >
      <q-card
        class="q-pa-md"
        :style="$q.screen.lt.sm ? 'width:300px;' : 'width:400px;margin:auto;'"
      >
        <q-card-section
          style="display:flex;flex-direction:column;justify-content:center;align-items:center;"
        >
          <div class="text-h6">檔案交換管理系統</div>
         
        </q-card-section>

        <q-form>
          <div class="row ">
            <div class="col-12  q-mb-md">
              <label v-if="!$q.screen.lt.sm">
                <span>登入帳號</span>
              </label>
              <q-input
                ref="accountRef"
                v-model="loginForm.username"
                dense
                outlined
                :label="$q.screen.lt.sm ? '登入帳號' : void 0"
                size="sm"
                hide-bottom-space
                :rules="[(val) => (val && val.length > 0) || '此欄位為必填項']"
              >
              </q-input>
            </div>
            <div class="col-12 q-mb-md">
              <label v-if="!$q.screen.lt.sm">
                <span>登入密碼</span>
              </label>
              <q-input
                ref="passwordRef"
                v-model="loginForm.password"
                dense
                outlined
                :label="$q.screen.lt.sm ? '登入密碼' : void 0"
                size="sm"
                :type="isPwd ? 'password' : 'text'"
                hide-bottom-space
                :rules="[(val) => (val && val.length > 0) || '此欄位為必填項']"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </div>

            <div class="col-12 q-mb-sm">
              <q-btn
                style="width:100%"
                size="md"
                color="primary"
                text-color="black"
                label="登入"
                @click="onSubmit"
              />
            </div>
            <div
              class="col-12 "
              style="display:flex;flex-direction:row;justify-content:space-between;align-items:center;"
            >
              <q-btn
                style="width:40%;"
                size="md"
                text-color="black"
                label="忘記密碼"
                @click="goTo('ForgetPwd')"
              />

              <q-btn
                outline
                style="width:40%"
                size="md"
                color="info"
                label="註冊"
                @click="goTo('SignUp')"
              />
            </div>
          </div>
        </q-form>
      </q-card>
    </div>
  </div>
</template>

<script>
import { login, getUserInfo } from "@/api/user";
import ComInput from "@/components/Common/form/ComInput";
import Mixin from "@/utils/mixin";
export default {
  mixins: [Mixin],
  // 局部注冊的組件
  components: { ComInput },
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      isPwd: true,
    };
  },
  created() {},
  // 計算屬性
  computed: {},
  // 偵聽器
  watch: {},
  // 組件方法
  methods: {
    onSubmit(){
      this.goTo("SettingAccount");
    },
    // async onSubmit() {
    //   if (this.loginForm.username != "" && this.loginForm.password != "") {
    //     // 刪除用戶所有資料
    //     this.$store.commit("logout");
    //     // get token API
    //     await login(this.loginForm)
    //       .then((res) => {
    //         if (res.status === 200) {
    //           let token = res.data;
    //           // 存儲到 vuex，存儲到 本地存儲
    //           this.$store.commit("setToken", token);
    //         }
    //       })
    //       .catch((err) => {
    //         this.$q.notify({
    //           color: "red-5",
    //           textColor: "white",
    //           message: "登入失敗請重新嘗試。",
    //         });
    //         return;
    //       });
    //     // get user info API

    //     await getUserInfo()
    //       .then((res) => {
    //         if (res.status === 200) {
    //           let user = res.data;
    //           // 存儲到 vuex，存儲到 本地存儲
    //           this.$store.commit("setUserData", user);
    //           this.goTo("SettingAccount");
    //         }
    //       })
    //       .catch((err) => {
    //         this.$q.notify({
    //           color: "red-5",
    //           textColor: "white",
    //           message: "登入失敗請重新嘗試。",
    //         });
    //       });
    //   }
    //   if (this.loginForm.username == "") {
    //     this.$refs.accountRef.innerError = true;
    //     this.$refs.accountRef.innerErrorMessage = this.$refs.accountRef.rules[0]();
    //   }
    //   if (this.loginForm.password == "") {
    //     this.$refs.passwordRef.innerError = true;
    //     this.$refs.passwordRef.innerErrorMessage = this.$refs.passwordRef.rules[0]();
    //   }
    // },
  },
};
</script>
<style lang="scss" scoped>
.fgu-auth-background {
  width: 100%;
  height: 100%; /**宽高100%是为了图片铺满屏幕 **/
  z-index: -1;
  position: absolute;
}

.fgu-auth-background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(78%);
}
.content {
  z-index: 1;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
</style>
