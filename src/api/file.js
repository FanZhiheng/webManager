import { postRequest, getRequest, postBlobRequest } from '@/utils/request'
// const baseURL = process.env.NODE_ENV === 'production'
//   ? '/chatbotexam/'
//   : '/';

const baseURL = "/chatbotexam/"
const url = {
  uploadFile: `${baseURL}file/uploadFile`,
  downloadFile: `${baseURL}file/downloadFile`
}

export const downloadFile = (params) => {
  return `${baseURL}file/downloadFile?fileNum=${params}`;
}

export const downloadPDFFile = (params) => {
  return `${baseURL}downloadPDFFile.do?num=${params}`;
}

export const downloadGet = (params) => getRequest(`${baseURL}file/downloadFile`, params)

export const downloadVMFile = (params) => postBlobRequest(`${baseURL}file/downloadWMFile`, params)

export const downloadTrainFile = (params) => { return `${baseURL}file/downloadFile?fileNum=${params}`; }

export const delTrainFile = (params) => postRequest(`${baseURL}file/deleteFile`, params)

export const editTrainFileName = (params) => postRequest(`${baseURL}file/updateFileName`, params)
