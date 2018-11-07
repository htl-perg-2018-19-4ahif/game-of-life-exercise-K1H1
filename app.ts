window.onload = () => {
  const boardSize = 800;


  let random: number[][];         //random Array
  let mirrorRandom: number[][] = random;    //Array where it's noted down if a cell is alive(1) or dead(0)
  // let liveCount: number = 0;     //counter of the cells that are alive
  let numCells: number;

  //-----------CANVAS----------
  // Get reference to canvas
  const canvas = <HTMLCanvasElement>document.getElementById('canvas');
  canvas.width = canvas.height = boardSize;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgba(0, 0, 0, 1)';

  // Call 'draw' function whenever browser renders a frame on the screen
  window.requestAnimationFrame(draw);

  //---------GAME FUNCTION-------------------
  function draw() {
    fillRandomly(); //fills multidimensional Array with random numbers
    drawCells();
    updateField();

    window.requestAnimationFrame(draw);
  }

  //draw cells
  function drawCells() {
    ctx.clearRect(0, 0, canvas.height, canvas.width);
    for (let i = 0; i < canvas.height; i++) {
      for (let j = 0; j < canvas.width; j++) {
        ctx.fillRect(4, 4, i, j);

      }
    }
  }

  //set random cells:
  function fillRandomly() {
    for (let i = 100; i < 100 - canvas.height; i++) {
      for (let j = 100; j < 100 - canvas.width; j++) {
        random[i][j] = Math.floor(Math.random() * boardSize);
      }
    }

  }

  function updateField() {
    for (let i = 0; i < canvas.height; i++) {
      for (let j = 0; j < canvas.width; j++) {

        //add the number in the neighbour cells -> alive = number 1 in neighbor cell      dead = number 0 in neighbor cell
        numCells += random[j - 1][j + 1]; //top right
        numCells += random[i - 1][j - 1]; //top left
        numCells += random[i - 1][j];     //top center

        numCells += random[i][j + 1]; //middle right
        numCells += random[i][j - 1]; //middle left

        numCells += random[i + 1][j - 1]; //bottom left
        numCells += random[i + 1][j + 1]; //bottom right
        numCells += random[i + 1][j]; //bottom center

        //check "game of life" - rules based on the sum of the neighbor-cell-numbers added above 
        switch (numCells) {
          case 2: {
            mirrorRandom[i][j] = random[i][j]; break; //nothing changes
          }

          case 3: {
            mirrorRandom[i][j] = 1; break;        //alive
          }

          default: {
            mirrorRandom[i][j] = 0;               //dead
          }

        }

        //exchange the arrays
        let help = random;
        random = mirrorRandom;
        mirrorRandom = help;

      }
    }
  }
};