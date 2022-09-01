<template>
  <div class="">
    <q-btn
      v-if="$route.name == 'TourDetail' || $route.name == 'TourReview'"
      icon="chevron_left"
      label="返回查詢頁"
      @click="goBack"
    ></q-btn>
    <q-tabs
      v-else-if="
        (userData.memType == '2' && $route.name != 'TourDetail') ||
          (userData.memType == '2' && $route.name != 'TourReview')
      "
      v-model="tab"
      dense
      align="left"
      active-color="primary"
      class="text-grey shadow-2"
      :breakpoint="0"
      @input="changeTab"
    >
      <q-tab name="NewTour" label="新增遊程" />
      <q-tab name="TourStatus" label="遊程審核狀況" />
      <q-tab name="TourDraft" label="草稿" />
    </q-tabs>
    <q-tabs
      v-else-if="userData.memType == '10'||userData.memType == '6'"
      v-model="tab"
      dense
      align="left"
      active-color="primary"
      class="text-grey shadow-2"
      :breakpoint="0"
      @input="changeTab"
    >
      <q-tab name="PendingReview" label="待審核遊程" />
    </q-tabs>

    <q-separator
      v-if="$route.name != 'TourDetail' || $route.name != 'TourReview'"
    />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel :name="tab">
        <router-view></router-view>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import Mixin from "@/utils/mixin";
export default {
  mixins: [Mixin],
  data() {
    return {
      tab: this.$route.name,
      userData: {},
    };
  },

  methods: {
    changeTab(e) {
      this.$router.push({
        name: e,
      });
    },
  },
  watch: {
    $route:{
      handler(to, from) {
       this.tab=to.name
      },
      immediate: true,
    }
  },
  created() {
    this.tab = this.$route.name;
    this.userData = JSON.parse(window.localStorage.getItem("user"));
  },
};
</script>

<style></style>
