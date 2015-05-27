
var prior = [];
var current = [];
var next = []; 
var stringer;
//var things = 0;
reset();

function randomArray(){
  for(var i = 0; i < 5000; i++){
    current[i] = prob(i);   
  }  
}

function prob(i){
  var probTable= [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

  var num = Math.floor((Math.random() * 50) -1);
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
  prior = current;
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

  current = next;

}  

function friends(x){
	var totalNeighbors = 0;
	var neighbors = [current[x], current[x-100], current[x-99], current[x+1], current[x+101], current[x+100], 
	current[x+99], current[x-1], current[x-101]];

	for(var n = 0; n < neighbors.length; n++){
		if(typeof neighbors[n] !== 'undefined'){
			totalNeighbors = totalNeighbors + neighbors[n]; 
		}
	}

	return totalNeighbors;

}

// function priorGen(){
//   stringer = "";
//   printBoardPrior();
//   addToPage();
// }



var interval;

function start(){
  interval = setInterval(function(){
    nextGen();
    
  }, 100);
} 

function stop(){
  clearInterval(interval);
}






