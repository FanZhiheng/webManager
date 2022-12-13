<template>
  <div
    ref="divInt"
    class="div-input"
    contenteditable="true"
    @click="handleInputClick($event)"
    @keyup="handleKeyUp"></div>
</template>

<script>
import { defineComponent, nextTick, onMounted, reactive, ref, toRefs, watch } from 'vue'

export default defineComponent({
  name: 'divInput',
  props: {
    content: {
      type: String,
      default () {
        return ''
      }
    },
    variableList: { // 变量数据
      type: Array,
      default () {
        return []
      }
    },
    variable: { // 变量对象
      type: Object,
      default () {
        return null
      }
    },
    randomNum: { // 随机数
      type: Number,
      default () {
        return 0
      }
    }
  },
  emits: ['change'],
  setup(props, { emit }) {
    const data = reactive({
      divInt: ref(),
      blurIndex: 0,
      intHasFocus: false
    })
    // 点击 聚焦
    const handleInputClick = (e) => {
      let className = e.target.className
      if (className === 'inputStyle') {
        data.blurIndex = 0
      } else {
        let selection = window.getSelection();
        data.blurIndex = selection.getRangeAt(0);
        data.intHasFocus = true
      }
    }
    // 输入内容
    const handleKeyUp = () => {
      let selection = window.getSelection();
      data.blurIndex = selection.getRangeAt(0);
      // console.log(data.blurIndex)
      data.intHasFocus = true
      let html = handleMsg(data.divInt.innerHTML)
      emit('change', html)
    }

    const insertContent = (text) => {
      if (data.blurIndex === 0) { // 没有聚焦
        return
      }
      let divInt = data.divInt
      let selection = window.getSelection();
      divInt.focus()
      selection.removeAllRanges();
      selection.addRange(data.blurIndex);
      let dom = `<span class="inputStyle" contenteditable="false">${text}</span>`
      insertHtmlAtCaret(dom)
      data.blurIndex = selection.getRangeAt(0)
    }
    const insertHtmlAtCaret = (dom) => {
      let sel, range;
      if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
          range = sel.getRangeAt(0);
          range.deleteContents();
          let el = document.createElement("span");
          el.innerHTML = dom;
          let frag = document.createDocumentFragment();
          let node;
          let lastNode;
          while ((node = el.firstChild)) {
            lastNode = frag.appendChild(node);
          }
          range.insertNode(frag);
          if (lastNode) {
            range = range.cloneRange();
            range.setStartAfter(lastNode);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
          }
        }
      } else if (document.selection && document.selection.type !== "Control") {
        document.selection.createRange().pasteHTML(dom);
      }
      // console.log(handleMsg(data.divInt.innerHTML))
      emit('change', handleMsg(data.divInt.innerHTML))
    }

    const handleMsg = (content) => {
      let con = lastStep(content)
      let res = con
      props.variableList.forEach(i => {
        res = replaceAll(res, i.label, i.value)
      })
      return res
    }

    const handleMsgToHtml = (content) => {
      let con = lastStep1(content)
      // let msg = replaceAll(con, 'name', '姓名')
      // let text = replaceAll(msg, 'date', '日期')
      // let res = replaceAll(text, 'link', '链接')
      let res = con
      props.variableList.forEach(i => {
        res = replaceAll(res, i.value, i.label)
      })
      // console.log(res)
      return res
    }

    const lastStep = (content) => {
      let text;
      let aSpan = `<span class="inputStyle" contenteditable="false">`;
      let bSpan = "</span>";
      text = replaceAll(content, aSpan, "${");
      text = replaceAll(text, bSpan, "}");

      return text.trim();
    }

    const lastStep1 = (content) => {
      let styText;
      let aSpan = `<span class="inputStyle" contenteditable="false">`;
      let bSpan = "</span>";
      styText = content.replace(/(\${)/g, aSpan);
      styText = replaceAll(styText, "}", bSpan);
      return styText;
    }

    const replaceAll = (str, preVal, replaceVal) => {
      return str.replace(new RegExp(preVal, "g"), replaceVal);
    }

    watch(() => props.randomNum, () => {
      insertContent(props.variable.label)
    })

    watch(() => props.content, () => {
      nextTick(() => {
        if (!data.intHasFocus) { // 输入框有焦点 则不监听改变输入框的值 否则光标一直首位
          data.divInt.innerHTML = handleMsgToHtml(props.content)
        }
      })
    }, {
      immediate: true
    })

    // onMounted(() => {
    //   let dom = document.querySelector('.div-input')
    //   let config = { childList: true }
    //   let observer = new MutationObserver(mutations => {
    //     let removeChild = mutations[0].removedNodes[0]
    //     if (removeChild && removeChild.innerHTML) {
    //       let str = removeChild.innerHTML
    //       let obj = props.variableList.find(i => i.label === str)
    //       console.log('删除了: ', removeChild.innerHTML, obj.value)
    //     }
    //   })
    //   observer.observe(dom, config)
    // })

    return {
      ...toRefs(data),
      handleInputClick,
      handleKeyUp
    }
  },
})
</script>

<style lang="scss">
.inputStyle {
  color: #456ec6;
  background: rgba(203, 216, 255, 0.25);
  border-radius: 2px;
  border: none;
  text-align: center;
  padding: 3px;
  font-size: 12px;
  line-height: 24px;
  margin: 0 2px;
}
</style>

<style lang="scss" scoped>
.div-input {
  min-height: 100px;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  padding: 4px 11px;
  outline: none;
  transition: all 0.3s;
  white-space: pre-wrap;
  -webkit-user-modify: read-write-plaintext-only;
  &:hover {
    border-color: #40a9ff;
  }
  &:focus {
    border-color: #40a9ff;
    box-shadow: 0 0 0 2px #1890ff33;
  }
  &:empty::before {
    content: attr(placeholder);
    font-size: 14px;
    color: #ccc;
    line-height: 21px;
    padding-top: 10px;
  }
}
</style>
