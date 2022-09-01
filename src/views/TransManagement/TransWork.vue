<template>
  <div class="q-pa-md" style="">
    <div class="">
      <el-upload
        class=""
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple
      >
        <i
          slot="default"
          class="el-icon-plus"
          style="font-size: 6rem;margin-top:40px;"
        ></i>

        <div class="el-upload__text" style="margin-top:60px;font-size: 1.8rem;">
          將文件拖曳到此處，或<em>點擊上傳</em>
        </div>
        
      </el-upload>
    </div>
    <div class="row " style="margin-top:20px;">
      <q-table
        ref="myTable"
        :columns="tableColumns"
        :data="tableData"
        row-key="fileName"
        tab-title=""
        selection="multiple"
        :selected.sync="selected"
        class="col-12 col-md-8 "
      >
      <template v-slot:top>
        

        <q-space />

        <q-btn
              size="sm"
              color="primary"
             
              label="上傳"

            />
      </template>

        <template v-slot:body-cell-fileName="props">
          <q-td :props="props">
            <!-- <q-icon name="folder" size="1.5em" style="color:gold;" /> -->
            {{ props.row.fileName }}
          </q-td>
        </template>
        <template v-slot:body-cell-method="props">
          <q-td :props="props">
            <q-icon name="delete" size="1.5em" style="cursor:pointer;" />
          </q-td>
        </template>
      </q-table>
      <!-- <div class="row this justify-center q-mt-md ">
        <com-pagination
          class="col-12 col-md-6  justify-center"
          style="align-items:center;margin-right:0px;"
          v-model="page.page"
          :rows-per-page="page.rowsPerPage"
          :total-num="page.totalNum"
          @input="changeCurrentPage"
        ></com-pagination>
      </div> -->
    </div>
    
  </div>
</template>
<script>
import ComPagination from "@/components/Common/form/ComPagination";
import TableDialog from "@/components/Common/table/TableDialog.vue";
import Mixin from "@/utils/mixin";
import "element-ui/lib/theme-chalk/index.css";
import {
  mediationTypeOptions,
  rowOptions, // 每頁筆數
} from "@/utils/common/dropdown-list.js";

export default {
  mixins: [Mixin],
  // 局部注冊的組件
  components: { ComPagination, TableDialog },
  data() {
    return {
      tab: "manual",
    
      page: {
        pageSize: 20,
        currentPage: 1,
        totalNum: 0,
      },

      selected: [],
      page: {
        rowsPerPage: 20,
        page: 1,
        totalNum: 5,
      },
      tableLoading: false,

      tableColumns: [
        {
          name: "fileName",
          label: "檔案名稱",
          field: "fileName",
          align: "center",
          style: "width:400px;",
        },
        {
          name: "method",
          label: "操作",
          field: "method",
          align: "center",
          style: "width:100px;",
        },
      ],
      tableData: [
        {
          fileName: "捷瑞專案付款機制調整.pptx",
        },
        {
          fileName: "教師媒合系統功能規格書.docx",
        },
        {
          fileName: "捷瑞專案付款機制使用者訪談機制.docx",
        },
        {
          fileName: "202205_內部零用金使用.xls",
        },
      ],
    };
  },
  created() {},

  computed: {},
  // 偵聽器
  watch: {},
  // 組件方法
  methods: {
    changeCurrentPage(e) {
      // 重新call api
      this.page.currentPage = e;
      this.clickSearch();
    },
    changePageSize(e) {
      this.page.pageSize = e;
      this.page.currentPage = 1;
      this.clickSearch();
    },
  },
  filters: {},
};
</script>
<style lang="css" scoped>
.image-avatar {
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto 8px;
}
.info-content {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.this {
  border: 1px solid red;
  /* color:gold; */
}
::v-deep .el-upload-dragger{
  width: 800px;
  height: 400px;
}
</style>
