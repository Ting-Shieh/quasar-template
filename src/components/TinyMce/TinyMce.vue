<template>
  <div class="tinymce-editor">
    <Editor
      :id="tinymceId"
      :init="init"
      :disabled="disabled"
      v-model="myValue"
      @onClick="onClick"
    ></Editor>
  </div>
</template>

<script>
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/themes/silver/theme";
import "tinymce/icons/default";
import "tinymce/plugins/advlist";
import "tinymce/plugins/autolink";
import "tinymce/plugins/link";
import "tinymce/plugins/image";
import "tinymce/plugins/lists";
import "tinymce/plugins/charmap";
import "tinymce/plugins/media";
import "tinymce/plugins/wordcount";

let imageFilePicker = function(callback, value, meta) {
  tinymce.activeEditor.windowManager.open(
    {
      title: "Image Picker",
      url: "/images/getimages",
      width: 650,
      height: 550,
      buttons: [
        {
          text: "Insert",
          onclick: function() {
            tinymce.activeEditor.windowManager.close();
          },
        },
        {
          text: "Close",
          onclick: "close",
        },
      ],
    },
    {
      oninsert: function(url) {
        callback(url);
      },
    }
  );
};
const fonts = [
  "宋体=宋体",
  "微软雅黑=微软雅黑",
  "新宋体=新宋体",
  "黑体=黑体",
  "楷体=楷体",
  "隶书=隶书",
  "Courier New=courier new,courier",
  "AkrutiKndPadmini=Akpdmi-n",
  "Andale Mono=andale mono,times",
  "Arial=arial,helvetica,sans-serif",
  "Arial Black=arial black,avant garde",
  "Book Antiqua=book antiqua,palatino",
  "Comic Sans MS=comic sans ms,sans-serif",
  "Courier New=courier new,courier",
  "Georgia=georgia,palatino",
  "Helvetica=helvetica",
  "Impact=impact,chicago",
  "Symbol=symbol",
  "Tahoma=tahoma,arial,helvetica,sans-serif",
  "Terminal=terminal,monaco",
  "Times New Roman=times new roman,times",
  "Trebuchet MS=trebuchet ms,geneva",
  "Verdana=verdana,geneva",
  "Webdings=webdings",
  "Wingdings=wingdings,zapf dingbats",
];
export default {
  components: {
    Editor,
  },
  props: {
    value: {
      type: String,
      default: "",
    },

    disabled: {
      type: Boolean,
      default: false,
    },
 
    plugins: {
      type: [String, Array],
      default: "advlist autolink link image lists charmap  media wordcount",
    },

    toolbar: {
      type: [String, Array],
      default:
        "undo redo |  formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists  table",
    },
  },
  data() {
    return {
      //init
      tinymceId: "tinymce",
      myValue: this.value,
      init: {
        selector: "#tinymce",
        language_url: process.env.BASE_URL + "tinymce/langs/zh_TW.js",
        language: "zh_TW",
        skin_url: process.env.BASE_URL + "tinymce/skins/ui/oxide",
        plugins: this.plugins,
        toolbar: this.toolbar,
        toolbar_location: "/",
        fontsize_formats:
          "12px 14px 16px 18px 20px 22px 24px 28px 32px 36px 48px 56px 72px", 
        font_formats: fonts.join(";"),

        height: 500,
        placeholder: "請開始編輯",

        branding: false,

        images_upload_handler: function(blobInfo, success, failure) {
          const img = "data:image/jpeg;base64," + blobInfo.base64();

          success(img);
        },
      },
    };
  },
  watch: {
    value(newValue) {
      this.myValue = newValue == null ? "" : newValue;
    },
    myValue(newValue) {
      if (this.triggerChange) {
        this.$emit("change", newValue);
      } else {
        this.$emit("input", newValue);
      }
    },
  },
  mounted() {
    tinymce.init({});
  },
  methods: {
    onClick(e) {
      this.$emit("onClick", e, tinymce);
    },

    clear() {
      this.myValue = "";
    },
  },
};
</script>
