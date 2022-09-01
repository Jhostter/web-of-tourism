function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + 5 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function checkCookie() {
  let temp = decodeURIComponent(document.cookie);
  if (temp) {
    let temptwo = temp.slice(temp.indexOf("=") + 1, temp.length);
    let cookie = JSON.parse(temptwo);
    console.log(cookie);
    return cookie;
  } else {
    console.log("no logged");
  }
}

function deleteCookie() {
  document.cookie =
    "logged" + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

function checkValid() {
  let temp = decodeURIComponent(document.cookie);
  if (temp) {
    let temptwo = temp.slice(temp.indexOf("=") + 1, temp.length);
    let cookie = JSON.parse(temptwo);
    console.log(cookie);

    fetch(`https://finalproject-309315.uc.r.appspot.com/user/test`, {
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      method: "POST",
      body: JSON.stringify(cookie),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.success) {
          console.log("valid");
        } else {
          deleteCookie();
          console.log("invalid");
        }
        console.log(data);
      });
    return cookie;
  }
}

function on() {
  document.getElementById("overlay").style.display = "block";
}

function off() {
  document.getElementById("overlay").style.display = "none";
}

$("document").ready(function () {
  document.getElementById("formlogin").addEventListener("submit", (e) => {
    e.preventDefault();

    on();
    let jsontosend = {
      email: document.getElementById("email").value,
      password: document.getElementById("pass").value,
    };

    fetch(`https://finalproject-309315.uc.r.appspot.com/user/login`, {
      headers: {
        "Content-Type": "application/json",
      },

      mode: "cors",
      method: "POST",
      body: JSON.stringify(jsontosend),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data[0]);
        if (data[0]) {
          console.log(data);
          setCookie(
            "logged",
            `{"name":"${data[0].Name}", "email":"${data[0].Email}", "enc":"${data[0].Password}", "type":"${data[0].Type}", "lastName":"${data[0].LastName}", "phoneNumber":"${data[0].PhoneNumber}", "id":"${data[0].idUser}", "verified":"${data[0].Verified}", "image":"${data[0].Image}"}`
          );
          window.location.replace(location.origin + "/");
        } else {
          console.log("asd");
          off();
        }
      });
  });
  //
});
