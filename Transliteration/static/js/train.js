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

 window.onload = function(){
    document.getElementById("trainData").onclick = function() {
        document.getElementById("resetButton").scrollIntoView();
    };
}
 
 function doTrain(){
     var text = document.getElementById("trainData").value;
     var token = document.getElementById("token").value;
     if (token == ""){
         alert("Please Enter Train Token")
         return false
     }
     console.log("TRAIN DATA GOT")
     console.log(text)
     console.log(text.split(','))
     console.log("GOT TOKEN")
     console.log(token)
     payload = {
         "request_type": "train",
         "data": text.split(','),
         "token":token
     }
    $body = $("body");
    $(document).on({
        ajaxStart: function() { $body.addClass("loading");    },
        ajaxStop: function() { $body.removeClass("loading"); }    
    });
     makePostCall("https://kmltizy62e.execute-api.us-east-2.amazonaws.com/First", payload)
     .success(function(data){
         console.log("RESPONSE")
         console.log(data)
         if (data.response == "false"){
             console.log("FALSE INFORMATION")
            location.href = "../medical_correct/invalid_token.html"
         }
         else{
            console.log("TRUE INFORMATION")
            location.href = "../medical_correct/valid_token.html"
         }
     })
     .fail(function(sender, message, details){
             console.log("Sorry, something went wrong!");
     });
 }
 
 function doReset(){
     document.getElementById("trainData").value = "";
     document.getElementById("token").value = "";
 }