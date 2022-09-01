function checkCookie() {
  let temp = decodeURIComponent(document.cookie);
  if (temp) {
    let temptwo = temp.slice(temp.indexOf("=") + 1, temp.length);
    let cookie = JSON.parse(temptwo);
    console.log(cookie);
    return cookie;
  }
}

if (checkCookie()) {
  if (checkCookie().type != 0) {
    window.location.replace(location.origin + "/");
  }
}
