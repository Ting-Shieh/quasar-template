<template>
  <div class="" style="">
    <q-table
      :flat="false"
      :bordered="false"
      :square="true"
      :data="tableData"
      :loading="tableLoading"
      :columns="tableColumn"
      :row-key="rowKey"
      :separator="separator"
      :title="tabTitle"
      :pagination.sync="pagination"

      :hide-pagination="!showPagination"
    >
      
      
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
      <!-- table 表頭 -->
      <q-tr slot="header" slot-scope="props">
        <q-th v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.label }}
        </q-th>
        <q-th auto-width v-show="operaShow">
          操作
        </q-th>
      </q-tr>
      <!-- body -->
      <template v-slot:body="props" >
        <q-tr :props="props" :key="props.row.index" :no-hover="!operaShow">

          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>
          <q-td v-show="operaShow" >
            
            <slot name="body-opera" :rowData="props.row" :rowIndex="props.rowIndex"></slot>
          </q-td>
        </q-tr>
        
      </template>
  
      <template v-for="slotName in Object.keys($slots)" v-slot:[slotName]>
        <slot :name="slotName" />
      </template>
      <template
        v-for="slotName in Object.keys($scopedSlots)"
        v-slot:[slotName]="prop"
      >
        <slot :name="slotName" v-bind="prop" />
      </template>
    </q-table>
  

    <!-- dialog -->
    <q-dialog v-model="showCheckDialog">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-toolbar>
          <q-toolbar-title
            ><span class="text-weight-bold">{{ dialogMethod }}</span>
            {{ tabTitle }}</q-toolbar-title
          >

          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>
        <slot name="dialog-content"> </slot>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
export default {
  name: "TableDialog",
  props: {

    tableData: {
    
      type: Array,
      required: true,
    },
    tableColumn: {
      
      type: Array,
      required: true,
    },
    showMultiSelect: {
      
      type: Boolean,
      required: false,
    },
    showPagination:{
      
      type: Boolean,
      required: false,
      default:true,
    },
    pagination:{
      type: Object,
      required: false,
    },
    rowKey: {
      type: String,
      required: true,
    },
    tabTitle: {
      
      type: String,
      required: false,
      default: "",
    },
    operaShow: {
      
      type: Boolean,
      default: false,
    },
    operaShowList: {
      
      type: Boolean,
      default: true,
    },
    separator: {
      
      type: String,
      default: "horizontal",
    },
    tableLoading: {
      type: Boolean,
      default: false,
    },
   
  },
  // 局部注冊的組件
  components: {},
  data() {
    return {
      selected: [],
      dialogMethod: "",
      showCheckDialog: false, // 是否顯示彈窗
    };
  },
  created() {},
  methods: {
    openDialog(type) {
      if (type === "add") {
        this.dialogMethod = "新增";

        this.showCheckDialog = true;
      } else if (type === "edit") {
        this.dialogMethod = "修改";
        this.showCheckDialog = true;
      }else if(type){
        this.dialogMethod = type;
        this.showCheckDialog = true;
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
