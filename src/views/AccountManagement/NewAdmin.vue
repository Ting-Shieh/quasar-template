<template>
  <div class="q-pa-md" style="">
    <div class="row  q-col-gutter-x-sm q-col-gutter-y-sm">
      <div class="col-12 col-md-4 q-mb-xs">
        <com-input
          v-model="dataForm.loginId"
          form-label="註冊帳號"
          style="width:250px;margin-bottom:10px;"
          :style="$q.screen.lt.sm ? 'width:100%;' : ''"
          
        ></com-input>
      </div>
      <div class="col-12 col-md-4 q-mb-xs">
        <com-input
          v-model="dataForm.password"
          form-label="註冊密碼"
          style="width:250px;margin-bottom:10px;"
          :style="$q.screen.lt.sm ? 'width:100%;' : ''"
          :type="isPwd ? 'password' : 'text'"
          hide-bottom-space
          :rules="[
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
        </com-input>
      </div>
      <div class="col-12 col-md-4 q-mb-sm">
        <com-input
          v-model="dataForm.password_check"
          form-label="確認密碼"
          style="width:250px;margin-bottom:10px;"
          :style="$q.screen.lt.sm ? 'width:100%;' : ''"
          :type="isPwd2 ? 'password' : 'text'"
          hide-bottom-space
          :rules="[
            (val) => (val && val === dataForm.password) || '兩次密碼不同',
          ]"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd2 ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd2 = !isPwd2"
            />
          </template>
        </com-input>
      </div>
    </div>
    <div class="row col-12 justify-end">
      <q-btn
        outline
        :style="$q.screen.lt.sm ? 'width:100%;' : 'width:20%;'"
        size="md"
        color="info"
        label="註冊"
        @click="onSubmit"
      />
    </div>
  </div>
</template>
<script>
import ComInput from "@/components/Common/form/ComInput";
import Mixin from "@/utils/mixin";
import {
  adminRegister, // admin 註冊
} from "@/api/user";
export default {
  mixins: [Mixin],
  components: { ComInput },
  data() {
    return {
      dataForm: {
        loginId: "",
        password: "",
        password_check: "",
      },
      isPwd: true,
      isPwd2: true,
    };
  },
  created() {},

  methods: {
    resetForm() {
      this.dataForm = {
        loginId: "",
        password: "",
        password_check: "",
      };
    },

    async onSubmit() {
      let errNum = 0;
      let errStr = [];
      if (this.dataForm.loginId === "") {
        errNum++;
        errStr.push("註冊帳號為必填");
      }
      if (this.dataForm.password === "") {
        errNum++;
        errStr.push("註冊密碼為必填");
      }
      if (this.isPwd !== this.isPwd2) {
        errNum++;
        errStr.push("密碼兩次不同");
      }
      if (errNum > 0) {
        this.showNotify({
          message: `${errStr.join(",")}!`,
          type: "negative",
        });
        return;
      }
      this.dataForm.loginId=this.dataForm.loginId.trim()
      this.dataForm.password=this.dataForm.password.trim()
      await adminRegister(this.dataForm)
        .then((res) => {
          if (res.status == 200) {
            this.resetForm();
            this.goTo('ReviewAccount')
            this.showNotify({
              message: "育成中心帳號註冊成功!",
              type: "positive",
            });
          } else {
            this.showNotify({
              message: "育成中心帳號註冊失敗!",
              type: "negative",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          this.showNotify({
            message: "育成中心帳號註冊失敗!",
            type: "negative",
          });
        });
    },
  },
};
</script>
<style lang="scss" scoped></style>
