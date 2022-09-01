<template>
  <div class="" style="">
    <div
      class="row  q-col-gutter-x-sm q-col-gutter-y-sm q-pb-md"
      style="border-bottom:2px solid rgba(0,0,0,0.12)"
    >
      <!-- input -->
      <div :class="$q.screen.lt.sm ? 'col-12 q-mb-sm' : 'col-md-4'">
        <q-input
          outlined
          v-model="searchForm.keyword"
          dense
          hint="可找尋服務名稱關鍵字或是老師名稱。"
          label="關鍵字"
        />
      </div>
      <!-- 下拉 -->
      <div :class="$q.screen.lt.sm ? 'col-6 q-mb-sm' : ''">
        <q-select
          behavior="menu"
          outlined
          :option-label="(item) => (item === '' ? '請選擇' : item.label)"
          v-model="searchForm.type"
          :options="talentServicesOptions"
          dense
          emit-value
          map-options
          :style="!$q.screen.lt.sm ? 'width:150px;' : ''"
        >
        </q-select>
      </div>
      <!-- 日期 -->

      <div :class="$q.screen.lt.sm ? 'col-6 q-mb-sm' : ''">
        <q-input outlined dense v-model="searchForm.mediationDate">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                ref="qDateProxy"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="searchForm.mediationDate" mask="YYYY/MM/DD">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>

      <!-- button -->
      <div :class="$q.screen.lt.sm ? 'col-6 q-mb-sm' : ''">
        <q-btn
          label="重置"
          size="md"
          :style="$q.screen.lt.sm ? 'width:100%;height:40px;' : ''"
          @click="reset"
        ></q-btn>
      </div>
      <div :class="$q.screen.lt.sm ? 'col-6 q-mb-sm' : ''">
        <q-btn
          color="primary"
          label="搜尋"
          size="md"
          :style="$q.screen.lt.sm ? 'width:100%;height:40px;' : ''"
          @click="clickSearch"
        ></q-btn>
      </div>
    </div>
    <div v-if="isFirstIn" class="q-pa-sm row ">
      <div class="" style="width: 100%; max-width: 400px">
        <q-chat-message
          name="育成後台系統"
          :text="['請選擇欲查詢資料']"
          :stamp="new Date().toLocaleString()"
        />
      </div>
    </div>
    <!-- 內容 -->
    <div v-if="talentsData.length > 0" class="row search-box">
      <div class="col-12 q-mb-sm">
        <span>您共找到{{ page.totalNum }}筆人才</span>
      </div>
      <q-item
        class="rounded-borders col-12 col-sm-4 col-md-4  q-mb-sm"
        style="border:1px solid rgba(0, 0, 0, 0.12);padding-right:8px;"
        v-for="(item, index) in talentsData"
        :key="index"
      >
        <q-item-section avatar top>
          <q-avatar size="100px" class="image-avatar">
            <img
              :src="
                item.photo
                  ? item.photo
                  : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXFxcX////CwsLGxsb7+/vT09PJycn19fXq6urb29ve3t7w8PDOzs7n5+f5+fnt7e30nlkBAAAFHUlEQVR4nO2dC5qqMAyFMTwUBdz/bq+VYYrKKJCkOfXmXwHna5uTpA+KwnEcx3Ecx3Ecx3Ecx3Ecx3Ecx3Ecx3Ecx3EcA2iO9cdIc5PUdO257y+BU39u66b4HplE3fk6VIcnqmNfl1+gksr6+iIucjl3WYukor7+re6Hoe1y1UhNO3zUd+fUFRmKpOa0Tt6dY5ubRCrOG/QFLk1WGmnt/JxzykcjdZ/jyxJDLlOV2l36AtcsJJb9boG3YcR3DuqODIE3ztYKPkDdmwRmpUToUaSaq++AvRgZMWbOpbQW8hdCAm8ZDugoikzREdCJ2okJPBx6azFLNOwoOgcxojJ98JkaTSJxMpklKrCAKhZGI0drTY/wU5lXoJYibannV9NYy4oozNEAkPHTjop+DTDxVGkIgYJNoyQQJtiIW+EMjGAjm649AjGIaqswcEFQKJ2QPlJbqytki6ZXAAZRJ52J2McaUowzAfs+uFzrYhnzaapphiPWdaJWShqxjqa6kTTQ205TVbsfMa6htL0iYOsXpJrQjHSmCkv1QGPtiHqlYcQ21Gj7fcDU8xOEUuNgSltPzexh+HqFlanCBHZ4OLhCV+gK/3OF6vWvucLv98MUOY2pwu/PS/+D2qJU7pYGbOvDFDW+bbON9p3o3oRxn0bfLgZTgSn6pSfrtr56qLHemtHPTK2319SzGvtjQ9qeb39WgS66Cm073nd0U1PzDdJCO3Gzn6TKpl9Zq7ujGWsQhlA3NwWIMwG9zM08Y/tBrR9VWeczv5CSQuuUNKIUTk23ZJ5RKfVhjnkXotfWIlgX2BSCDYbZR+QTcLhb3dKZDUY2M0d4KWItwhHRah/zsrOgKw4wycwjcgEVcgQDQo23CqSiWEJkFAfod2oE1uIFdA1OsCPqFXYNTjCfb8Ez+iX2x5sKLlVbhtqdDcar9ZevhnbZxoBUD35k23t0d304LYs1ELVbnfFaZ/REJJX9niP8Q19moZGo3m8XR/yBvOnjFfsXcI2c8ZuNo7WMP5HQh6yRGrlmFOJTnyTcT+zRlqPUBI2gTVWNUzUna1ERgecgF4GpNBQ38jGqxVLzQA1A31Rrhk6Yz9QEh/WND0GnuG9huhiTXJkxfAizTHLr6cbJKN6UCU6x/2DTRE1xEeEXi3O0ZUqBN4nJRzHhFB1JPlFTBZlI2kQ8zc3KJ1Le8DIRmFJiknuVS6RK4Ej/JtBfJErDSzOBiY4wJHX6Z1I4v1GUmdCPNirnLLeg3oJLcbX5PcpHNbRvOa1A956QmRPOUXVF+zkaUJynpkYR0bOMJH2nNej1pqyV/aKkz9jr5yj5vrXXz1F5SQLACiMapmierj2ikLyleKdlA/I/2oFxiglxx9B+mHwz0lf34IZQfhDRhlD6bhvgEAoPYooHkTczSIZTLC+cEExsoNKZiGBiY9cCfo/Y/SjIOBMQizWWTe73CMUasJx7jlD+DdKdWUKoY4PRYFtGpO0G1Lx4RaadgTtJhf4fiGqGIwKWCGuGIwKWqP+7IxYCzygjR9IAO5pC7Da9g70TBVpWRNgFBlgT8RV2WxHbKwJMv4BOaEaYaU2K16yZMN/qgV+G7IWIvwyZCxHeDQMsR8wg0DBDDXB5H2EV+hkEGmaoySHQsEJNFoGGFWrAq98JRhUMX1iMMMqLLEIpK5jCbd4vw9nSt/72lewXiN6jmdjfq8Hdknlk92ZwJnbIMMRM7JBhiFlUFoHd1UWaP1QKsPsHA5mkNB+Smn9JqV3wskatnQAAAABJRU5ErkJggg=='
              "
            />
          </q-avatar>
        </q-item-section>

        <q-item-section top>
          <q-item-label
            lines="1"
            style="display:flex;justify-content:space-between;"
          >
            <span class="" style="margin:auto 4px;font-weight:bold;">{{
              item.name
            }}</span>
            <div class="">
              <q-btn
                size="12px"
                flat
                dense
                round
                icon="edit"
                @click="goTo('CreateTalent', item.id)"
              />
              <q-btn
                size="12px"
                flat
                dense
                round
                icon="delete"
                @click="openConfirm(item.id)"
              />
            </div>
          </q-item-label>
          <q-item-label caption lines="4" class="">
            <q-icon color="teal" name="place" />
            {{ item.address }}
          </q-item-label>
          <q-item-label caption lines="4" class="">
            <q-icon color="teal" name="smartphone" />
            {{ item.phone }}
          </q-item-label>
          <q-item-label caption lines="4" class="">
            <q-icon color="teal" name="mail_outline" />
            {{ item.email }}
          </q-item-label>
        </q-item-section>
      </q-item>
      <!-- Pagination -->
      <div class="row col-12 q-mt-xs">
        <div
          class="col-12 col-md-6"
          style="display:flex;min-height:40px;align-items:center;padding-right:20px;"
          :style="
            $q.screen.lt.sm
              ? 'justify-content:center;'
              : 'justify-content:flex-end;'
          "
        >
          <span
            class="font-s-size "
            style="margin-right:2px;font-size: 13.2px;width:60px;"
          >
            每頁筆數:
          </span>

          <q-select
            v-model="page.pageSize"
            behavior="menu"
            :outlined="false"
            dense
            emit-value
            map-options
            :options="rowOptions"
            option-label="label"
            option-value="value"
            size="xs"
            style="margin-right:4px;"
            @input="changePageSize"
          >
          </q-select>
        </div>
        <com-pagination
          class="col-12 col-md-6 "
          style="align-items:center;margin-right:0px;"
          :style="$q.screen.lt.sm ? 'justify-content:center;' : ''"
          v-model="page.currentPage"
          :rows-per-page="page.pageSize"
          :total-num="page.totalNum"
          @input="changeCurrentPage"
        ></com-pagination>
      </div>
    </div>

    <!--  -->
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">您確定要刪除該人才?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="取消" color="primary" v-close-popup />
          <q-btn flat label="確定" color="primary" @click="delTalent()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import ComPagination from "@/components/Common/form/ComPagination";
import {
  talentServicesOptions, // talentServices 人才服務
  rowOptions, // 每頁筆數
} from "@/utils/common/dropdown-list.js";
import { getTalentKeywordListByPage, removeTalent } from "@/api/talent";
import Mixin from "@/utils/mixin";
export default {
  mixins: [Mixin],
  components: {
    ComPagination,
  },
  data() {
    return {
      isFirstIn: true,
      talentServicesOptions, // talentServices 人才服務
      rowOptions, // 每頁筆數
      confirm: false,
      delId: "",
      searchForm: {
        keyword: "",
        type: "",
        mediationDate: "",
        isMediationSelf: true,
      },
      // searchFormCopy: {},
      page: {
        pageSize: 20,
        currentPage: 1,
        totalNum: 0,
      },

      talentsData: [],
    };
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  // 組件方法
  methods: {
    reset() {
      this.searchForm = {
        keyword: "",
        type: "",
        mediationDate: "",
        isMediationSelf: true,
      };
      this.page= {
        pageSize: 20,
        currentPage: 1,
        totalNum: 0,
      }
      this.isFirstIn = true;
      this.talentsData = [];
    },
    // 搜尋
    async clickSearch() {

      if (this.searchForm.type === "") {
        this.showNotify({ message: "請選擇服務類型!", type: "negative" });
        return;
      }
      this.talentsData = [];

      this.isFirstIn = false;
      this.searchForm.mediationDate =
        this.searchForm.mediationDate === ""
          ? ""
          : this.searchForm.mediationDate.trim();

      this.searchForm.isMediationSelf =
        this.userType === "10" ? false : this.searchForm.isMediationSelf;

      // 搜尋 媒合過遊程
      await getTalentKeywordListByPage(this.searchForm, this.page)
        .then((res) => {
          if (res.status === 200) {
            if (res.data.totalElements === 0) {
              this.showNotify({
                message: "沒找到相匹配資料，請重新查詢。",
                type: "negative",
              });
              this.isFirstIn = true;
              return;
            }
            this.talentsData = res.data.content;

            this.page.totalNum = res.data.totalElements;
            this.page.currentPage = res.data.number + 1;
          }
        })
        .catch((err) => {
          console.log("getMatchedToursByPage err", err);
        });
    },

    // 確定是否刪除彈框
    openConfirm(id) {
      this.confirm = true;
      this.delId = id;
    },
    // 改變每頁筆數
    changePageSize(e) {
      console.log("changePageSize=>", e);
      this.page.pageSize = e;
      this.page.currentPage = 1;
      this.clickSearch();
    },
    // 改變頁碼
    changeCurrentPage(e) {
      
      this.page.currentPage = e;
      this.clickSearch();
    },

    async delTalent() {
      this.confirm = false;
      await removeTalent(this.delId)
        .then((res) => {
          if (res.status === 200) {
            this.initData(); // 重新獲取List
          } else {
            this.$q.notify({
              message: "該人才刪除失敗",
              color: "negative",
              position: "top-right",
            });
          }
        })
        .catch((err) => {});
    },

    initUser() {
      this.userType = this.getUser.memType;
    },
  },
  created() {
    this.userType = JSON.parse(window.localStorage.getItem('user')).memType
  },
};
</script>
<style lang="scss" scoped></style>
