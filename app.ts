window.onload = () => {
  const boardSize = 800;
  let pixel = 4;


  let random: number[][];         //random Array
  let mirrorRandom: number[][] = random;    //Array where it's noted down if a cell is alive(1) or dead(0)
  // let liveCount: number = 0;     //counter of the cells that are alive
  let numCells: number;
  let rows: number = boardSize / pixel;
  let columns: number = boardSize / pixel;

  //-----------CANVAS----------
  // Get reference to canvas
  const canvas = <HTMLCanvasElement>document.getElementById('canvas');
  canvas.width = canvas.height = boardSize;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgba(0, 0, 0, 1)';



  //---------GAME---------------
  fillRandomly(); //fills multidimensional Array with random numbers

  // Call 'draw' function whenever browser renders a frame on the screen
  window.requestAnimationFrame(draw);

  function draw() {
    drawCells();
    updateField();

    window.requestAnimationFrame(draw);
  }

  //---------FUNCTIONS---------------

  //draw cells
  function drawCells() {
    // ctx.clearRect(0, 0, canvas.height, canvas.width);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        ctx.fillRect(j * 4, i * 4, 4, 4);

      }
    }
  }

  //set random cells:
  function fillRandomly() {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        random[i][j] = Math.floor(Math.random());   //Generates random number -> 0 or 1
      }
    }

  }

  function updateField() {
    numCells = 0;
    for (let i = 0; i < canvas.height; i++) {
      for (let j = 0; j < canvas.width; j++) {

        //add the number in the neighbour cells -> alive = number 1 in neighbor cell      dead = number 0 in neighbor cell

        //top
        numCells += random[j - 1][j + 1]; //right
        numCells += random[i - 1][j - 1]; //left
        numCells += random[i - 1][j];     //middle

        //middle
        numCells += random[i][j + 1]; //right
        numCells += random[i][j - 1]; // left

        //bottom
        numCells += random[i + 1][j + 1]; //right
        numCells += random[i + 1][j - 1]; //left
        numCells += random[i + 1][j];    //middle

        //check "game of life" - rules based on the sum of the neighbor-cell-numbers added above 
        switch (numCells) {
          case 2: {
            mirrorRandom[i][j] = random[i][j]; break;
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