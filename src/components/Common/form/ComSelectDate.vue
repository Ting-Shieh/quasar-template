<template>
  <com-field
    :value="inputModel"
    ref="input"
    v-on="listeners"
    v-bind="$attrs"
    :disable="disable"
    :readonly="readonly"
    :no-clear-focus="noClearFocus"
    :rules="rules"
  >
    <q-popup-proxy
      ref="popupDate"
      @before-hide="_popupDateBeforeHide"
      @show="modified = false"
    >
      <com-date
        :value="dateModel"
        :class="dateClass"
        :style="dateStyle"
        :color="dateColor"
        :text-color="dateTextColor"
        :mask="dateMask"
        :multiple="false"
        :range="range"
        :today-btn="dateTodayBtn"
        :disable="disable"
        :readonly="readonly"
        :range-separator="rangeSeparator"
        :options="dateOptions"
        :default-year-month="defaultYearMonth"
        :navigation-min-year-month="navigationMinYearMonth"
        :navigation-max-year-month="navigationMaxYearMonth"
        @input="___inputDate"
      >
        <template>
          <div class="row q-gutter-xl" v-if="editTime">
            <q-field
              dense
              class="col"
              label="開始時間"
              :value="times[0]"
              v-if="times[0]"
            >
              <template v-slot:control>{{ times[0] }}</template>
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-time
                  v-model="times[0]"
                  :with-seconds="withSeconds"
                  format24h
                  @input="modified = true"
                >
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="關閉" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-field>
            <q-field
              dense
              class="col"
              label="結束時間"
              :value="times[1]"
              v-if="times[1]"
            >
              <template v-slot:control>{{ times[1] }}</template>
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-time
                  v-model="times[1]"
                  :with-seconds="withSeconds"
                  format24h
                  @input="modified = true"
                >
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="關閉" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-field>
          </div>
        </template>
        <template v-slot:AutoCalculateBtn>
          
        </template>
      </com-date>
    </q-popup-proxy>

    <!-- Icon 插槽 -->
    <template
      v-slot:append
      v-if="!hideDropdownIcon || (clearable && !!inputModel)"
    >
      <q-icon
        v-if="!disable && clearable && !!inputModel"
        :name="clearIcon"
        class="cursor-pointer"
        @click.prevent.stop="_clearInput"
      />
      <q-icon v-else-if="!hideDropdownIcon" :name="dropdownIcon" />
    </template>
    
    <template v-for="slotName in Object.keys($slots)" v-slot:[slotName]>
      <slot :name="slotName" />
    </template>
  </com-field>
</template>
<script>
import ComField from "@/components/Common/form/ComField";
import ComDate from "@/components/Common/form/ComDate";

Date.prototype.addDays = function(days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};
Date.prototype.addMonths = function(months) {
  const date = new Date(this.valueOf());
  date.setMonth(date.getMonth() + months);
  return date;
};

export default {
  inheritAttrs: false,

  components: { ComDate, ComField },
  props: {
    disable: Boolean,
    readonly: Boolean,
    clearable: Boolean,
    useInput: Boolean,
    rules: Array,
    dropdownIcon: {
      type: String,
      default: "event",
    },
    hideDropdownIcon: Boolean,
    clearIcon: {
      type: String,
      default: "cancel",
    },
    noClearFocus: {
      type: Boolean,
      default: true,
    },
    range: {
      type: Boolean,
      default: false,
    },
    rangeSeparator: {
      type: String,
      default: "至",
    },
    dateTimeJoin: {
      type: String,
      default: " ",
    },
    dateTodayBtn: Boolean,
    dateMask: {
      type: String,
      default: "YYYY/MM/DD",
    },
    dateMinimal: Boolean,
    dateOptions: [Array, Function],
    dateClass: String,
    dateStyle: String,
    dateColor: String,
    dateTextColor: String,
    defaultYearMonth: String,
    navigationMinYearMonth: String,
    navigationMaxYearMonth: String,
    defaultTime: Array,
    editTime: Boolean,
    withSeconds: Boolean,
    autoCalculateBtn: Boolean, 
    calDateVal: {
      type: [Number, String],
    }, 
    autoToday: {
      type: Boolean,
      default: false,
    }, 
  },
  data() {
    return {
      times: [],
      date: "",
      modified: false,
      autoTodayChanged: false, 
    };
  },
  created() {
    if (Array.isArray(this.defaultTime) && this.defaultTime.length > 0) {
      this.times[0] = this.defaultTime[0];
      if (this.defaultTime.length > 1) {
        this.times[1] = this.defaultTime[1];
      }
    }
  },
  // 計算屬性
  computed: {
    dateModel() {
      if (this.autoToday && !this.autoTodayChanged) {
        
        this.date = new Date();
        return this.date.toISOString().substring(0, 10); 
      } else {
        return this.date;
      }
      if (this.range && this.date) {
        if (this.date.from === this.date.to) {
          return this.date.from;
        } else {
          return this.date;
        }
      } else if (!this.range && this.autoCalculateBtn) {
        return this.date;
      } else {
        return this.date;
      }
    },
    inputModel() {
      const newVal = this.date;
      let input;
      if (this.range) {
        if (!newVal) {
          input = undefined;
        } else {
          if (newVal.from) {
            input = newVal.from + this.rangeSeparator + newVal.to;
          } else {
            input = newVal + this.rangeSeparator + newVal;
          }
        }
      } else {
        if (!newVal) {
          input = undefined;
        } else if (this.autoToday) {
          if (!this.autoTodayChanged) {
             
            input = newVal.toISOString().substring(0, 10);
          } else {
            
            input = newVal;
          }
        } else if (this.autoCalculateBtn) {
          const fromDate = new Date(this.date);

          
          if (typeof newVal !== "string") {
            
            input =
              newVal +
              this.rangeSeparator +
              fromDate
                .addMonths(this.calDateVal)
                .toISOString()
                .substring(0, 10);
          } else {
            input =
              newVal +
              this.rangeSeparator +
              fromDate
                .addMonths(this.calDateVal)
                .toISOString()
                .substring(0, 10);
          }
        } else {
          input =
            newVal + (this.editTime ? this.dateTimeJoin + this.times[0] : "");
        }
      }

      return input;
    },
    listeners: function() {
      const vm = this;

      return Object.assign(
        {},

        vm.$listeners,

        {
          input: function(value) {},
        }
      );
    },
  },
  
  watch: {
    "$attrs.value": {
      handler(val, old) {
        if (!val) {
          this.date = "";
        } else if (typeof val === "string" && !this.autoTodayChanged) {
          
          this.autoTodayChanged = true;
          this.date = val;
        } else if (typeof val === "string" && !this.autoCalculateBtn) {
          this.date = val.substr(0, this.dateMask.length);
        } else if (typeof val === "string" && this.autoCalculateBtn) {
          this.date = [];
        } else {
          
          this.date = {
            from: val[0].substr(0, this.dateMask.length),
            to: val[1].substr(0, this.dateMask.length),
          };
        }
      },
      immediate: true,
    },
  },
  
  methods: {
    addOptionDate() {
   
    },
    _popupDateBeforeHide() {
      if (this.modified) {
        this._dateInput(this.date);
      }
    },
    ___inputDate(value) {
      this.modified = true;
      if (value === null) {
        this.date = "";
      } else {
        this.date = value;
        if (!this.range) {
          this._dateInput(this.date);
        }
      }
    },
    _dateInput(value /*, reason, details*/) {
      const newVal = value;
      if (this.range && newVal) {
        let time1 = "";
        let time2 = "";
        if (this.times) {
          if (this.times.length >= 1) {
            time1 = this.times[0];
          }
          if (this.times.length >= 2) {
            time2 = this.times[1];
          }
        }
        if (newVal && newVal.from) {
          this.$emit("input", [
            newVal.from + this.dateTimeJoin + time1,
            newVal.to + this.dateTimeJoin + time2,
          ]);
        } else {
          this.$emit("input", [
            newVal + this.dateTimeJoin + time1,
            newVal + this.dateTimeJoin + time2,
          ]);
        }
      } else if (newVal && newVal.length > 0) {
        let time1 = "";
        if (this.times && this.times.length >= 1) {
          time1 = this.times[0];
        }
        this.$refs.popupDate.hide();
        this.$emit("input", newVal + this.dateTimeJoin + time1);
      } else {
        this.$refs.popupDate.hide();
        this.$emit("input", undefined);
      }
    },
    _clearInput(old) {
      this.date = "";
      this.$emit("input", undefined);
    },

    resetValidation() {
      this.$refs.input.resetValidation();
    },
    validate(value) {
      return this.$refs.input.validate(value);
    },
    focus() {
      this.$refs.input.focus();
    },
    blur() {
      this.$refs.input.blur();
    },
  },
};
</script>
<style lang="scss" scoped>
label {
  color: #000;
  font-size: 14px;
}
.font-s-size {
  font-size: 55%;
}
</style>
