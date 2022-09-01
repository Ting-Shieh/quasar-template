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
        >{{ originTourName }} 遊程詳情</span
      >
      <q-select
        :readonly="dataForm.state | transTourStatus"
        v-show="showTemplatesSelect"
        outlined
        v-model="picked_template"
        stack-label
        :options="templateOptions"
        dense
        behavior="menu"
        emit-value
        map-options
        :option-label="(item) => (item === '' ? '請選擇套用範本' : item.label)"
        :style="$q.screen.lt.sm ? '' : 'width:200px;margin-left:10px;'"
        @input="useTemplate"
      >
      </q-select>
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

          <div class="" style="width: 180px;margin-top:10px;overflow:hidden;">
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
      <!--  -->
      <div class="col-12 col-md-9 " :style="$q.screen.lt.sm ? 'order:2' : ''">
        <div class="row q-col-gutter-x-sm q-col-gutter-y-md">
          <div class="col-6 col-md-4">
            <com-input
              ref="tourNameRef"
              :readonly="dataForm.state | transTourStatus"
              v-model="dataForm.tourName"
              form-label="活動名稱"
            ></com-input>
          </div>
          <div class="col-6 col-md-4">
            <com-input
              ref="tourAddressRef"
              :readonly="dataForm.state | transTourStatus"
              v-model="dataForm.tourAddress"
              form-label="活動地點"
            ></com-input>
          </div>

          <div class="col-6 col-md-4">
            <com-select-date
              ref="startDateRef"
              :readonly="dataForm.state | transTourStatus"
              :range="false"
              :required="false"
              v-model="dataForm.startDate"
              mask="YYYY/MM/DD"
              form-label="活動日期"
              :style="$q.screen.lt.sm ? 'width:100%;' : ''"
            ></com-select-date>
          </div>
          <div class="col-6 col-md-4">
            <com-input
              ref="tourGuideCountRef"
              :readonly="dataForm.state | transTourStatus"
              v-model="dataForm.tourGuideCount"
              form-label="帶領人需求人數"
              :style="$q.screen.lt.sm ? 'width:100%;' : ''"
            ></com-input>
          </div>
          <div class="col-6 col-md-4">
            <com-input
              ref="touristCountRef"
              :readonly="dataForm.state | transTourStatus"
              v-model="dataForm.touristCount"
              form-label="活動人數"
            ></com-input>
          </div>
          <div class="col-6 col-md-4">
            <com-input
              ref="minTouristCountRef"
              :readonly="dataForm.state | transTourStatus"
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
              <th class="`text-center`">
                操作
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="dataForm.state == '2' || dataForm.state == '0'">
              <td class="text-center">
                <q-select
                  dense
                  outlined
                  :option-label="
                    (item) => (item === '' ? '請選擇' : item.label)
                  "
                  v-model="serviceItem.serviceId"
                  :options="serviceSelectOptions"
                  behavior="menu"
                  emit-value
                  map-options
                  :style="!$q.screen.lt.sm ? 'width:180px;' : ''"
                  style="margin:0px auto;width:150px;"
                >
                </q-select>
              </td>
              <td>
                <q-input
                  outlined
                  dense
                  v-model="serviceItem.startHourMinuteTime"
                  style="margin:auto;width:150px;"
                  ><template v-slot:append>
                    <q-icon
                      name="event"
                      class="cursor-pointer"
                      @click="startTimeDialog = true"
                    >
                    </q-icon></template
                ></q-input>
              </td>
              <td>
                <q-input
                  outlined
                  dense
                  v-model="serviceItem.endHourMinuteTime"
                  style="margin:auto;width:150px;"
                >
                  <template v-slot:append>
                    <q-icon
                      name="event"
                      class="cursor-pointer"
                      @click="endTimeDialog = true"
                    >
                    </q-icon>
                  </template>
                </q-input>
              </td>
              <td class="text-center">
                <q-btn
                  round
                  class="q-mr-xs"
                  size="xs"
                  color="secondary"
                  icon="add_circle"
                  @click="addRow"
                />
              </td>
            </tr>
            <tr v-for="(item, index) in dataForm.services" :key="index">
              <td class="text-center">{{ item.serviceName }}</td>
              <td class="text-center">
                {{ item.startTime }}
              </td>
              <td class="text-center">
                {{ item.endTime }}
              </td>

              <td class="text-center">
                <q-btn
                  round
                  size="xs"
                  color="secondary"
                  icon="remove_circle"
                  @click="delRow(index, 'service')"
                />
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>

      <!-- 活動遊程介紹(Editor)  -->
      <!-- states 判定  -->
      <div class="col-12 q-mt-md" :style="$q.screen.lt.sm ? 'order:2' : ''">
        <span class="text-center" style="font-size:16px;font-weight:bold;"
          >三.活動遊程介紹</span
        >
        <tiny-mce
          v-if="dataForm.state == '2' || dataForm.state == '0'"
          ref="editor"
          class="q-mt-md"
          v-model="dataForm.description"
          @onClick="onClick"
        />
        <p v-else v-html="dataForm.description"></p>
      </div>
      <div class="col-12" :style="$q.screen.lt.sm ? 'order:2' : ''">
        <com-input
          ref="safetyRulesRef"
          :readonly="dataForm.state | transTourStatus"
          v-model="dataForm.safetyRules"
          form-label="注意事項/安全守則"
          type="textarea"
        ></com-input>
      </div>
      <div class="col-6 col-md-4" :style="$q.screen.lt.sm ? 'order:2' : ''">
        <com-input
          ref="contactNameRef"
          :readonly="dataForm.state | transTourStatus"
          v-model="dataForm.contactName"
          form-label="聯絡人"
        ></com-input>
      </div>
      <div class="col-6 col-md-4" :style="$q.screen.lt.sm ? 'order:2' : ''">
        <com-input
          ref="contactPhoneRef"
          :readonly="dataForm.state | transTourStatus"
          v-model="dataForm.contactPhone"
          form-label="聯絡人手機"
        ></com-input>
      </div>
      <div class="col-12 col-md-4" :style="$q.screen.lt.sm ? 'order:2' : ''">
        <com-input
          ref="contactEmailRef"
          :readonly="dataForm.state | transTourStatus"
          v-model="dataForm.contactEmail"
          form-label="聯絡人Email"
        ></com-input>
      </div>
      <div class="col-6 col-md-4" :style="$q.screen.lt.sm ? 'order:2' : ''">
        <com-input
          ref="durationRef"
          :readonly="dataForm.state | transTourStatus"
          v-model="dataForm.duration"
          form-label="活動時程(小時)"
        ></com-input>
      </div>
      <div class="col-6 col-md-4" :style="$q.screen.lt.sm ? 'order:2' : ''">
        <com-input
          ref="priceRef"
          :readonly="dataForm.state | transTourStatus"
          v-model="dataForm.price"
          form-label="活動費用"
        ></com-input>
      </div>
      <div class="col-6 col-md-4" :style="$q.screen.lt.sm ? 'order:2' : ''">
        <com-select-date
          ref="deadlineRef"
          :readonly="dataForm.state | transTourStatus"
          :range="false"
          :required="false"
          v-model="dataForm.deadline"
          form-label="活動報名截止日期"
          :style="$q.screen.lt.sm ? 'width:100%;' : ''"
        ></com-select-date>
      </div>
    </div>

    <!-- 是否建立範本 -->
    <!-- states 判定  -->
    <div class="row  q-col-gutter-x-sm q-col-gutter-y-sm  q-mb-sm">
      <div
        class="col-12 col-md-6 "
        style="display:flex;flex-direction:column;"
        :style="
          $q.screen.lt.sm
            ? 'flex-direction:row;border:1px solid rgba(0,0,0,0.24);padding-top:0px;margin-left:8px;padding-left:4px;width:inherit;flex:1;margin-top:8px;border-radius:4px;'
            : ''
        "
      >
        <span class="" :style="$q.screen.lt.sm ? 'padding-top:10px;' : ''"
          >是否建立範本</span
        >
        <q-checkbox
          :disable="dataForm.state | transTourStatus"
          size="md"
          v-model="dataForm.isModel"
          label="保存為範本"
        />
      </div>
      <div class="col-12 col-md-6 " v-if="dataForm.isModel">
        <com-input
          ref="createModelNameRef"
          dense
          :readonly="dataForm.state | transTourStatus"
          v-model="dataForm.createModelName"
          form-label="範本名稱"
        ></com-input>
      </div>
    </div>
    <!-- 審核 -->
    <!-- states 判定  -->
    <div
      v-if="dataForm.state !== '0'"
      class="row  q-col-gutter-x-sm q-col-gutter-y-sm  q-mb-sm q-mt-sm"
    >
      <div
        class="col-12 q-mb-sm"
        style="border-bottom:1px solid rgba(0,0,0,0.21)"
      >
        <span class="text-center" style="font-size:16px;font-weight:bold;"
          >審核結果</span
        >
      </div>

      <div class="col-12" :style="$q.screen.lt.sm ? 'order:2' : ''">
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
        <q-card flat v-else>
          <div style="display:flex;justify-content:center;align-items:center;">
            <q-spinner-comment
              size="xl"
              color="deep-purple"
            ></q-spinner-comment>
            <span class="text-h6">審核處理中</span>
          </div>
        </q-card>
      </div>
    </div>
    <!-- states 判定  -->
    <div
      class="row col-12 q-col-gutter-x-sm q-col-gutter-y-sm q-mt-md "
      :class="$q.screen.lt.sm ? 'justify-center' : 'justify-end'"
    >
      <div
        v-if="(dataForm.state == '2') | (dataForm.state == '0')"
        class="q-pa-md q-gutter-sm"
      >
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
          color="white"
          text-color="black"
          label="儲存為草稿"
          @click="onSave()"
        />
        <q-btn
          type="submit"
          size="sm"
          color="primary"
          label="送審"
          @click.prevent="clickSubmit()"
        />
      </div>
      <div v-else>
        <q-btn
          size="md"
          color="primary"
          text-color="white"
          label="回上頁"
          @click="goBack"
        />
      </div>
    </div>
    <!-- 時間框 -->
    <q-dialog v-model="startTimeDialog">
      <q-card>
        <q-card-section>
          <q-time
            v-model="serviceItem.startHourMinuteTime"
            :minute-options="[0, 15, 30, 45]"
            format24h
          ></q-time>
        </q-card-section>

        <q-separator />

        <q-card-actions align="center">
          <q-btn
            @click="resetDialogTime('startTimeDialog')"
            flat
            color="primary"
            label="Reserve"
          />
          <q-btn
            @click="startTimeDialog = false"
            flat
            color="primary"
            round
            label="確定"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="endTimeDialog">
      <q-card>
        <q-card-section>
          <q-time
            v-model="serviceItem.endHourMinuteTime"
            :minute-options="[0, 15, 30, 45]"
            format24h
          ></q-time>
        </q-card-section>

        <q-separator />

        <q-card-actions align="center">
          <q-btn
            @click="resetDialogTime('endTimeDialog')"
            flat
            color="primary"
            label="Reserve"
          />
          <q-btn
            @click="endTimeDialog = false"
            flat
            color="primary"
            round
            label="確定"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import TinyMce from "@/components/TinyMce/TinyMce.vue";
import ComInput from "@/components/Common/form/ComInput";
import ComSelect from "@/components/Common/form/ComSelect";
import ComSelectDate from "@/components/Common/form/ComSelectDate";
import { getServiceList } from "@/api/service";
// tourStatesOptions
import { tourStatesOptions } from "@/utils/common/dropdown-list.js";
import {
  getTourById, // 獲取特定遊程
  updateTour, // 新增遊程 草稿
  publishTour, // 發布送審
  getFirmModelTourList, // 獲取當前用戶全部範本
} from "@/api/tour";
import Mixin from "@/utils/mixin";

export default {
  mixins: [Mixin],
  // 局部注冊的組件
  components: { TinyMce, ComInput, ComSelect, ComSelectDate },
  data() {
    return {
      tourStatesOptions, //遊程所有狀態
      startTimeDialog: false,
      endTimeDialog: false,
      templateOptions: [], // 範本選擇
      allModelArr: [], //所有範本
      showTemplatesSelect: false,
      serviceSelectOptions: [], //服務類型下拉
      picked_template: "", // 選擇套用範本
      originTourName: "",
      dataForm: {
        photo: "", // 活動圖片
        tourName: "", // 活動名稱  tourNameRef
        tourAddress: "", // 活動地點 tourAddressRef
        startDate: "", // 活動日期 startDateRef
        startTime: "", // 活動日期 YYYY/MM/DD HH:mm 00:00
        endTime: "", // 活動日期 YYYY/MM/DD HH:mm  23:59
        tourGuideCount: "", // 帶領人需求數 tourGuideCountRef
        touristCount: "", // 活動人數    touristCountRef
        minTouristCount: "", // 開團最低人數  minTouristCountRef
        description: "", // 遊程介紹  descriptionRef
        safetyRules: "", // 注意事項  safetyRulesRef
        contactName: "", // 聯絡人    contactNameRef
        contactPhone: "", // 聯絡人手機   contactPhoneRef
        contactEmail: "", // 聯絡人email   contactEmailRef
        duration: "", // 活動時長  durationRef
        price: "", //    priceRef
        deadline: "", //報名截止日  deadlineRef
        services: [
          // 服務類型設定
        ],
        isModel: false, //是否設為範本
        createModelName: "", // createModelNameRef
        tourAudits: [],
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
      serviceItem: {
        serviceId: "", // 服務類型名(以id 表示)
        startTime: "", // YYYY-MM-DD HH:mm
        endTime: "", // YYYY-MM-DD HH:mm
        startHourMinuteTime: "",
        endHourMinuteTime: "",
      },
      //
      photoName: "",

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
          name: "time", // 對應 db 申請時間
          label: "審核時間",
          field: "time",
          align: "center",
        },
        {
          name: "comment",
          label: "簽核意見",
          field: "comment",
          align: "center",
        },
      ],
    };
  },
  filters: {
    transTourStatus(val) {
      if (val === "3" || val === "1") {
        return true;
      } else if (val === "2" || val === "0") {
        return false;
      }
    },
  },
  // 計算屬性
  computed: {
    tourStateName() {
      return function tourStateName(val) {
        let temp = this.tourStatesOptions.find((item) => item.value === val);
        return temp.label;
      };
    },
  },

  // 組件方法
  methods: {
    //
    async initDataForm() {
      let tourId = this.$route.query.id;
      await getTourById(tourId)
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

            // 轉換遊程審核狀態格式
            this.dataForm.tourAudits.map((item) => {
              item.state=this.tourStateName(item.state)
            });

          }
        })
        .catch((err) => {
          console.log("getTourById api =>", err);
        });
    },

    // 關閉時間彈框
    resetDialogTime(type) {
      switch (type) {
        case "startTimeDialog":
          this.serviceItem.startHourMinuteTime = "";
          this.startTimeDialog = false;
          break;
        case "endTimeDialog":
          this.serviceItem.endHourMinuteTime = "";
          this.endTimeDialog = false;
          break;
      }
    },
    // 初始化服務類型
    async initServiceDropdownList() {
      await getServiceList()
        .then((res) => {
          if (res.status == 200) {
            res.data.forEach((obj) => {
              let temp = {};
              temp.value = obj.id;
              temp.label = obj.name;
              this.serviceSelectOptions.push(temp);
            });
          }
        })
        .catch((err) => {});
    },
    // 初始化範本功能
    async getTemplates() {
      await getFirmModelTourList()
        .then((res) => {
          if (res.status == 200 && res.data.length > 0) {
            this.showTemplatesSelect = true;
            res.data.forEach((obj) => {
              let temp = {};
              temp.value = obj.id;
              temp.label = obj.tourName;
              this.templateOptions.push(temp);
            });

            this.allModelArr = res.data;
          }
        })
        .catch((err) => {
          console.log("getFirmModelTourList err =>", err);
        });
    },
    // 預覽圖片
    previewImage: function(event) {
      var input = event.target;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.dataForm.photo = e.target.result;
        };
        this.photoName = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },
    reset(type) {
      switch (type) {
        case "service":
          this.serviceItem = {
            serviceId: "", // 服務類型名(以id 表示)
            startTime: "", // YYYY-MM-DD HH:mm
            endTime: "", // YYYY-MM-DD HH:mm
            startHourMinuteTime: "",
            endHourMinuteTime: "",
          };
          break;
        case "all":
          this.dataForm = {
            photo: "", // 活動圖片
            name: "", // 活動名稱
            tourAddress: "", // 活動地點
            startDate: "", // 活動日期
            startTime: "", // 活動日期 YYYY/MM/DD HH:mm 00:00
            endTime: "", // 活動日期 YYYY/MM/DD HH:mm  23:59
            tourGuideCount: "", // 帶領人需求數
            touristCount: "", // 活動人數
            minTouristCount: "", // 開團最低人數
            description: "", // 遊程介紹
            safetyRules: "", // 注意事項
            contactName: "", // 聯絡人
            contactPhone: "", // 聯絡人手機
            contactEmail: "", // 聯絡人email
            duration: "", // 活動時長
            price: "", //
            deadline: "", //報名截止日
            services: [
              // services 服務類型設定
              // { serviceId: "", startTime: "",endTime":"" },
            ],
            isModel: false, //	是不是範本
            createModelName: "",
          };
          break;
      }
    },
    //
    addRow() {
      let errNum = 0;
      let errStr = [];
      if (this.dataForm.startDate === "" || this.dataForm.startDate == null) {
        return this.$q.notify({
          message: `請先填寫活動日期!`,
          timeout: 2000,
          type: "negative",
          position: "top-right",
        });
      }
      if (this.serviceItem.serviceId === "") {
        errNum += 1;
        errStr.push("服務項目為必選項!");
      }
      if (this.serviceItem.startHourMinuteTime === "") {
        errNum += 1;
        errStr.push("開始時間為必選項!");
      }
      if (this.serviceItem.endHourMinuteTime === "") {
        errNum += 1;
        errStr.push("結束時間為必選項!");
      }
      if (errNum > 0) {
        return this.$q.notify({
          message: `${errStr.join("")}`,
          timeout: 1500 * errStr.length,
          type: "negative",
          position: "top-right",
        });
      }

      this.serviceItem.startTime =
        this.dataForm.startDate.trim() +
        " " +
        this.serviceItem.startHourMinuteTime;
      this.serviceItem.endTime =
        this.dataForm.startDate.trim() +
        " " +
        this.serviceItem.endHourMinuteTime;

      this.dataForm.services.push(this.serviceItem);
      this.reset("service");
    },
    delRow(idx, type) {
      if (type === "service") {
        this.dataForm.services.splice(idx, 1);
      }
    },
    pageValidater(pageName, dataForm) {
      let errNum = 0;
      switch (pageName) {
        case "TourDetail":
          let errNum = 0;
          let errLabel = [];
          let comInputArr = this.pageValidate[pageName].comInput;
          let comInputLabelArr = this.pageValidate[pageName].comInputLabel;
          let comSelectDateArr = this.pageValidate[pageName].comSelectDate;
          let comSelectDatetLabelArr = this.pageValidate[pageName]
            .comSelectDatetLabel;
      

          // 採用顏色
          for (let i = 0; i < comInputArr.length; i++) {
            let _ref = comInputArr[i].slice(0, -3);
            if (dataForm[_ref] == "" || dataForm[_ref] == null) {
              errNum++;
              errLabel.push(comInputLabelArr[i]);
            }
          }

          for (let i = 0; i < comSelectDateArr.length; i++) {
            let _ref = comSelectDateArr[i].slice(0, -3);
            if (dataForm[_ref] == "" || dataForm[_ref] == null) {
              errNum++;
              errLabel.push(comSelectDatetLabelArr[i]);
            }
          }
          return { errNum, errLabel, hasError: errNum > 0 ? true : false };
      }
    },
    // 送審
    async clickSubmit() {
      // ================= 驗證 ====================
      let validObj = this.pageValidater("TourDetail", this.dataForm);
      if (this.dataForm.isModel) {
        validObj.errNum++;
        validObj.errLabel.push("範本名稱");
      }
      if (this.dataForm.description === "") {
        validObj.errNum++;
        validObj.errLabel.push("遊程介紹");
      }
      if (this.dataForm.services.length === 0) {
        validObj.errNum++;
        validObj.errLabel.push("服務類型");
      }
      if (validObj.errNum > 0) {
        this.showNotify({
          message: `${validObj.errLabel.join("、")}欄位未填!`,
          type: "negative",
        });
        return;
      }

      // ================= 組活動時間 ===================
      this.dataForm.startTime = this.dataForm.startDate.trim();
      this.dataForm.deadline = this.dataForm.deadline.trim();
      // ================= api ===================
      let loading = false;
      this.$q.loading.show();
      await publishTour(this.dataForm, loading)
        .then((res) => {
          if (res.status === 200) {
            this.reset("all");
            this.$q.loading.hide();
            this.showNotify({ message: "遊程送審成功", type: "positive" });
            this.goBack();
          }
        })
        .catch((err) => {
          console.log("publishTour api", err);
        });
    },
    // 存為草稿
    async onSave() {
      // 組活動時間
      // ================= 組活動時間 ===================
      this.dataForm.startTime = this.dataForm.startDate.trim();
      this.dataForm.deadline = this.dataForm.deadline.trim();

      let loading = false;
      this.$q.loading.show();
      await updateTour(this.dataForm, loading)
        .then((res) => {
          if (res.status === 200) {
            //
            this.reset("all");
            this.$q.loading.hide();
            this.$q.notify({
              message: "遊程成功儲存為草稿",
              type: "positive",
              position: "top-right",
            });
            this.goBack();
          }
        })
        .catch((err) => {
          this.$q.loading.hide();
          this.$q.notify({
            message: "遊程儲存為草稿失敗",
            color: "negative",
            position: "top-right",
          });
        });
    },
    // 套用範本
    useTemplate(e) {
      this.$q.loading.show();
      setTimeout(() => {
        this.dataForm = this.allModelArr.find((item) => item.id === e);
        this.$q.loading.hide();
      }, 1500);
    },
    onClick(e, editor) {
  
    },
  },
  created() {
    this.initDataForm();
    this.initServiceDropdownList();
    this.getTemplates();
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
