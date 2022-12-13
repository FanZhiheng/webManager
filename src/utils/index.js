import { downloadFile } from "@/api/file";

/******************************************************************
 * 函数名: getLocalStorage 
 * 功能: 获取本地存储数据
 * 参数: key(String)指定的键
 * 返回值: 转换后的对象
 * Author: LF
 ******************************************************************/

export function getLocalStorage(key, type = 0) {
  if (type == 0) {
    return localStorage.getItem(key);
  }
  if (type == 1) {
    return JSON.parse(localStorage.getItem(key))
  }
}


/******************************************************************
 * 函数名: setLocalStorage 
 * 功能: 设置本地存储数据
 * 参数: key(String)键，
 *  value(Object|String)值
 * 返回值: 无
 * Author: LF
 ******************************************************************/

export function setLocalStorage(key, value, type = 0) {
  if (type == 0) {
    localStorage.setItem(key, String(value));
    return;
  }
  if (type == 1) {
    localStorage.setItem(key, JSON.stringify(value));
    return;
  }
}


/*****************************************************************
 * 函数名: removeLocalStorage
 * 功能: 清除本地存储数据
 * 参数: key(String)键
 * 返回值: 无
 * Author: LF
 ******************************************************************/

export function removeLocalStorage(key) {
  window.localStorage.removeItem(key);

}

/*****************************************************************
 * 函数名: removeAllLocalStorage
 * 功能: 清除所有本地存储数据
 * 参数: 无
 * 返回值: 无
 * Author: ZH
 ******************************************************************/
export function removeAllLocalStorage() {
  for (let key in window.localStorage) {
    window.localStorage.removeItem(key)
  }
}


export function getSessionStorage(key, type = 0) {
  if (type == 0) {
    return sessionStorage.getItem(key);
  }
  if (type == 1) {
    return JSON.parse(sessionStorage.getItem(key))
  }
}



export function setSessionStorage(key, value, type = 0) {
  if (type == 0) {
    sessionStorage.setItem(key, String(value));
    return;
  }

  if (type == 1) {
    sessionStorage.setItem(key, JSON.stringify(value));
    return;
  }
}



/*****************************************************************
 * 函数名: padURL
 * 功能: 补全地址
 * 参数: url(String)后台地址
 * 返回值: url
 * Author: LF
 ******************************************************************/
export function padURL(url) {
  let origin = document.location.origin === "https://xztsbank.com.cn" ? document.location.origin : "http://159.156.1.51:12081";
  return origin + "/img/" + url;
}

/*****************************************************************
 * 函数名: downFile
 * 功能: 下载文件
 * 参数: ret 后台返回的值 
 *      fileName 文件名称
 * 返回值: url
 * Author: LF
 ******************************************************************/
export function downFile(ret, fileName) {
  let blob = new Blob([ret], {
    type: 'application/vnd.ms-excel'
  })
  let elink = document.createElement('a');
  elink.download = fileName;
  elink.style.display = 'none';
  elink.href = URL.createObjectURL(blob);
  document.body.appendChild(elink);
  elink.click();
  URL.revokeObjectURL(elink.href); // 释放URL 对象
  document.body.removeChild(elink);
}

// 深拷贝
export function deepCopy(data) {
  if (typeof data !== 'object' || data === null) {
    throw new TypeError('传入参数不是对象')
  }
  let newData = {};
  if (data instanceof Array) {
    newData = []
  }

  const dataKeys = Object.keys(data);
  dataKeys.forEach(value => {
    const currentDataValue = data[value];
    // 基本数据类型的值和函数直接赋值拷贝 
    if (typeof currentDataValue !== "object" || currentDataValue === null) {
      newData[value] = currentDataValue;
    } else if (Array.isArray(currentDataValue)) {
      // 实现数组的深拷贝
      newData[value] = [...currentDataValue];
    } else if (currentDataValue instanceof Set) {
      // 实现set数据的深拷贝
      newData[value] = new Set([...currentDataValue]);
    } else if (currentDataValue instanceof Map) {
      // 实现map数据的深拷贝
      newData[value] = new Map([...currentDataValue]);
    } else {
      // 普通对象则递归赋值
      newData[value] = deepCopy(currentDataValue);
    }
  });
  return newData;
}

export function download(fileNum) {
  let blobUrl = downloadFile(fileNum);
  let link = document.createElement("a");
  document.body.appendChild(link);
  link.style.display = "none";
  link.href = blobUrl; // 设置a标签的下载属性，设置文件名及格式，后缀名最好让后端在数据格式中返回
  link.download = fileNum; // 自触发click事件
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(blobUrl);
}