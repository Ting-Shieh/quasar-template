<template>
  <div :class="$q.screen.lt.sm ? 'q-pa-xs' : 'q-pa-md'" style="">
   
    <div class="row search-box" v-for="(item, index) in tourData" :key="index">
      <q-card
        class=" q-mb-sm"
        :class="$q.screen.lt.sm ? 'col-12' : 'col-9'"
        style="padding:0px;"
        flat
        bordered
      >
        <q-card-section
          :horizontal="$q.screen.lt.sm ? false : true"
          class=""
          style="height:100%;padding:0px;"
        >
          <q-img
            class="rounded-borders "
            style=""
            :style="$q.screen.lt.sm ? 'max-width:100%' : 'max-width:40%;max-height:235px;'"
            :src="item.photo"
          >
            <div
              v-if="$q.screen.lt.sm"
              class="text-subtitle2 absolute-bottom text-center"
            >
              審核狀況
              <q-btn
                v-if="item.state === '3'"
                rounded 
                color="primary"
                text-color="white"
                icon-right="touch_app"
                @click="goTo('TourDetail', item.id)"
                >通過</q-btn
              >
              <q-btn
                v-if="item.state === '1'"
                rounded 
                color="info"
                text-color="white"
                icon-right="touch_app"
                @click="goTo('TourDetail', item.id)"
                >審核中</q-btn
              >
              <q-btn
                v-if="item.state === '2'"
                rounded
                color="negative"
                text-color="white"
                icon-right="touch_app"
                @click="goTo('TourDetail', item.id)"
                >退回</q-btn
              >
              <q-btn
                v-if="item.state === '0'"
                rounded
                color="orange"
                text-color="white"
                icon-right="touch_app"
                @click="goTo('TourDetail', item.id)"
                >草稿</q-btn
              >

            </div>
          </q-img>

          <q-card-section
            class=""
            style="flex:1;"
            :style="$q.screen.lt.sm ? 'padding-bottom:0px' : ''"
          >
            <div class="">
              <span class="text-h6">{{ item.tourName }}</span>
            </div>
            <div class="">
              <q-chip
                v-for="t in item.services"
                :key="t.id"
                outline
                size="sm"
                square
                color="deep-orange"
                text-color="white"
              >
                {{ t.serviceName }}
              </q-chip>
            </div>
            <div class="q-mt-sm">
              <div :class="$q.screen.lt.sm ? 'q-mb-xs' : 'q-mb-sm'">
                <q-icon
                  name="date_range"
                  class="text-info"
                  style="font-size:30px;margin-right:4px;margin-bottom:4px;"
                />
                <span class="" style="margin:auto 4px;font-size:16px;">{{
                  item.tourDate
                }}</span>
                <q-icon
                  name="location_on"
                  class="text-info"
                  style="font-size:30px;margin-right:4px;margin-bottom:4px;"
                />
                <span class="" style="margin:auto 4px;font-size:16px;">{{
                  item.tourAddress
                }}</span>
              </div>
              <div
                :class="$q.screen.lt.sm ? 'q-mb-xs' : 'q-mb-sm'"
                style="display:flex;"
              >
                <q-icon
                  name="person_outline"
                  class="text-info"
                  style="font-size:30px;margin-right:4px;margin-bottom:0px;"
                />
                <div class="" style="display:flex;flex-direction:column;">
                  <span class="" style="margin:auto 4px;font-size:16px;"
                    >{{ item.touristCount }} 人參加</span
                  >
                  <span class="" style="margin:auto 4px;font-size:16px;"
                    >最低成行人數: {{ item.minTouristCount }}人</span
                  >
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card-section>

        <!-- <q-separator /> -->
      </q-card>
      <div
        v-if="!$q.screen.lt.sm"
        class="col-3 "
        style="display:flex;justify-content:space-evenly;align-items:center;flex-direction:column;"
      >
        <div
          class=" "
          style="display:flex;justify-content:center;align-items:center;"
        >
          <span class="text-h6">審核狀態</span>

          <q-chip
            v-if="item.state == '3'"
            color="primary"
            text-color="white"
            size="md"
          >
            通過
          </q-chip>
          <q-chip
            v-else-if="item.state == '1'"
            color="info"
            text-color="white"
            size="md"
          >
            審核中
          </q-chip>
          <q-chip
            v-else-if="item.state == '2'"
            color="negative"
            text-color="white"
            size="lg"
          >
            退回
          </q-chip>
          <q-chip
            v-else-if="item.state == '0'"
            color="orange"
            text-color="white"
            size="md"
          >
            草稿
          </q-chip>
        </div>
        <q-btn
          outline
          color="info"
          label="遊程詳情"
          @click="goTo('TourDetail', item.id)"
          style="width:90%;"
        />
      </div>
    </div>
    <!-- 彈窗 -->

    <!-- Pagination -->
    <div class="row col-12 q-mt-xs">
      <div
        class="col-12 col-md-6"
        style="display:flex;min-height:40px;align-items:center;padding-right:20px;"
        :style="
          $q.screen.lt.sm
            ? 'justify-content:center;'
            : 'justify-content:flex-end;'
        "
      >
        <span
          class="font-s-size "
          style="margin-right:2px;font-size: 13.2px;width:60px;"
        >
          每頁筆數:
        </span>

        <q-select
          v-model="page.pageSize"
          behavior="menu"
          :outlined="false"
          dense
          emit-value
          map-options
          :options="rowOptions"
          option-label="label"
          option-value="value"
          size="xs"
          style="margin-right:4px;"
          @input="changePageSize"
        >
        </q-select>
      </div>
      <com-pagination
        class="col-12 col-md-6 "
        style="align-items:center;margin-right:0px;"
        :style="$q.screen.lt.sm ? 'justify-content:center;' : ''"
        v-model="page.currentPage"
        :rows-per-page="page.pageSize"
        :total-num="page.totalNum"
        @input="changeCurrentPage"
      ></com-pagination>
    </div>
  </div>
</template>
<script>
import ComPagination from "@/components/Common/form/ComPagination";
import { rowOptions } from "@/utils/common/dropdown-list.js";
import Mixin from "@/utils/mixin";
import {
  getFirmTourListByPage
} from "@/api/tour";
export default {
  mixins: [Mixin],
  // 局部注冊的組件
  components: { ComPagination },
  data() {
    return {
      rowOptions,
      page: {
        pageSize: 20,
        currentPage: 0,
        totalNum: 110,
      },
      tourData:[],
      
    };
  },

  // 組件方法
  methods: {
    async getToursList(page=0,size=20){
      let states=['0','1','2','3']
      await getFirmTourListByPage(states,page,size).then(res=>{
        if(res.status===200){
     
          this.tourData = res.data.content
          this.page.totalNum = res.data.totalElements
          this.page.currentPage = res.data.number+1
        }
      }).catch(err=>{
        console.log("getFirmTourListByPage api err",err)
      })
    },
    changePageSize(e) {
      
      this.page.pageSize=e
      this.getToursList(this.page.currentPage-1,this.page.pageSize);
    },
    // 改變每頁筆數
    changeCurrentPage(e) {
     
      
      this.page.currentPage = e-1;
      this.getToursList(this.page.currentPage,this.page.pageSize);
    },


  },
  created() {this.getToursList()},
};
</script>
<style lang="scss" scoped>
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
</style>
