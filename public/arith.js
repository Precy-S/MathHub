function multiply(){ //for multiplying
  let input = "mult1"; //to place into the inputNums function
  let nums = inputNums(input);
  let prod=nums[0]*nums[1];
  
  if (isNaN(prod))
    document.getElementById("mult2").innerHTML="Invalid input/s"; //if invalid input
  else
    document.getElementById("mult2").innerHTML=prod;
}

function addition(){ //for adding
  let input = "add1"; //to place into the inputNums function
  let nums = inputNums(input);
  let sum=nums[0]+nums[1];
  
  if (isNaN(sum))
    document.getElementById("add2").innerHTML="Invalid input/s"; //if invalid input
  else
    document.getElementById("add2").innerHTML=nums[0]+nums[1];
}

function subtraction(){ //for subtracting
  let input = "minus1"; //to place into the inputNums function
  let nums = inputNums(input);
  let dif=nums[0]-nums[1];
  
  if (isNaN(dif))
    document.getElementById("minus2").innerHTML="Invalid input/s"; //if invalid input
  else
    document.getElementById("minus2").innerHTML=nums[0]-nums[1];
}

function division(){ //for dividing
  let input = "divid1"; //to place into the inputNums function
  let nums = inputNums(input);
  let quo=nums[0]/nums[1];
  if (isNaN(quo))
    document.getElementById("divid2").innerHTML="Invalid input/s"; //if invalid input
  else {
  if (nums[1]!=0)
    document.getElementById("divid2").innerHTML=nums[0]/nums[1];
  
  else
    document.getElementById("divid2").innerHTML="undefined"; //dividing by zero
  }
}

function inputNums(input){ //to return an array (nums)
  let nums = new Array(); //create the array
  nums = document.getElementById(input).value; //put value into the array
  nums = nums.replace(/,/g, " "); //removes commas and replaces with spaces

  nums = nums.split(" ").map(Number); //splits nums by the spaces and turns each substring into an actual number
  return(nums);
}