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

function typeWriter(selector_target, text_list, placeholder = false, i = 0, text_list_i=0, delay_ms=80) {
    if (!i) {
        if (placeholder) {
            document.querySelector(selector_target).placeholder = "";
        }
        else {
            document.querySelector(selector_target).innerHTML = "";
        }
    }
    txt = text_list[text_list_i];
    if (i < txt.length) {
        if (placeholder) {
            document.querySelector(selector_target).placeholder += txt.charAt(i);
        }
        else {
            document.querySelector(selector_target).innerHTML += txt.charAt(i);
        }
        i++;
        setTimeout(typeWriter, delay_ms, selector_target, text_list, placeholder, i, text_list_i);
    }
    else {
        text_list_i++;
        if (typeof text_list[text_list_i] === "undefined")  {
            // set "return;" for disabled infinite loop 
            setTimeout(typeWriter, (delay_ms*5), selector_target, text_list, placeholder);
        }
        else {
            i = 0;
            setTimeout(typeWriter, (delay_ms*3), selector_target, text_list, placeholder, i, text_list_i);
        }
    }
}

window.onload = function(){
    document.getElementById("textMedical").onclick = function() {
        document.getElementById("resetButton").scrollIntoView();
    };

    timeout_var = null;
    text_list = ["I need gaencolgist","Opthlmogst","Curuna virus","I have chst pain"];

    return_value = typeWriter("#textMedical", text_list, true);
}


function getCorrect(){
    document.getElementById("displayId").innerHTML= "";
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
        document.getElementById("displayId").scrollIntoView();
    })
    .fail(function(sender, message, details){
            console.log("Sorry, something went wrong!");
    });
}

function doReset(){
    document.getElementById("textMedical").value = "";
    document.getElementById("displayId").innerHTML = "";
}