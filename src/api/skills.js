import request from "@/utils/request";


// 獲取專業技能列表
export function getSkillsList() {
  let token = window.localStorage.getItem("token");
  return request({
    url: `/skills/list`,
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}
// 關鍵字獲取專業技能列表
export function getSkillsKeywordList(keyword) {
  let token = window.localStorage.getItem("token");
  return request({
    url: `/skills/list/`,
    method: "get",
    params: { keyword },//{keyword:keyword}
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}
// 新增專業技能
export function addSkill(dataForm) {
  let token = window.localStorage.getItem("token");
  return request({
    url: `/skills/add`,
    method: "post",
    data: dataForm,  // {id:1,name:"test"}
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}
// 移除專業技能
export function removeSkill(id) {
  let token = window.localStorage.getItem("token");
  return request({
    url: `/skills/remove/${id}`,
    method: "post",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}
// 修改專業技能
export function updateSkill(dataForm) {
  let token = window.localStorage.getItem("token");
  return request({
    url: `/skills/update`,
    method: "post",
    data: dataForm,
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}
