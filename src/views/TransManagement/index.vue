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

      

      <q-tab name="TransWork" label="傳送作業" />
      <q-tab  name="TransResult" label="查詢傳送結果" />

    </q-tabs>



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
