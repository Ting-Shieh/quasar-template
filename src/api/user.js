import request from "@/utils/request";

// 登入
export function login(loginForm) {
  return request(
    {
      url: `/authorize`,
      method: "post",
      data:loginForm
    }
  );
}

// 註冊
export function signup(signupForm) {
  return request({
    url: "/user-info/registered",
    method: "post",
    data: signupForm,
  });
}

// 獲取用戶訊息
export function getUserInfo() {
  let token = window.localStorage.getItem("token");

  return request({
    url: `/user-info/current`,
    method: "get",
    headers: {
      'Authorization': 'Bearer '+token
    },
  },);
}

// 修改用戶資訊
export function updateUserInfo(dataForm) {
  let token = window.localStorage.getItem("token");

  return request({
    url: "/user-info/update",
    method: "post",
    data: dataForm,
    headers: {
      'Authorization': 'Bearer '+token
    },
    
  });
}

// 修改密碼 
export function updatePassword(dataForm) {
  let token = window.localStorage.getItem("token");

  return request({
    url: "/user-info/password/update",
    method: "post",
    data: dataForm,
    headers: {
      'Authorization': 'Bearer '+token
    },
  });
}



// 獲取用戶審核訊息
export function getUserReviewState() {
  let token = window.localStorage.getItem("token");

  return request({
    url: `/user-info/all`,
    method: "get",
    headers: {
      'Authorization': 'Bearer '+token
    },
  },);
}

// 啟用
export function updateUserEnable(id) {
  let token = window.localStorage.getItem("token");

  return request({
    url: `/user-info/enable/${id}`,
    method: "post",
    headers: {
      'Authorization': 'Bearer '+token
    },
  });
}


// 禁用
export function updateUserDisable(id) {
  let token = window.localStorage.getItem("token");

  return request({
    url: `/user-info/disable/${id}`,
    method: "post",
    headers: {
      'Authorization': 'Bearer '+token
    },
  });
}
// 刪除用戶
export function deleteUser(id) {
  let token = window.localStorage.getItem("token");

  return request({
    url: `/user-info/remove/${id}`,
    method: "post",
    headers: {
      'Authorization': 'Bearer '+token
    },
  });
}

// admin 註冊
export function adminRegister(dataForm) {
  let token = window.localStorage.getItem("token");

  return request({
    url: "/user-info/admin/register",
    method: "post",
    data: dataForm,
    headers: {
      'Authorization': 'Bearer '+token
    },
    
  });
}


// 修改密碼 old
// export function updatePassword(dataForm) {
//   return request({
//     url: "/user-info/password/update",
//     method: "post",
//     params: dataForm,
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     transformRequest: [
//         (params) => {
//           let result = ''
//           for (let key in params) {
//             result += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&'
//           }
//           return result.slice(0, result.length - 1)
//         }
//       ],

//     // params: JSON.stringify(dataForm),
//   },{token:true});
// }

//登出
export function logout(token) {
  return request({
    url: `/user/logout`,
    method: "post",
    data: {
      token,
    },
  });
}

