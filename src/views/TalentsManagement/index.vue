<template>
  <div class="" style="">
    <q-btn
      v-if="$route.query.id"
      icon="chevron_left"
      label="返回查詢頁"
      @click="goBack"
    ></q-btn>
    <q-tabs
      v-else
      v-model="tab"
      dense
      align="left"
      active-color="primary"
      class="text-grey shadow-2"
      :breakpoint="0"
      @input="changeTab"
    >
      <q-tab name="TalentList" label="找尋人才" />
      <q-tab name="CreateTalent" label="建立人才" />
    </q-tabs>

    <q-separator />

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
    };
  },
  watch: {
    $route: {
      handler(to, from) {
        this.tab = to.name;
      },
      immediate: true,
    },
  },
  methods: {
    changeTab(e) {
      this.$router.push({
        name: e,
      });
    },
  },
};
</script>

<style></style>
