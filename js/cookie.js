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
