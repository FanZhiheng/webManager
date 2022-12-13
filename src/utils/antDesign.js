import empty from "_c/other/empty";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { Modal } from "ant-design-vue";
import { createVNode } from "vue";

export const AntdDelModal = (title, callback) => {
  Modal.confirm({
    title: '题库系统业务平台',
    icon: createVNode(ExclamationCircleOutlined),
    content: title,
    okText: "确认",
    cancelText: "取消",
    onOk() {
      return new Promise((resolve, reject) => {
        callback(resolve, reject)
      })
    },
    onCancel() {
      return;
    },
  });
}

export const AntdEmpty = (text = '暂无数据') => {
  return {
    emptyText: createVNode(empty, {
      text
    }),
  }
}