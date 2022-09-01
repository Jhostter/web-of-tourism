function checkCookie() {
  let temp = decodeURIComponent(document.cookie);
  if (temp) {
    let temptwo = temp.slice(temp.indexOf("=") + 1, temp.length);
    let cookie = JSON.parse(temptwo);
    return cookie;
  } else {
    return false;
  }
}

function setCookie(cname, cvalue) {
  var d = new Date();
  d.setTime(d.getTime() + 5 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function on() {
  document.getElementById("overlay").style.display = "block";
}

function off() {
  document.getElementById("overlay").style.display = "none";
}

function success() {
  document.getElementById("success").style.display = "block";
}

let cookie = checkCookie();

/* if (cookie) {
  if (cookie.verified == 1) {
    window.location.replace(location.origin + "/");
  }
} else {
  window.location.replace(location.origin + "/login.html");
} */

$("document").ready(function () {
  document.getElementById("code").addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("submit").click();
    }
  });

  let code = document.getElementById("code");

  document.getElementById("name").innerHTML += cookie.name;
  document.getElementById("acc").innerHTML += cookie.email;

  document.getElementById("submit").addEventListener("click", () => {
    let jsontosend = {
      email: cookie.email,
      code: code.value.toUpperCase(),
    };

    console.log(jsontosend);

    on();
    fetch("https://finalproject-309315.uc.r.appspot.com/user/verify", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      mode: "cors",
      body: JSON.stringify(jsontosend),
    })
      .then((resp) => resp.json())
      .then((data) => {
        off();
        if (data.success) {
          success();
          setCookie(
            "logged",
            `{"name":"${cookie.name}", "email":"${cookie.email}", "enc":"${cookie.enc}", "type":"${cookie.type}", "lastName":"${cookie.lastName}", "phoneNumber":"${cookie.phoneNumber}", "id":"${cookie.idUser}", "verified":"1", "image":"${cookie.image}"}`
          );
          setTimeout(() => {
            window.location.replace(location.origin + "/user_profile.html");
          }, 1000);
        } else {
          document.getElementById("status").innerHTML = "Codigo incorrecto";
        }
        console.log(data.success);
      });
    console.log(cookie.email);
  });

  document.getElementById("to-blue").addEventListener("click", () => {
    let jsontosend = {
      email: cookie.email,
    };
    fetch("http://1c97533161db.ngrok.io/user/send", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      mode: "cors",
      body: JSON.stringify(jsontosend),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.success) {
          document.getElementById("status").style = "color: green";
          document.getElementById("status").innerHTML = "Codigo enviado";
        }
      });

    document.getElementById("to-blue").style = "pointer-events: none";
    setTimeout(() => {
      document.getElementById("to-blue").style = "pointer-events: pointer";
    }, 10000);
  });
});
