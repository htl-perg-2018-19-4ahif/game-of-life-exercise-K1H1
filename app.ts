window.onload = () => {
  const boardSize = 800;

  // Get reference to canvas
  const canvas = <HTMLCanvasElement>document.getElementById('canvas');
  canvas.width = canvas.height = boardSize;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgba(0, 0, 0, 1)';

  // Call 'draw' function whenever browser renders a frame on the screen
  window.requestAnimationFrame(draw);

  function draw() {
    // Demo code showing how to draw in the canvas
    ctx.clearRect(0, 0, boardSize, boardSize);
    ctx.fillRect(10, 10, 30, 30);

    
    window.requestAnimationFrame(draw);
  }
};