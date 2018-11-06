window.onload = () => {
  const boardSize = 200;


  let random: number[][];         //random Array
  let mirrorRandom: number[][];    //Array where it's noted down if a cell is alive(1) or dead(0)
  mirrorRandom = random;
  // let liveCount: number = 0;     //counter of the cells that are alive
  let totalCells: number;

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


  //set random cells:

  function fillRandomly() {
    for (let i = 100; i < 100 - canvas.height; i++) {
      for (let j = 100; j < 100 - canvas.width; j++) {
        random[i][j] = Math.floor(Math.random() * boardSize);
      }
    }

  }

  //draw cells
  function drawCells() {
    ctx.clearRect(0, 0, boardSize, boardSize);
    for (let i = 0; i < canvas.height; i++) {
      for (let j = 0; j < canvas.width; j++) {
        ctx.fillRect(i, j, 4, 4);

      }
    }

  }

  function updateField() {
    for (let i = 0; i < canvas.height; i++) {
      for (let j = 0; j < canvas.width; j++) {
        totalCells = 0;

        //add the number in the neighbour cells -> alive = number 1 in neighbor cell dead = number 0 in neighbor cell
        totalCells += random[i - 1][j - 1]; //top left
        totalCells += random[i - 1][j]; //top center
        totalCells += random[j - 1][j + 1]; //top right

        totalCells += random[i][j - 1]; //middle left
        totalCells += random[i][j + 1]; //middle right

        totalCells += random[i + 1][j - 1]; //bottom left
        totalCells += random[i + 1][j]; //bottom center
        totalCells += random[i + 1][j + 1]; //bottom right



        //check "game of life" - rules based on the sum of the neighbor cells
        switch (totalCells) {
          case 2: {
            mirrorRandom[i][j] = random[i][j]; break; //nothing changes
          }


          case 3: {
            mirrorRandom[i][j] = 1; break;        //alive
          }

          default: {
            mirrorRandom[i][j] = 0;                      //dead
          }


        }

      }
    }
  }
};