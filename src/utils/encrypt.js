export function encrypt(name, passwd, token) {
	var dname = doencrypt(name, token);
	var dpw = doencrypt(passwd, token);

	return token + dname + dpw;
}


function doencrypt(name, token) {
	var dataLength = "";
	var dataval = "";
	for (var i = 0; i < name.length; i++) {
		var code = name.charCodeAt(i) + token.charCodeAt(i);
		dataLength += code.toString().length;
		dataval += code.toString();
	}
	var count = 1;
	var dataLength2 = "";
	for (var i = 1; i < dataLength.length; i++) {
		if (dataLength.charCodeAt(i) == dataLength.charCodeAt(i - 1)) {
			count++;
		} else {
			if (count < 10) 
				dataLength2 += dataLength.charAt(i - 1) + "0" + count;
			else
				dataLength2 += dataLength.charAt(i - 1) + count;
			count = 1;
		}
	}
	if (count < 10) 
		dataLength2 += dataLength.charAt(i - 1) + "0" + count;
	else
		dataLength2 += dataLength.charAt(i - 1) + count;
	var length = dataLength2.length.toString().length;
	if (length == 1)
		return '0' + dataLength2.length.toString() + dataLength2 + dataval;
	else
		return dataLength2.length.toString() + dataLength2 + dataval;
}
