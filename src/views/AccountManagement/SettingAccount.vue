<template>
  <div class="q-pa-md" style="">
    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="left"
        narrow-indicator
      >
        <q-tab name="editPersonal" label="修改個人資料" />
        <q-tab name="editPwd" label="修改密碼" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="editPersonal">
       
          <!-- 設定 -->
          <div class="row  q-col-gutter-x-sm q-col-gutter-y-sm">
            <div class="col-12 col-md-3 q-mb-sm">
              <div
                style="display: flex;justify-contnet:center;flex-direction:column;align-items:center;margin:auto;"
              >
                <div
                  class=""
                  style="display: flex;width: 180px;height: 180px;"
                  :style="$q.screen.lt.sm ? 'width:200px;height:200px;' : ''"
                >
                  <img
                    :src="settingForm.photo"
                    style="width:100%;height:100%;"
                  />
                </div>

                <div
                  class=""
                  style="width: 180px;margin-top:10px;overflow:hidden;"
                >
                  <input
                    type="file"
                    accept="image/*"
                    @change="previewImage"
                    class="custom-file-input"
                    id="upload-avater"
                  />
                </div>
              </div>
              
            </div>
            <div class="col-12 col-md-2 q-mb-sm"></div>
            <div class="col-12 col-md-4">
              <com-input
                v-model="settingForm.loginId"
                readonly
                form-label="帳號"
                style="width:250px;margin-bottom:10px;"
                :style="$q.screen.lt.sm ? 'width:100%;' : ''"
              ></com-input>
              <!-- <com-input
                v-model="settingForm.laleLoginId"
                form-label="Lale帳號"
                style="width:250px;margin-bottom:10px;"
                :style="$q.screen.lt.sm ? 'width:100%;' : ''"
              ></com-input> -->
              <com-input
                v-model="settingForm.name"
                form-label="姓名"
                style="width:250px;margin-bottom:10px;"
                :style="$q.screen.lt.sm ? 'width:100%;' : ''"
              ></com-input>
              <com-input
                v-model="settingForm.email"
                form-label="Email"
                style="width:250px;margin-bottom:10px;"
                :style="$q.screen.lt.sm ? 'width:100%;' : ''"
              ></com-input>
              <com-input
                v-model="settingForm.phone"
                form-label="電話號碼"
                style="width:250px;margin-bottom:10px;"
                :style="$q.screen.lt.sm ? 'width:100%;' : ''"
              ></com-input>
            </div>
          </div>

          <!-- 送出鍵 -->
          <div
            class="row col-12 q-col-gutter-x-sm q-col-gutter-y-sm q-mt-md justify-end"
          >
            <div class="q-pa-md q-gutter-sm">
              <!-- <q-btn size="sm" color="white" text-color="black" label="取消" /> -->
              <q-btn
                size="md"
                color="primary"
                label="保存更新"
                @click="onSave"
              />
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="editPwd">
          <!-- 修改密碼 -->
          <div class="row  q-col-gutter-x-sm q-col-gutter-y-sm">
            <div class="col-12  q-mb-sm">
              <com-input
                v-model="editPwdForm.oldPassword"
                form-label="舊密碼"
                style="width:250px;margin-bottom:10px;"
                :style="$q.screen.lt.sm ? 'width:100%;' : ''"
              ></com-input>
            </div>
            <div class="col-12 col-md-6 q-mb-sm">
              <com-input
                v-model="editPwdForm.newPassword"
                form-label="新密碼"
                style="width:250px;margin-bottom:10px;"
                :style="$q.screen.lt.sm ? 'width:100%;' : ''"
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
              </com-input>
            </div>
            <div class="col-12 col-md-6 q-mb-sm">
              <com-input
                v-model="editPwdForm.newPassword_again"
                form-label="請再輸入一次新密碼"
                style="width:250px;margin-bottom:10px;"
                :style="$q.screen.lt.sm ? 'width:100%;' : ''"
                :type="isPwd2 ? 'password' : 'text'"
                hide-bottom-space
                :rules="[
                  (val) =>
                    (val && val === editPwdForm.newPassword) || '兩次密碼不同',
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
          <!-- 送出鍵 -->
          <div
            class="row col-12 q-col-gutter-x-sm q-col-gutter-y-sm q-mt-md justify-end"
          >
            <div class="q-pa-md q-gutter-sm">
              <q-btn
                type="reset"
                size="sm"
                color="white"
                text-color="black"
                label="取消"
              />
              <q-btn
                type="submit"
                size="sm"
                color="primary"
                label="保存"
                @click="updatePwd"
              />
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { updatePassword, updateUserInfo } from "@/api/user";

import ComInput from "@/components/Common/form/ComInput";
import Mixin from "@/utils/mixin";
export default {
  mixins: [Mixin],

  components: { ComInput },
  data() {
    return {
      tab: "editPersonal",
      settingForm: {
        email: "",
        phone: "",
        name: "", // 名稱
        laleLoginId: "", // lale 帳號
        loginId: "", //  帳號
        photo: "", //
      },
      photoName: "",
      editPwdForm: {
        oldPassword: "",
        newPassword: "",
        newPassword_again: "",
      },
      isPwd: true,
      isPwd2: true,
    };
  },
  created() {
    
    // this.initUser();
  },
  // 計算屬性
  computed: {
    ...mapGetters(["getUser"]),
  },
  mounted() {
    
    document.getElementById("upload-avater").value = "";
  },
  // 組件方法
  methods: {
    initUser() {
      let user = window.localStorage.getItem('user')
      this.settingForm=JSON.parse(user)
      
    },
    // 預覽圖片
    previewImage: function(event) {
      var input = event.target;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.settingForm.photo = e.target.result;
        };
        this.photoName = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },
    async updatePwd() {
      // 修改密碼

      await updatePassword(this.editPwdForm)
        .then((res) => {
          if (res.status === 200) {
            this.$q.notify({
              color: "blue",
              textColor: "white",
              icon: "success",
              message: "密碼修改成功，請重新登入。",
            });
            // 刪除用戶所有資料
            this.$store.commit("logout");
            this.goTo("Login");
          }
        })
        .catch((err) => {
          console.log("updatePassword err=>", err);
        });
    },
    async onSave() {
    
      await updateUserInfo(this.settingForm)
        .then((res) => {
          if (res.status === 200) {
            window.localStorage.removeItem("user");
            //更新用戶所有資料
            this.$store.commit("setUserData", res.data);
            this.initUser();
          }
        })
        .catch((err) => {
          console.log("updateUserInfo err=>", err);
        });
    },

  },
};
</script>
<style lang="scss" scoped>
.custom-file-input::-webkit-file-upload-button {
  visibility: hidden;
}
.custom-file-input::before {
  content: "上傳照片";
  display: inline-block;
  background: linear-gradient(top, #f9f9f9, #e3e3e3);
  border: 1px solid #999;
  border-radius: 3px;
  padding: 5px 8px;
  outline: none;
  white-space: nowrap;
  -webkit-user-select: none;
  cursor: pointer;
  text-shadow: 1px 1px #fff;
  font-weight: 700;
  font-size: 10pt;
  width: 180px;
  text-align: center;
}
.custom-file-input:hover::before {
  border-color: black;
}
.custom-file-input:active::before {
  background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
}
</style>
