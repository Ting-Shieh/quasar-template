<template>
  <div class="row" style="">
    <!-- pagiantion -->
    <q-pagination
      v-model="page"
      :max="maxPage"
      :max-pages="maxPages"
      :ellipses="false"
      direction-links
      boundary-links
      :boundary-numbers="false"
      @input="handleChange"
    />
  </div>
</template>
<script>
export default {
  model: {
    prop: "pageValue",
    event: "modelPaginationVal",
  },

  props: {
    rowsPerPage: {
      type: Number,
      default: 20,
    },
    pageValue: {
      type: Number,
      default: 1,
    },
    totalNum: {
      type: Number,
    },
    maxPages: {
      type: Number,
      default: 5,
    },
  },

  components: {},
  data() {
    return {
      page: this.pageValue,
    };
  },
  created() {},
  // 計算屬性
  computed: {
    maxPage() {
      return Math.ceil(this.totalNum / this.rowsPerPage);
    },
  },
  // 偵聽器
  watch: {
    pageValue(val) {
      this.page = val;
    },
  },
  // 組件方法
  methods: {
    handleChange(val) {
      this.$emit("modelPaginationVal", val);
      this.$emit("input", val);
    },
  },
};
</script>
<style lang="scss" scoped></style>
