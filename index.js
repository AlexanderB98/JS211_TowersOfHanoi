
// * This js file is incomplete. It will log to the console the elements you click
    // call another function and set stone. You will have to work through the logic
    // of the game as you know it from building it in the terminal. Work through the
    // puzzle slowly, stepping through the flow of logic, and making the game work.
    // Have fun!!
// * First run the program in your browser with live server and double-click on the row you'd like to select an element from.
// * Why are you get a warning in your console? Fix it.
// * Delete these comment lines!

let stone = null
let pickup = true;


// this function is called when a row is clicked. 
// Open your inspector tool to see what is being captured and can be used.
const selectRow = (row) => {
  const currentRow = row.getAttribute("data-row")
  let currentStack;
  let targetStack;
  
  console.log("Yay, we clicked an item", row)
  console.log("Here is the stone's id: ", row.id)
  console.log("Here is the stone's data-size: ", currentRow)
  console.log(stone)
  console.log(document.getElementById("temp"));

  if(pickup) {
    currentStack = row.id;
    pickUpStone(row.id)
   } 
  else {
    targetStack = row.id;
    dropStone(row.id, stone)
  }

  if(checkForWin()){
    document.getElementById("illegalMove").innerHTML = "YOU WIN!";
  }
} 

// this function can be called to get the last stone in the stack
// but there might be something wrong with it...
const pickUpStone = (rowID) => {
  console.log("stone pick up")
  const selectedRow = document.getElementById(rowID);
  let childToRemoveId = selectedRow.children.length - 1
  stone = selectedRow.children[childToRemoveId]
  selectedRow.removeChild(stone);
  pickup = false;
  console.log(stone)
}

// You could use this function to drop the stone but you'll need to toggle between pickUpStone & dropStone
// Once you figure that out you'll need to figure out if its a legal move...
// Something like: if(!stone){pickupStone} else{dropStone}

const dropStone = (rowID, stone) => {
  console.log("stone drop")
  let targetRow = document.getElementById(rowID)
  let lastChildId = targetRow.children.length - 1;
  console.log(lastChildId)
  let lastChild = targetRow.children[lastChildId]
  console.log(stone.getAttribute("id"))
  if(lastChildId >= 0 && stone.getAttribute("id") > lastChild.getAttribute("id")){
    document.getElementById("illegalMove").innerHTML = "Illegal move. Please choose another row";
    return;
  }
  targetRow.appendChild(stone);
  document.getElementById("illegalMove").innerHTML = " ";
  pickup = true;
  console.log(stone)
}

const checkForWin = () => {
  let rowA = document.getElementById("a");
  let rowB = document.getElementById("b");
  console.log(rowA.children.length)
  if(rowA.children.length == 4 || rowB.children.length == 4){
    return true;
  }
  return false;
}

// * Remember you can use your logic from 'main.js' to maintain the rules of the game. But how? Follow the flow of data just like falling dominoes.
