import request from "@/utils/request";


// 獲取該用戶媒合訊息
// export function getMatchListByPage (page) {
//   return request({
//     url: `/mediation/list/page/current-user`,
//     // url: `/​mediation​/list​/page​/current-user`,
//     method:'get',
//     params: {
//       // keyword: searchForm.keyword,
//       // serviceIds: searchForm.serviceIds,
//       // serviceStartTime: searchForm.serviceStartTime,
//       // serviceEndTime: searchForm.serviceEndTime,
//       page:page.page,
//       size:page.size
//     },
//     headers: {
//       Authorization: "Bearer " + token,
//     },
//   })
// }


// 媒合過人才列表-分頁
export function getMatchedTalentsByPage(searchForm,page) {
  let token = window.localStorage.getItem("token");
  return request({
    url: "/talent/list/page",
    method: "get",
    params: {
      keyword: searchForm.keyword,
      mediated:true,
      mediationDate: searchForm.mediationDate,
      isMediationSelf:searchForm.isSelfRegister,
      page: page.page,
      size: page.size,
    },
      headers: {
        Authorization: "Bearer " + token,
      },
  });
}


// 媒合過遊程列表-分頁
export function getMatchedToursByPage(searchForm,page) {
  let token = window.localStorage.getItem("token");
  return request({
    url: "/tour/search/page",
    method: "get",
    params: {
      keyword: searchForm.keyword,
      states:'3',
      registered:true,
      registrationDate: searchForm.mediationDate,
      isSelfRegister:searchForm.isSelfRegister,
      page: page.currentPage-1,
      size: page.pageSize,
    },
      headers: {
        Authorization: "Bearer " + token,
      },
  });
}

// 獲取特定媒合遊程
export function getMatchedTourById(tourId) {
  let token = window.localStorage.getItem("token");
  return request({
    url: `/tour/info/${tourId}`,
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}
