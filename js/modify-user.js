function checkCookie() {
  let temp = decodeURIComponent(document.cookie);
  if (temp) {
    let temptwo = temp.slice(temp.indexOf("=") + 1, temp.length);
    let cookie = JSON.parse(temptwo);
    return cookie;
  }
}

function setCookie(cname, cvalue, exdays) {
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

$("document").ready(() => {
  let name = document.getElementById("inputName");
  let lastName = document.getElementById("inputLastName");
  let phoneNumber = document.getElementById("inputTel");

  /* let password = document.getElementById("password");
  let repeatedPassword = document.getElementById("repeated-password"); */
  let image = document.getElementById("inputImage");

  let cookie = checkCookie();

  if (cookie.name != "null") {
    name.value = cookie.name;
  }
  if (cookie.lastName != "null") {
    lastName.value = cookie.lastName;
  }
  if (cookie.phoneNumber != "null") {
    phoneNumber.value = cookie.phoneNumber;
  }

  document.getElementById("btn_save_modify").addEventListener("click", () => {
    let body = new FormData();

    on();

    body.append("email", cookie.email);
    body.append("name", name.value);
    body.append("lastName", lastName.value);
    body.append("phoneNumber", phoneNumber.value);

    /* if (password.value) {
      if (repeatedPassword.value && repeatedPassword.value == password.value) {
        body.append("password", password.value);
      }
    } 

    if (image.files[0]) {
      body.append("file", image.files[0]);
    }*/

    console.log("a");
    fetch("http://1c97533161db.ngrok.io/user/modify", {
      method: "POST",
      mode: "cors",
      body: body,
    })
      .then((resp) => resp.json())
      .then((data) => {
        off();
        console.log(data);
        setCookie(
          "logged",
          `{"name":"${data[0].Name}", "email":"${data[0].Email}", "enc":"${data[0].Password}", "type":"${data[0].Type}", "lastName":"${data[0].LastName}", "phoneNumber":"${data[0].PhoneNumber}", "id":"${data[0].idUser}", "verified":"${data[0].Verified}", "image":"${data[0].Image}"}`
        );
        $("#profile-edit-modal").modal("hide");
      });
  });

  document
    .getElementById("profile-img-container")
    .addEventListener("click", () => {
      $("#image-edit-modal").modal("show");

      document.getElementById("upload-image").addEventListener("click", () => {
        if (image.files[0]) {
          let body = new FormData();
          on();

          console.log(image.files[0]);

          body.append("email", cookie.email);
          body.append("file", image.files[0]);

          fetch("http://1c97533161db.ngrok.io/user/image", {
            method: "POST",
            mode: "cors",
            body: body,
          })
            .then((resp) => resp.json())
            .then((data) => {
              console.log(data);
              setCookie(
                "logged",
                `{"name":"${data[0].Name}", "email":"${data[0].Email}", "enc":"${data[0].Password}", "type":"${data[0].Type}", "lastName":"${data[0].LastName}", "phoneNumber":"${data[0].PhoneNumber}", "id":"${data[0].idUser}", "verified":"${data[0].Verified}", "image":"${data[0].Image}"}`
              );

              window.location.reload();
              //$("#profile-edit-modal").modal("hide");
            });
        } else {
          document
            .getElementById("upload-image")
            .addEventListener("click", () => {
              $("#image -edit-modal").modal("hide");
            });
        }
      });
    });
});
