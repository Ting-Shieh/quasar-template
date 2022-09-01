<template
  ><div class="">
    <!-- <div class="fgu-auth-background ">
      <img
        src="https://website.fgu.edu.tw/uploads/asset/data/5d92eefed1befa1a3e004563/BOK_6298.1.jpg"
        class="fgu-auth-background-image"
      />
    </div> -->
    <div style="height:50px;background-color:rgb(12,77,161);"></div>
    <div class="q-pa-md content" :style="$q.screen.lt.sm ? '' : 'margin:auto;'">
      <q-card
        class="q-pa-sm"
        :style="$q.screen.lt.sm ? 'width:300px;' : 'width:400px;margin:auto;'"
      >
        <q-card-section
          style="display:flex;flex-direction:column;justify-content:center;align-items:center;"
        >
          <div class="text-h6">註冊帳號</div>
        </q-card-section>

        <q-form>
          
          <div class="row ">

            <div class="col-12  q-mb-md">
              <label v-if="!$q.screen.lt.sm">
                <span>姓名</span>
              </label>
              <q-input
                ref="newRef"
                v-model="signupForm.name"
                dense
                outlined
                :label="$q.screen.lt.sm ? '姓名' : void 0"
                size="sm"
                hide-bottom-space
                :rules="[(val) => (val && val.length > 0) || '此欄位為必填項']"
              >
              </q-input>
            </div>

            <div class="col-12  q-mb-md">
              <label v-if="!$q.screen.lt.sm">
                <span>登入帳號</span>
              </label>
              <q-input
                ref="accountRef"
                v-model="signupForm.loginId"
                dense
                outlined
                :label="$q.screen.lt.sm ? '登入帳號' : void 0"
                size="sm"
                hide-bottom-space
                :rules="[
                  (val) => (val !== null && val !== '') || '此欄位為必填項',
                  (val) =>
                    (val.length > 6 && val.length < 20) ||
                    '請輸入6~20位英文字母或數字混合',
                ]"
              >
                <template v-slot:hint>
                  請輸入6~20位英文字母或數字混合
                </template>
              </q-input>
            </div>
            <div class="col-12 q-mb-md">
              <label v-if="!$q.screen.lt.sm">
                <span>輸入密碼</span>
              </label>
              <q-input
                ref="passwordRef"
                v-model="signupForm.password"
                dense
                outlined
                :label="$q.screen.lt.sm ? '輸入密碼' : void 0"
                size="sm"
                :type="isPwd ? 'password' : 'text'"
                hide-bottom-space
                :rules="[
                  (val) => (val !== null && val !== '') || '此欄位為必填項',
                  (val) =>
                    (val.length > 6 && val.length < 20) ||
                    '請輸入6~20位英文字母或符號(不得為空白)或數字混合',
                ]"
              >
                <template v-slot:hint>
                  請輸入6~20位英文字母或符號(不得為空白)或數字混合
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </div>
            <div class="col-12 q-mb-md">
              <label v-if="!$q.screen.lt.sm">
                <span>確認密碼</span>
              </label>
              <q-input
                ref="passwordcheckRef"
                v-model="signupForm.password_check"
                dense
                outlined
                :label="$q.screen.lt.sm ? '確認密碼' : void 0"
                size="sm"
                :type="isPwd2 ? 'password' : 'text'"
                hide-bottom-space
                :rules="[
                  (val) =>
                    (val && val === signupForm.password) || '兩次密碼不同',
                ]"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd2 ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd2 = !isPwd2"
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
                label="註冊"
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
                label="登入"
                @click="goTo('Login')"
              />
            </div>
          </div>
        </q-form>
      </q-card>
    </div>
  </div>
</template>
<script>
import { signup } from "@/api/user";
import { signUpIdentityOptions } from "@/utils/common/dropdown-list.js";
import Mixin from "@/utils/mixin";
export default {
  mixins: [Mixin],
  data() {
    return {
      signUpIdentityOptions,
      signupForm: {
        memType: 1, // 身分
        name: "", // 名稱
        laleLoginId: "", // lale 帳號
        loginId: "", //  帳號
        password: "", //
        password_check: "",
      },
      isPwd: true,
      isPwd2: true,
    };
  },
 
  // 組件方法
  methods: {
    resetForm() {
      this.signupForm = {
        memType: 1, // 身分
        loginId: "", // lale 帳號
        name: "", //  帳號
        password: "", //
        password_check: "",
      };
    },
    async onSubmit() {
      await signup(this.signupForm)
        .then((res) => {
          if (res.status == 200) {
            this.$router.push({ name: "Login" });
          } else {
            this.resetForm();
            this.$q.notify({
              message: `註冊有誤`,
              type: "error",
              position: "top-right",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
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
