// Input Lock
$('textarea').blur(function () {
    $('#hire textarea').each(function () {
        $this = $(this);
        if ( this.value != '' ) {
          $this.addClass('focused');
          $('textarea + label + span').css({'opacity': 1});
        }
        else {
          $this.removeClass('focused');
          $('textarea + label + span').css({'opacity': 0});
        }
    });
});

$('#hire .field:first-child input').blur(function () {
    $('#hire .field:first-child input').each(function () {
        $this = $(this);
        if ( this.value != '' ) {
          $this.addClass('focused');
          $('.field:first-child input + label + span').css({'opacity': 1});
        }
        else {
          $this.removeClass('focused');
          $('.field:first-child input + label + span').css({'opacity': 0});
        }
    });
});

$('#hire .field:nth-child(2) input').blur(function () {
    $('#hire .field:nth-child(2) input').each(function () {
        $this = $(this);
        if ( this.value != '' ) {
          $this.addClass('focused');
          $('.field:nth-child(2) input + label + span').css({'opacity': 1});
        }
        else {
          $this.removeClass('focused');
          $('.field:nth-child(2) input + label + span').css({'opacity': 0});
        }
    });
});


makePostCall = function (url, data) { 
  var json_data = JSON.stringify(data);
   console.log("SENDING DATA")
   return $.ajax({
       type: "POST",
       url: url,
       data: json_data,
       dataType: "json",
       contentType: "application/json;charset=utf-8"
   });
}

function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    
    return (false)
}


function sendEmail(){
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var msg = document.getElementById("msg").value;
  sendAll = true 
  sendEmailText = true
  if (name == "" || email =="" || msg == ""){
    sendAll = false
  }
  if (ValidateEmail(email) == false){
    sendEmailText = false
  }

  console.log("GOT THE DATA")
  console.log("NAME::",name)
  console.log("ENAIL::",email)
  console.log("MSG::",msg)
  payload = {
      "name":name,
      "email":email,
      "msg":msg
  }
  if (sendAll == true && sendEmailText == true){
    $body = $("body");
    $(document).on({
        ajaxStart: function() { $body.addClass("loading");    },
        ajaxStop: function() { $body.removeClass("loading"); }    
    });
    makePostCall("https://eenqa31cg3.execute-api.us-east-2.amazonaws.com/emailAPIver1", payload)
    .success(function(data){
        console.log(data)
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("msg").value = "";
        document.getElementById("correctButton").innerHTML = "Sent!!";
        document.getElementById("correctButton").style.color = "#00ff4c"
        document.getElementById("correctButton").style.background = "#313A3D"
        
    })
    .fail(function(sender, message, details){
            console.log("Sorry, something went wrong!");
            document.getElementById("correctButton").innerHTML = "Not Sent!!";
            document.getElementById("correctButton").style.color = "#EA0C0C"
            document.getElementById("correctButton").style.background = "#313A3D"
    });
  }
  else if (sendAll == false){
    alert("Please Fill Form Completely")
  }
  else if (sendEmailText == false){
    alert("You have entered an invalid email address!")
  }
  else {
    alert("Please Fill Form Correctly")
  }
  
}
