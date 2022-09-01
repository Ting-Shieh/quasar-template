<template>
  <div class="q-pa-md" style="">
    <table-dialog
      ref="myTable"
      :tableColumn="tableColumns"
      :tableData="tableData"
      :opera-show="false"
      rowKey="name"
      tab-title=""
      :show-pagination="false"
      :table-loading="tableLoading"
      :pagination="page"
    >
      <template v-slot:top>
        <div
          class="row  col-12"
          style="border-bottom:2px solid rgba(0,0,0,0.24);"
          :class="$q.screen.lt.sm ? 'q-mt-sm' : ''"
        >
          <div class="col-12 col-md-3 q-mb-sm q-mr-sm">
            <q-input
              outlined
              dense
              label="搜尋開始日期"
              v-model="searchForm.startTime"
              style="margin-right:4px;width:100%;"
              hide-bottom-space
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qDateProxy"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="searchForm.startTime"
                      mask="YYYY/MM/DD"
                      color="primary"
                    >
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="關閉"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="col-12 col-md-3 q-mb-sm q-mr-sm">
            <q-input
              outlined
              dense
              label="搜尋結束日期"
              v-model="searchForm.endTime"
              
              style="margin-right:4px;width:100%;"
              hide-bottom-space
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qDateProxy"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="searchForm.endTime"
                      mask="YYYY/MM/DD"
                      color="primary"
                    >
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="關閉"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>

          <div
            class="col-12 col-md-4 q-mb-sm "
            style="display:flex;justify-content:space-around"
            :style="
              $q.screen.lt.sm
                ? 'justify-content:space-between'
                : 'justify-content:space-around'
            "
          >
            
            <q-btn
              size="sm"
              color="primary"
              :style="
                $q.screen.lt.sm
                  ? 'height:40px;width:40%;'
                  : 'height:40px;width:40%'
              "
              label="搜尋"

            />
          </div>
        </div>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="sendDate" :props="props">
            {{ props.row.sendDate }}
          </q-td>
          <q-td key="sendId" :props="props">
            {{ props.row.sendId }}
          </q-td>
          <q-td key="fileName" :props="props">
            {{ props.row.fileName }}
          </q-td>
          <q-td key="sendType" :props="props"> {{ props.row.sendType }}</q-td>
          <q-td key="sender" :props="props">
            {{ props.row.sender }}
          </q-td>
          <q-td key="OPSWATStatus" :props="props">
            {{ props.row.OPSWATStatus }}
          </q-td>
          <q-td key="status" :props="props">
            {{ props.row.status }}
          </q-td>
          <q-td key="note" :props="props">
            {{ props.row.note }}
          </q-td>
        </q-tr>
      </template>
    </table-dialog>
    <div class="row justify-center q-mt-md ">
      <com-pagination
        class="col-12 justify-center"
        style="align-items:center;margin-right:0px;"
        v-model="page.page"
        :rows-per-page="page.rowsPerPage"
        :total-num="page.totalNum"
        @input="changeCurrentPage"
      ></com-pagination>
    </div>
  </div>
</template>
<script>
import ComSelectDate from "@/components/Common/form/ComSelectDate.vue";
import ComInput from "@/components/Common/form/ComInput.vue";
import TableDialog from "@/components/Common/table/TableDialog.vue";
import ComPagination from "@/components/Common/form/ComPagination";
import { statusOptions } from "@/utils/common/dropdown-list.js";
import Mixin from "@/utils/mixin";
import {
  getUserReviewState, // 獲取用戶審核訊息
  updateUserEnable, // 啟用
  updateUserDisable, // 禁用
  deleteUser, // 刪除用戶
} from "@/api/user";

export default {
  mixins: [Mixin],
  components: { TableDialog, ComInput, ComPagination, ComSelectDate },
  data() {
    return {
      statusOptions,
      searchForm: {
        startTime: "",
        endTime: "",
      },

      page: {
        rowsPerPage: 20,
        page: 1,
        totalNum: 5,
      },
      tableLoading: false,

      tableColumns: [
        {
          name: "sendDate",
          label: "傳送日期",
          field: "sendDate",
          align: "center",
        },
        {
          name: "sendId",
          label: "傳送ID",
          field: "sendId",
          align: "center",
        },
        {
          name: "fileName",
          label: "檔案名稱",
          field: "fileName",
          align: "center",
        },
        {
          name: "sendType",
          label: "傳送方式",
          field: "sendType",
          align: "center",
        },
        {
          name: "sender",
          label: "傳送人",
          field: "sender",
          align: "center",
        },

        {
          name: "OPSWATStatus",
          label: "OPSWAT檢核狀態",
          field: "OPSWATStatus",
          align: "center",
          format: (val) => (val === 1 ? "OK" : "Fail"),
        },
        {
          name: "status",
          label: "傳送狀態",
          field: "status",
          align: "center",
          format: (val) => (val === 1 ? "OK" : "Fail"),
        },
        {
          name: "note",
          label: "備註",
          field: "note",
          align: "center",
        },
      ],
      tableData: [
        {
          sendDate: "2021/11/01",
          sendId: "21334-342912-001",
          fileName: "2021 Meet Taipei 大會手冊_中英文(1).pdf",
          sendType: "1",
          sender: "系統",
          OPSWATStatus: 1,
          status: 1,
          note: "",
        },
        {
          sendDate: "2021/11/01",
          sendId: "21334-342912-001",
          fileName: "2021 Meet Taipei 大會手冊_中英文(2).pdf",
          sendType: "1",
          sender: "系統",
          OPSWATStatus: 1,
          status: 1,
          note: "",
        },
        {
          sendDate: "2021/11/02",
          sendId: "21312-412411-002",
          fileName: "五倍券懶人包.pdf",
          sendType: "1",
          sender: "系統",
          OPSWATStatus: 1,
          status: 1,
          note: "",
        },
        {
          sendDate: "2021/11/03",
          sendId: "12341-325253-003",
          fileName: "空軍電子書用戶介面及體驗設計文檔.docx",
          sendType: "2",
          sender: "羅先生",
          OPSWATStatus: 0,
          status: 1,
          note: "重送",
        },
        {
          sendDate: "2021/11/04",
          sendId: "12341-325253-003",
          fileName: "陸軍電子書用戶介面及體驗設計文檔.docx",
          sendType: "2",
          sender: "羅先生",
          OPSWATStatus: 0,
          status: "",
          note: "重送",
        },
      ],
      dialogForm: {
        memId: "",
        loginId: "",
        registrationDate: "",
        memType: "",
        status: "",
      },
    };
  },

  methods: {
    // memType 轉換
    memTypeFormat(val) {
      if (val === "10") {
        return "超級管理員";
      } else if (val === "1") {
        return "一般使用者";
      } else if (val === "2") {
        return "業者";
      } else if (val === "6") {
        return "育成中心";
      }
    },

    // 初始化方法
    async initData() {
      // this.tableLoading = true;
      // await getUserReviewState()
      //   .then((res) => {
      //     if (res.status == 200) {
      //       this.tableData = res.data;
      //       console.log("tableData>>>", res);
      //       this.page.totalNum = this.tableData.length;
      //       this.tableLoading = false;
      //     }
      //   })
      //   .catch((err) => {
      //     console.log("getUserReviewState err", err);
      //     this.tableLoading = false;
      //   });
    },
    resetForm() {
      this.dialogForm = {
        memId: "",
        loginId: "",
        registrationDate: "",
        memType: "",
        status: "",
      };
    },
    changeCurrentPage(e) {
      this.page.page = e;
    },
    openDialog(rowData) {
      if (rowData.memId) {
        this.resetForm();
        // this.resetForm();
        // 修改
        this.$refs.myTable.openDialog("提示訊息");

        this.dialogForm.memId = rowData.memId;
        this.dialogForm.loginId = rowData.loginId;
        this.dialogForm.memType = rowData.memType;
        this.dialogForm.status = rowData.status;
        return;
      }
    },
    // 刪除
    async delRowData(id) {
      // this.tableLoading = true;
      // await deleteUser(id)
      //   .then((res) => {
      //     if (res.status === 200) {
      //       this.initData(); // 重新獲取List
      //       this.showNotify({
      //         message: "用戶刪除成功!",
      //         type: "positive",
      //       });
      //     } else {
      //       this.showNotify({
      //         message: "用戶刪除失敗!",
      //         type: "negative",
      //       });
      //     }
      //     this.tableLoading = false;
      //   })
      //   .catch((err) => {
      //     this.tableLoading = false;
      //     this.showNotify({
      //       message: "用戶刪除失敗!",
      //       type: "negative",
      //     });
      //   });
    },
    //  啟用或禁用
    async onSubmit() {
      // this.dialogForm.status = this.dialogForm.status === 0 ? 1 : 0;
      // console.log("after >>", this.dialogForm);
      // if (this.dialogForm.status === 1) {
      //   // 啟用
      //   await updateUserEnable(this.dialogForm.memId)
      //     .then((res) => {
      //       if (res.status === 200) {
      //         this.initData(); // 重新獲取List
      //         this.showNotify({
      //           message: "用戶狀態更新成功!",
      //           type: "positive",
      //         });
      //       } else {
      //         this.showNotify({
      //           message: res.message !== "" ? res.message : "用戶狀態更新失敗!",
      //           type: "negative",
      //         });
      //       }
      //       this.tableLoading = false;
      //     })
      //     .catch((err) => {
      //       this.tableLoading = false;
      //       this.showNotify({
      //         message: err.message !== "" ? err.message : "用戶狀態更新失敗22!",
      //         type: "negative",
      //       });
      //     });
      // } else {
      //   // 禁用
      //   await updateUserDisable(this.dialogForm.memId)
      //     .then((res) => {
      //       if (res.status === 200) {
      //         this.initData(); // 重新獲取List
      //         this.showNotify({
      //           message: "用戶狀態更新成功!",
      //           type: "positive",
      //         });
      //       } else {
      //         this.showNotify({
      //           message: "用戶狀態更新失敗!",
      //           type: "negative",
      //         });
      //       }
      //       this.tableLoading = false;
      //     })
      //     .catch((err) => {
      //       this.tableLoading = false;
      //       this.showNotify({
      //         message:
      //           err.message !== "" ? "!" + err.message : "用戶狀態更新失敗22!",
      //         type: "negative",
      //       });
      //     });
      // }
      // this.$refs.myTable.showCheckDialog = false;
    },
  },
  created() {
    // this.initData();
  },
};
</script>
<style lang="scss" scoped>
.state_ok_btn {
  border: 1px solid #ff9800;
  color: #ff9800;
  background-color: transparent;
}
.state_not_ok_btn {
  border: 1px solid #418163;
  color: #418163;
  background-color: transparent;
}
.state_ok_chip {
  color: #ff9800;
  background-color: rgba(255, 152, 0, 0.2);

  border-radius: 5px;
}
.state_not_ok_chip {
  color: #418163;

  background-color: rgba(65, 129, 99, 0.2);
  border-radius: 5px;
}
</style>
