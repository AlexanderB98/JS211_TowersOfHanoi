'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [],
  b: [],
  c: [4, 3, 2, 1]
};

// Start here. What is this function doing?
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// Next, what do you think this function should do?
const movePiece = (currentStack, targetStack) => {
  switch(currentStack) {
    case "a":
      currentStack = stacks.a;
      break;
    case "b":
      currentStack = stacks.b;
      break;
    case "c":
      currentStack = stacks.c;
      break;
  }

  switch(targetStack) {
    case "a":
      targetStack = stacks.a;
      break;
    case "b":
      targetStack = stacks.b;
      break;
    case "c":
      targetStack = stacks.c;
      break;
  }

  let movedItem = currentStack[currentStack.Length - 1];
  targetStack.push(movedItem);
}

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
const isLegal = () => {
  // Your code here
  let isLegal = true;
  stacks.forEach(stack => {
    if(stack.Length >= 2){
      isLegal = stack[length - 1] < stack[length - 2]
    }
    if(!isLegal){
      return false;
    }
  });

  return true;
}

// What is a win in Towers of Hanoi? When should this function run?
const checkForWin = () => {
  if(stacks.a == [4, 3, 2, 1] || stacks.b == [4, 3, 2, 1]){
    return true;
  }

  return false;
}

// When is this function called? What should it do with its argument?
const towersOfHanoi = (startStack, endStack) => {
  movePiece(startStack, endStack);
  if(!isLegal){
    movePiece(endStack, startStack);
    return "illegal";
  }
  if(checkForWin){
    return "win";
  }
}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}