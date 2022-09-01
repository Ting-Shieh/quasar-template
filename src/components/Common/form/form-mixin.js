/**
 * 以下佛光案子接無用到
 * 請直接略過
 */

export default {
  props: {
    formLabel: String,
    labelWidth: {
      type: String,
      validator: (v) =>
        [
          "fit-content",
          "xsmall",
          "small",
          "medium",
          "large",
          "xlarge",
          "xxlarge",
        ].includes(v),
    },
    labelTop: Boolean,
    labelAlign: {
      type: String,
      validator: (v) => ["auto", "left", "right", "center"].includes(v),
    },
    formLabelStyle: String,
    dense: {
      type: Boolean,
      default: undefined,
    },
    disable: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    contentClass: String,
    contentStyle: String,
    noEllipsis: Boolean, 
    noErrorIcon: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    computedClass() {
      let cls = "";
      if (this.labelTop) {
        cls += " label-top";
      }
      if (
        this.labelAlign === "left" ||
        this.labelAlign === "center" ||
        this.labelAlign === "right"
      ) {
        cls += " label-" + this.labelAlign;
      }
      if (this.labelWidth) {
        cls += " label-" + this.labelWidth;
      }
      return cls;
    },
    computedLabelStyle() {
      
      let style = this.formLabelStyle;
      if (!style) {
        style = this.$parent.formLabelStyle;
      }
      
      if (!style) {
        style = this.$parent.$parent.formLabelStyle;
      }
      
      if (!style) {
        style = this.$parent.$parent.$parent.formLabelStyle;
      }
      return style;
    },
  },
  methods: {
    needLabelMorewidth(word) {
      return word.length > 4 ? true : false;
    },
  },
  filters: {
    
  },
};
