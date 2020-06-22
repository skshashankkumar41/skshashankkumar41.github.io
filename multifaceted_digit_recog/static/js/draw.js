window.onload = function(){
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var painting = document.getElementById('paint');
    var paint_style = getComputedStyle(painting);
    var mouse = {x: 0, y: 0};
    canvas.addEventListener('mousemove', function(e) {
        document.getElementById("resetButton").scrollIntoView();
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
    }, false);
    ctx.lineWidth = 25;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    canvas.addEventListener('mousedown', function(e) {
        ctx.beginPath();
        ctx.moveTo(mouse.x, mouse.y);
        canvas.addEventListener('mousemove', onPaint, false);
    }, false);
    canvas.addEventListener('mouseup', function() {
    canvas.removeEventListener('mousemove', onPaint, false);
    }, false);
    var onPaint = function() {
    ctx.lineTo(mouse.x, mouse.y);
    ctx.stroke();
    };


 
}


$(document).ready(function () {
    initialize();
 });


 // works out the X, Y position of the click inside the canvas from the X, Y position on the page
 function getPosition(mouseEvent, sigCanvas) {
    var x, y;
    if (mouseEvent.pageX != undefined && mouseEvent.pageY != undefined) {
       x = mouseEvent.pageX;
       y = mouseEvent.pageY;
    } else {
       x = mouseEvent.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
       y = mouseEvent.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    return { X: x - sigCanvas.offsetLeft, Y: y - sigCanvas.offsetTop };
 }

 function initialize() {
    // get references to the canvas element as well as the 2D drawing context
    var sigCanvas = document.getElementById("canvas");
    var context = sigCanvas.getContext("2d");
    context.strokeStyle = 'Black';
    context.lineWidth = 25;
    context.lineJoin = 'round';
    context.lineCap = 'round';

    // This will be defined on a TOUCH device such as iPad or Android, etc.
    var is_touch_device = 'ontouchstart' in document.documentElement;

    if (is_touch_device) {
       // create a drawer which tracks touch movements
       var drawer = {
          isDrawing: false,
          touchstart: function (coors) {
             context.beginPath();
             context.moveTo(coors.x, coors.y);
             this.isDrawing = true;
          },
          touchmove: function (coors) {
             if (this.isDrawing) {
                context.lineTo(coors.x, coors.y);
                context.stroke();
             }
          },
          touchend: function (coors) {
             if (this.isDrawing) {
                this.touchmove(coors);
                this.isDrawing = false;
             }
          }
       };

       // create a function to pass touch events and coordinates to drawer
       function draw(event) {

          // get the touch coordinates.  Using the first touch in case of multi-touch
          var coors = {
             x: event.targetTouches[0].pageX,
             y: event.targetTouches[0].pageY
          };

          // Now we need to get the offset of the canvas location
          var obj = sigCanvas;

          if (obj.offsetParent) {
             // Every time we find a new object, we add its offsetLeft and offsetTop to curleft and curtop.
             do {
                coors.x -= obj.offsetLeft;
                coors.y -= obj.offsetTop;
             }
             // The while loop can be "while (obj = obj.offsetParent)" only, which does return null
             // when null is passed back, but that creates a warning in some editors (i.e. VS2010).
             while ((obj = obj.offsetParent) != null);
          }

          // pass the coordinates to the appropriate handler
          drawer[event.type](coors);
       }


       // attach the touchstart, touchmove, touchend event listeners.
       sigCanvas.addEventListener('touchstart', draw, false);
       sigCanvas.addEventListener('touchmove', draw, false);
       sigCanvas.addEventListener('touchend', draw, false);

       // prevent elastic scrolling
       sigCanvas.addEventListener('touchmove', function (event) {
          event.preventDefault();
       }, false); 
    }
    else {

       // start drawing when the mousedown event fires, and attach handlers to
       // draw a line to wherever the mouse moves to
       $("#canvasSignature").mousedown(function (mouseEvent) {
          var position = getPosition(mouseEvent, sigCanvas);

          context.moveTo(position.X, position.Y);
          context.beginPath();

          // attach event handlers
          $(this).mousemove(function (mouseEvent) {
             drawLine(mouseEvent, sigCanvas, context);
          }).mouseup(function (mouseEvent) {
             finishDrawing(mouseEvent, sigCanvas, context);
          }).mouseout(function (mouseEvent) {
             finishDrawing(mouseEvent, sigCanvas, context);
          });
       });

    }
 }

 // draws a line to the x and y coordinates of the mouse event inside
 // the specified element using the specified context
 function drawLine(mouseEvent, sigCanvas, context) {

    var position = getPosition(mouseEvent, sigCanvas);

    context.lineTo(position.X, position.Y);
    context.stroke();
 }

 // draws a line from the last coordiantes in the path to the finishing
 // coordinates and unbind any event handlers which need to be preceded
 // by the mouse down event
 function finishDrawing(mouseEvent, sigCanvas, context) {
    // draw the line to the finishing coordinates
    drawLine(mouseEvent, sigCanvas, context);

    context.closePath();

    // unbind any events which could draw
    $(sigCanvas).unbind("mousemove")
                .unbind("mouseup")
                .unbind("mouseout");
 }

 
makePostCall = function (url, data) { 
    var json_data = JSON.stringify(data);
 
     return $.ajax({
         type: "POST",
         url: url,
         data: json_data,
         dataType: "json",
         contentType: "application/json;charset=utf-8"
     });
 }

function doReset(){
    var canvas= document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0,  canvas.width, canvas.height);
}

function goPredict(){
    var canvas= document.getElementById('canvas');
    dataURL = canvas.toDataURL("image/png")
    height = canvas.height
    width = canvas.width

    payload = {
        "request_type" : "multifaceted",
        "data" : dataURL,
        "height" : height,
        "width" : width

    }

    console.log(payload)
    $body = $("body");
    $(document).on({
        ajaxStart: function() { $body.addClass("loading");    },
        ajaxStop: function() { $body.removeClass("loading"); }    
    });
    makePostCall("https://dt2cx7ys39.execute-api.us-east-2.amazonaws.com/second", payload)
    .success(function(data){
        console.log(data)
        localStorage["data"] = JSON.stringify(data);
        location.href = "../multifaceted_digit_recog/display.html"
    })
    .fail(function(sender, message, details){
            console.log("Sorry, something went wrong!");
    });


}