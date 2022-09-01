<template>
  <div class="">
    
    <q-tabs
      v-model="tab"
      dense
      align="left"
      active-color="primary"
      class="text-grey shadow-2"
      :breakpoint="0"
      @input="changeTab"
    >

      <q-tab name="SettingAccount" label="個人設定" />
      <!-- <q-tab  name="NewAdmin" label="新建育成中心帳號" /> -->
    </q-tabs>

    <q-separator v-if="$route.name != 'PageDetail'" />

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
    $route:{
      handler(to, from) {
  
      },
      immediate: true,
    }
  },
  methods: {
    
    changeTab(e) {
      this.$router.push({
        name: e,
      });
    },
    
  },
  created(){
    this.tab = this.$route.name;
  }
};
</script>

<style></style>
