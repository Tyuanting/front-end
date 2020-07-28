//1
/*
for(var i=1,sum=0;i<100;i++){
	sum+=i;
	if(sum>4000){
		break;
	}
}
console.log(sum);
*/
//2
/*
	for(var j=2000,count=0;j<=2100;j++){
		if(j%4===0 && j%100!==0 || j%400===0){
				console.log(j);
				count++;
				if(count===10){
					break;
				}
		}
	}
*/
//3
var count;
for(var i=0;i<10;i++){
	for(var j=0,s='';j<=i;j++){
		count=i*j;
	s+=j+'*'+i+'='+count+' ';
	}
	console.log(s);
}
