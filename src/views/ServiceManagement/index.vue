<template>
  <div class="q-pa-md" style="">
    <table-dialog
      ref="myTable"
      :tableColumn="tableColumns"
      :tableData="tableData"
      :opera-show="true"
      rowKey="name"
      tab-title="服務類型"
      :show-pagination="false"
      :table-loading="tableLoading"
      :pagination="page"
    >
      <template v-slot:top="props">
        <q-input
          outlined
          v-model="searchForm.keyword"
          dense
          style="width:200px;"
        />
        <q-btn
          size="md"
          class="q-ml-sm"
          color="primary"
          :style="$q.screen.lt.sm ? 'flex:1;' : ''"
          label="搜尋"
          @click="searchKeyword"
        />
        <q-space v-if="!$q.screen.lt.sm" class="" />
        <q-btn
          size="md"
          color="primary"
          label="新增服務類型"
          :style="$q.screen.lt.sm ? 'width:100%;margin-top:8px;' : ''"
          @click="openDialog({})"
        />
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
          @click="delRowData(rowData.id)"
        />
      </template>

      <template v-slot:dialog-content>
        <div class="row q-col-gutter-x-sm q-col-gutter-y-sm q-pa-md">
          <div class="col-12 col-md-6">
            <com-input
              ref="comCheck"
              v-model="dialogForm.name"
              form-label="服務類型"
              :required-valid="true"
              hide-bottom-space
              :rules="[(val) => (val && val.length > 0) || '此欄位為必填項']"
            ></com-input>
          </div>
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
              >狀態</span
            >

            <q-option-group
              style="margin-left:-12px;"
              v-model="dialogForm.status"
              :options="statusOptions"
              inline
              type="radio"
              class=""
            />
           
          </div>
          <div class="col-12 ">
            <com-input
              v-model="dialogForm.note"
              form-label="備註"
              type="textarea"
            ></com-input>
          </div>
        </div>
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
              v-close-popup
            />
            <q-btn
              type="submit"
              size="sm"
              color="primary"
              label="保存"
              @click="onSubmit()"
            />
          </div>
        </div>
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
import ComInput from "@/components/Common/form/ComInput.vue";
import TableDialog from "@/components/Common/table/TableDialog.vue";
import ComPagination from "@/components/Common/form/ComPagination";
import { statusOptions } from "@/utils/common/dropdown-list.js";
import {
  getServiceList,
  addService,
  removeService,
  updateService,
  getServiceKeywordList,
} from "@/api/service";

export default {

  components: { TableDialog, ComInput, ComPagination },
  data() {
    return {
      statusOptions,
      searchForm: {
        keyword: "",
      },

      page: {
        rowsPerPage: 20,
        page: 1,
        totalNum: 0,
      },
      tableLoading:false,

      tableColumns: [
        {
          name: "name",
          label: "服務類型",
          field: "name",
          align: "center",
        },
        {
          name: "status",
          label: "狀態",
          field: "status",
          align: "center",
          format: (val) => val?'啟用':'禁用',
        },
        {
          name: "note",
          label: "備註",
          field: "note",
          align: "center",
        },
      ],
      tableData: [

      ],
      dialogForm: {
        id: "",
        name: "",
        status: false,
        note: "",
      },
    };
  },
  created() {},

  // 組件方法myTable
  methods: {

    // 初始化方法
    async initData() {
      this.tableLoading = true;
      await getServiceList()
        .then((res) => {
          
          if (res.status == 200) {
            this.tableData = res.data;
            this.page.totalNum = this.tableData.length;
            this.tableLoading = false;
          }
        })
        .catch((err) => {
          console.log("getServiceList err", err);
          this.tableLoading = false;
        })
    },
    resetForm() {
      this.dialogForm = {
        id: "",
        name: "",
        status: false,
        note: "",
      };
    },
    changeCurrentPage(e) {

      this.page.page = e;
    },
    openDialog(rowData) {
      this.resetForm();
      if (rowData.id ) {
        // 修改
        this.$refs.myTable.openDialog("edit");
        this.dialogForm.id = rowData.id;
        this.dialogForm.name = rowData.name;
        this.dialogForm.status = rowData.status;
        this.dialogForm.note = rowData.note;
        return;
      } else {
        // 新增
        this.$refs.myTable.openDialog("add");
      }
    },
    // 刪除
    async delRowData(id) {
      this.tableLoading = true;
      await removeService( id )
        .then((res) => {
          if (res.status === 200) {
            this.initData(); // 重新獲取List
          } else {
            this.$q.notify({
              message: "服務類型刪除失敗",
              color: "negative",
              position: "top-right",
            });
          }
          this.tableLoading = false;
        })
        .catch((err) => {
          this.tableLoading = false;
          this.$q.notify({
            message: "服務類型刪除失敗",
            color: "negative",
            position: "top-right",
          });
        });
    },
    //  新增或修改
    async onSubmit() {
      if (this.dialogForm.name === "") {
        this.$refs.comCheck.$children[0].innerError = true;
        this.$refs.comCheck.$children[0].innerErrorMessage = this.$refs.comCheck.$children[0].rules[0]();
        return;
      }
      if (this.dialogForm.id != "") {
        // 修改
        await updateService(this.dialogForm)
          .then((res) => {
            if (res.status === 200) {
              this.initData(); // 重新獲取List
              this.$q.notify({
                message: "服務類型修改成功",
                color: "positive",
                position: "top-right",
              });
              this.$refs.myTable.showCheckDialog = false;
              return;
            } else {
              this.$q.notify({
                message: "服務類型修改失敗",
                color: "negative",
                position: "top-right",
              });
              this.$refs.myTable.showCheckDialog = false;
            }
          })
          .catch((err) => {
            this.$q.notify({
              message: "服務類型修改失敗",
              color: "negative",
              position: "top-right",
            });
            console.log("updateService err", err);
          });
      } else {
        // 新增
        await addService(this.dialogForm)
          .then((res) => {
            if (res.status === 200) {
              this.initData(); // 重新獲取List
              this.$q.notify({
                message: "服務類型新建成功",
                color: "positive",
                position: "top-right",
              });
              this.$refs.myTable.showCheckDialog = false;
              return;
            } else {
              this.$q.notify({
                message: "服務類型新建失敗",
                color: "negative",
                position: "top-right",
              });
              this.$refs.myTable.showCheckDialog = false;
            }
          })
          .catch((err) => {
            this.$q.notify({
              message: "服務類型新建失敗",
              color: "negative",
              position: "top-right",
            });
            console.log("addService err", err);
          });
      }
    },
    // 關鍵字搜尋
    async searchKeyword() {
      //
      if (this.searchForm.keyword === "") {
        this.$q.notify({
          message: "請至少輸入一關鍵字",
          color: "warning",
          position: "top-right",
        });
        this.searchForm = {
          keyword: "",
        };
        return;
      }

      //
      this.tableLoading = true;
      await getServiceKeywordList(this.searchForm.keyword)
        .then((res) => {
          if (res.status === 200) {
            this.tableData = res.data;
            this.page.totalNum = this.tableData.length;
            this.searchForm = {
              keyword: "",
            };
            this.tableLoading = false;
          }
          
        })
        .catch((err) => {
          console.log("getServiceKeywordList err", err);
        });
    },
  },
  created() {
    this.initData();
  },
};
</script>
<style lang="scss" scoped></style>
