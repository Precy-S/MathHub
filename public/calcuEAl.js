function solve(){
  
  //getting inputs for ax^2+bx+c=0
  var a=Number(document.getElementById("input1").value);
  var b=Number(document.getElementById("input2").value);
  var c=Number(document.getElementById("input3").value);
  
  //getting discriminant for checking for imaginary solutions
  var discriminant=b*b-4*a*c;
  var x1=0;
  var x2=0;
  
  if(a==0){
  //if a is 0, the equation is a linear equation
  x1="not a quadratic equation";
  x2="not a quadratic equation";
  }
  
  else{
  //checking for imaginary solutions
  if (discriminant>=0){
    x1=(-b+Math.sqrt(discriminant))/(2*a);
    x2=(-b-Math.sqrt(discriminant))/(2*a);
  }
  else{
    x1="no real solutions";
    x2="no real solutions";
  }
  }
  //outputing the
  document.getElementById("output1").innerHTML=x1;
  document.getElementById("output2").innerHTML=x2;
}


//easy algebra
function solveeasy(){
  var a=Number(document.getElementById("easyinput1").value);
  var b=Number(document.getElementById("easyinput2").value);
  var c=Number(document.getElementById("easyinput3").value);
  var val=0;
  
  if (a==0 && b==c)
    document.getElementById("linearVal").innerHTML="Equation is always true";
  else if (a==0 && b!=c)
    document.getElementById("linearVal").innerHTML="Equation is a contradiction";
  else{
    val=(c-b)/a;
    document.getElementById("linearVal").innerHTML=val;
  }
    
}

//press enter to automatically press the button
var input = document.getElementById("input3");
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("solve").click();
  }
});
