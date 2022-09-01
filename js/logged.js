function checkCookie() {
  let temp = decodeURIComponent(document.cookie);
  if (temp) {
    let temptwo = temp.slice(temp.indexOf("=") + 1, temp.length);
    let cookie = JSON.parse(temptwo);

    return cookie;
  }
}
if (checkCookie() && checkCookie().verified == 1) {
  window.location.replace(location.origin + "/");
}
