import request from "@/utils/request";


// // 獲取人才列表()
export function getTalentList() {
  let token = window.localStorage.getItem("token");
  return request({
    url: `/talent/list`,
    method: "get",
      headers: {
        Authorization: "Bearer " + token,
      },
  });
}

// 關鍵字獲獲取人才列表
export function getTalentKeywordList(searchForm) {
  let token = window.localStorage.getItem("token");
  return request({
    url: `/talent/list/`,
    method: "get",
    params: {
      keyword: searchForm.keyword,
      serviceIds: searchForm.serviceIds,
      serviceStartTime: searchForm.serviceStartTime,
      serviceEndTime: searchForm.serviceEndTime,
    },
      headers: {
        Authorization: "Bearer " + token,
      },
  });
}

// 關鍵字獲獲取人才列表-分頁
export function getTalentKeywordListByPage(searchForm,page) {
  let token = window.localStorage.getItem("token");
  return request({
    url: "/talent/list/page",
    method: "get",
    params: {
      keyword: searchForm.keyword,
      type:searchForm.type,
      mediationDate: searchForm.mediationDate,
      isMediationSelf:searchForm.isMediationSelf,
      page: page.currentPage-1,
      size: page.pageSize,
    },
      headers: {
        Authorization: "Bearer " + token,
      },
  });
}

// 獲取特定人才
export function getTalentInfoById(id) {
  let token = window.localStorage.getItem("token");
  return request({
    url: `/talent/info/${id}`,
    method: "get",
      headers: {
        Authorization: "Bearer " + token,
      },
  });
}


// 新增人才
export function addTalent(dataForm) {
  let token = window.localStorage.getItem("token");
  return request({
    url: `/talent/add`,
    method: "post",
    data: dataForm, 
      headers: {
        Authorization: "Bearer " + token,
      },
  });
}


// 移除人才
export function removeTalent(id) {
  let token = window.localStorage.getItem("token");
  return request({
    url: `/talent/remove/${id}`,
    method: "post",
      headers: {
        Authorization: "Bearer " + token,
      },
  });
}


// 修改人才
export function updateTalent(dataForm) {
  let token = window.localStorage.getItem("token");
  return request({
    url: `/talent/update`,
    method: "post",
    data: dataForm,
      headers: {
        Authorization: "Bearer " + token,
      },
  });
}
