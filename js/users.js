// Get element
var myCanvas = document.getElementById("canvas");
var ctx = myCanvas.getContext("2d");
var started = false, mouse_x = 0, mouse_y = 0;
var color = gen_color();
// Set Background Color
ctx.fillStyle="#fff";
ctx.fillRect(0,0,myCanvas.width,myCanvas.height);
myCanvas.width = 950;
myCanvas.height = 500;
ctx.lineWidth = 3;

$("#canvas").mousedown(function() {
  console.log("start");
  started = true;
  ctx.beginPath();
  mouse_x = event.clientX - myCanvas.offsetLeft;
  mouse_y = event.clientY - myCanvas.offsetTop;
  ctx.moveTo(mouse_x, mouse_y);
});
$("#canvas").mousemove(function() {
  if(started) {
    console.log("move");
    mouse_x = event.clientX - myCanvas.offsetLeft;
    mouse_y = event.clientY - myCanvas.offsetTop;
    socket.emit('next_dirs', {x_val:mouse_x, y_val:mouse_y, col:color});
    ctx.lineTo(mouse_x, mouse_y);
   	ctx.strokeStyle = color;
		ctx.stroke();
  }
});
$("#canvas").mouseup(function() {
  console.log("mouseup");
  started = false;
  ctx.closePath();
});
function gen_color() {
  var array = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
  var i = 0, ret = "#";
  for(;i < 6; i++) {
    ret = ret + array[Math.floor((Math.random() * 15) +1)];
  }
  console.log("ret " + ret);
  return ret;
}
