<template>
  <div class="">
    <!-- <div class="fgu-auth-background ">
      <img
        src="https://website.fgu.edu.tw/uploads/asset/data/5d92eefed1befa1a3e004563/BOK_6298.1.jpg"
        class="fgu-auth-background-image"
      />
    </div>
     -->
     <div style="height:50px;background-color:rgb(12,77,161);"></div>
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
          <div class="text-h6">忘記密碼</div>
        </q-card-section>

        <q-form>
          <div class="row ">
            <div class="col-12 col-sm-8 col-md-6  ">
              <label v-if="!$q.screen.lt.sm">
                <span>請輸入Email</span>
              </label>
              <q-input
                ref="emailRef"
                v-model="forgetForm.email"
                dense
                outlined
                :label="$q.screen.lt.sm ? '請輸入Email' : void 0"
                size="sm"
                hide-bottom-space
                :rules="[(val) => (val && val.length > 0) || '請輸入email']"
              >
              </q-input>
            </div>
            <div
              class="col-12 col-sm-4 col-md-6 q-mb-sm"
              :style="
                !$q.screen.lt.sm
                  ? 'margin-top:20px;padding-top:1px;'
                  : 'margin-top:8px;'
              "
            >
              <q-btn
                class="q-ml-sm"
                :style="$q.screen.lt.sm ? 'width:100%;margin-left:0px;' : ''"
                size="md"
                color="info"
                label="取得驗證碼"
                @click="getValidCode"
              />
            </div>
            <div class="col-12 q-mb-sm">
              <label v-if="!$q.screen.lt.sm">
                <span>請輸入驗證碼</span>
              </label>
              <q-input
                ref="codeRef"
                v-model="forgetForm.valid_code"
                dense
                outlined
                :label="$q.screen.lt.sm ? '請輸入驗證碼' : void 0"
                size="sm"
                hide-bottom-space
                :rules="[(val) => (val && val.length > 0) || '此欄位為必填項']"
              >
              </q-input>
            </div>
            <div
              class="col-12"
              style="display:flex;flex-direction:row;justify-content:space-between;align-items:center;"
            >
              <q-btn
                style="width:40%;"
                size="md"
                text-color="black"
                label="取消"
                @click="goTo('Login')"
              />

              <q-btn
                style="width:40%"
                size="md"
                color="primary"
                text-color="black"
                label="送出"
                @click="onSubmit"
              />
            </div>
          </div>
        </q-form>
      </q-card>
    </div>
  </div>
</template>

<script>
import Mixin from "@/utils/mixin";
export default {
  mixins: [Mixin],

  data() {
    return {
      forgetForm: {
        email: "",
        valid_code: "",
      },
    };
  },
  
  // 組件方法
  methods: {
    onSubmit() {
      if (this.forgetForm.valid_code != "") {
        this.$q.notify({
          type: "info",
          position: "top-right",
          timeout: 1500,
          message: "登入成功",
        });
        this.goTo("Login");
      } else {
        this.$refs.codeRef.innerError = true;
        this.$refs.codeRef.innerErrorMessage = this.$refs.codeRef.rules[0]();
      }
    },
    // onCancel(){
    //     this.$router.push({name:'Login'})
    // },
    getValidCode() {
      if (this.forgetForm.email == "") {
        this.$refs.emailRef.innerError = true;
        this.$refs.emailRef.innerErrorMessage = this.$refs.emailRef.rules[0]();
      } else {
        return this.$q.notify({
          type: "warning",
          position: "top-right",
          timeout: 1500,
          message: "請至信箱收信",
        });
      }
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
