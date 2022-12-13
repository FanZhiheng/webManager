<template>
  <a-form ref="formElem" :model="formData" :rules="rules">
    <a-form-item label="日报时间" name="reportDate">
      <a-date-picker
        v-model:value="formData.reportDate"
        placeholder="请选择日报时间"
        format="YYYY-MM-DD"
        value-format="YYYY-MM-DD"
        :disabled="dateDisable"
      />
    </a-form-item>
    <a-form-item label="上传文件" name="fileNum">
      <a-upload
        :action="`${baseURL}file/uploadFile`"
        v-model:file-list="fileList"
        @change="fileChange"
        :beforeUpload="beforeUpload"
        accept=".pdf"
        :remove="removeFile"
      >
        <a-button> {{ "上传文件" }} </a-button>
        <p class="font_CCC font_10" style="margin-top: 8px">*pdf文件大小不得超过2M</p>
      </a-upload>
      <a-button type="link" v-if="isUpdate" @click="checkDetail">{{
        formData.fileNum
      }}</a-button>
    </a-form-item>
    <a-form-item>
      <div class="flex just-end align-center">
        <a-button @click="cancel">取消</a-button>
        <a-button type="primary" @click="submit" class="margin_l_10" :loading="loading"
          >提交</a-button
        >
      </div>
    </a-form-item>

    <a-modal
      v-model:visible="showModal"
      title="查看文件"
      @ok="showModal = false"
      @cancel="showModal = false"
      destroyOnClose
      :footer="null"
      width="1000px"
    >
      <read-pdf :id="pdfId" />
    </a-modal>
  </a-form>
</template>

<script>
import ReadPdf from "@/components/readPDF";

import { defineComponent, ref, reactive, toRefs, computed } from "vue";
import { addReport, updateReport } from "@/api/report";
import { message } from "ant-design-vue";

export default defineComponent({
  name: "createReport",
  components: {
    ReadPdf,
  },
  emits: ["custom-close", "submit-complete"],
  props: {
    cardId: {
      type: String,
      default() {
        return "";
      },
    },
    existData: {
      type: Object,
      default() {
        return null;
      },
    },
    isUpdate: {
      type: Boolean,
      default() {
        return false;
      },
    },
    dateDisable: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  setup(props, { emit }) {
    const data = reactive({
      showModal: false,
      formElem: ref(),
      formData: {
        reportDate: "",
        fileNum: "",
        cardId: props.cardId,
      },
      rules: {
        reportDate: [{ required: true, message: "请选择日报时间", trigger: "change" }],
        fileNum: [{ required: true, message: "请上传文件", trigger: "change" }],
      },
      fileList: [],
      loading: false,
      pdfId: "",
      baseURL: process.env.NODE_ENV === "production" ? "/chatbotexam/" : "/",
    });

    if (props.isUpdate) {
      Object.assign(data.formData, props.existData);
    }

    const fileChange = ({ file }) => {
      console.log(file);
      if (file.status === "done") {
        if (file.response.code === "500") {
          data.fileList.splice(0, 1);
          message.error("上传失败");
          return;
        }
        if (data.fileList.length > 1) {
          data.fileList.splice(0, 1);
        }
        data.formData.fileNum = file.response.data;
      }
    };

    const removeFile = (file) => {
      let idx = data.fileList.findIndex((i) => i.response.data === file);
      data.fileList.splice(idx, 1);
      data.formData.fileNum = "";
    };

    const beforeUpload = (file) => {
      if (file.size / 1024 >= 2000) {
        setTimeout(() => {
          message.error("上传的文件不得大于2兆");
          let index = data.fileList.findIndex((elem) => elem.response);
          if (index !== -1) {
            data.fileList.pop();
          } else {
            data.fileList = [];
          }
        }, 500);
        return false;
      }
    };
    const cancel = () => {
      emit("custom-close");
    };

    const submit = () => {
      data.formElem.validate().then(() => {
        if (props.existData) {
          if (data.formData.fileNum === props.existData.fileNum) {
            emit("submit-complete");
            return;
          }
        }

        data.loading = true;
        // console.log(data.formData)
        if (props.isUpdate) {
          updateReport(data.formData)
            .then((res) => {
              data.loading = false;
              message.success({
                content: "日报修改成功",
                duration: 3,
              });
              emit("submit-complete");
            })
            .catch((err) => {
              data.loading = false;
            });
        } else {
          addReport(data.formData)
            .then((res) => {
              data.loading = false;
              message.success({
                content: "日报新增成功",
                duration: 3,
              });
              emit("submit-complete");
            })
            .catch((err) => {
              data.loading = false;
            });
        }
      });
    };

    const checkDetail = () => {
      if (data) {
        data.pdfId = data.formData.fileNum;
        data.showModal = true;
      }
    };
    return {
      ...toRefs(data),
      fileChange,
      removeFile,
      cancel,
      submit,
      checkDetail,
      beforeUpload,
    };
  },
});
</script>
