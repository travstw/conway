

var current = [];
var next = []; 
var stringer = "";
var things = 0;

function randomArray(){
  for(var i = 0; i < 5000; i++){
    current[i] = prob(i);   
  }  
}

function prob(i){
  if(Math.round(Math.random()) === 1){
     return Math.round(Math.random());
     }
  else {
    return Math.floor(Math.random());
  } 
}

randomArray();
printBoard();

function printBoard(){
  for(var j = 0; j < 5000; j+=100){
    for(var k = j; k < j+100; k++ ){
    	
      if(current[k] === 1){
        stringer = stringer + "X";
      }
      else {
        stringer = stringer + ".";
      } 
    }
    stringer = stringer + "\n";    
  }   
}
  

//console.log(stringer);
addToPage();

function addToPage(){
  var div = document.getElementById("container");
  var p = document.createElement('p');
  var t = document.createTextNode(stringer);
  p.appendChild(t);
  var oldP = document.getElementById("holderP")
  div.replaceChild(p, oldP);
  p.id = "holderP";

}
  
function nextGen(){
	var friends;
	for(var x = 0; x < current.length; x++){
		friends = friends(x);
		if (friends === 3){
			next[x] = 1;
		}
		else if (friends === 4){
			next[x] = current[x];
		}
		else {
			next[x] = 0;
		}
	}
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





