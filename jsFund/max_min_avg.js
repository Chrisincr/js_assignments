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


function fizzbuzz(n){
    if (n < 1 || typeof n != 'number'){
        console.log('Parameter must be a positive number')
        return
    }


    let i =1
    let z = 0
    function check(x){
        z = 0
        if(x%3 == 0)
            z = 1
        if(x%5 == 0)
            z = 2
        if(x%15 == 0)
            z = 3

        return z
    }

    while (i <= n){
        let expr = check(i)
        switch(expr){
            case 3:
            console.log('FizzBuzz')
            break;

            case 1:
            console.log('Fizz')
            
            break;

            case 2:
            console.log('Buzz')
            
            break;

            default:
            
            console.log(i)
        }
        i++
    }
}
