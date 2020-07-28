/*
for(i = 1;i <= 10;i++){
	console.log(i);
}
*/

//练习：打印50~30之间所有的整数
/*
for(i = 30;i <= 50;i++){
	console.log(i);
}
*/
/*
for(i = 50;i >= 30;i--){
	console.log(i);
}
*/

//练习：计算1~100之间所有能被7整除的数字的和
/*
for(var i = 1;i <= 100;i++){
	if(i%7 === 0){
		var sum = 0;
		sum += i;
	}
}
console.log(sum);
*/
//练习：打印2000~2100之间所有的闰年
/*
for(i=2000;i<=2100;i++){
	if(i%4===0 && i%100!==0 || 1%400===0){
		console.log(i);
	}
}
*/

//练习：循环打印出12345成一行展示
var s='';
for(var i=1;i<=5;i++){
	s+=i+'';
}
	console.log(s);

