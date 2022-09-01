
<template>
  <q-date
    ref="date"
    type="date"
    v-bind="$attrs"
    v-on="listeners"
    :mask="mask"
    :locale="cnLocale"
    :multiple="multiple"
    :range="range"
    :subtitle="computedSubtitle"
    :title="computedTitle"
    :today-btn="todayBtn"
  >
    
    <slot name="AutoCalculateBtn" />
    <slot name="default" />
  </q-date>
</template>
<script>
import { date } from 'quasar'
export default {
  inheritAttrs: false,

  props: {
    mask: {
      type: String,
      default: "YYYY/MM/DD",
    },
    locale: Object,
    subtitle: String,
    title: String,
    todayBtn: Boolean,
    multiple: Boolean,
    multipleMax: Number,
    range: Boolean,
    rangeSeparator: {
      type: String,
      default: "~",
    },

  },
  // 局部注冊的組件
  components: {},
  data() {
    return {
       cnLocale: {
        /* starting with Sunday */
        days: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
        daysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
        months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
        monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
        firstDayOfWeek: 1
      }
    };
  },
  created() {
    if (this.locale) {
      this.cnLocale = this.locale
    }
  },
  // 計算屬性
  computed: {
    computedSubtitle () {  //年 周一
      if (this.subtitle) {

        return this.subtitle
      }
      const v = this.$attrs.value

      if (!v) {
        return ''
      }
      if (this.range) {
        
        if (this.multiple) {
          
          return ''
        } else if (!v.from) {
          
          return v
        } else {
          
          return v.from + this.rangeSeparator + v.to
        }
      } else if (this.multiple) {
        
        return ''
      } else {
        
        const date_ = new Date(v)
        const days = date.getDayOfWeek(date_)
        return date_.getUTCFullYear() + ' ' + (days === 7 ? this.cnLocale.days[0] : this.cnLocale.days[days])
      }
    },
    computedTitle () {
    
      if (this.title) {

        return this.title
      }
      
      
      const v = this.$attrs.value
    
      if (!v) {

        return ''
      }
      if (this.range){  
        if (this.multiple) {
          return (v.length?v.length:'1')+'個時間段'
        }else{
          if(typeof v=== 'string') return '一天'
          return date.getDateDiff(v.to,v.from,'days')+1+'天'
        }
      }else if(this.multiple){
        
        return v.length + '天'
      }else{
        
        return v.toString()
      }
    },
    listeners: function () {
      const vm = this
      return Object.assign({},
        
        vm.$listeners,
        
        {
          input: function (value, reason, details) {
            if (!vm.disable) {
              
              if (vm.range === true && typeof value === 'string') {
                vm.$emit('input', { from: value, to: value }, reason, details)
              } else {
                vm.$emit('input', value, reason, details)
              }
            }
          }
        }
      )
    },
  },
  // 偵聽器
  watch: {},
  // 組件方法
  methods: {
    setToday () {
      this.$refs.date.setToday()
    },
    setView (view) {
      this.$refs.date.setView(view)
    },
    offsetCalendar (type, descending) {
      this.$refs.date.offsetCalendar(type, descending)
    },
    setCalendarTo (year, month) {
      this.$refs.date.setCalendarTo(year, month)
    },
    setEditingRange (from, to) {
      this.$refs.date.setEditingRange(from, to)
    }
  },
};
</script>
<style lang="scss" scoped></style>
