
var prior = [];
var current = [];
var next = []; 
var stringer;
//var things = 0;
reset();
//console.log(current);  

function randomArray(){
  for(var i = 0; i < 5000; i++){
    current[i] = prob(i);  

  } 
  
}

function prob(i){
  var probTable= [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1];

  var num = Math.floor((Math.random() * 20) );
  return probTable[num];
  // if(Math.round(Math.random()) === 1){
  //    return Math.round(Math.random());
  //    }
  // else {
  //   return Math.floor(Math.random());
  // } 
}

function reset(){
  stop();
  stringer = "";
  randomArray();
  printBoard(current);
  addToPage(); 

}  

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

// function printBoardGo(){
//   for(var j = 0; j < 5000; j+=100){
//     for(var k = j; k < j+100; k++ ){
      
//       if(next[k] === 1){
//         stringer = stringer + "x";
//       }
//       else {
//         stringer = stringer + ".";
//       } 
//     }
//     stringer = stringer + "\n";    
//   }

//}

// function printBoardPrior(){
//   for(var j = 0; j < 5000; j+=100){
//     for(var k = j; k < j+100; k++ ){
      
//       if(prior[k] === 1){
//         stringer = stringer + "x";
//       }
//       else {
//         stringer = stringer + ".";
//       } 
//     }
//     stringer = stringer + "\n";    
//   }

// }
  

//console.log(stringer);

//doIt();

function addToPage(){
  
  var p = document.createElement('p');
  var t = document.createTextNode(stringer);
  p.appendChild(t);
  //var oldP = document.getElementById("holderP")
  var div = document.getElementById("container");
  div.replaceChild(p, document.getElementById("holderP"));
  p.id = "holderP";

}
  
function nextGen(){
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

  //console.log(friend);


  varTest();
  
  prior = current.slice(0);
  varTest();

  current = next.slice(0);
  varTest();


  

} 

var up;
var upRight;
var upLeft;
var left;
var right;
var lowRight;
var lowLeft;
var down;

function friends(x){
	var totalNeighbors = 0;
  upCheck(x);
  downCheck(x);
  leftCheck(x);
  rightCheck(x);
 
	var neighbors = [current[x],up,upRight,right,lowRight,down,lowLeft,left,upLeft];
  //console.log(neighbors);

	for(var n = 0; n < neighbors.length; n++){
		// if(typeof neighbors[n] !== 'undefined'){
			totalNeighbors = totalNeighbors + neighbors[n]; 
		//}
	}
  //console.log(x);
  //console.log(neighbors);

	return totalNeighbors;

}

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




function priorGen(){
  
  stringer = "";
  printBoard(prior);
  addToPage();

  

  // console.log(current);
  // console.log("**********************************************");
  // console.log(next);
}

function currentGen(){
  stringer = "";
  printBoard(current);
  addToPage();
}





var interval;

function start(){
  interval = setInterval(function(){
    nextGen();
    
  }, 100);
} 

function stop(){
  clearInterval(interval);
}


function varTest(){
  if(current === prior){
    console.log("prior = current");

  }
  if (prior === next){
    console.log("prior = next");
  }
  if (current === next){
    console.log("current = next");
  }
  console.log("******************");
  // else {
  //   console.log("nothing is equal");
  // }
}


