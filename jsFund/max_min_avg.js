function minMaxAvg(arr){

    let min = arr[0], max = arr[0], sum = arr[0];

    for(let i = 1; i < arr.length; i++){
        min = Math.min(min,arr[i])
        max = Math.max(max,arr[i])
        sum += arr[i]
    }
    let avg = sum/arr.length

    return ("The minimum is "+ min + ", the maximum is "+ max +", and the average is "+ avg +".")
}

//console.log(minMaxAvg([1,-2,9,4]))



