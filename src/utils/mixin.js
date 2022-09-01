export default {
  data() {
    return {
      pageValidate: {
        TourDetail: {
          comInput: [
            "tourNameRef",
            "tourAddressRef",
            "tourGuideCountRef",
            "touristCountRef",
            "minTouristCountRef",
            "safetyRulesRef",
            "contactNameRef",
            "contactPhoneRef",
            "contactEmailRef",
            "durationRef",
            "priceRef",
          ],
          comInputLabel: [
            "活動名稱",
            "活動地點",
            "帶領人需求數",
            "活動人數",
            "開團最低人數",
            "注意事項",
            "聯絡人",
            "聯絡人手機",
            "聯絡人email",
            "活動時長",
            "報名費用",
          ],
          comSelectDate: ["startDateRef", "deadlineRef"],
          comSelectDateLabel: ["活動日期", "活動報名截止日"],
        },
      },
    };
  },
  methods: {
   
    pageValidater(pageName, dataForm) {
      let errNum = 0;
      switch (pageName) {
        case "TourDetail":
          let errNum = 0;
          let errLabel = [];
          let comInputArr = this.pageValidate[pageName].comInput;
          let comInputLabelArr = this.pageValidate[pageName].comInputLabel;

          let comSelectDateArr = this.pageValidate[pageName].comSelectDate;
          let comSelectDatetLabelArr = this.pageValidate[pageName]
            .comSelectDateLabel;
          
          // 採用顏色
          for (let i = 0; i < comInputArr.length; i++) {
            let _ref = comInputArr[i].slice(0, -3);
            if (dataForm[_ref] == "" || dataForm[_ref] == null) {
              errNum++;
              errLabel.push(comInputLabelArr[i]);
            }
          }

          for (let i = 0; i < comSelectDateArr.length; i++) {
            let _ref = comSelectDateArr[i].slice(0, -3);
            if (dataForm[_ref] == "" || dataForm[_ref] == null) {
              errNum++;
              errLabel.push(comSelectDatetLabelArr[i]);
            }
          }
          return { errNum, errLabel, hasError: errNum > 0 ? true : false };
      }
    },
    needLabelMorewidth(word) {
      //判對字長限制 四個字=>width:80px為分水嶺
      return word.length > 4 ? true : false;
    },
    goTo(name, id = 0) {
      this.$router.push({
        name: name,
        query: { id },
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    showLoading(notify_str = "") {
      this.$q.loading.show();
      setTimeout(() => {
        this.$q.loading.hide();
        if (notify_str !== "") {
          this.$q.notify({
            message: notify_str,
            timeout: 1500,
            type: "warning",
            position: "top-right",
          });
        }
      }, 1500);
    },

    showNotify(obj) {
      this.$q.notify({
        message: obj.message,
        timeout: obj.timeout ? obj.timeout : 2000,
        type: obj.type,
        position: obj.timeout ? obj.timeout : "top-right",
      });
    },
    
    
  },
};
