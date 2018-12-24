//处理分类目录的方法
function dealRestMuluList(arr){
    var newArr=[];
    for(var i=0;i<arr.length;i++){
        if(arr[i]['pid']<1){
            newArr.push(arr[i]);
        }
    }

    for(var i=0;i<newArr.length;i++){
        var children=[];
        for(var j=0;j<arr.length;j++){
            if(arr[j]['pid']==newArr[i]['id']){
                children.push(arr[j]);
            }
        }
        newArr[i]['children'] = children;
    }

    return newArr;
}





module.exports.dealRestMuluList = dealRestMuluList;
