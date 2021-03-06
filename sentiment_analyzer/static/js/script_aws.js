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
     document.getElementById("textMedical").onclick = function() {
         document.getElementById("resetButton").scrollIntoView();
     };
 }
 
 function getCorrect(){
     var text = document.getElementById("textMedical").value;
     console.log("GOT THE DATA")
     console.log(text)
     payload = {
        "text": text
    }
     $body = $("body");
     $(document).on({
         ajaxStart: function() { $body.addClass("loading");    },
         ajaxStop: function() { $body.removeClass("loading"); }    
     });
 
     makePostCall("https://gv0edji3se.execute-api.us-east-2.amazonaws.com/sent1", payload)
     .success(function(data){
         console.log("RESPONSE::",data)
         if (data.sentiment == 'Positive'){
             document.getElementById("displayId").innerHTML = '<div style="color:green">' +data.sentiment + " </div>";
             document.getElementById("displayId").scrollIntoView();
         }
         else{
             document.getElementById("displayId").innerHTML = '<div style="color:red">' +data.sentiment + " </div>";
             document.getElementById("displayId").scrollIntoView();
         }
         
     })
     .fail(function(sender, message, details){
             console.log("Sorry, something went wrong!");
     });
 }
 
 function doReset(){
     document.getElementById("textMedical").value = "";
     document.getElementById("displayId").innerHTML = "";
 }