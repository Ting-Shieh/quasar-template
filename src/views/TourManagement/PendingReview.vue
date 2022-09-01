<template>
  <div :class="$q.screen.lt.sm ? 'q-pa-xs' : 'q-pa-md'" style="">
    <table-dialog
      ref="myTable"
      :tableColumn="tableColumns"
      :tableData="tableData"
      :opera-show="true"
      rowKey="name"
      :show-pagination="false"
      :pagination="page"
    >
      <template v-slot:body-opera="{ rowData, rowIndex }">
        <q-btn
          size="xs"
          class="q-mr-sm"
          color="amber"
          label="修改"
          @click="goTo('TourReview', (id = rowData.id))"
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
        @input="changeCurrentPage"
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
  getTourList, // 獲取全部遊程
  removeTourByAdmin,// 管理員移除遊程
} from "@/api/tour";
export default {
  mixins: [Mixin],
  components: { ComPagination, TableDialog, ComInput },
  data() {
    return {
      page: {
        rowsPerPage: 20,
        page: 1,
        totalNum: 0,
      },

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
        {
          name: "createUserName",
          label: "申請人",
          field: "createUserName",
          align: "center",
        },
        {
          name: "createdAt",
          label: "申請時間",
          field: "createdAt",
          align: "center",
        },
      ],
      tableData: [],
    };
  },

  // 組件方法
  methods: {
    async getAllTours() {
      let states=['1']
      this.tableLoading = true;
      await getTourList(states)
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
      this.getAllTours();
    },
    
    changeCurrentPage(e) {
      this.page.page = e;
    },
    
    async delRowData(id) {
      let loading = false;
      await removeTourByAdmin(id,loading).then(res=>{
        if(res.status===200){
          this.showNotify({ message: "遊程刪除成功", type: "positive" });
          this.getAllTours();
        }
      }).catch(err=>{
        console.log(err)
      })
    },
  },
  created() {
    
    this.initData();
  },
};
</script>
<style lang="scss" scoped></style>
