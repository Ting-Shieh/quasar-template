import request from "@/utils/request";


// 修改遊程
export function updateTour(dataForm) {
  let token = window.localStorage.getItem("token");
  return request({
    url: `/tour/update`,
    method: "post",
    data: dataForm,
    headers: {
      Authorization: "Bearer " + token,
    },

  });
}

// 移除遊程
export function removeTour(id,loading) {
  let token = window.localStorage.getItem("token");
  return request({
    url: `/tour/remove/${id}`,
    method: "post",
    isLoading:loading,
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

// 管理員移除遊程
export function removeTourByAdmin(tourId,loading) {
  let token = window.localStorage.getItem("token");
  return request({
    url: `/tour/remove/admin/${tourId}`,
    method: "post",
    isLoading:loading,
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

// 發佈遊程
export function publishTour(dataForm,loading) {
  let token = window.localStorage.getItem("token");
  return request({
    url: `/tour/publish`,
    data: dataForm,
    method: "post",
    isLoading:loading,
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}


// 獲取特定遊程
export function getTourById(tourId) {
  let token = window.localStorage.getItem("token");
  return request({
    url: `/tour/info/${tourId}`,
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

// 獲取當前用戶全部範本
export function getFirmModelTourList() {
  let token = window.localStorage.getItem("token");
  return request({
    url: `/tour/model/list`,
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

// 審核遊程
export function auditTour(dataForm) {
  let token = window.localStorage.getItem("token");
  return request({
    url: `/tour/audit`,
    method: "post",
    data: dataForm,
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

// 新增遊程 => 草稿 ok
export function addTourAsDraft(dataForm,loading) {
  let token = window.localStorage.getItem("token");
  return request({
    url: `/tour/add`,
    method: "post",
    data: dataForm,
    headers: {
      Authorization: "Bearer " + token,
    },
    isLoading:loading
  });
}

// 獲取該廠商全部遊程
export function getFirmTourList(states ) {
  let token = window.localStorage.getItem("token");
  return request({
    url: `/tour/list`,
    method: "get",
    params: { states  },
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}
// 獲取該廠商全部遊程By Page
export function getFirmTourListByPage(states,page,size ) {
  let token = window.localStorage.getItem("token");
  return request({
    url: `/tour/list/page?page=${page}&size=${size}&${states.map((n, index) => `states=${n}`).join('&')}`,
    // url: `/tour/list/page?${states.map((n, index) => `states[${index}]=${n}`).join('&')}`,
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

// 獲取全部遊程
export function getTourList(states) {
  let token = window.localStorage.getItem("token");
  return request({
    // url: `/tour/list/all?${states.map((n, index) => `states=${n}`).join('&')}`,
    url: `/tour/list/all?states=1`,
    method: "get",
    // params: { states },
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

// 獲取全部遊程By Page
export function getTourListByPage(states,page ) {
  let token = window.localStorage.getItem("token");
  return request({
    url: `/tour/list/all/page`,
    method: "get",
    params: { states,page  },
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}
