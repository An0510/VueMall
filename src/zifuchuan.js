function maopao(arr){
    const len = arr.length - 1;
    // 外层for循环跟上一版一样
    for (let i = 0; i < len ; i++) {
        // 内层for循环的比较次数随着外层遍历的进行依次减少 但可以不依赖i
        for (let j = i-1; j < arr.length-i; j++) {
            if (arr[j] > arr[j + 1]) {
                let t = arr[j];
                arr[j] = arr[j+1];
                arr[j+1]=t
            }
        }
    }
    return arr;
}
console.log(maopao([1,2,3,5,1]))
// 置换 i j
// lodash 库 方法
// ts

