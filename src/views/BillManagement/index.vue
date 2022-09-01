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
      <q-tab name="ViewIndex" label="總覽" />
      <q-tab name="ShowList" label="查看金額資訊" />
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
export default {
  data() {
    return {
      tab:this.$route.name
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
};
</script>

<style></style>
