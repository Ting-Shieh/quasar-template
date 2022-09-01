<template>
  <div class="" style="">
    <div
      class="row col-12 justify-center"
      style="flex-direction:column;align-items:center"
    >
      <span class="text-center" style="font-size:24px;font-weight:bold;"
        >佛光大學產學與育成中心 輔導顧問個人基本資料表</span
      >
    </div>
    <!-- 基本資料 -->
    <div class="row  q-col-gutter-x-sm q-col-gutter-y-sm  q-mb-sm">
      <div class="col-12 q-mb-sm">
        <span class="text-center" style="font-size:16px;font-weight:bold;"
          >一.基本資料</span
        >
      </div>
      <div class="col-12 col-md-9 " :style="$q.screen.lt.sm ? 'order:2' : ''">
        <div class="row q-col-gutter-x-sm q-col-gutter-y-md">
          <div class="col-6 col-md-3">
            <com-input
              v-model="addForm.name"
              form-label="姓名"
              ref="addForm_name"
            ></com-input>
          </div>
          <div class="col-6 col-md-3">
            <com-select
              ref="addForm_gender"
              v-model="addForm.gender"
              outlined
              :options="genderOptions"
              dense
              behavior="menu"
              emit-value
              map-options
              form-label="性別"
              :required-valid="false"
            ></com-select>
          </div>
          <div class="col-6 col-md-3">
            <com-select-date
              :range="false"
              :required="false"
              v-model="addForm.birthday"
              form-label="生日"
              :style="$q.screen.lt.sm ? 'width:100%;' : ''"
            ></com-select-date>
          </div>
          <div class="col-6 col-md-3">
            <com-input
              v-model="addForm.country"
              form-label="國籍"
              :style="$q.screen.lt.sm ? 'width:100%;' : ''"
            ></com-input>
          </div>
          <div class="col-6 col-md-3">
            <com-input
              v-model="addForm.phone"
              form-label="行動電話"
            ></com-input>
          </div>
          <div class="col-6 col-md-6">
            <com-input v-model="addForm.email" form-label="Email"></com-input>
          </div>
          <div class="col-6 col-md-3">
            <com-input
              v-model="addForm.identityNumber"
              form-label="身分證號碼"
            ></com-input>
          </div>
          <div class="col-6 col-md-3">
            <com-input
              v-model="addForm.price"
              form-label="時薪"
            ></com-input>
          </div>
        </div>

      </div>
      <div class="col-12 col-md-3" :style="$q.screen.lt.sm ? 'order:1;' : ''">
        <div
          style="display: flex;justify-contnet:center;flex-direction:column;align-items:center;margin:auto;"
        >
          <div
            class=""
            style="display: flex;width: 180px;height: 180px;"
            :style="$q.screen.lt.sm ? 'width:200px;height:200px;' : ''"
          >
            <img :src="addForm.photo" style="width:100%;height:100%;" />
          </div>

          <div class="" style="width: 180px;margin-top:10px;overflow:hidden;">
            <input
              type="file"
              accept="image/*"
              @change="previewImage"
              class="custom-file-input"
              id="upload-avater"
            />
          </div>
        </div>
     
      </div>
    </div>
    <div class="row  q-col-gutter-x-sm q-col-gutter-y-sm  q-mb-sm">
      <div class="col-6 col-md-6">
        <com-input v-model="addForm.address" form-label="住宅地址"></com-input>
      </div>
      <div class="col-6 col-md-6">
        <com-input
          v-model="addForm.companyAddress"
          form-label="服務機關地址"
        ></com-input>
      </div>
    </div>
    <!-- 學歷 -->
    <div class="row  q-col-gutter-x-sm q-col-gutter-y-sm  q-mb-sm">
      <div class="col-12 q-mb-sm">
        <span class="text-center" style="font-size:16px;font-weight:bold;"
          >二.主要學歷</span
        >
        <!-- {{ addForm.educationalExperiences }} -->
      </div>
      <div v-if="!$q.screen.lt.sm" class="col-12">
        <q-markup-table>
          <thead>
            <tr>
              <th
                class="`text-${col.align}`"
                v-for="(col, index) in tableEduColumns"
                :key="index"
              >
                {{ col.label }}
              </th>
              <th class="`text-center`">
                操作
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-center">
                <q-input
                  ref="eduItem_schoolName"
                  v-model="eduItem.schoolName"
                  type="text"
                  outlined
                  dense
                  style="min-width:100px;"
                ></q-input>
              </td>
              <td class="text-center">
                <q-input
                  ref="eduItem_country"
                  v-model="eduItem.country"
                  type="text"
                  outlined
                  dense
                  style="min-width:100px;"
                ></q-input>
              </td>
              <td class="text-center">
                <q-input
                  ref="eduItem_majorIn"
                  v-model="eduItem.majorIn"
                  type="text"
                  outlined
                  dense
                  style="min-width:100px;"
                ></q-input>
              </td>
              <td class="text-center">
                <q-select
                  ref="eduItem_degree"
                  v-model="eduItem.degree"
                  behavior="menu"
                  outlined
                  dense
                  emit-value
                  map-options
                  :options="educationOptions"
                  option-label="label"
                  option-value="value"
                  size="xs"
                  style="min-width:100px;"
                >
                </q-select>
              </td>
              <td class="text-center">
                <q-input
                  outlined
                  dense
                  v-model="eduItem.startedTime"
                  mask="date"
                  style="min-width:130px;"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy>
                        <q-date v-model="eduItem.startedTime"></q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </td>
              <td class="text-center">
                <q-input
                  outlined
                  dense
                  v-model="eduItem.endedTime"
                  mask="date"
                  style="min-width:130px;"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy>
                        <q-date v-model="eduItem.endedTime"></q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </td>
              <td class="text-center">
                <q-btn
                  round
                  class="q-mr-xs"
                  size="xs"
                  color="secondary"
                  icon="add_circle"
                  @click="addRow(eduItem, 'edu')"
                />
              </td>
            </tr>
            <tr
              v-for="(item, index) in addForm.educationalExperiences"
              :key="index"
            >
              <td class="text-center">{{ item.schoolName }}</td>
              <td class="text-center">{{ item.country }}</td>
              <td class="text-center">{{ item.majorIn }}</td>
              <td class="text-center">{{ item.degree }}</td>
              <td class="text-center">{{ item.startedTime }}</td>
              <td class="text-center">{{ item.endedTime }}</td>

              <td class="text-center">
                <q-btn
                  round
                  size="xs"
                  color="secondary"
                  icon="remove_circle"
                  @click="delRow(index, 'edu')"
                />
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>

      <div v-if="$q.screen.lt.sm" class="col-12">
        <div class="q-mb-sm ">
          <com-input
            v-model="eduItem.schoolName"
            form-label="學校名稱"
          ></com-input>
        </div>
        <div class="q-mb-sm ">
          <com-input v-model="eduItem.country" form-label="國別"></com-input>
        </div>
        <div class="q-mb-sm ">
          <com-input v-model="eduItem.majorIn" form-label="主修"></com-input>
        </div>
        <div class="q-mb-sm">
          <com-select
            ref="comCheck"
            v-model="eduItem.degree"
            behavior="menu"
            outlined
            :options="educationOptions"
            dense
            emit-value
            map-options
            form-label="學位"
            :required-valid="true"
          ></com-select>
        </div>
        <div class="q-mb-sm " style="display:flex;flex-direction:row;">
          <com-select-date
            v-model="eduItem.startedTime"
            form-label="開始日期"
            type="date"
            stack-label
            mask="YYYY/MM/DD"
            style="width:50%;"
          ></com-select-date>
          <com-select-date
            v-model="eduItem.endedTime"
            form-label="畢業日期"
            type="date"
            mask="YYYY/MM/DD"
            stack-label
            style="width:50%;"
          ></com-select-date>
        </div>
        <div class="q-mb-sm ">
          <q-btn
            style="font-size:12px;width:100%;"
            class=""
            color="secondary"
            icon="add"
            @click="addRow(eduItem, 'edu')"
          ></q-btn>
        </div>
      </div>
      <div
        v-if="$q.screen.lt.sm && addForm.educationalExperiences.length != 0"
        class="col-12"
      >
        <q-table
          grid
          :data="addForm.educationalExperiences"
          :columns="tableEduColumns"
          row-key="name"
          hide-pagination
          hide-header
        >
          <template v-slot:item="props">
            <div
              class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
              :style="props.selected ? 'transform: scale(0.95);' : ''"
            >
              <q-card :class="props.selected ? 'bg-grey-2' : ''">
                <q-card-section>
                  <div
                    class=""
                    style="display:flex;flex-direction:row;align-items:center;justify-content:space-between;"
                  >
                    <span class="" style="font-size:16px;"
                      >移除<span style="font-weight:bold">{{
                        props.row.school
                      }}</span
                      >該項目</span
                    >
                    <q-btn
                      size="sm"
                      color="secondary"
                      icon="remove"
                      @click="delRow(props.rowindex, 'edu')"
                    />
                  </div>
                </q-card-section>
                <q-separator />
                <q-list dense>
                  <q-item v-for="col in props.cols" :key="col.name">
                    <q-item-section>
                      <q-item-label>{{ col.label }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label caption>{{ col.value }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card>
            </div>
          </template>
        </q-table>
      </div>
    </div>
    <!-- 現職 -->
    <div class="row  q-col-gutter-x-sm q-col-gutter-y-sm  q-mb-sm">
      <div class="col-12 q-mb-sm">
        <span class="text-center" style="font-size:16px;font-weight:bold;"
          >三.現職相關經歷</span
        >
      </div>
      <div v-if="!$q.screen.lt.sm" class="col-12">
        <q-markup-table>
          <thead>
            <tr>
              <th
                class="`text-${col.align}`"
                v-for="(col, index) in tableExpColumns"
                :key="index"
              >
                {{ col.label }}
              </th>
              <th class="`text-center`">
                操作
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-center">
                <q-input
                  v-model="experienceItem.company"
                  type="text"
                  outlined
                  dense
                ></q-input>
              </td>
              <td class="text-center">
                <q-input
                  v-model="experienceItem.department"
                  type="text"
                  outlined
                  dense
                ></q-input>
              </td>
              <td class="text-center">
                <q-input
                  v-model="experienceItem.position"
                  type="text"
                  outlined
                  dense
                ></q-input>
              </td>

              <td class="text-center">
                <q-input
                  outlined
                  dense
                  v-model="experienceItem.startedTime"
                  mask="date"
                  style="min-width:130px;"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy>
                        <q-date v-model="experienceItem.startedTime"></q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </td>
              <td class="text-center">
                <q-input
                  outlined
                  dense
                  v-model="experienceItem.endedTime"
                  mask="date"
                  style="min-width:130px;"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy>
                        <q-date v-model="experienceItem.endedTime"></q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </td>
              <td class="text-center">
                <q-btn
                  round
                  class="q-mr-xs"
                  size="xs"
                  color="secondary"
                  icon="add_circle"
                  @click="addRow(experienceItem, 'experience')"
                />
              </td>
            </tr>
            <tr v-for="(item, index) in addForm.workExperiences" :key="index">
              <td class="text-center">{{ item.company }}</td>
              <td class="text-center">{{ item.department }}</td>
              <td class="text-center">{{ item.position }}</td>
              <td class="text-center">{{ item.startedTime }}</td>
              <td class="text-center">{{ item.endedTime }}</td>

              <td class="text-center">
                <q-btn
                  round
                  size="xs"
                  color="secondary"
                  icon="remove_circle"
                  @click="delRow(index, 'experience')"
                />
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>

      <div v-if="$q.screen.lt.sm" class="col-12">
        <div class="q-mb-sm ">
          <com-input
            v-model="experienceItem.company"
            form-label="公司名稱"
          ></com-input>
        </div>
        <div class="q-mb-sm ">
          <com-input
            v-model="experienceItem.department"
            form-label="服務部別"
          ></com-input>
        </div>
        <div class="q-mb-sm ">
          <com-input
            v-model="experienceItem.position"
            form-label="職稱"
          ></com-input>
        </div>

        <div class="q-mb-sm " style="display:flex;flex-direction:row;">
          <com-select-date
            v-model="experienceItem.startedTime"
            form-label="開始日期"
            stack-label
            style="width:50%;"
          ></com-select-date>
          <com-select-date
            v-model="experienceItem.endedTime"
            form-label="結束日期"
            stack-label
            style="width:50%;"
          ></com-select-date>
        </div>
        <div class="q-mb-sm ">
          <q-btn
            style="font-size:12px;width:100%;"
            class=""
            color="secondary"
            icon="add"
            @click="addRow(experienceItem, 'experience')"
          ></q-btn>
        </div>
      </div>
      <div
        v-if="$q.screen.lt.sm && addForm.workExperiences.length != 0"
        class="col-12"
      >
        <q-table
          grid
          :data="addForm.workExperiences"
          :columns="tableExpColumns"
          row-key="name"
          hide-pagination
          hide-header
        >
          <template v-slot:item="props">
            <div
              class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
              :style="props.selected ? 'transform: scale(0.95);' : ''"
            >
              <q-card :class="props.selected ? 'bg-grey-2' : ''">
                <q-card-section>
                  <div
                    class=""
                    style="display:flex;flex-direction:row;align-items:center;justify-content:space-between;"
                  >
                    <span class="" style="font-size:16px;"
                      >移除<span style="font-weight:bold">{{
                        props.row.school
                      }}</span
                      >該項目</span
                    >
                    <q-btn
                      size="sm"
                      color="secondary"
                      icon="remove"
                      @click="delRow(props.rowindex, 'experience')"
                    />
                  </div>
                </q-card-section>
                <q-separator />
                <q-list dense>
                  <q-item v-for="col in props.cols" :key="col.name">
                    <q-item-section>
                      <q-item-label>{{ col.label }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label caption>{{ col.value }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card>
            </div>
          </template>
        </q-table>
      </div>
    </div>

    <!-- 專長項目 -->
    <div class="row  q-col-gutter-x-sm q-col-gutter-y-sm  q-mb-sm">
      <div class="col-12 q-mb-sm">
        <span class="text-center" style="font-size:16px;font-weight:bold;"
          >四.專長項目</span
        >
      </div>
      <!-- pc -->
      <div class="col-12">
        <q-markup-table>
          <thead>
            <tr>
              <th
                class="`text-${col.align}`"
                v-for="(col, index) in tableTalentServicesColumns"
                :key="index"
              >
                {{ col.label }}
              </th>
              <th class="`text-center`">
                操作
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-center">
                <!-- select  -->
                <q-select
                  v-model="talentServicesItem.type"
                  behavior="menu"
                  outlined
                  dense
                  emit-value
                  map-options
                  :options="talentServicesOptions"
                  option-label="label"
                  option-value="value"
                  size="xs"
                  style="min-width:100px;"
                  @input="changeType"
                >
                </q-select>
              </td>
              <td class="text-center">
                <!-- select talentNameList-->
                <q-select
                  v-if="talentServicesItem.type === 'skills'"
                  v-model="talentServicesItem.serviceId"
                  behavior="menu"
                  outlined
                  dense
                  emit-value
                  map-options
                  :options="skillsSelectOptions"
                  :option-label="
                    (item) => (item === '' ? '請選擇' : item.label)
                  "
                  option-value="value"
                  size="xs"
                  style="min-width:100px;"
                >
                </q-select>
                <q-select
                  v-else
                  v-model="talentServicesItem.serviceId"
                  behavior="menu"
                  outlined
                  dense
                  emit-value
                  map-options
                  :options="serviceSelectOptions"
                  :option-label="
                    (item) => (item === '' ? '請選擇' : item.label)
                  "
                  option-value="value"
                  size="xs"
                  style="min-width:100px;"
                >
                </q-select>
              </td>
              <td class="text-center">
                <!-- select -->
                <q-select
                  v-model="talentServicesItem.date"
                  behavior="menu"
                  outlined
                  dense
                  emit-value
                  map-options
                  :options="weekSelectOptions"
                  :option-label="
                    (item) =>
                      item === '' ? weekSelectOptions[0].label : item.label
                  "
                  option-value="value"
                  size="xs"
                  style="min-width:100px;"
                >
                </q-select>
              </td>
              <td class="text-center">
                <!-- select -->
                <q-select
                  v-model="talentServicesItem.startHour"
                  behavior="menu"
                  outlined
                  dense
                  emit-value
                  map-options
                  :options="hourSelectOptions"
                  :option-label="
                    (item) =>
                      item === '' ? hourSelectOptions[0].label : item.label
                  "
                  option-value="value"
                  size="xs"
                  style="min-width:100px;"
                >
                </q-select>
              </td>
              <td class="text-center">
                <!-- s -->
                <q-select
                  v-model="talentServicesItem.startMinute"
                  behavior="menu"
                  outlined
                  dense
                  emit-value
                  map-options
                  :options="minuteSelectOptions"
                  :option-label="
                    (item) =>
                      item === '' ? minuteSelectOptions[0].label : item.label
                  "
                  option-value="value"
                  size="xs"
                  style="min-width:100px;"
                >
                </q-select>
              </td>
              <td class="text-center">
                <!-- select -->
                <q-select
                  v-model="talentServicesItem.endHour"
                  behavior="menu"
                  outlined
                  dense
                  emit-value
                  map-options
                  :options="hourSelectOptions"
                  :option-label="
                    (item) =>
                      item === '' ? hourSelectOptions[0].label : item.label
                  "
                  option-value="value"
                  size="xs"
                  style="min-width:100px;"
                >
                </q-select>
              </td>
              <td class="text-center">
                <!-- s -->
                <q-select
                  v-model="talentServicesItem.endMinute"
                  behavior="menu"
                  outlined
                  dense
                  emit-value
                  map-options
                  :options="minuteSelectOptions"
                  :option-label="
                    (item) =>
                      item === '' ? minuteSelectOptions[0].label : item.label
                  "
                  option-value="value"
                  size="xs"
                  style="min-width:100px;"
                >
                </q-select>
              </td>

              <td class="text-center">
                <q-btn
                  round
                  class="q-mr-xs"
                  size="xs"
                  color="secondary"
                  icon="add_circle"
                  @click="addRow(talentServicesItem, 'talentServices')"
                />
              </td>
            </tr>
            <tr v-for="(item, index) in addForm.talentServices" :key="index">
              <td class="text-center">{{ item.type | typeFilter }}</td>

              <td class="text-center" v-if="item.type === 'skills'">
                {{ skillsName(item.serviceId) }}
              </td>
              <td class="text-center" v-if="item.type === 'service'">
                {{ serviceName(item.serviceId) }}
              </td>
              <td class="text-center">{{ item.date | dateFilter }}</td>
              <td class="text-center">{{ item.startHour | hourFilter }}</td>
              <td class="text-center">
                {{ item.startMinute | minuteFilter }}
              </td>
              <td class="text-center">{{ item.endHour | hourFilter }}</td>
              <td class="text-center">
                {{ item.endMinute | minuteFilter }}
              </td>

              <td class="text-center">
                <q-btn
                  round
                  size="xs"
                  color="secondary"
                  icon="remove_circle"
                  @click="delRow(index, 'talentServices')"
                />
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </div>

    <!-- 送出鍵 -->
    <div
      class="row col-12 q-col-gutter-x-sm q-col-gutter-y-sm q-mt-md "
      :class="$q.screen.lt.sm ? 'justify-center' : 'justify-end'"
    >
      <div class="q-pa-md q-gutter-sm">
        <q-btn
          :size="$q.screen.lt.sm ? 'md' : 'sm'"
          color="white"
          text-color="black"
          label="取消"
          @click="clickCancel()"
        />
        <q-btn
          :size="$q.screen.lt.sm ? 'md' : 'sm'"
          color="primary"
          label="保存"
          @click="clickSave"
        />
      </div>
    </div>
  </div>
</template>
<script>
import ComInput from "@/components/Common/form/ComInput";
import ComSelect from "@/components/Common/form/ComSelect";
import ComSelectDate from "@/components/Common/form/ComSelectDate";
import { getSkillsList } from "@/api/skills";
import { getServiceList } from "@/api/service";
import { addTalent, updateTalent, getTalentInfoById } from "@/api/talent";
import {
  genderOptions, // 性別
  rowOptions,
  educationOptions, // 教育程度
  talentServicesOptions, // talentServices 人才服務
  weekSelectOptions, // 星期下拉
  hourSelectOptions, // 開始結束時間-小時 下拉
  minuteSelectOptions, // 開始結束時間-分鐘 下拉
} from "@/utils/common/dropdown-list.js";

export default {
  beforeRouteEnter (to, from,next) {
    if(to.query.id){
      to.meta.title="人才管理/人才詳情"
      next()
    }
    next()
  },
  components: {
    ComSelect,
    ComSelectDate,
    ComInput,
  },
  data() {
    return {
      genderOptions, // 性別
      educationOptions, // 教育程度
      talentServicesOptions, // talentServices 人才服務
      weekSelectOptions, // 星期下拉
      hourSelectOptions, // 開始結束時間-小時 下拉
      minuteSelectOptions, // 開始結束時間-分鐘 下拉
      skillsSelectOptions: [], // skills 下拉
      serviceSelectOptions: [], // service 下拉
      addForm: {
        id: "",
        name: "", // 姓名 OK
        gender: "", // 性別 OK
        birthday: "", // 生日 OK
        country: "", // 國籍 OK
        photo: "", // 照片 OK
        phone: "", // 行動電話 OK
        email: "", // Email OK
        identityNumber: "", // 身分證碼 OK
        address: "", // 住宅地址 OK
        companyAddress: "", // 服務機關地址 OK
        price: "", // 時薪
        status: "", // 預留  => String type
        note: "", // 預留  => String type
        educationalExperiences: [], // 教育經歷

        workExperiences: [], // 工作經歷
        talentServices: [], //人才服務
      },
      photoName: "",
      tableEduColumns: [
        {
          name: "schoolName",
          label: "學校名稱",
          field: "schoolName",
          align: "center",
        },
        {
          name: "country",
          label: "就讀國家",
          field: "country",
          align: "center",
        },
        {
          name: "majorIn",
          label: "主修",
          field: "majorIn",
          align: "center",
        },

        {
          name: "degree",
          label: "學位",
          field: "degree",
          align: "center",
        },
        {
          name: "startedTime",
          label: "入學日期",
          field: "startedTime",
          align: "center",
        },
        {
          name: "endedTime",
          label: "畢業日期",
          field: "endedTime",
          align: "center",
        },
      ],
      eduItem: {
        schoolName: "", //畢業學校
        country: "", // 學校國別
        majorIn: "", // 主修
        degree: "", // 學位
        startedTime: "", // 開始日期
        endedTime: "", // 畢業日期
      },
      //
      tableExpColumns: [
        {
          name: "company",
          label: "公司名稱",
          field: "company",
          align: "center",
        },
        {
          name: "department",
          label: "服務部別",
          field: "department",
          align: "center",
        },
        {
          name: "position",
          label: "職稱",
          field: "position",
          align: "center",
        },

        {
          name: "startedTime",
          label: "就職日期",
          field: "startedTime",
          align: "center",
        },
        {
          name: "endedTime",
          label: "離職日期",
          field: "endedTime",
          align: "center",
        },
      ],
      experienceItem: {
        company: "", // 公司名
        department: "", // 服務部別
        position: "", // 職稱
        startedTime: "", // 開始日期
        endedTime: "", // 結束日期
      },
      // talentServices 人才服務
      tableTalentServicesColumns: [
        {
          name: "type",
          label: "類型",
          field: "type",
          align: "center",
        },
        {
          name: "serviceId",
          label: "名稱",
          field: "serviceId",
          align: "center",
        },
        {
          name: "date",
          label: "星期",
          field: "date",
          align: "center",
        },

        {
          name: "startHour",
          label: "開始時間-小時",
          field: "startHour",
          align: "center",
        },
        {
          name: "startMinute",
          label: "開始時間-分鐘",
          field: "startMinute",
          align: "center",
        },
        {
          name: "endHour",
          label: "結束時間-小時",
          field: "endHour",
          align: "center",
        },
        {
          name: "endMinute",
          label: "結束時間-分鐘",
          field: "endMinute",
          align: "center",
        },
      ],
      talentServicesItem: {
        type: "skills", // 類型 service| skills string
        serviceId: "", //服務ID
        timeType: "1", // 時間類型 string => 目前寫死
        date: "1", // 週一到週日string
        startHour: 0, // 開始時間-小時	integer($int32)
        startMinute: 0, // 開始時間-分鐘	integer($int32)
        endHour: 0, // 	結束時間-小時 integer($int32)
        endMinute: 0, // 結束時間-分鐘	integer($int32)
      },
      validateObj: {
        eduItemRef: [
          "eduItem_schoolName",
          "eduItem_country",
          "eduItem_majorIn",
          "eduItem_degree",
          "eduItem_startedTime",
          "eduItem_endedTime",
        ],
        experienceItemRef: [""],
        talentServicesItemRef: [""],
      },
    };
  },
  filters: {
    typeFilter(val) {
      return val === "skills" ? "專業技能" : "服務";
    },

    dateFilter(val) {
      return weekSelectOptions.find((item) => item.value === val).label;
    },
    hourFilter(val) {
      return hourSelectOptions.find((item) => item.value === val).label;
    },
    minuteFilter(val) {
      return minuteSelectOptions.find((item) => item.value === val).label;
    },
  },
  created() {
    if (this.$route.query.id) {
      this.getTalentInfo(this.$route.query.id);
      this.initData();
    } else {
      this.initData();
      
    }
  },
  // 計算屬性
  computed: {
    skillsName() {
      return function skillsName(val) {
        let temp = this.skillsSelectOptions.find((item) => item.value === val);
        return temp.label;
      };
    },
    serviceName() {
      return function serviceName(val) {
        let temp = this.serviceSelectOptions.find((item) => item.value === val);
        return temp.label;
      };
    },
  },
  // 組件方法
  methods: {
    async initSkillsDropdownList() {
      await getSkillsList()
        .then((res) => {
          if (res.status == 200) {
            res.data.forEach((obj) => {
              let temp = {};
              temp.value = obj.id;
              temp.label = obj.name;
              this.skillsSelectOptions.push(temp);
            });
            console.log(
              "this.skillsSelectOptions>>>",
              this.skillsSelectOptions
            );
          }
        })
        .catch((err) => {});
    },
    async initServiceDropdownList() {
      await getServiceList()
        .then((res) => {
          if (res.status == 200) {
            res.data.forEach((obj) => {
              let temp = {};
              temp.value = obj.id;
              temp.label = obj.name;
              this.serviceSelectOptions.push(temp);
            });
            
          }
        })
        .catch((err) => {});
    },
    initData() {
      this.initSkillsDropdownList();
      this.initServiceDropdownList();
    },

    // 預覽圖片
    previewImage: function(event) {
      var input = event.target;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.addForm.photo = e.target.result;
        };
        this.photoName = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },
    //點擊取消
    clickCancel() {
      this.$q.loading.show();
      setTimeout(() => {
        this.reset("addForm");

        this.$q.loading.hide();
        // document.body.scrollTop = 0;
        // document.documentElement.scrollTop = 0;
        
      }, 3000);
    },
    // 點擊保存
    async clickSave() {
      let errorText = [];
      if (this.addForm.name === "") {
        errorText.push("姓名欄位未填");
      }
      if (this.addForm.gender === "") {
        errorText.push("性別欄位未填");
      }
      if (errorText.length > 0) {
        this.$q.notify({
          message: `欄位${errorText.join(",")} 未填`,
          color: "negative",
          position: "top-right",
        });
        return;
      }
      if (this.$route.query.id) {
        await updateTalent(this.addForm)
          .then((res) => {
            if (res.status === 200) {
              
              this.$q.notify({
                message: "保存成功",
                color: "positive",
                position: "top-right",
              });
            }
          })
          .catch((err) => {
            console.log("addTalent err", err);
          });
      } else {
        await addTalent(this.addForm)
          .then((res) => {
            if (res.status === 200) {
             
              this.reset("addForm");
            }
          })
          .catch((err) => {
            console.log("addTalent err", err);
          });
      }
    },

    // 獲取特定專才
    async getTalentInfo(id) {
      await getTalentInfoById(id)
        .then((res) => {
          if (res.status === 200) {
            this.addForm = res.data;
          }
        })
        .catch((err) => {
          console.log("getTalentInfoById err >>>", err);
        });
    },
    changeType(e){
    },
    // 重置
    reset(type) {
      switch (type) {
        case "edu":
          this.eduItem = {
            schoolName: "", //畢業學校
            country: "", // 學校國別
            majorIn: "", // 主修
            degree: "", // 學位
            startedTime: "", // 開始日期
            endedTime: "", // 畢業日期
          };

          break;
        case "experience":
          this.experienceItem = {
            company: "", // 公司名
            department: "", // 服務部別
            position: "", // 職稱
            startedTime: "", // 開始日期
            endedTime: "", // 畢業日期
          };
          break;
        case "talentServices":
          this.talentServicesItem = {
            type: "skills", // 類型 service| skills string
            serviceId: "", //服務ID
            timeType: "1", // 時間類型 string => 目前寫死
            date: "1", // 週一到週日string
            startHour: 0, // 開始時間-小時	integer($int32)
            startMinute: 0, // 開始時間-分鐘	integer($int32)
            endHour: 0, // 	結束時間-小時 integer($int32)
            endMinute: 0, // 結束時間-分鐘	integer($int32)
          };
          break;
        case "addForm":
          this.addForm = {
            name: "", // 姓名 OK
            gender: "", // 性別 OK
            birthday: "", // 生日 OK
            country: "", // 國籍 OK
            photo: "", // 照片 OK
            phone: "", // 行動電話 OK
            email: "", // Email OK
            identityNumber: "", // 身分證碼 OK
            address: "", // 住宅地址 OK
            companyAddress: "", // 服務機關地址 OK
            price: "", // 時薪
            status: "", // 預留  => String type
            note: "", // 預留  => String type
            educationalExperiences: [], // 教育經歷

            workExperiences: [], // 工作經歷
            talentServices: [], //人才服務
          };
          break;
      }
    },

    addRow(item, type) {
      if (type === "edu") {
        let errNUm = 0;
        // eduItem_schoolName eduItem_country  eduItem_majorIn eduItem_degree eduItem_startedTime eduItem_endedTime
        if (item.schoolName === "") {
          errNUm += 1;
          // this.$refs.eduItem_schoolName.innerError = true;
          // this.$refs.eduItem_schoolName.innerErrorMessage = this.$refs.eduItem_schoolName.rules[0]();
        }

        if (errNUm > 0) {
          this.$q.notify({
            message: "欄位未填",
            color: "negative",
            position: "top-right",
          });
          return;
        }

        this.addForm.educationalExperiences.push(item);
        this.reset((type = "edu"));
      } else if (type === "experience") {
        let errNum = 0;
        if (item.company === "") {
          errNum += 1;
        }
        if (item.department === "") {
          errNum += 1;
        }
        if (item.position === "") {
          errNum += 1;
        }
        if (item.startedTime === "") {
          errNum += 1;
        }
        if (item.endedTime === "") {
          errNum += 1;
        }

        if (errNum > 0) {
          this.$q.notify({
            message: "欄位未填",
            color: "negative",
            position: "top-right",
          });
          return;
        }

        this.addForm.workExperiences.push(item);
        this.reset((type = "experience"));
      } else if (type === "talentServices") {
        let errNum = 0;
        if (item.serviceId === "") {
          errNum += 1;
        }
        if (errNum > 0) {
          this.$q.notify({
            message: "欄位未填",
            color: "negative",
            position: "top-right",
          });
          return;
        }

        this.addForm.talentServices.push(item);
        this.reset((type = "talentServices"));
      }
    },
    delRow(idx, type) {
      if (type === "edu") {
        this.addForm.educationalExperiences.splice(idx, 1);
      } else if (type === "experience") {
        this.addForm.workExperiences.splice(idx, 1);
      } else if (type === "talentServices") {
        this.addForm.talentServices.splice(idx, 1);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.image-avatar {
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto 8px;
}
// .info-content {
//   width: 100%;
//   display: flex;
//   flex-direction: column;
// }

.custom-file-input::-webkit-file-upload-button {
  visibility: hidden;
}
.custom-file-input::before {
  content: "上傳照片";
  display: inline-block;
  background: linear-gradient(top, #f9f9f9, #e3e3e3);
  border: 1px solid #999;
  border-radius: 3px;
  padding: 5px 8px;
  outline: none;
  white-space: nowrap;
  -webkit-user-select: none;
  cursor: pointer;
  text-shadow: 1px 1px #fff;
  font-weight: 700;
  font-size: 10pt;
  width: 180px;
  text-align: center;
}
.custom-file-input:hover::before {
  border-color: black;
}
.custom-file-input:active::before {
  background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
}
</style>
