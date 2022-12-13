import CryptoJS from "crypto-js";
let DES = {};

//DES加密
DES.encrypt = (key, message) => {
  let keyHex = CryptoJS.enc.Utf8.parse(key);
  let encrypted = CryptoJS.DES.encrypt(message, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.ciphertext.toString();
}

//DES解密
DES.decrypt = (key, ciphertext) => {
  let keyHex = CryptoJS.enc.Utf8.parse(key);
  let decrypted = CryptoJS.DES.decrypt({
    ciphertext: CryptoJS.enc.Hex.parse(ciphertext)
  }, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

export default DES;
