<template>
  <div :class="$q.screen.lt.sm ? 'q-pa-xs' : 'q-pa-md'" style="">
    <table-dialog
      ref="myTable"
      :tableColumn="tableColumns"
      :tableData="tableData"
      :opera-show="true"
      rowKey="name"
      :show-pagination="false"
      :table-loading="tableLoading"
      :pagination="page"
    >
      <template v-slot:body-opera="{ rowData, rowIndex }">
        <q-btn
          size="xs"
          class="q-mr-sm"
          color="amber"
          label="修改"
          @click="goTo('TourDetail', (id = rowData.id))"
        />
        <q-btn
          size="xs"
          color="red"
          label="刪除"
          @click="delRowData(rowData.id)"
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
      ></com-pagination>
    </div>
  </div>
</template>
<script>
import ComInput from "@/components/Common/form/ComInput.vue";
import TableDialog from "@/components/Common/table/TableDialog.vue";
import ComPagination from "@/components/Common/form/ComPagination";
import Mixin from "@/utils/mixin";
import {
  addTourAsDraft, // 新增遊程 草稿
  publishTour, // 發布送審
  removeTour,
  getFirmModelTourList, // 獲取當前用戶全部範本
  getFirmTourList, // 獲取該廠商全部遊程
} from "@/api/tour";
export default {
  mixins: [Mixin],
  // 局部注冊的組件
  components: { ComPagination, TableDialog, ComInput },
  data() {
    return {
      page: {
        rowsPerPage: 5,
        page: 1,
        totalNum: 0,
      },
      tableLoading: false,

      tableColumns: [
        {
          name: "id",
          label: "序號",
          field: "id",
          align: "center",
        },
        {
          name: "tourName",
          label: "遊程名稱",
          field: "tourName",
          align: "center",
        },
      ],
      tableData: [],
    };
  },
  // 組件方法
  methods: {
    async getFirmDrfts() {
      this.tableLoading = true;
      await getFirmTourList("0")
        .then((res) => {
          if (res.status === 200) {
           
            this.tableData = res.data;
            this.page.totalNum = this.tableData.length;
            this.tableLoading = false;
          }
        })
        .catch((err) => {
          console.log("getFirmTourList api", err);
        });
    },
    initData() {
      this.getFirmDrfts();
    },
    
    changeCurrentPage(e) {

      this.page.page = e;
    },
   
    async delRowData(id) {
      let loading = false;
      await removeTour(id,loading).then(res=>{
        if(res.status===200){
          this.showNotify({ message: "遊程刪除成功", type: "positive" });
          this.getFirmDrfts();
        }
      }).catch(err=>{

      })
    },
  },
  created() {
    
    this.initData();
  },
};
</script>
<style lang="scss" scoped></style>
