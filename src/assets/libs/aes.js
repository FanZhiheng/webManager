import CryptoJS from "crypto-js";
let AES = {};

// AES加密
AES.encrypt = (key, word) => {
  let encrypted = CryptoJS.AES.encrypt(word, key, {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	});
	return encrypted.toString();
}

// AES解密
AES.decrypt = (key, word) => {
	let decrypt = CryptoJS.AES.decrypt(word, key , {
			mode: CryptoJS.mode.ECB,
			padding: CryptoJS.pad.Pkcs7
		});
		return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}

//	AES老版加密
AES.oldEncrypt = (key, word) => {
  var iv = 'abcdefgh12345678';
  key = CryptoJS.enc.Utf8.parse(key);
  var bytes = CryptoJS.AES.encrypt(word, key, {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding,
    iv: CryptoJS.enc.Utf8.parse(iv),
  });
  return bytes.toString();
}

// 	AES老版解密
AES.oldDecrypt = (key, word) => {
  var iv = 'abcdefgh12345678';
  //aes解密
  key = CryptoJS.enc.Utf8.parse(key);
  var decrypted = CryptoJS.AES.decrypt(word, key, {
    iv: CryptoJS.enc.Utf8.parse(iv),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

export default AES;