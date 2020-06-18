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

function getCorrect(){
    console.log("INSIDE SCRIPT");
    var text = document.getElementById("textMedical").value;
    console.log("GOT THE DATA")
    console.log(text)
    makePostCall("https://kmltizy62e.execute-api.us-east-2.amazonaws.com/First", {"text":text})
    .success(function(data){
        console.log(data)
        document.getElementById("displayId").innerHTML = data.corrected_string;
    })
    .fail(function(sender, message, details){
            console.log("Sorry, something went wrong!");
    });
}

function doReset(){
    document.getElementById("textMedical").value = "";
    document.getElementById("displayId").innerHTML = "";
}