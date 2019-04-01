


function startTrivia(){
    
    $.get("https://opentdb.com/api.php?amount=5&category=18&difficulty=medium&type=multiple", fillquestions)
  
  }
  function fillquestions(data) {
    
    let page =''
    let questions =''
    
    for (key in data){
        if (key == 'results'){
            
            for(obj in data[key]){
                console.log(data[key][obj])
                
                let rightanswer =[data[key][obj]['correct_answer'],true]
                let bad =data[key][obj]['incorrect_answers']
                console.log(bad)
                let wronganswer1 = [bad[0],false]
                let wronganswer2 = [bad[1],false]
                let wronganswer3 = [bad[2],false]

                let answers = [rightanswer,wronganswer1,wronganswer2,wronganswer3]
                console.log(answers)
                answers = shuffle(answers)
                console.log(answers)
                questions += '<div>'+data[key][obj]['question']; 

                questions += '<ol>'
                questions += '<li><button correct="' + answers[0][1]+'" class="ans">'+answers[0][0]+"</button></li>"
                questions += '<li><button correct="' + answers[1][1]+'" class="ans">'+answers[1][0]+"</button></li>"
                questions += '<li><button correct="' + answers[2][1]+'" class="ans">'+answers[2][0]+"</button></li>"
                questions += '<li><button correct="' + answers[3][1]+'" class="ans">'+answers[3][0]+"</button></li>"

                


                questions += '</ol>'

                questions +='</div>'
                
            }
        }
      
    }
    $('#triviaresult').html(page)
    $('#questionsdiv').html(questions)

    $('.ans').click(function(){
        console.log($(this).attr('correct'))
        if ($(this).attr('correct') == 'true'){
            $(this).css("background-color",'green')
        }
        else{
            $(this).css("background-color",'red')
        }
        
    })

  }

  
  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
  function checkanswer(){
      if ($(this).correct == 'true'){
          $(this).background('red')
        console.log('checking answer')
      }
  }