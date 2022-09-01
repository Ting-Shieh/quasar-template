<script>
import { mapState, mapGetters } from "vuex";
import { logout } from "@/api/user";
import Mixin from "@/utils/mixin";
export default {
  mixins: [Mixin],
  name: "MainLayout",

  data() {
    return {
      leftDrawerOpen: false,
      userData: {},
    };
  },
  filters: {},
  computed: {
    userPhoto() {
      return this.$store.getters.getUserPhoto;
    },
  },
  methods: {
    clickLogout() {
      // 刪除用戶所有資料
      this.$store.commit("logout");
      this.goTo("Login");
    },
    // async clickLogout(){
    //   await logout().then(res=>{
    //     console.log("logout err", err)
    //     if(res.status===200){
    //       // 刪除用戶所有資料
    //         this.$store.commit("logout");
    //         this.goTo("Login");
    //     }

    //   }).catch(err=>{
    //     console.log("logout err", err)
    //   })
    // }
  },
  created() {
    this.userData = JSON.parse(window.localStorage.getItem("user"));
  },
};
</script>
<style scoped>
.active-item{
  background-color: #83b3d3;
}
</style>
<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />
        <!-- 顯示點選路徑名 -->
        <q-toolbar-title class="">{{ $route.meta.title }}</q-toolbar-title>
        <q-space />
        <!-- Header 右上角功能 -->

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn
            round
            dense
            flat
            color="white"
            icon="logout"
            @click="clickLogout"
            >登出</q-btn
          >

          <q-btn round flat>
            <q-avatar size="36px">
             
              <img
                src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
              />
            </q-avatar>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-primary text-white"
      :width="250"
    >
      <q-list>
        <q-item
          to="/"
          style="color:white;"
          :style="$route.name==='SettingAccount'?'background-color: #83b3d3;':''"

        >
          <q-item-section avatar
            ><q-icon name="manage_accounts"
          /></q-item-section>
          <q-item-section><q-item-label>個人設定</q-item-label></q-item-section>
        </q-item>
        <q-item
          to="/trans-work"
          style="color:white;"
          :style="$route.name==='TransResult'||$route.name==='TransWork'?'background-color: #83b3d3;':''"

        >
          <q-item-section avatar
            ><q-icon name="manage_accounts"
          /></q-item-section>
          <q-item-section><q-item-label>傳輸作業</q-item-label></q-item-section>
        </q-item>
        <q-item
          :to="'/setting'"
          style="color:white;"
          :style="$route.name==='SystemParams'?'background-color: #83b3d3;':''"
        >
          <q-item-section avatar
            ><q-icon name="manage_accounts"
          /></q-item-section>
          <q-item-section><q-item-label>系統設定{{$route.name}}</q-item-label></q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container class="">
      <router-view />
    </q-page-container>
  </q-layout>
</template>
