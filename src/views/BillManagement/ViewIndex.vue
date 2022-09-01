<template>
  <div class="q-pa-md" style="">
    <div class="row " style="">
      <!-- input -->
      <div class="col-12 col-md-3 q-mb-sm q-mr-sm">
        <q-input outlined v-model="searchForm.keyword" dense label="關鍵字" />
      </div>

      <!-- 下拉 -->
      <div v-if="userType === '10'||userType === '6'" class="col-12 col-md-3  q-mr-sm">
        <q-select
          outlined
          behavior="menu"
          v-model="searchForm.firmId"
          stack-label
          :options="firmsSelectOptions"
          dense
          emit-value
          map-options
          :option-label="(item) => (item === '' ? '請選擇' : item.label)"
          hide-bottom-space
        >
        </q-select>
      </div>
    </div>
    <div class="row  col-12" style="border-bottom:2px solid rgba(0,0,0,0.24);" :class="$q.screen.lt.sm ? 'q-mt-sm' : ''">
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
                    <q-btn v-close-popup label="關閉" color="primary" flat />
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
                    <q-btn v-close-popup label="關閉" color="primary" flat />
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
            $q.screen.lt.sm ? 'height:40px;width:40%;' : 'height:40px;width:40%'
          "
          label="搜尋"
          @click="clickSearch"
        />
      </div>
    </div>
    <!-- 內容 -->
    <div v-if="totalAmount>0" class="row  q-col-gutter-x-sm q-col-gutter-y-sm " style="">
      <div
        class="col-12 q-pa-md"
        style="border-bottom:1px solid rgba(0,0,0,.24)"
      >
        <span style="font-size:30px;">全部收入分布</span>
      </div>
      <div  :class="$q.screen.lt.sm ? 'col-12 q-mb-sm' : 'col-6'">
        <div
          id="fguChart"
          ref="myChart"
          style="width: 100%;height:400px;"
        ></div>
      </div>

      <div
        :class="$q.screen.lt.sm ? 'col-12 q-mb-sm' : 'col-6 relative-position '"
      >
        <q-card
          class="bg-secondary text-white q-pa-md"
          :class="$q.screen.lt.sm ? '' : 'absolute-center'"
          :style="$q.screen.lt.sm ? 'width:100%;' : 'width:60%;'"
        >
          <q-card-section>
            <div class="text-h6 q-mb-md">總收入</div>
            <div class="text-h5">{{ totalAmount }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div v-else class="row  q-pt-sm" style="">
      <div
        :class="$q.screen.lt.sm ? 'col-12 q-mb-sm' : 'col-4 '"
      >
        <q-card
          class="bg-secondary text-white q-pa-md"
 
        >
          <q-card-section>
            <q-skeleton v-if="showSkeleton" type="rect" />
            <div class="text-h6 q-mb-md">目前查無一筆收入資訊。</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

  </div>
</template>
<script>
import * as echarts from "echarts";
import { getAllFirms, getRegistraionStatistics } from "@/api/bills";
export default {
 
  data() {
    return {
      //echarts实例
      fguChart: "",
      showSkeleton:false,
      userType: "",
      firmsSelectOptions: [],
      totalAmount: 0,
      searchForm: {
        keyword: "",
        firmId: "",
        startTime: "",
        endTime: "",
      },
      option: {
        legend: {
          data: [],
          icon: "rect",
          right: 10,
          bottom: 10,
        },

        series: [
          {
            type: "pie",

            label: {
              show: true,
            },
            data: [],
          },
        ],
      },
      // option: {},
      // legend_data: [],
      // series_data: [],
    };
  },

  // 計算屬性
  computed: {},

  // 組件方法
  methods: {
    async getPieData() {
      this.option.legend.data=[]
      this.option.series[0].data=[]
      this.showSkeleton=true
      getRegistraionStatistics(this.searchForm)
        .then((res) => {
          if (res.status === 200) {
            console.log("get pie data>>>", res.data);
            this.totalAmount = parseInt(res.data.total);

            res.data.tours.map((item) => {
              this.option.legend.data.push(
                item.name === null || item.name === "" ? item.id : item.name
              );
            });
            res.data.tours.map((item) => {
              this.option.series[0].data.push({
                name:
                  item.name === null || item.name === ""
                    ? item.id
                    : item.name,
                value: parseInt(item.total),
              });
            });
            
            this.showSkeleton=false
    
          }
        })
        .catch((err) => {});
    },
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

      this.getPieData();
    },
    drawPie() {

      let newPromise = new Promise(resolve=>{
        resolve()
      })
      newPromise.then(()=>{
        this.fguChart = echarts.init(this.$refs.myChart);
        this.fguChart.setOption(this.option);
      })
      
    },
  },
  watch: {
    option: {
      handler(newVal, oldVal) {
        if (this.fguChart) {
          if (newVal) {
            this.fguChart.setOption(newVal);
            this.drawPie();
          } else {
            this.fguChart.setOption(oldVal);
            this.drawPie();
          }
        } else {
          this.drawPie();
        }
      },
      deep: true, //对象内部属性的监听，关键。
    },
  },
  mounted() {
    // if(this.totalAmount>0){
    //   this.drawPie();
    // }
    this.drawPie();
  },
  created() {
    this.getFirmsData();
    this.userType = JSON.parse(window.localStorage.getItem("user")).memType;
    this.clickSearch()
  },
};
</script>
<style lang="scss" scoped></style>
