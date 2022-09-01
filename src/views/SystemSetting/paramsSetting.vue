<template>
  <div class="q-pa-md">
    <div class="row q-pa-md q-col-gutter-x-sm q-col-gutter-y-sm">
      <!--  -->
      <div class="col-12 col-md-6">
        <com-input
          ref="comCheck"
          v-model="form.OPSWAT_server"
          label="OPSWAT Server"
          :required-valid="false"
        ></com-input>
      </div>
      <!--  -->
      <div class="col-12 col-md-6">
        <com-input
          ref="comCheck"
          v-model="form.OPSWAT_server_port"
          label="OPSWAT Server Port"
          :required-valid="false"
          :style="$q.screen.lt.sm ? '' : 'width:400px;'"
        ></com-input>
      </div>
      <!--  -->
      <div class="col-12 col-md-6">
        <com-input
          ref="comCheck"
          v-model="form.sql_server"
          label="SQL Server"
          :required-valid="false"
        ></com-input>
      </div>
      <!--  -->
      <div class="col-12 col-md-6">
        <com-input
          ref="comCheck"
          v-model="form.sql_server_port"
          label="SQL Server Port"
          :required-valid="false"
          :style="$q.screen.lt.sm ? '' : 'width:400px;'"
        ></com-input>
      </div>
      <!-- FOX DataDiode Proxy目錄 -->
      <div class="col-12 col-md-6">
        <!-- <com-input
          ref="comCheck"
          v-model="form.fox_datadiode_proxy"
          label="FOX DataDiode Proxy目錄"
          :required-valid="false"
        >
          <template v-slot:append>
            <q-icon name="folder" />
          </template>
        </com-input> -->
      </div>
      <div class="col-12 col-md-6"></div>

      
      <div class="col-12 col-md-12"></div>
      <!-- 多對多 -->

      <label
        v-if="!$q.screen.lt.sm"
        class="col-12 col-md-2 "
        :style="$q.screen.lt.sm ? 'text-align:left;' : 'text-align:right;'"
        style="width:188px;font-size:14px;"
        >收發檔案路徑:
      </label>

      <div v-else class="col-12 ">
        <span class="text-center" style="font-size:16px;font-weight:bold;"
          >收發檔案路徑</span
        >
      </div>
      <div
        v-if="!$q.screen.lt.sm"
        class="col-12 col-md-8 "
        style="margin-left:0px;"
      >
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
                  v-model="fileItem.from_file"
                  type="text"
                  outlined
                  dense
                ></q-input>
              </td>
              <td class="text-center">
                <q-input
                  v-model="fileItem.to_file"
                  type="text"
                  outlined
                  dense
                ></q-input>
              </td>

              <td class="text-center">
                <q-btn
                  class="q-mr-xs"
                  size="sm"
                  color="info"
                  icon="add_circle"
                  style="width:100px;"
                  @click="addRow(fileItem)"
                />
              </td>
            </tr>
            <tr v-for="(item, index) in fileItemList" :key="index">
              <td class="text-center">{{ item.from_file }}</td>
              <td class="text-center">{{ item.to_file }}</td>

              <td class="text-center">
                <q-btn
                  size="sm"
                  color="info"
                  style="width:100px;"
                  icon="remove_circle"
                  @click="delRow(index, item)"
                />
              </td>
            </tr>
          </tbody>
        </q-markup-table>
        
        <!-- <q-tree  :nodes="fileItemListTree" node-key="label" default-expand-all /> -->
        
      </div>
      <!-- mobile -->
      <div v-if="$q.screen.lt.sm" class="col-12">
        <div class="q-mb-sm ">
          <com-input
            v-model="fileItem.from_file"
            form-label="來源檔案"
          ></com-input>
        </div>
        <div class="q-mb-sm ">
          <com-input
            v-model="fileItem.to_file"
            form-label="目的檔案"
          ></com-input>
        </div>

        <div class="q-mb-sm ">
          <q-btn
            style="font-size:12px;width:100%;"
            class=""
            color="info"
            icon="add"
            @click="addRow(fileItem)"
          ></q-btn>
        </div>
      </div>
      <!-- mobile -->
      <div v-if="$q.screen.lt.sm && fileItemList.length != 0" class="col-12">
        <q-table
          grid
          :data="fileItemList"
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
                      >移除<span style="font-weight:bold"
                        >{{ props.row.from_file }}->{{
                          props.row.to_file
                        }}</span
                      >該項目</span
                    >
                    <q-btn
                      size="sm"
                      color="secondary"
                      icon="remove"
                      @click="delRow(props.rowindex, props.row)"
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

      <div
        class="col-12 col-md-12"
        style="display:flex;min-height:40px;"
        :style="
          $q.screen.lt.sm
            ? 'flex-direction:column;padding:0px 0px 0px 4px;'
            : 'flex-direction:row;padding:8px 0px 0px 4px;'
        "
      >
        <label
          :style="$q.screen.lt.sm ? 'text-align:left;' : 'text-align:right;'"
          style="display:block;width:180px;margin-right:2px;font-size:16px;padding-top:10px;"
          >自動傳送時間設定:
        </label>
      </div>
      <div
        class=""
        style="display:flex;flex:1;margin-left:3px;"
        :style="
          $q.screen.lt.sm ? 'flex-direction:column;' : 'flex-direction:row;'
        "
      >
        <q-list
          :style="
            $q.screen.lt.sm ? 'width:100%;padding-left:0px;' : 'width:40vw;'
          "
        >
          <q-item
            style="padding:2px 0px;"
            :style="$q.screen.lt.sm ? 'padding-left:0px;' : ''"
          >
            <q-item-section>
              <com-input
                ref="comCheck"
                v-model="form.resend_file"
                label="檔案傳送次數"
                :required-valid="false"
              >
              </com-input>
            </q-item-section>
          </q-item>
          <q-item
            style="padding:2px 0px;"
            :style="$q.screen.lt.sm ? 'padding-left:0px;' : ''"
          >
            <q-item-section>
              <div
                class=""
                style="display:flex;flex:1;"
                :style="
                  $q.screen.lt.sm ? 'margin-left:0px;' : 'margin-left:100px;'
                "
              >
                <span
                  class=""
                  style="margin-top:10px;"
                  :style="
                    $q.screen.lt.sm
                      ? 'text-align:left;width:70px;'
                      : 'text-align:right;width:80px;'
                  "
                  >區間選項:</span
                >
                <q-radio
                  dense
                  v-model="form.time_option"
                  val="mins"
                  label="固定間隔"
                  :style="
                    $q.screen.lt.sm ? 'margin-left:0px;' : 'margin-left:10px;'
                  "
                />
                <q-radio
                  dense
                  v-model="form.time_option"
                  val="setTime"
                  label="固定時間"
                  style="margin-left:10px;"
                />
              </div>
            </q-item-section>
          </q-item>
          <q-item
            v-if="form.time_option === 'mins'"
            style="padding:2px 0px;"
            :style="$q.screen.lt.sm ? 'padding-left:0px;' : ''"
          >
            <q-item-section>
              <div
                class=""
                style="display:flex;flex:1;"
                :style="
                  $q.screen.lt.sm ? 'margin-left:0px;' : 'margin-left:150px;'
                "
              >
                <span class="" style="width:40px;margin-top:10px;">每隔</span>
                <q-select
                  v-model="form.time_range"
                  behavior="menu"
                  outlined
                  :options="timeRanges"
                  dense
                  style="width:200px;"
                >
                </q-select>
                <span style="margin-top:10px;margin-left:4px;"
                  >自動傳送檔案</span
                >
              </div>
            </q-item-section>
          </q-item>
          <q-item
            v-else
            style="padding:2px 0px;"
            :style="$q.screen.lt.sm ? 'padding-left:0px;' : ''"
          >
            <q-item-section>
              <div
                class=""
                style="display:flex;flex-direction:column;flex:1;"
                :style="
                  $q.screen.lt.sm ? 'margin-left:0px;' : 'margin-left:150px;'
                "
              >
                <span class="" style="margin-bottom:8px;"
                  >於下列時間區段，執行自動檔案傳送</span
                >
                <!--  -->
                <div class="" style="display:flex;margin-bottom:8px;">
                  <span
                    class=""
                    style="padding:8px;font-size:14px;font-weight:bold;"
                    >(1)</span
                  >
                  <q-input
                    dense
                    outlined
                    v-model="setTimeItem1.from"
                    mask="time"
                    :style="$q.screen.lt.sm ? 'width:140px;' : 'width:150px;'"
                  >
                    <template v-slot:append>
                      <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-time v-model="setTimeItem1.from">
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Close"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-time>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                  <span
                    class=""
                    style="padding:8px;font-size:14px;font-weight:bold;"
                    >~</span
                  >

                  <q-input
                    dense
                    outlined
                    v-model="setTimeItem1.to"
                    mask="time"
                    :style="$q.screen.lt.sm ? 'width:140px;' : 'width:150px;'"
                  >
                    <template v-slot:append>
                      <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-time v-model="setTimeItem1.to">
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Close"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-time>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>

                <!--  -->
                <div class="" style="display:flex;margin-bottom:8px;">
                  <span
                    class=""
                    style="padding:8px;font-size:14px;font-weight:bold;"
                    >(2)</span
                  >
                  <q-input
                    dense
                    outlined
                    v-model="setTimeItem2.from"
                    mask="time"
                    :style="$q.screen.lt.sm ? 'width:140px;' : 'width:150px;'"
                  >
                    <template v-slot:append>
                      <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-time v-model="setTimeItem1.from">
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Close"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-time>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                  <span
                    class=""
                    style="padding:8px;font-size:14px;font-weight:bold;"
                    >~</span
                  >

                  <q-input
                    dense
                    outlined
                    v-model="setTimeItem2.to"
                    mask="time"
                    :style="$q.screen.lt.sm ? 'width:140px;' : 'width:150px;'"
                  >
                    <template v-slot:append>
                      <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-time v-model="setTimeItem1.to">
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Close"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-time>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>

                <!--  -->
                <div class="" style="display:flex;margin-bottom:8px;">
                  <span
                    class=""
                    style="padding:8px;font-size:14px;font-weight:bold;"
                    >(3)</span
                  >
                  <q-input
                    dense
                    outlined
                    v-model="setTimeItem3.from"
                    mask="time"
                    :style="$q.screen.lt.sm ? 'width:140px;' : 'width:150px;'"
                  >
                    <template v-slot:append>
                      <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-time v-model="setTimeItem1.from">
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Close"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-time>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                  <span
                    class=""
                    style="padding:8px;font-size:14px;font-weight:bold;"
                    >~</span
                  >

                  <q-input
                    dense
                    outlined
                    v-model="setTimeItem3.to"
                    mask="time"
                    :style="$q.screen.lt.sm ? 'width:140px;' : 'width:150px;'"
                  >
                    <template v-slot:append>
                      <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-time v-model="setTimeItem1.to">
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Close"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-time>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>

                <!--  -->
                <div class="" style="display:flex;margin-bottom:8px;">
                  <span
                    class=""
                    style="padding:8px;font-size:14px;font-weight:bold;"
                    >(4)</span
                  >
                  <q-input
                    dense
                    outlined
                    v-model="setTimeItem4.from"
                    mask="time"
                    :style="$q.screen.lt.sm ? 'width:140px;' : 'width:150px;'"
                  >
                    <template v-slot:append>
                      <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-time v-model="setTimeItem1.from">
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Close"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-time>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                  <span
                    class=""
                    style="padding:8px;font-size:14px;font-weight:bold;"
                    >~</span
                  >

                  <q-input
                    dense
                    outlined
                    v-model="setTimeItem4.to"
                    mask="time"
                    :style="$q.screen.lt.sm ? 'width:140px;' : 'width:150px;'"
                  >
                    <template v-slot:append>
                      <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-time v-model="setTimeItem1.to">
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Close"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-time>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>

                <!--  -->
                <div class="" style="display:flex;margin-bottom:8px;">
                  <span
                    class=""
                    style="padding:8px;font-size:14px;font-weight:bold;"
                    >(5)</span
                  >
                  <q-input
                    dense
                    outlined
                    v-model="setTimeItem5.from"
                    mask="time"
                    :style="$q.screen.lt.sm ? 'width:140px;' : 'width:150px;'"
                  >
                    <template v-slot:append>
                      <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-time v-model="setTimeItem1.from">
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Close"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-time>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                  <span
                    class=""
                    style="padding:8px;font-size:14px;font-weight:bold;"
                    >~</span
                  >

                  <q-input
                    dense
                    outlined
                    v-model="setTimeItem5.to"
                    mask="time"
                    :style="$q.screen.lt.sm ? 'width:140px;' : 'width:150px;'"
                  >
                    <template v-slot:append>
                      <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-time v-model="setTimeItem1.to">
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Close"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-time>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </div>

      <div
        class="col-12"
        style="display:flex;flex-direction:row;justify-content:flex-end;align-items:center;"
      >
        <!-- <q-btn style="width:20%;" size="md" text-color="black" label="取消" /> -->

        <q-btn
          :style="$q.screen.lt.sm ? 'width:100%;' : 'width:20%;'"
          size="md"
          color="primary"
          text-color="white"
          label="設定"
          @click="onSubmit"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ComInput from "@/components/Common/form/ComInput";
export default {
  components: { ComInput },
  data() {
    return {
      form: {
        OPSWAT_server: "",
        OPSWAT_server_port: "",
        sql_server: "",
        sql_server_port: "",
        // fox_datadiode_proxy: "", //FOX DataDiode Proxy目錄
        collect_file: "", //收集檔案目錄
        resend_file: "", //重送檔案目錄
        // http_forwarding: true,
        // rest_forwarding: true,
        // email_warning: true,
        auto_send_time_seeting: "", //自動傳送時間設定
        send_number: 0,
        time_option: "mins",
        time_range: "", //每隔
      },
      tableExpColumns: [
        {
          name: "from_file",
          label: "來源檔案",
          field: "from_file",
          align: "center",
        },
        {
          name: "to_file",
          label: "目的檔案",
          field: "to_file",
          align: "center",
        },
      ],
      fileItem: {
        from_file: "", // 來源
        to_file: "", // 目的
      },
      fileItemList: [],
      fileItemListTree: [],
      setTimeItem1: { from: "", to: "" },
      setTimeItem2: { from: "", to: "" },
      setTimeItem3: { from: "", to: "" },
      setTimeItem4: { from: "", to: "" },
      setTimeItem5: { from: "", to: "" },
      timeRanges: ['15分鐘','30分鐘', '45分鐘', '1小時', '2小時'],
    };
  },
  watch: {},
  methods: {
    onSubmit() {},
    addRow(item) {
      let errNUm = 0;
      // eduItem_schoolName eduItem_country  eduItem_majorIn eduItem_degree eduItem_startedTime eduItem_endedTime
      if (item.from_file === "" || item.to_file === "") {
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

      this.fileItemList.push(item);
      // this.getTreeData(item);
      this.reset();
    },
    reset() {
      this.fileItem = {
        from_file: "", // 來源
        to_file: "", // 目的
      };
    },
    delRow(idx,item) {
      
      this.fileItemList.splice(idx, 1);
      // this.fileItemListTree.forEach((obj) => {
      //     if (obj.label === item.from_file) {
      //       // 存在
      //       console.log(obj.children)
      //       let to_file_idx = obj.children.findIndex(item.to_file);
      //       console.log(to_file_idx)
      //       obj.children.splice(to_file_idx, 1);
      //       if(obj.children.length===0){
              
      //         this.fileItemListTree=this.fileItemListTree.filter( el => el.label !== item.from_file ); 
      //       }
      //     }
          
      //     return;
      //   });
    },
    // getTreeData(item) {
    //   console.log(item);
    //   console.log(
    //     this.fileItemListTree.some((obj) => obj.label == item.from_file)
    //   );
    //   if (!this.fileItemListTree.some((obj) => obj.label === item.from_file)) {
    //     // 不存在
    //     this.fileItemListTree.push({
    //       label: item.from_file,
    //       // icon: 'folder',
    //       children: [
    //         {
    //           label: item.to_file,
              
    //         },
    //       ],
    //     });
    //     return;
    //   } else {
    //     this.fileItemListTree.forEach((obj) => {
    //       if (obj.label === item.from_file) {
    //         // 存在
    //         obj.children.push({ label: item.to_file });
            
    //       }
    //       return;
    //     });
    //   }
    // },
  },
  created() {},
};
</script>

<style lang="css" scoped>
.this {
  border: 1px solid red;
}
.channel-column {
  width: 134px;
  font-size: 16px;
  text-align: center;
}
</style>
