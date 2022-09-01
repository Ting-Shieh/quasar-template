const genderOptions = [
  {
    value: "男",
    label: "男",
  },
  {
    value: "女",
    label: "女",
  },
];
// 註冊身分 個人|廠商
const signUpIdentityOptions = [
  {
    value: 1,
    label: "個人",
    // category: 1,
  },
  {
    value: 2,
    label: "廠商",
    // category: 2,
  },
];

// talentServices 人才服務
const talentServicesOptions = [
  {
    value: "skills",
    label: "專業輔導",
    
  },
  {
    value: "service",
    label: "服務類型",
    
  },
]


// 媒合查詢下拉選項
const mediationTypeOptions = [
  {
    value: "tour",
    label: "遊程",
    
  },
  {
    value: "talent",
    label: "專才",
    
  },
]
// 啟用 | 禁用
const statusOptions = [
  {
    value: true,
    label: "啟用",
  },
  {
    value: false,
    label: "禁用",
  },
];

const isTemplateOptions = [
  {
    value: 1,
    label: "設為範本",
  },
  {
    value: 0,
    label: "不設為範本",
  },
];

const educationOptions = [
  {
    value: "國小",
    label: "國小",
  },
  {
    value: "國中",
    label: "國中",
  },
  {
    value: "高中/職",
    label: "高中/職",
  },
  {
    value: "大學/大專",
    label: "大學/大專",
  },
  {
    value: "碩士",
    label: "碩士",
  },
  {
    value: "博士",
    label: "博士",
  },
];
const rowOptions = [
  { label: "5筆/頁", value: 5 },
  { label: "10筆/頁", value: 10 },
  { label: "20筆/頁", value: 20 },
  { label: "50筆/頁", value: 50 },
  { label: "100筆/頁", value: 100 },
  { label: "150筆/頁", value: 150 },
  { label: "200筆/頁", value: 200 },
];
// 目前用於帳單管理
const identityOptions = [
  {
    value: 1,
    label: "全部",
  },
  {
    value: 2,
    label: "個人",
  },
  {
    value: 3,
    label: "廠商",
  },
];



// 星期下拉下拉
const weekSelectOptions=[
  {
    value: "1",
    label: "週一",
  },
  {
    value: "2",
    label: "週二",
  },
  {
    value: "3",
    label: "週三",
  },
  {
    value: "4",
    label: "週四",
  },
  {
    value: "5",
    label: "週五",
  },
  {
    value: "6",
    label: "週六",
  },
  {
    value: "7",
    label: "週日",
  },
]
// 開始結束時間-小時 下拉
const hourSelectOptions=[
  {
    value: 0,
    label: "00點",
  },
  {
    value: 1,
    label: "01點",
  },
  {
    value: 2,
    label: "02點",
  },
  {
    value: 3,
    label: "03點",
  },
  {
    value: 4,
    label: "04點",
  },
  {
    value: 5,
    label: "05點",
  },
  {
    value: 6,
    label: "06點",
  },
  {
    value: 7,
    label: "07點",
  },
  {
    value: 8,
    label: "08點",
  },
  {
    value: 9,
    label: "09點",
  },
  {
    value: 10,
    label: "10點",
  },
  {
    value: 11,
    label: "11點",
  },
  {
    value: 12,
    label: "12點",
  },
  {
    value: 13,
    label: "13點",
  },
  {
    value: 14,
    label: "14點",
  },
  {
    value: 15,
    label: "15點",
  },
  {
    value: 16,
    label: "16點",
  },
  {
    value: 17,
    label: "17點",
  },
  {
    value: 18,
    label: "18點",
  },
  {
    value: 19,
    label: "19點",
  },
  {
    value: 20,
    label: "20點",
  },
  {
    value: 21,
    label: "21點",
  },
  {
    value: 22,
    label: "22點",
  },
  {
    value: 23,
    label: "23點",
  },
]

// 開始結束時間-分鐘 下拉
const minuteSelectOptions=[
  {
    value: 0,
    label: "00分",
  },
  {
    value: 30,
    label: "30分",
  },
]
const tourStatesOptions = [
  { label: "草稿", value: '0' },
  { label: "審核中", value: '1' },
  { label: "退回", value: '2' },
  { label: "通過", value: '3' },
  
  { label: "作廢", value: '5' },
];

export {
  genderOptions,  // 性別
  educationOptions,  // 教育程度
  rowOptions,  // 每頁筆數
  statusOptions, // 啟用 | 禁用
  identityOptions,
  signUpIdentityOptions, // 註冊身分 個人|廠商
  isTemplateOptions,
  talentServicesOptions, // talentServices 人才服務
  weekSelectOptions, // 星期下拉
  hourSelectOptions, // 開始結束時間-小時 下拉 
  minuteSelectOptions, // 開始結束時間-分鐘 下拉
  tourStatesOptions,  //遊程所有狀態
  mediationTypeOptions // 媒合查詢下拉選項

};
