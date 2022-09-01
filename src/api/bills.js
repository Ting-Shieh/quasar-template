import request from "@/utils/request";

// 獲取該用戶報名遊程紀錄
export function getRegistraionRecords (searchForm) {
  let token = window.localStorage.getItem("token");
  return request({
    url: `/registration/list`,
    method:'get',
    params: {
      keyword: searchForm.keyword,
      firmId: searchForm.firmId,
      startTime: searchForm.startTime,
      endTime: searchForm.endTime,

    },
    headers: {
      Authorization: "Bearer " + token,
    },
  })
}

// 獲取廠商
export function getAllFirms() {
  let token = window.localStorage.getItem("token");
  return request({
    url: "/firm/all",
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

//  獲取全部收入 (圓餅圖部分)
export function getRegistraionStatistics(searchForm) {
  let token = window.localStorage.getItem("token");
  return request({
    url: "/registration/statistics/overview",
    method: "get",
    params: {
      keyword: searchForm.keyword,
      firmId: searchForm.firmId,
      startTime: searchForm.startTime,
      endTime: searchForm.endTime,
    },
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}
