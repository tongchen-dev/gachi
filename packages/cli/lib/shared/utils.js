/**
 * 
 * @param {String} str 
 */
exports.toCamelCase = (str) => {
	let newStr = '';
	let idx=0;
	while (idx !== str.length){
		if (str[idx] !== '-'){
			if (str[idx-1] === '-'){
				newStr += str[idx].toUpperCase();
			} else {
				newStr += str[idx]
			}
		}
		idx+=1;
	}
	return newStr;
}

/**
 * 
 * @param {string} str 
 */
exports.toBigCamelCase = (str) => {
	let newStr = this.toCamelCase(str);
	return `${newStr[0].toUpperCase()}${newStr.slice(1)}`
}