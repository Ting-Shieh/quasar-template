import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/layouts/MainLayout.vue"),
    children: [
      {
        path: "/",
        name: "AccountIndex",
        component: () => import("@/views/AccountManagement"),
        children: [
          {
            path: "/",
            name: "SettingAccount", 
            component: () => import("@/views/AccountManagement/SettingAccount"),
            meta: { title: "個人設定" },
          },
          
        ],
        
      },
      {
        path: "/",
        name: "TransIndex",
        component: () => import("@/views/TransManagement"),
        children: [
          
          {
            path: "trans-result",
            name: "TransResult",
            component: () => import("@/views/TransManagement/TransResult.vue"),
            meta: { title: "傳輸作業/查詢傳送結果" },
          },
         
          {
            path: "trans-work",
            name: "TransWork",
            component: () => import("@/views/TransManagement/TransWork.vue"),
            meta: { title: "傳輸作業/傳送作業" },
          },
          
        ],
        
      },
      {
        path: "/setting",
        name: "SystemParams",
        component: () => import("@/views/SystemSetting/paramsSetting"),
        meta: { title: "系統設定" },
      },
      
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Auth/Login"),
  },
  {
    path: "/signup",
    name: "SignUp",
    component: () => import("@/views/Auth/SignUp"),
  },
  {
    path: "/forgetpasswrd",
    name: "ForgetPwd",
    component: () => import("@/views/Auth/ForgetPwd"),
  },
  
];

const router = new VueRouter({
  mode: "history",
  scrollBehavior: () => ({ x: 0, y: 0 }),
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.BASE_URL,
  routes,
});


// router.beforeEach((to, from, next) => {
//   // 獲取 token
//   let token = window.localStorage.getItem("token");
//   let user = window.localStorage.getItem("user");

//   if (token) {
//     // 防止重複登入
//     if (to.path === "/login") {
//       return next({ name: from.name ? from.name : "Home" });
//     }
//     next();
//   } else {
//     // 跳過登入頁驗證
//     if (
//       to.path === "/login" ||
//       to.path === "/signup" ||
//       to.path === "/forgetpasswrd"
//     ) {
//       return next();
//     }
//     next({ path: "/login" });
//   }
// });

export default router;
