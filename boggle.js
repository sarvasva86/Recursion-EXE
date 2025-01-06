

function makeBoard(boardString) {
 

  const letters = boardString.split(/\s+/);

  const board = [
    letters.slice(0, 5),
    letters.slice(5, 10),
    letters.slice(10, 15),
    letters.slice(15, 20),
    letters.slice(20, 25),
  ];

  return board;
}

function findFrom(board, word, y, x, seen) {
  

  if (board[y][x] != word[0]) return false;

  // Base case: we've used this letter before in this current path

  if (seen.has(y + "-" + x)) return false;

  // Base case: we are down to the last letter --- so we win!

  if (word.length === 1) return true;


  seen = new Set(seen);
  seen.add(y + "-" + x);

  if (y > 0 && findFrom(board, word.slice(1), y - 1, x, seen)) return true;
  if (y < 4 && findFrom(board, word.slice(1), y + 1, x, seen)) return true;
  if (x > 0 && findFrom(board, word.slice(1), y, x - 1, seen)) return true;
  if (x < 4 && findFrom(board, word.slice(1), y, x + 1, seen)) return true;

  // Couldn't find the next letter, so this path is dead

  return false;
}

function find(board, word) {
  /** Can word be found in board? */

  
  for (let y = 0; y < 5; y++)
    for (let x = 0; x < 5; x++)
      if (findFrom(board, word, y, x, new Set())) return true;

  
  return false;
}

// EXAMPLE TEST

// For example::

const board = makeBoard(`N C A N E
                         O U I O P
                         Z Q Z O N
                         F A D P L
                         E D E A Z`);

// `NOON` should be found (0, 3) -> (1, 3) -> (2, 3) -> (2, 4)::

console.log(find(board, "NOON"), true);

// `NOPE` should be found (0, 3) -> (1, 3) -> (1, 4) -> (0, 4)::

console.log(find(board, "NOPE"), true);

// `CANON` can't be found (`CANO` starts at (0, 1) but can't find
// the last `N` and can't re-use the N)::

console.log(find(board, "CANON"), false);

// You cannot travel diagonally in one move, which would be required
// to find `QUINE`::

console.log(find(board, "QUINE"), false);

// We can recover if we start going down a false path (start 3, 0)::

console.log(find(board, "FADED"), true);

// An extra tricky case --- it needs to find the `N` toward the top right,
// and then go down, left, up, up, right to find all four `O`s and the `S`::

const board2 = makeBoard(`E D O S Z
                          N S O N R
                          O U O O P
                          Z Q Z O R
                          F A D P L`);

console.log(find(board2, "NOOOOS"), true);
