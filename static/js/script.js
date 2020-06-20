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
    var text = document.getElementById("textMedical").value;
    console.log("GOT THE DATA")
    console.log(text)
    payload = {
        "request_type": "spell_correct",
        "text": text
    }
    $body = $("body");
    $(document).on({
        ajaxStart: function() { $body.addClass("loading");    },
        ajaxStop: function() { $body.removeClass("loading"); }    
    });
    makePostCall("https://kmltizy62e.execute-api.us-east-2.amazonaws.com/First", payload)
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