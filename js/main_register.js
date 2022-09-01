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

function on() {
  document.getElementById("overlay").style.display = "block";
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

$("document").ready(function () {
  var formRegister = document.getElementById("formregister");
  document.getElementById("register").addEventListener("click", (e) => {
    let usrData;
    let email = document.getElementById("email").value;
    let name = document.getElementById("username").value;
    e.preventDefault();

    let jsontosend = {
      name: capitalizeFirstLetter(document.getElementById("username").value),
      email: document.getElementById("email").value,
      password: document.getElementById("pass").value,
    };

    fetch(`http://1c97533161db.ngrok.io/user/register`, {
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      method: "POST",
      body: JSON.stringify(jsontosend),
    })
      .then((resp) => resp.json())
      .then((data) => {
        usrData = data[0];
        console.log(usrData);
        if (data.exists) {
          document.getElementById("info").innerHTML =
            "Ya existe una cuenta registrada con ese correo";

          document.getElementById("pass").value = "";
        } else {
          fetch("http://1c97533161db.ngrok.io/user/send", {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
            mode: "cors",
            body: JSON.stringify({ email: email }),
          })
            .then((resp) => resp.json())
            .then((data) => {
              if (data.success) {
                setCookie(
                  "logged",
                  `{"name":"${capitalizeFirstLetter(usrData.Name)}", "email":"${
                    usrData.Email
                  }", "enc":"${usrData.Password}", "type":"${
                    usrData.Type
                  }", "lastName":"${usrData.LastName}", "phoneNumber":"${
                    usrData.PhoneNumber
                  }", "id":"${usrData.idUser}", "verified":"0", "image":"${
                    usrData.Image
                  }"}`
                );
                /*setCookie(
                  "logged",
                  `{"email":"${email}", "verified":"0", "name":"${capitalizeFirstLetter(
                    name
                  )}"}`
                );*/
                on();
                window.location.replace(
                  location.origin + "/verify-account.html"
                );
              }
            });
        }
      });
  });
});
