<template>
  <div id="q-app" >
    <router-view />
  </div>
</template>

<script>
import { login } from "@/api/user";
export default {
  name: "Door",

  components: {},
  created() {
    // 初始化用戶訊息
    // this.$store.commit("initUser");
  },
  methods:{
    
  },
  data() {
    return {};
  },
};
</script>

<style>

html {
  scroll-behavior: smooth;
}
</style>
