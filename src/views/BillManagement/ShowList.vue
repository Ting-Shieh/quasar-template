<template>
  <div class="q-pa-md" style="">
    <table-dialog
      ref="myTable"
      :tableColumn="tableColumns"
      :tableData="tableData"
      :opera-show="false"
      rowKey="name"
      :show-pagination="false"
      :pagination="page"
    >
      <template v-slot:top="props">
        <div class="row  col-12">
          <div class="col-12 col-md-3 q-mb-sm q-mr-sm">
            <q-input
              outlined
              label="關鍵字"
              v-model="searchForm.keyword"
              dense
              class="q-mr-sm"
              style="width:100%"
            />
          </div>
          <div class="col-12 col-md-3" v-if="userType === '10'||userType === '6'">
            <q-select
              outlined
              v-model="searchForm.firmId"
              stack-label
              :options="firmsSelectOptions"
              dense
              behavior="menu"
              emit-value
              map-options
              :option-label="(item) => (item === '' ? '請選擇' : item.label)"
            >
            </q-select>
          </div>
        </div>
        <div class="row  col-12" :class="$q.screen.lt.sm ? 'q-mt-sm' : ''">
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
              size="md"
              :style="
                $q.screen.lt.sm
                  ? 'height:40px;width:50%;'
                  : 'height:40px;width:40%;'
              "
              label="重置"
              @click="reset"
            />
            <q-btn
              size="md"
              color="primary"
              :style="
                $q.screen.lt.sm
                  ? 'height:40px;width:40%;'
                  : 'height:40px;width:40%'
              "
              label="搜尋"
              @click="clickSearch"
            />
          </div>
        </div>
      </template>

      <template v-slot:body-opera="{ rowData, rowIndex }">
        <q-btn
          size="xs"
          class="q-mr-sm"
          color="amber"
          label="修改"
          @click="openDialog(rowData)"
        />
        <q-btn
          size="xs"
          color="red"
          label="刪除"
          @click="delRowData(rowData.id, rowIndex)"
        />
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
import { getAllFirms, getRegistraionRecords } from "@/api/bills";
import TableDialog from "@/components/Common/table/TableDialog.vue";
import ComSelectDate from "@/components/Common/form/ComSelectDate";
import ComPagination from "@/components/Common/form/ComPagination";
export default {
  // 組件參數 接收來自父組件的數據
  props: {},
  // 局部注冊的組件
  components: { TableDialog, ComPagination, ComSelectDate },
  data() {
    return {
      userType: "",
      firmsSelectOptions: [],
      searchForm: {
        keyword: "",
        firmId: "",
        startTime: "",
        endTime: "",
      },

      page: {
        rowsPerPage: 10,
        page: 1,
        totalNum: 0,
      },
      tableLoading: false,
      tableColumns: [
        {
          name: "userName",
          label: "姓名",
          field: "userName",
          align: "center",
        },
        {
          name: "tourDate",
          label: "遊程日期",
          field: "tourDate",
          align: "center",
        },
        {
          name: "tourName",
          label: "遊程名稱",
          field: "tourName",
          align: "center",
        },
        {
          name: "status",
          label: "繳費狀況",
          field: "status",
          align: "center",
          format: (val) => (val === "10" ? "已繳費" : "未繳費"),
        },
        {
          name: "price",
          label: "繳費金額",
          field: "price",
          align: "center",
        },
        {
          name: "note",
          label: "備註",
          field: "note",
          align: "center",
        },
      ],
      tableData: [],
    };
  },
  // 組件方法myTable
  methods: {
    async getFirmsData() {
      await getAllFirms()
        .then((res) => {
          if (res.status === 200) {
            this.firmsSelectOptions = res.data.map((item) => {
              item.value = item.id;
              item.label = item.name;
            });
            this.firmsSelectOptions = res.data;
          }
        })
        .catch((err) => {});
    },
    async getRecords() {
      this.tableData =[]
      getRegistraionRecords(this.searchForm)
        .then((res) => {
          if (res.status === 200) {
            this.page.totalNum = res.data.length;
            this.tableData = res.data;
         
          }
        })
        .catch((err) => {});
    },
    reset() {
      this.searchForm = {
        keyword: "",
        firmId: "",
        startTime: "",
        endTime: "",
      };
    },
    clickSearch() {
      this.searchForm.startTime = this.searchForm.startTime.trim();
      this.searchForm.endTime = this.searchForm.endTime.trim();

      this.getRecords();
    },

    changeCurrentPage(e) {
      this.page.page = e;
    },
  },
  created() {
    this.getFirmsData();
    this.userType = JSON.parse(window.localStorage.getItem("user")).memType;
    this.clickSearch();
  },
};
</script>
<style lang="scss" scoped></style>
