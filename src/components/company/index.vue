<template>
  <a-tree
    :tree-data="companyList"
    :replace-fields="treeProps"
    v-model:selectedKeys="selectedKeys"
    @select="treeSelect"
  />
</template>

<script>
import { defineComponent, reactive, toRefs } from "vue";

import { getAllDeptByDeptID } from "@/api/contact";

export default defineComponent({
  name: "company",
  emits: ["custom-tree-select"],
  setup(props, { emit }) {
    const data = reactive({
      companyList: [],
      selectedKeys: null,
    });

    const treeSelect = (item) => {
      emit("custom-tree-select", item[0]);
    };

    getAllDeptByDeptID().then((res) => {
      data.companyList.splice(0, data.companyList.length);
      data.companyList.push(...createTree(res.data, 0));
    });

    return {
      ...toRefs(data),
      treeProps: {
        children: "children",
        title: "orgName",
        key: "id",
      },
      treeSelect,
    };
  },
});

const companyObj = {};
export const createTree = (treeNodes, orgIds) => {
  const parentObj = {};
  const tree = [];
  const treeList = treeNodes.filter((node) => {
    return node.status != 8 && node.vId;
  });

  treeList.forEach((node) => {
    if (!parentObj[node.parentCode]) {
      parentObj[node.parentCode] = [];
    }

    if (node.previousId == 0) {
      if (!parentObj[node.previousId]) {
        parentObj[node.previousId] = [];
      }
      parentObj[node.previousId].push(node);
    } else {
      parentObj[node.parentCode].push(node);
    }
    companyObj[node.id] = node;
  });

  if (orgIds == 0) {
    tree.push(...parentObj[0]);
  } else {
    tree.push(companyObj[orgIds]);
  }

  mapTree(tree, parentObj);
  return tree;
};

const mapTree = (list, parentObj) => {
  list.forEach((node) => {
    if (parentObj[node.vId]) {
      node.children = [...parentObj[node.vId]];
    }

    if (node.children) {
      mapTree(node.children, parentObj);
    }
  });
};
</script>