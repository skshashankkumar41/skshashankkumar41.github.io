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


 canvas.addEventListener("touchstart", function (e) {
    mousePos = getTouchPos(canvas, e);
  var touch = e.touches[0];
  var mouseEvent = new MouseEvent("mousedown", {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  canvas.dispatchEvent(mouseEvent);
}, false);
canvas.addEventListener("touchend", function (e) {
  var mouseEvent = new MouseEvent("mouseup", {});
  canvas.dispatchEvent(mouseEvent);
}, false);
canvas.addEventListener("touchmove", function (e) {
  var touch = e.touches[0];
  var mouseEvent = new MouseEvent("mousemove", {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  canvas.dispatchEvent(mouseEvent);
}, false);

// Get the position of a touch relative to the canvas
function getTouchPos(canvasDom, touchEvent) {
  var rect = canvasDom.getBoundingClientRect();
  return {
    x: touchEvent.touches[0].clientX - rect.left,
    y: touchEvent.touches[0].clientY - rect.top
  };
}
document.body.addEventListener("touchstart", function (e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  }, false);
  document.body.addEventListener("touchend", function (e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  }, false);
  document.body.addEventListener("touchmove", function (e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  }, false);
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