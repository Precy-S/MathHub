//for gAme, B, C!

window.onload = qMaker;

//LIFE-- initialization/declaration
var allScores = [];
var ul = document.getElementById("sforJs");
var a,b,c, ansX1, ansX2, score=0, questions=0, round=0, string;

/*
~~~~~
~~~~~
*/

//question maker
function qMaker(){  
  questions+=1;//to keep count of how many questions have been created in a round
  
  //creating a, b, and c:
  a = Math.ceil(Math.random() * 10);
  b = Math.floor(Math.random() * 10);
  c = Math.floor(Math.random() * 10);
  
  
  //creating discriminant AND double-checking if the question is solve-able
  let discriminant=b*b-4*a*c;
  
  while(discriminant<0) {
      a = Math.ceil(Math.random() * 10) + 1;
      b = Math.floor(Math.random() * 10) + 1;
      c = Math.floor(Math.random() * 10) + 1;
      discriminant=b*b-4*a*c;
    }
  
  //assigns values to te answers
  ansX1=Math.round((-b+Math.sqrt(discriminant))/(2*a));
  ansX2=Math.round((-b-Math.sqrt(discriminant))/(2*a));  
  
  //display:
  document.getElementById("actualQ").innerHTML=`${a}x² + ${b}x + ${c} = 0`;  
  document.getElementById("qNum").innerHTML=questions;
}

/*
~~~~~
~~~~~
*/

//gets (user's) answer
function getA(){
  //variables that show if the answers are correct to either/both first/second x's
  let correctOne=0;
  let correctTwo=0;  
  
  //grabs inputs and puts them into variables
  let x1=Number(document.getElementById("gameinput1").value);
  let x2=Number(document.getElementById("gameinput2").value);
  
  
  //checking if any of the inputs match any of the correct answers
  if(x1==ansX1&&correctOne==0){
    score+=0.5;
    document.getElementById("actualS").innerHTML=score;
    correctOne+=1;
  }
  else if(x2==ansX1&&correctOne==0){
    score+=0.5;
    document.getElementById("actualS").innerHTML=score;
    correctOne+=1;
  }
  if(x1==ansX2&&correctTwo==0){
    score+=0.5;
    document.getElementById("actualS").innerHTML=score;
    correctTwo+=1;
  }
  else if(x2==ansX2&&correctTwo==0){
    score+=0.5;
    document.getElementById("actualS").innerHTML=score;
    correctTwo+=1;  
  }
  
  
  //if both inputs are correct:
  if (correctOne==1&&correctTwo==1){
    document.getElementById("alert").style.display = "block";
  }
  
  //make a new question
  qMaker();
  
  
  //if the question count is about is about to reach >15
  if(questions>=15){
    ul.innerHTML += `<li> ${score}/15 </li>`;
    allScores[allScores.length]=score;
    
    string = JSON.stringify(allScores);
    localStorage.setItem("allScores", string);
    
    score=0;
    questions=0;
    round++;
  }
}

//press enter to automatically press the button
var input = document.getElementById("gameinput2");
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("solve").click();
  }
});


//store in local storage/retrieve from local storage
var retString = localStorage.getItem("allScores")
var retArray = JSON.parse(retString)
allScores = retArray;
for(let i=0; i<retArray.length;i++){
  ul.innerHTML += `<li> ${retArray[i]}/15 </li>`;
}