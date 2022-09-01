<template>
  <div
    v-if="formLabel"
    :class="computedClass"
    class="form-label inline no-wrap items-center"
  >
    <label
      v-if="!$q.screen.lt.sm"
      :class="{ dense: _dense(), 'ellipsis-2-lines': !noEllipsis }"
      class="non-selectable col-auto"
      :style="computedLabelStyle"
    >
      <slot name="form-label"
        ><span v-if="requiredValid" class="required">* </span
        ><span>{{ formLabel }}</span></slot
      >
    </label>
    <q-input
      ref="childcheck"
      :value="value"
      :class="{ computedClass, contentClass }"
      :style="contentStyle"
      v-bind="$attrs"
      v-on="listeners"
      :rules="rules"
      :label="$q.screen.lt.sm ? formLabel : void 0"
      :dense="_dense()"
      :no-error-icon="noErrorIcon"
      :disable="disable"
      :readonly="readonly"
      :filled="_filled()"
      :outlined="_outlined()"
      :standout="_standout()"
      :borderless="_borderless()"
      :square="_square()"
      :rounded="_rounded()"
      @mouseover.native="hover = true"
      @mouseleave.native="hover = false"
      :requiredValid="requiredValid"
    >
      <template v-for="slotName in Object.keys($slots)" v-slot:[slotName]>
        <slot :name="slotName" />
      </template>
  
      <template v-slot:append>
        <template
          v-if="clearable && hover && value != null && value !== '' && !disable"
        >
          <q-icon
            :name="clearIcon"
            class="cursor-pointer"
            @click.prevent.stop="_doClear()"
          />
        </template>
        <slot v-else name="append" />
      </template>
    </q-input>
  </div>
  <q-input
    v-else
    ref="childcheck"
    :value="value"
    :class="{ computedClass, contentClass }"
    :style="contentStyle"
    v-bind="$attrs"
    v-on="listeners"
    :rules="rules"
    :label="$q.screen.lt.sm ? label : void 0"
    :dense="_dense()"
    :no-error-icon="noErrorIcon"
    :disable="disable"
    :readonly="readonly"
    :filled="_filled()"
    :outlined="_outlined()"
    :standout="_standout()"
    :borderless="_borderless()"
    :square="_square()"
    :rounded="_rounded()"
    @mouseover.native="hover = true"
    @mouseleave.native="hover = false"
    :requiredValid="requiredValid"
  >
    <template v-for="slotName in Object.keys($slots)" v-slot:[slotName]>
      <slot :name="slotName" />
    </template>
    <!--  -->
    <template v-slot:before v-if="!$q.screen.lt.sm">
      <label
        style="text-align:right;"
        :style="$q.screen.lt.sm ? 'width:150px;' : 'width:180px;'"
      >
        <span v-if="requiredValid" :class="{ required: requiredValid }">＊</span>{{ label }}:
      </label>
    </template>
    <!--  -->
    <template v-slot:append>
      <template
        v-if="clearable && hover && value != null && value !== '' && !disable"
      >
        <q-icon
          :name="clearIcon"
          class="cursor-pointer"
          @click.prevent.stop="_doClear()"
        />
      </template>
      <slot v-else name="append" />
    </template>
  </q-input>
</template>
<script>
import FormMixin from "./form-mixin.js";
import defaultSetting from "./default-setting";
export default {
  name: "ComInput",
  inheritAttrs: false,
  mixins: [FormMixin],
  props: {
    value: {
      type: [String, Number],
    },
    rules: Array,
    clearable: Boolean,
    clearIcon: {
      type: String,
      default: "cancel",
    },
    noClearFocus: Boolean,
    label: {
      type: String,
      default: undefined,
    },
    filled: {
      type: Boolean,
      default: undefined,
    },
    outlined: {
      type: Boolean,
      default: undefined,
    },
    standout: {
      type: Boolean,
      default: undefined,
    },
    borderless: {
      type: Boolean,
      default: undefined,
    },
    square: {
      type: Boolean,
      default: undefined,
    },
    rounded: {
      type: Boolean,
      default: undefined,
    },
    requiredValid: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      hover: false,
    };
  },
  computed: {
    listeners: function() {
      const vm = this;
      
      return Object.assign(
        {},
        
        vm.$listeners,
        
        {
          
          input: function(value) {
            vm._doInput(value);
          },
        }
      );
    },
  },
  methods: {
    _filled() {
      const undef =
        this.filled === undefined &&
        this.outlined === undefined &&
        this.standout === undefined &&
        this.borderless === undefined;
      if (!undef) {
        return this.filled;
      }
      if (defaultSetting.inputDesignMode === "filled") {
        return true;
      } else {
        return false;
      }
    },
    _outlined() {
      const undef =
        this.filled === undefined &&
        this.outlined === undefined &&
        this.standout === undefined &&
        this.borderless === undefined;
      if (!undef) {
        return this.outlined;
      }
      if (defaultSetting.inputDesignMode === "outlined") {
        return true;
      } else {
        return false;
      }
    },
    _standout() {
      const undef =
        this.filled === undefined &&
        this.outlined === undefined &&
        this.standout === undefined &&
        this.borderless === undefined;
      if (!undef) {
        return this.standout;
      }
      if (defaultSetting.inputDesignMode === "standout") {
        return true;
      } else {
        return false;
      }
    },
    _borderless() {
      const undef =
        this.filled === undefined &&
        this.outlined === undefined &&
        this.standout === undefined &&
        this.borderless === undefined;
      if (!undef) {
        return this.borderless;
      }
      if (defaultSetting.inputDesignMode === "borderless") {
        return true;
      } else {
        return false;
      }
    },
    _square() {
      const undef = this.square === undefined && this.rounded === undefined;
      if (!undef) {
        return this.square;
      }
      if (defaultSetting.inputDesignCorner === "square") {
        return true;
      } else {
        return false;
      }
    },
    _rounded() {
      const undef = this.square === undefined && this.rounded === undefined;
      if (!undef) {
        return this.rounded;
      }
      if (defaultSetting.inputDesignCorner === "rounded") {
        return true;
      } else {
        return false;
      }
    },
    _dense() {
      if (this.dense === undefined) {
        return defaultSetting.denseMode;
      } else {
        return this.dense;
      }
    },
    _doClear() {
      const oldVal = this.value;
      this._doInput(null);
 
      this.$emit("clear", oldVal);

    },
    _doInput(value) {
      if (!this.disable) {
        this.$emit("input", value);
      }
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
    select() {
      this.$refs.input.select();
    },

  },
};
</script>
<style lang="scss" scoped>
.required {
  color: red;
  font-size: 10px;
}
label {
  color: #000;
  font-size: 14px;
}
</style>
