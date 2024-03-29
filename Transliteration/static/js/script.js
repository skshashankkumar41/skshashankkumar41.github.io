makePostCall = function (url, data) {
  var json_data = JSON.stringify(data);

  return $.ajax({
    type: "POST",
    headers: {
      "x-requested-with": "xhr",
    },
    url: url,
    data: json_data,
    dataType: "json",
    contentType: "application/json;charset=utf-8",
  });
};

function typeWriter(
  selector_target,
  text_list,
  placeholder = false,
  i = 0,
  text_list_i = 0,
  delay_ms = 80
) {
  if (!i) {
    if (placeholder) {
      document.querySelector(selector_target).placeholder = "";
    } else {
      document.querySelector(selector_target).innerHTML = "";
    }
  }
  txt = text_list[text_list_i];
  if (i < txt.length) {
    if (placeholder) {
      document.querySelector(selector_target).placeholder += txt.charAt(i);
    } else {
      document.querySelector(selector_target).innerHTML += txt.charAt(i);
    }
    i++;
    setTimeout(
      typeWriter,
      delay_ms,
      selector_target,
      text_list,
      placeholder,
      i,
      text_list_i
    );
  } else {
    text_list_i++;
    if (typeof text_list[text_list_i] === "undefined") {
      // set "return;" for disabled infinite loop
      setTimeout(
        typeWriter,
        delay_ms * 5,
        selector_target,
        text_list,
        placeholder
      );
    } else {
      i = 0;
      setTimeout(
        typeWriter,
        delay_ms * 3,
        selector_target,
        text_list,
        placeholder,
        i,
        text_list_i
      );
    }
  }
}

window.onload = function () {
  document.getElementById("textMedical").onclick = function () {
    document.getElementById("resetButton").scrollIntoView();
  };

  timeout_var = null;
  text_list = ["hello", "namaste", "india"];

  return_value = typeWriter("#textMedical", text_list, true);
};

function getCorrect() {
  document.getElementById("container").innerHTML = "";
  document.getElementById("displayId").innerHTML = "";
  console.time("start");
  var text = document.getElementById("textMedical").value;
  console.log("GOT THE DATA");
  console.log(text);
  payload = {
    message: text,
  };
  $body = $("body");
  $(document).on({
    ajaxStart: function () {
      $body.addClass("loading");
    },
    ajaxStop: function () {
      $body.removeClass("loading");
    },
  });
  makePostCall(
    "https://cors-anywhere.herokuapp.com/https://sentiment-bert-api.herokuapp.com/post/",
    payload
  )
    .success(function (data) {
      console.log("RESPONSE::", data);
      console.timeEnd("start");
      if (data) {
        document.getElementById("displayId").innerHTML =
          '<div style="color:#229954">' + data.transliterated_text + " </div>";
        var bar = new ProgressBar.Circle(container, {
          color: "#229954",
          // This has to be the same size as the maximum width to
          // prevent clipping
          strokeWidth: 4,
          trailWidth: 1,
          easing: "easeInOut",
          duration: 1400,
          text: {
            autoStyleContainer: false,
          },
          from: { color: "#229954", width: 4 },
          to: { color: "#229954", width: 4 },
          // Set default step function for all animate calls
          step: function (state, circle) {
            circle.path.setAttribute("stroke", state.color);
            circle.path.setAttribute("stroke-width", state.width);

            circle.setText((parseFloat(1.0) * 100).toFixed(2) + "%");
          },
        });
        bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
        bar.text.style.fontSize = "2rem";

        bar.animate(parseFloat(1.0)); // Number from 0.0 to 1.0
        document.getElementById("displayId").scrollIntoView();
      } else {
        document.getElementById("displayId").innerHTML =
          '<div style="color:#FA3030">' + data.sentiment + " </div>";
        var bar = new ProgressBar.Circle(container, {
          color: "#FA3030",
          // This has to be the same size as the maximum width to
          // prevent clipping
          strokeWidth: 4,
          trailWidth: 1,
          easing: "easeInOut",
          duration: 1400,
          text: {
            autoStyleContainer: false,
          },
          from: { color: "#FA3030", width: 4 },
          to: { color: "#FA3030", width: 4 },
          // Set default step function for all animate calls
          step: function (state, circle) {
            circle.path.setAttribute("stroke", state.color);
            circle.path.setAttribute("stroke-width", state.width);

            circle.setText((parseFloat(data.proba) * 100).toFixed(2) + "%");
          },
        });
        bar.text.style.fontFamily = '"Raleway",sans-serif';
        bar.text.style.fontSize = "2rem";

        bar.animate(parseFloat(data.proba)); // Number from 0.0 to 1.0
        document.getElementById("displayId").scrollIntoView();
      }
    })
    .fail(function (sender, message, details) {
      console.log("Sorry, something went wrong!");
    });
}

function doReset() {
  document.getElementById("textMedical").value = "";
  document.getElementById("displayId").innerHTML = "";
  document.getElementById("container").innerHTML = "";
  document.getElementById("textMedical").scrollIntoView();
}
