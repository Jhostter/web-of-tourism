function checkCookie() {
  let temp = decodeURIComponent(document.cookie);
  if (temp) {
    let temptwo = temp.slice(temp.indexOf("=") + 1, temp.length);
    let cookie = JSON.parse(temptwo);
    console.log(cookie);
    return cookie;
  }
}

$("document").ready(() => {
  let cookie = checkCookie();
  let name = document.getElementById("inputName");
  let subject = document.getElementById("inputSubject");
  let message = document.getElementById("inputBody");

  document.getElementById("btn_guardar").addEventListener("click", () => {
    let jsontosend = {
      email: cookie.email,
      name: name.value,
      subject: subject.value,
      message: message.value,
    };

    console.log(jsontosend);
    fetch(`http://1c97533161db.ngrok.io/user/contact`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      mode: "cors",
      body: JSON.stringify(jsontosend),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
      });
  });
});
