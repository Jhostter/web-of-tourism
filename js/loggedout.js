function checkCookie() {
  let temp = decodeURIComponent(document.cookie);
  if (temp) {
    let temptwo = temp.slice(temp.indexOf("=") + 1, temp.length);
    let cookie = JSON.parse(temptwo);

    return cookie;
  }
}

let cookie = checkCookie();

if (cookie == undefined) {
  window.location.replace(location.origin + "/login.html");
} else {
  if (cookie.verified == 0) {
    window.location.replace(location.origin + "/verify-account.html");
  }
}
