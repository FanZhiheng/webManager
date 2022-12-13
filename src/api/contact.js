import { postRequest } from '@/utils/request'

// const baseURL = process.env.NODE_ENV === 'production'
//   ? '/chatbotexam/'
//   : '/';

const baseURL = "/chatbotexam/"
const url = {
  getUserList: `${baseURL}contact/contactList`,
  addUser: `${baseURL}contact/addContactUser`,
  delUser: `${baseURL}contact/delContactUser`,
  importContact: `${baseURL}contact/importContact`,
  getAllDeptByDeptID: `${baseURL}contact/getAllDeptByDeptID`,
  getUserByDeptId: `${baseURL}contact/getUserByDeptId`,
  addContactUserByUserIds: `${baseURL}contact/addContactUserByUserIds`,
}

// 获取通讯录列表
export const getUserList = (data) => postRequest(url.getUserList, data)

// 新增联系人
export const addUser = (data) => postRequest(url.addUser, data)

// 删除联系人
export const delUser = (data) => postRequest(url.delUser, data)

// 导入
export const importContact = (data) => postRequest(url.importContact, data)

// 获取部门下用户信息
export const getUserByDeptId = (data) => postRequest(url.getUserByDeptId, data)

// 添加企业通讯录
export const addContactUserByUserIds = (data) => postRequest(url.addContactUserByUserIds, data)

// 查询企业下所有部门
export const getAllDeptByDeptID = () => postRequest(url.getAllDeptByDeptID, { deptId: 0 })

// 通讯录组新增
export const addressGroupAdd = (data) => {
  return postRequest(`${baseURL}addressGroup/add`, data)
}

// 通讯录组修改
export const addressGroupUpdate = (data) => {
  return postRequest(`${baseURL}addressGroup/update`, data)
}

// 通讯录组删除
export const addressGroupDel = (data) => {
  return postRequest(`${baseURL}addressGroup/del`, data)
}

// 通讯录组查询
export const addressGroupQuery = (data) => {
  return postRequest(`${baseURL}addressGroup/query`, data)
}