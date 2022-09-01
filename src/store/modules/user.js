// user 資料
// createdAt: "2021/10/19 02:12:19"
// email: null
// loginId: "test001"
// memId: "MEM00000000000000101"
// memType: "1"
// name: "test001"
// phone: null
// photo: null
// registrationDate: "2021/10/19 02:12:19"
// status: true
// updatedAt: "2021/10/19 02:12:19"


export default {
    state: {
      user: {},
      token:false,
    },
    getters: {
      getUser(state) {
        return state.user;
      },
      getUserPhoto(state){
        return state.user.photo
      },
      
    },
    mutations: {
      // 初始化用戶訊息
      initUser (state) {
        let user = window.localStorage.getItem('user')
        let token =  window.localStorage.getItem('token')
        if (user && token !="") {
          state.user = JSON.parse(user)
          state.token = token
        }
      
      },
      // 保存Token狀態
      setToken(state,token){
        state.token = token
        window.localStorage.setItem('token', token)
      },
      // 保存user 
      setUserData(state,user){
        state.user = user
        window.localStorage.setItem('user', JSON.stringify(state.user))
      },

      // 登入
      login (state, user) {
        // 保存登入狀態state.user
        state.user = user
        state.token = user.token
        // 存儲到本地存儲 localStorage => close窗口或標籤頁後會刪除此些數據
        window.localStorage.setItem('user', JSON.stringify(user))
        window.localStorage.setItem('token', user.token)
  
      },
      // 登出
      logout (state) {
        // 清除狀態
        state.user = {}
        state.token = false
        // 清除本地存儲
        window.localStorage.clear()
      },
  
    },
    actions: {},
  }