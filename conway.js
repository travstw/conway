
var prior = [];

var current = [];
var next = []; 
var stringer;
var gens = 1;
var stasis;
//var generations = [];

reset();
//Resets board; also called on load **********************************************************************


function reset(){
  stop();
  win = false;
  if(document.getElementById("winMessageDiv")){
    var d = document.getElementById("winMessageDiv");
    var par = document.getElementById('container');
    par.removeChild(d);
  };
  stringer = "";
  //generations = [];
  randomArray();
  printBoard(current);
  addToPage(); 
  gens = 1;
  stasis = false;
  counter();



}  

// Builds initial random array ***************************************************************************

function randomArray(){
  for(var i = 0; i < 5000; i++){
    current[i] = prob(i);  
    //generations.push(current);

  } 
  
}

//Probability table and random number generator for randomArray function***********************************

function prob(i){
  var probTable= [0,0,0,0,0,0,0,0,0,0,1,1,1,1,1];

  var num = Math.floor((Math.random() * 15) );
  return probTable[num];
}

//Creates string representation of the board***************************************************************

function printBoard(array){
  for(var j = 0; j < 5000; j+=100){
    for(var k = j; k < j+100; k++ ){
    	
      if(array[k] === 1){
        stringer = stringer + "X";
      }
      else {
        stringer = stringer + ".";
      } 
    }
    stringer = stringer + "\n";    
  }   
}


//Adds string board to the DOM*************************************************************************************

function addToPage(){
  
  var p = document.createElement('p');
  var t = document.createTextNode(stringer);
  p.appendChild(t);
  var div = document.getElementById("container");
  div.replaceChild(p, document.getElementById("holderP"));
  p.id = "holderP";

}



//Functions for to start and stop automatic generation creation****************************************************


var interval;

function start(){
  interval = setInterval(function(){
    newGen();
    
  }, 100);
} 

function stop(){
  clearInterval(interval);
}

//Creates next Generation and adds new string board to DOM**********************************************************
  
function newGen(){
	var friend;

  
	for(var x = 0; x < current.length; x++){
		friend = friends(x);
    
		if (friend === 3){
			next[x] = 1;
		}
		else if (friend === 4){
			next[x] = current[x];
		}
		else {
			next[x] = 0;
		}
	}
  stringer = "";
  printBoard(next);
  addToPage();
  
  //generations.push(current);
  stasisCheck();
  
  prior = current.slice(0);
  current = next.slice(0);
} 


// Edge case helper variables***************************************************************************************

var up;
var upRight;
var upLeft;
var left;
var right;
var lowRight;
var lowLeft;
var down;

// Determines number of live cells surrounding each cell; also calls edge case functions****************************

function friends(x){
	var totalNeighbors = 0;
  upCheck(x);
  downCheck(x);
  leftCheck(x);
  rightCheck(x);
 
	var neighbors = [current[x],up,upRight,right,lowRight,down,lowLeft,left,upLeft];
  

	for(var n = 0; n < neighbors.length; n++){
				totalNeighbors = totalNeighbors + neighbors[n]; 
		
	}
  
	return totalNeighbors;

}

//Edge Case functions *********************************************************************************************

function upCheck(x){
  if(typeof current[x - 100] === 'undefined'){
    up = current[x+4900];
    if(x === 0){
      upLeft = current[x+4999];
      upRight = current[x+4901];
    }
    else if (x === 99){
      upLeft = current[x+4899];
    upRight = current[x+4801];
    }
    else {
      upLeft = current[x +4901];
      upRight = current[x + 4899];
    }
  }
  else {
    up = current[x-100];
    upLeft = current[x-101];
    upRight = current[x-99];
  }

}

function downCheck(x){
  if(typeof current[x+100] === 'undefined'){
    down = current[x - 4900];
    lowLeft = current[x - 4901];
    lowRight = current[x- 4899];
  }
  else {
    down = current[x+100];
    lowLeft = current[x+99];
    lowRight = current[x+101];
  }

}

function leftCheck(x){
  if(typeof current[x-1] === 'undefined'){
    left = current[x + 99];
  }
  else {
    left = current[x-1];
  }
}

function rightCheck(x){
  for(var rCol = 99; rCol < 4999; rCol+=100 ){
    if (x === rCol){
      right = current[x - 99];
      break;
    }
    else {
      right = current[x+1];
    }
  }
}


// Creates and displays current generation count on page*********************************************************

function counter(){
 
  // var p = document.createElement('p');
  // p.appendChild(document.createTextNode(gens));
  var d = document.getElementById("counter");
  d.innerHTML = gens;
  // var oldP = document.getElementById('generations');
  // d.replaceChild(p, oldP);
  // p.id = 'generations';
}

// Checks to see if statis is achieved, stops generation counter if so***********************************************

var win = false;

function stasisCheck(){
  if(gens > 1){
    stasis = true;
  }
  else {
    stasis = false;
  }


 
  for (var i = 0; i < prior.length; i++) {
    if(prior[i] !== next[i]){
      stasis = false;   
      break;
    }
  
  }
  

  if(stasis === false){
    gens++;
    counter();
  }
  else {
    if(win === false){
    stasisMessage();
    win=true;}
  }
}

//Creates and displays stasis message on page **********************************************************************

function stasisMessage(){
  var newDiv = document.createElement('div');
  newDiv.id= "winMessageDiv";
  var p = document.createElement('p');
  p.id = 'winMessage';
  var t = document.createTextNode("stasis achieved in " + gens + " generations");
  p.appendChild(t);
  newDiv.appendChild(p);
  var div = document.getElementById('container');
  div.appendChild(newDiv);


}









