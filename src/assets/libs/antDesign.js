import { Modal } from 'ant-design-vue';

export function ModalConfirm() {
  Modal.confirm({
    title: title,
    content: content,
    okText: okText,
    okType: okType,
    cancelText: cancelText,
    onOk() {
      callback()
    },
    onCancel() {
      callback1()
    },
  });
}

export function delModal() {
  Modal.destroyAll();
}