<template>
  <div :class="$q.screen.lt.sm ? 'q-pa-xs' : 'q-pa-md'" style="">
    <div
      class="row col-12 justify-center q-mb-sm"
      style="align-items:center"
      :style="
        $q.screen.lt.sm ? 'flex-direction:column;' : 'flex-direction:row;'
      "
    >
      <span class="text-center" style="font-size:24px;font-weight:bold;"
        >佛光大學產學與育成中心 體驗遊程上架申請表</span
      >
    </div>
    <!-- 基本資料 -->
    <div class="row  q-col-gutter-x-sm q-col-gutter-y-sm  q-mb-sm">
      <div class="col-12 q-mb-sm">
        <span class="text-center" style="font-size:16px;font-weight:bold;"
          >一.活動流程</span
        >
      </div>
      <div class="col-12 col-md-3" :style="$q.screen.lt.sm ? 'order:1;' : ''">
        <div
          style="display: flex;justify-contnet:center;flex-direction:column;align-items:center;margin:auto;"
        >
          <div
            class=""
            style="display: flex;width: 180px;height: 180px;"
            :style="$q.screen.lt.sm ? 'width:200px;height:200px;' : ''"
          >
            <img
              :src="
                dataForm.photo
                  ? dataForm.photo
                  : 'https://www.pohai.org.tw/images/default/default.jpg'
              "
              style="width:100%;height:100%;"
            />
          </div>
        </div>
      </div>
      <div class="col-12 col-md-9 " :style="$q.screen.lt.sm ? 'order:2' : ''">
        <div class="row q-col-gutter-x-sm q-col-gutter-y-md">
          <div class="col-6 col-md-4">
            <com-input
              readonly
              v-model="dataForm.tourName"
              form-label="活動名稱"
            ></com-input>
          </div>
          <div class="col-6 col-md-4">
            <com-input
              readonly
              v-model="dataForm.tourAddress"
              form-label="活動地點"
            ></com-input>
          </div>

          <div class="col-6 col-md-4">
            <com-select-date
              readonly
              :range="false"
              :required="false"
              v-model="dataForm.startDate"
              form-label="活動日期"
              :style="$q.screen.lt.sm ? 'width:100%;' : ''"
            ></com-select-date>
          </div>
          <div class="col-6 col-md-4">
            <com-input
              readonly
              v-model="dataForm.tourGuideCount"
              form-label="帶領人需求人數"
              :style="$q.screen.lt.sm ? 'width:100%;' : ''"
            ></com-input>
          </div>
          <div class="col-6 col-md-4">
            <com-input
              readonly
              v-model="dataForm.touristCount"
              form-label="活動人數"
            ></com-input>
          </div>
          <div class="col-6 col-md-4">
            <com-input
              readonly
              v-model="dataForm.minTouristCount"
              form-label="最低開團人數"
            ></com-input>
          </div>
        </div>
      </div>
      <!-- 服務類型選單 -->
      <div class="col-12 q-mt-md" :style="$q.screen.lt.sm ? 'order:2' : ''">
        <span class="text-center " style="font-size:16px;font-weight:bold;"
          >二.服務類型</span
        >
        <q-markup-table class="q-mt-md">
          <thead>
            <tr>
              <th
                class="`text-${col.align}`"
                v-for="(col, index) in tableColumns"
                :key="index"
              >
                {{ col.label }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in dataForm.services" :key="index">
              <td class="text-center">{{ item.serviceName}}</td>
              <td class="text-center">
                {{ item.startTime }}
              </td>
              <td class="text-center">
                {{ item.endTime }}
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>

      <!-- 活動遊程介紹(Editor)  -->
      <div class="col-12" :style="$q.screen.lt.sm ? 'order:2' : ''">
        <span class="text-center" style="font-size:16px;font-weight:bold;"
          >活動遊程介紹</span
        >
        <p v-html="dataForm.description"></p>
      </div>
      <div class="col-12" :style="$q.screen.lt.sm ? 'order:2' : ''">
        <com-input
          readonly
          v-model="dataForm.safetyRules"
          form-label="注意事項/安全守則"
          type="textarea"
        ></com-input>
      </div>
      <div class="col-6 col-md-4" :style="$q.screen.lt.sm ? 'order:2' : ''">
        <com-input
          readonly
          v-model="dataForm.contactName"
          form-label="聯絡人"
        ></com-input>
      </div>
      <div class="col-6 col-md-4" :style="$q.screen.lt.sm ? 'order:2' : ''">
        <com-input
          readonly
          v-model="dataForm.contactPhone"
          form-label="聯絡人手機"
        ></com-input>
      </div>
      <div class="col-12 col-md-4" :style="$q.screen.lt.sm ? 'order:2' : ''">
        <com-input
          readonly
          v-model="dataForm.contactEmail"
          form-label="聯絡人Email"
        ></com-input>
      </div>
      <div class="col-6 col-md-4" :style="$q.screen.lt.sm ? 'order:2' : ''">
        <com-input
          readonly
          v-model="dataForm.duration"
          form-label="活動時程(小時)"
        ></com-input>
      </div>
      <div class="col-6 col-md-4" :style="$q.screen.lt.sm ? 'order:2' : ''">
        <com-input
          readonly
          v-model="dataForm.price"
          form-label="活動費用"
        ></com-input>
      </div>
      
    </div>

    <!-- 過去審核歷史 -->
    <div class="row  q-col-gutter-x-sm q-col-gutter-y-sm  q-mb-sm q-mt-sm">
      <div
        class="col-12 q-mb-sm"
        style="border-bottom:1px solid rgba(0,0,0,0.21)"
      >
        <span class="text-center" style="font-size:16px;font-weight:bold;"
          >過去審核歷史</span
        >
      </div>
      <div
        class="col-12"
        :style="$q.screen.lt.sm ? 'order:2;padding-top:0px;' : ''"
      >
        <q-markup-table v-if="dataForm.tourAudits.length > 0">
          <thead>
            <tr>
              <th
                class="`text-${col.align}`"
                v-for="(col, index) in tableApprovalColumns"
                :key="index"
              >
                {{ col.label }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in dataForm.tourAudits" :key="item.id">
              <td class="text-center">{{ item.tourId }}</td>
              <td class="text-center">{{ item.state }}</td>
              
              <td class="text-center">{{ item.time }}</td>
              <td class="text-center">{{ item.comment }}</td>
            </tr>
          </tbody>
        </q-markup-table>

        <span v-else class="text-center text-grey" style="font-size:12px;"
          >此遊程為第一次送審。</span
        >
      </div>
    </div>
    <!-- 審核 正式填寫 -->
    <div class="row  q-col-gutter-x-sm q-col-gutter-y-sm  q-mb-sm q-mt-sm">
      <div
        class="col-12 q-mb-sm"
        style="border-bottom:1px solid rgba(0,0,0,0.21)"
      >
        <span class="text-center" style="font-size:16px;font-weight:bold;"
          >審核作業</span
        >
      </div>
      <div class="col-12" :style="$q.screen.lt.sm ? 'order:2' : ''">
        <com-input
          v-model="approvalForm.comment"
          form-label="簽核意見"
          type="textarea"
        ></com-input>
      </div>
      <div class="col-12 col-md-4" :style="$q.screen.lt.sm ? 'order:2' : ''">
        <com-select
          ref="comCheck"
          v-model="approvalForm.state"
          outlined
          behavior="menu"
          :options="approvalOptions"
          dense
          emit-value
          map-options
          form-label="審核狀態"
          :required-valid="false"
        ></com-select>
      </div>
    </div>
    <!--  -->
    <div
      class="row col-12 q-col-gutter-x-sm q-col-gutter-y-sm q-mt-md "
      :class="$q.screen.lt.sm ? 'justify-center' : 'justify-end'"
    >
      <div class="q-pa-md q-gutter-sm">
        <q-btn
          type="reset"
          size="sm"
          color="white"
          text-color="black"
          label="取消"
          @click="goBack"
        />

        <q-btn
          type="submit"
          size="sm"
          color="primary"
          label="送出"
          @click="clickAudit()"
        />
      </div>
    </div>
  </div>
</template>
<script>
import TinyMce from "@/components/TinyMce/TinyMce.vue";
import ComInput from "@/components/Common/form/ComInput";
import ComSelect from "@/components/Common/form/ComSelect";
import ComSelectDate from "@/components/Common/form/ComSelectDate";
import { getServiceList } from "@/api/service";

import {
  getTourById, // 獲取特定遊程
  auditTour, // 審核流程
} from "@/api/tour";
import Mixin from "@/utils/mixin";

const approvalOptions = [
  { label: "通過", value: "3" },
  // { label: "審核中", value: "1" },
  { label: "退回", value: "2" },
  { label: "作廢", value: "5" },
];


export default {
  mixins: [Mixin],
  components: { TinyMce, ComInput, ComSelect, ComSelectDate },
  data() {
    return {
      approvalOptions,
      originTourName: "",
      dataForm: {},
      approvalForm: {
        tourId: "", //遊程ID
        state: "", //遊程狀態
        comment: "", //簽核意見
      },

      // 服務類型表格
      tableColumns: [
        {
          name: "serviceId",
          label: "服務類型名稱",
          field: "serviceId",
          align: "center",
        },
        {
          name: "startTime",
          label: "開始時間",
          field: "startTime",
          align: "center",
        },
        {
          name: "endTime",
          label: "結束時間",
          field: "endTime",
          align: "center",
        },
      ],

      tableApprovalColumns: [
        // 審核流程表格 =>要對應db
        {
          name: "tourId",
          label: "遊程ID",
          field: "tourId",
          align: "center",
        },
        {
          name: "state",
          label: "遊程狀態",
          field: "state",
          align: "center",
        },
        {
          name: "applicant_info", // 申請人資訊
          label: "姓名/職務/部門",
          field: "name",
          align: "center",
        },
        {
          name: "time", // 對應 db 申請時間
          label: "審核時間",
          field: "time",
          align: "center",
        },
        {
          name: "approval_result",
          label: "審核結果",
          field: "approval_result",
          align: "center",
        },
        {
          name: "comment",
          label: "簽核意見",
          field: "comment",
          align: "center",
        },
      ],
      //
      photoName: "",
      tourId: "",
    };
  },
  
  // 組件方法
  methods: {
    //
    async initDataForm() {
      await getTourById(this.tourId)
        .then((res) => {
          if (res.status === 200) {
            this.dataForm = res.data;
            this.originTourName = this.dataForm.tourName;
            // 是否保存為範本
            this.dataForm.isModel =
              typeof this.dataForm.isModel === "boolean"
                ? this.dataForm.isModel
                : false;
            // 活動時間
            this.dataForm.startDate =
              this.dataForm.tourDate === null || this.dataForm.tourDate === ""
                ? ""
                : this.dataForm.tourDate.trim();
            this.dataForm.deadline =
              this.dataForm.deadline === null || this.dataForm.deadline === ""
                ? ""
                : this.dataForm.deadline.trim();

          }
        })
        .catch((err) => {
          console.log("getTourById api =>", err);
        });
    },

    // 送出簽核結果
    async clickAudit() {
      let errNum = 0;
      let errStr = [];
      if (this.approvalForm.comment === "") {
        errNum += 1;
        errStr.push("簽核意見不得為空");
      }
      if (this.approvalForm.state === "") {
        errNum += 1;
        errStr.push("審核狀態不得為空");
      }

      if (errNum > 0) {
        this.showNotify({
          message: `${errStr.join("、")}!`,
          type: "negative",
        });
        return;
      }

      this.approvalForm.tourId = this.dataForm.id;

      await auditTour(this.approvalForm)
        .then((res) => {
          if (res.status === 200) {
            this.showNotify({
              message: `簽核成功送出!`,
              type: "positive",
            });
            this.goBack()
          }
        })
        .catch((err) => {
          console.log("auditTour err", err);
        });
    },
    reset() {
      this.approvalForm = {
        tourId: "", //遊程ID
        state: "", //遊程狀態
        comment: "", //簽核意見
      };
    },
  },
  created() {
    this.tourId = this.$route.query.id;
    this.initDataForm();
  },
};
</script>
<style lang="scss" scoped>
.image-avatar {
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto 8px;
}
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
