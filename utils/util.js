const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//诗词断句
function duanJu(str){
    var re = new RegExp("(.*?)(。|！)","g");
    
    return str.match(re);
}
//诗词注释断句
function desDuanJu(str){
    var finalStr = str.replace(/bookbest.163.net/g," ");
    finalStr = finalStr.replace(/【品评】/g, "。【品评】");
    finalStr = finalStr.replace(/又作/g, "【又作】");
    finalStr = finalStr.replace(/\?/g, "");
    finalStr = finalStr.replace(/　/g, "");
    finalStr = finalStr.replace(/。【/g, "||【");
    var tempArr=finalStr.split("||");
    for(var i=0;i<tempArr.length;i++){
        if(i!=tempArr.length-1){
            tempArr[i] +="。";
        }
    }
    return tempArr;
}

//获取2个数组的差集,arr1的长度大于arr2
function getDiffArr(arr1,arr2){
    var finalArr=new Array();
    for(var i=0;i<arr1.length;i++){
        var flag=false;
        for(var j=0;j<arr2.length;j++){
            if(arr1[i]==arr2[j]){
                flag=true;
                break;
            }
        }
        if (!flag){
            finalArr[finalArr.length] = arr1[i];
        }
    }
    return finalArr;
}

module.exports = {
  formatTime: formatTime,
    duanJu: duanJu,
    desDuanJu: desDuanJu,
    getDiffArr: getDiffArr
}
