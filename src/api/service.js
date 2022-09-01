import request from "@/utils/request";


// 獲取服務列表
export function getServiceList() {
  let token = window.localStorage.getItem("token");
  return request(
    {
      url: `/service/list`,
      method: "get",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
}
// 關鍵字獲取專業技能列表
export function getServiceKeywordList(keyword) {
  let token = window.localStorage.getItem("token");
  return request({
    url: `/service/list/`,
    method: "get",
    params: { keyword },
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}
// 新增服務技能
export function addService(dataForm) {
  let token = window.localStorage.getItem("token");
  return request(
    {
      url: `/service/add`,
      method: "post",
      data: dataForm,
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
}


// 移除服務技能
export function removeService(id) {
  let token = window.localStorage.getItem("token");
  return request(
    {
      url: `/service/remove/${id}`,
      method: "post",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
}
// 修改服務技能
export function updateService(dataForm) {
  let token = window.localStorage.getItem("token");
  return request(
    {
      url: `/service/update`,
      method: "post",
      data: dataForm,
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
}
