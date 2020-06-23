
window.onload = function(){
    canvas.addEventListener('mousemove', function(e) {
        document.getElementById("resetButton").scrollIntoView();
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