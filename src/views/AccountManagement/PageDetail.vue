<template>
  <div class="q-pa-md" style="">
    <div class="row  q-col-gutter-x-sm q-col-gutter-y-sm  q-mb-sm">
      <div class="col-12 q-mb-sm">
        <span class="text-center" style="font-size:16px;font-weight:bold;"
          >與此遊程合作的專才共{{ data.talents.length }}位</span
        >
      </div>
      <!-- 人才卡片 -->
      <q-item
        class="rounded-borders col-12 col-sm-4 col-md-4 "
        :class="$q.screen.lt.sm ? 'q-mb-xs' : 'q-ml-xs'"
        style="border:1px solid rgba(0, 0, 0, 0.12);padding-right:8px;"
        v-for="(talent, index) in data.talents"
        :key="index"
      >
        <q-item-section avatar top>
          <q-avatar size="100px" class="image-avatar">
            <img :src="talent.photo" />
          </q-avatar>
        </q-item-section>

        <q-item-section top>
          <q-item-label
            lines="1"
            style="display:flex;flex-direction:column;justify-content:space-between;"
          >
            <span class="" style="margin:auto 4px;">{{ talent.name }}</span>
            <span class="" style="margin:auto 4px;"
              >專長:
              <q-chip
                v-for="(service, index) in talent.services"
                :key="index"
                size="md"
                square
                color="orange"
                text-color="white"
                icon="bookmark"
              >
                {{ service.serviceName }}
              </q-chip></span
            >
            <span class="" style="margin:auto 4px;"
              >價格: {{ talent.price }} 元/小時</span
            >
          </q-item-label>
          <q-item-label caption lines="4" class="">
            <q-chip
              v-for="(t, t_index) in talent.guide_time"
              :key="t_index"
              outline
              size="xs"
              square
              color="deep-orange"
              text-color="white"
            >
              {{ t }}
            </q-chip>
          </q-item-label>
        </q-item-section>
      </q-item>
    </div>

    <div class="col-12 q-mb-sm">
      <span class="text-center" style="font-size:16px;font-weight:bold;">{{
        data.tourName
      }}</span>
    </div>
    <q-card class="col-12 q-mb-sm" style="padding:0px;" flat bordered>
      <q-card-section
        :horizontal="$q.screen.lt.sm ? false : true"
        style="height:100%;padding:0px;"
      >
        <q-img
          class="rounded-borders "
          style=""
          :style="$q.screen.lt.sm ? 'max-width:100%' : 'flex:1;'"
          :src="data.photo"
        />

        <q-card-section
          class=""
          style="flex:1;"
          :style="$q.screen.lt.sm ? 'padding-bottom:0px' : ''"
        >
          <div
            :class="$q.screen.lt.sm ? 'q-mb-xs' : 'q-mb-sm'"
            style="display:flex;"
          >
            <q-icon
              name="date_range"
              class="text-info"
              style="font-size:30px;margin-right:4px;margin-bottom:4px;"
            />
            <span class="" style="margin:auto 4px;font-size:16px;">{{
              data.tourDate
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
                >{{ data.touristCount }} 人參加</span
              >
              <span class="" style="margin:auto 4px;font-size:16px;"
                >最低成行人數: {{ data.minTouristCount }}人</span
              >
            </div>
          </div>
          <div
            :class="$q.screen.lt.sm ? 'q-mb-xs' : 'q-mb-sm'"
            style="display:flex;"
          >
            <q-icon
              name="location_on"
              class="text-info"
              style="font-size:30px;margin-right:4px;margin-bottom:4px;"
            />
            <span class="" style="margin:auto 4px;font-size:16px;">{{
              data.tourAddress
            }}</span>
          </div>
        </q-card-section>
        <q-card-section
          class=""
          style="flex:1;"
          :style="$q.screen.lt.sm ? 'padding-top:0px' : ''"
        >
          <div class="q-mb-sm" style="font-size:16px;">
            聯絡人:
            <span
              class=""
              style="font-size:16px;"
              :style="$q.screen.lt.sm ? 'float:right;' : ''"
              >{{ data.contactName }}</span
            >
          </div>
          <div class="q-mb-sm" style="font-size:16px;">
            聯絡人電話:
            <span
              class=""
              style="font-size:16px;"
              :style="$q.screen.lt.sm ? 'float:right;' : ''"
              >{{ data.contactPhone }}</span
            >
          </div>
          <div class="q-mb-sm" style="font-size:16px;">
            聯絡人電子郵件:
            <span
              class=""
              style="font-size:16px;"
              :style="$q.screen.lt.sm ? 'float:right;' : ''"
              >{{ data.contactEmail }}</span
            >
          </div>
          <div class="q-mb-sm" style="font-size:16px;">
            活動時程:
            <span
              class=""
              style="font-size:16px;"
              :style="$q.screen.lt.sm ? 'float:right;' : ''"
              >{{ data.duration }}小時</span
            >
          </div>
          <div class="q-mb-sm" style="font-size:16px;">
            活動費用:
            <span
              style="font-size:24px;"
              :style="$q.screen.lt.sm ? 'float:right;' : ''"
              >{{ data.price }}元</span
            >
          </div>
        </q-card-section>
      </q-card-section>

      <!-- <q-separator /> -->
    </q-card>

    <div class="row  q-col-gutter-x-sm q-col-gutter-y-sm  q-mb-sm">
      <div class="col-12 q-mb-sm">
        <span class="text-center" style="font-size:16px;font-weight:bold;"
          >活動游程介紹</span
        >
      </div>
      <div class="col-12" style="overflow:hidden;">
        <p class="" v-html="data.description"></p>
      </div>
      <div class="col-12 q-mb-sm">
        <span class="text-center" style="font-size:16px;font-weight:bold;"
          >注意事項</span
        >
      </div>
      <div class="col-12">
        <p class="">{{ data.safetyRules }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getMatchedTourById, // 獲取特定媒合遊程
} from "@/api/match";
export default {
  beforeRouteEnter(to, from, next) {
    if (to.query.id !== "0") {
      next();
    } else {
      next({ name: "MatchList" });
    }
  },
  data() {
    return {
     
      data: {},
    };
  },

  methods: {
    async initData() {
      let tourId = this.$route.query.id;
      await getMatchedTourById(tourId)
        .then((res) => {
          if (res.status === 200) {
            this.data = res.data;
          }
        })
        .catch((err) => {});
    },
  },
  created() {
    this.initData();
  },
};
</script>
<style lang="scss" scoped></style>
