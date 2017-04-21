/*
* @Author: huyongyong1992
* @Date:   2017-03-23 13:46:39
* @Last Modified by:   huyongyong1992
* @Last Modified time: 2017-03-27 11:43:35
*/
const onConvertDate = function convertDate(value) {
	//传入的是毫秒数
	const time = new Date(value);
	const year = time.getFullYear();
	const month = time.getMonth() < 9 ? ('0'+(time.getMonth()+1)) : (time.getMonth()+1);
	const date = time.getDate() <10 ? ('0'+time.getDate()) : time.getDate();
	const hour = time.getHours() <10 ? ('0'+time.getHours()) : time.getHours();
	const minute = time.getMinutes() <10 ? ('0'+time.getMinutes()) : time.getMinutes();
	const second = time.getSeconds() <10 ? ('0'+time.getSeconds()) : time.getSeconds();
	return (year + "-" + month + "-" + date + "\n" + hour + ":" + minute + ":" + second);
};

export { onConvertDate }