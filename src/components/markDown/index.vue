<template>
  <div>
    <div class="mark-down">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <div id="editor">
        <Editor
          v-model="valueHtml"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="handleCreated"
          @onChange="getValueHtml"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import "@wangeditor/editor/dist/css/style.css";

import {
  defineComponent,
  onBeforeUnmount,
  shallowRef,
  reactive,
  toRefs,
} from "vue";
import { message } from "ant-design-vue";

export default defineComponent({
  name: "markDown",
  components: {
    Editor,
    Toolbar,
  },
  props: {
    valueHtml: {
      type: String,
      default() {
        return "";
      },
    },
    excludeKeys: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  emits: ["valueHtml-change"],
  setup(props, context) {
    const data = reactive({
      toolbarConfig: {
        // 自定义富文本工具栏
        excludeKeys: props.excludeKeys,
      },
      editorConfig: {
        placeholder: "请输入内容...",
        MENU_CONF: {
          fontSize: {
            fontSizeList: [
              "12px",
              "13px",
              "14px",
              "15px",
              "16px",
              "17px",
              "18px",
              "19px",
              "20px",
              "22px",
              "24px",
              "26px",
              "28px",
              "30px",
            ],
          },
        },
        // 重新配置
        hoverbarKeys: {
          text: {
            menuKeys: [
              "bold",
              "through",
              "color",
              "bgColor",
              "clearStyle",
            ],
          },
        },
      },
      mode: "default",
      valueHtml: "",
      content: "",
    });

    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef();

    const handleCreated = (editor) => {
      editorRef.value = editor; // 记录 editor 实例，重要！
      let editorConfig = editor.getConfig();
      editorConfig.maxLength = 1000;
    };

    const handlePStyle = (item) => {
      let obj = {};
      if (item.lineHeight) {
        obj.lineHeight = item.lineHeight;
      }
      if (item.textAlign) {
        obj.textAlign = item.textAlign;
      }
      if (item.indent) {
        obj.textIndent = item.indent;
      }
      return obj;
    };

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value;
      if (editor == null) return;
      editor.destroy();
    });

    // 子组件向父组件传参，
    const getValueHtml = () => {
      const editor = editorRef.value;
      data.content = editor.children;
      context.emit("valueHtml-change", data.valueHtml, data.content);
    };

    // 初始化，回显
    const init = () => {
      data.valueHtml = props.valueHtml;
    };

    init();

    return {
      ...toRefs(data),
      editorRef,
      handleCreated,
      handlePStyle,
      getValueHtml,
    };
  },
});
</script>

<style lang="scss">
.mark-down {
  border: 1px solid #ccc;
  border-radius: 2px;
  &:hover {
    border: 1px solid rgb(45, 139, 224);
  }
}
#editor {
  height: 300px;
  overflow-y: auto;
}
</style>
