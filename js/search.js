container = document.getElementById("cardContainer");

let marker;
let map;
let text;

function hide(element) {
  transition.begin(element, "opacity 1 0 80ms linear");
}
function show(element) {
  transition.begin(element, "opacity 0 1 80ms linear");
}

function getParams() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let province;
  let type;

  if (urlParams.has("type")) {
    type = urlParams.get("type").split("-");
  }
  if (urlParams.has("text")) {
    text = urlParams.get("text");
  }
  if (urlParams.has("province")) {
    province = urlParams.get("province");
  }

  let hotel = document.getElementById("selectHotel");
  let restaurant = document.getElementById("selectRestaurante");
  let activity = document.getElementById("selectActividad");
  let destination = document.getElementById("selectDestino");

  if (type) {
    if (type.includes("hotel")) {
      hotel.checked = true;
    }
    if (type.includes("restaurant")) {
      restaurant.checked = true;
    }
    if (type.includes("activities")) {
      activity.checked = true;
    }
    if (type.includes("destination")) {
      destination.checked = true;
    }
  }
  if (text) {
    document.getElementById("search_input").value = text;
  }
  if (province) {
    document.getElementById("inputProvincia").value = province;
    if (document.getElementById("inputProvincia").value == "") {
      document.getElementById("inputProvincia").value = "";
    }
  }
}

function on() {
  document.getElementById("overlay").style.display = "block";
}

function off() {
  document.getElementById("overlay").style.display = "none";
}

function createCard(data) {
  container.innerHTML = "";
  data.forEach((element) => {
    temparr = element.Image.split(",");
    let images = temparr[0].slice(1, temparr[0].length);

    tmp = "";

    if ("Services" in element) {
      let tempsrvcs = element.Services;

      if (tempsrvcs.length > 2) {
        tmp = tempsrvcs.slice(1, element.Services.length - 1);
      } else {
      }
    }

    if (element.TypeOf == "Restaurante") {
      container.innerHTML += `<a onclick="info(this)" id="clickable-div" data-info='{"name" : "${element.Name}", "type": "${element.TypeOf}",
    "description": "${element.Description}", "coordN": "${element.CoordN}", "coordW": "${element.CoordW}", "phoneNumber": "${element.PhoneNumber}", "province": "${element.Province}", "rnc": "${element.Rnc}",
    "id": "${element.idBusiness}", "concept": "${element.Concept}", "image": ${element.Image}}'>
    
    <div class="card">
       <img src="${images}" class="imgM">
     <div class="info">
        <p class="categoria comida">${element.TypeOf}</p>
        <p class="titulo">${element.Name}</p>
        <p class="precio fas fa-map-marker-alt">  ${element.Province}</p>
     </div>
   </div>
   </a>`;
    } else if (element.TypeOf == "Hotel") {
      container.innerHTML += `
    <a onclick="info(this)" id="clickable-div" data-info='{"name" : "${element.Name}", "type": "${element.TypeOf}",
    "description": "${element.Description}", "phoneNumber": "${element.PhoneNumber}", "province": "${element.Province}", "rnc": "${element.Rnc}",
    "services": "${tmp}", "noOfRooms": "${element.NoOfRooms}", "coordN": "${element.CoordN}", "coordW": "${element.CoordW}", "id": "${element.idBusiness}",  "image": ${element.Image}, "stars": "${element.Stars}"}'>
    <div class="card">
    <img src="${images}" class="imgM">
        <div class="info">
            <p class="categoria hospedaje">${element.TypeOf}</p>
            <p class="titulo">${element.Name}</p>
            <p class="precio fas fa-map-marker-alt">  ${element.Province}</p>
        </div>
     </div>
     </a>`;
    } else if ("Cupo" in element) {
      container.innerHTML += `
    <a onclick="info(this)" id="clickable-div" data-info='{"name" : "${element.Name}", "type": "Actividad",
    "description": "${element.Description}", "province": "${element.Province}", "coordN": "${element.CoordN}", "coordW": "${element.CoordW}",  "image": ${element.Image}, "id": "${element.idActivity}"}'>
    <div class="card">
    <img src="${images}" class="imgM">
        <div class="info">
            <p class="categoria actividad">Actividad</p>
            <p class="titulo">${element.Name}</p>
            <p class="precio fas fa-map-marker-alt">  ${element.Province}</p>
        </div>
     </div>
     </a>`;
    } else {
      container.innerHTML += `
    <a onclick="info(this)" id="clickable-div" data-info='{"name" : "${element.Name}", "type": "Destino",
    "description": "${element.Description}", "province": "${element.Province}", "coordN": "${element.CoordN}", "coordW": "${element.CoordW}",  "image": ${element.Image}, "id": "${element.idDestination}"}'>
    <div class="card">
    <img src="${images}" class="imgM">
        <div class="info">
            <p class="categoria paseo">Destino</p>
            <p class="titulo">${element.Name}</p>
            <p class="precio fas fa-map-marker-alt">  ${element.Province}</p>
        </div>
     </div>
     </a>`;
    }
  });
}

function setMapa(n, w) {
  if (n === undefined) {
    x = -19;
    y = 19;
  } else {
    x = n;
    y = w;
  }

  map = new google.maps.Map(document.getElementById("map"), {
    center: new google.maps.LatLng(x, y),
    zoom: 11,
    disableDefaultUI: true,
  });

  const styles = {
    default: [],
    hide: [
      {
        featureType: "poi.business",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "transit",
        elementType: "labels.icon",
        stylers: [{ visibility: "off" }],
      },
    ],
  };
  map.setOptions({ styles: styles["hide"] });

  marker = new google.maps.Marker({
    position: new google.maps.LatLng(x, y),
    map: map,
    animation: google.maps.Animation.DROP,
  });
}

function info(elem) {
  let tmp = elem.getAttribute("data-info");
  data = tmp.replace(/\r?\n/g, " ");
  let objdata = JSON.parse(data);

  let images = objdata.image.split(",");
  fetch(
    `https://finalproject-309315.uc.r.appspot.com/search/add?id=${objdata.id}&type=${objdata.type}`,
    {
      method: "POST",
      mode: "cors",
    }
  )
    .then((resp) => resp.json())
    .then((data) => {});

  if (objdata.type == "Hotel") {
    setMapa(objdata.coordN, objdata.coordW);

    let imageElem = "";
    images.forEach((element) => {
      imageElem += `<img src="${element}" class="imge" alt="">`;
    });

    document.getElementById("modal_info").innerHTML = `
 
    <div id="slider">
     <figure>
     ${imageElem}
     
     </figure>
    </div>
    <h2><b>${objdata.name}<br></b></h2>
    <h6>${objdata.type} <br><br></h6>

    <h6 class="fas fa-cocktail"> Servicios mas destacados</h6>

    <h6 class=""> ${objdata.services}<br><br></h6>

    <h6 class="fas fa-phone"> Telefono</h6>
    
    <p > ${objdata.phoneNumber}<br><br></p>


    <h6><strong> Descripcion</strong> </h6>
    <p style="padding-right: 2%;">${objdata.description}<br><br></p>

    <h6 class="precio fas fa-map-marker-alt"> ${objdata.province}</h6>
    `;
  } else if (objdata.type == "Restaurante") {
    setMapa(objdata.coordN, objdata.coordW);

    let imageElem = "";
    images.forEach((element) => {
      imageElem += `<img src="${element}" class="imge" alt="">`;
    });

    document.getElementById("modal_info").innerHTML = `
    <div id="slider">
     <figure>
      ${imageElem}
     </figure>
    </div>
    <h2><b>${objdata.name}</b></h2>
    <h6>${objdata.type}<br><br></h6>
   
    <p class="fas fa-utensils"> Concepto</p>
    <p> ${objdata.concept} <br><br></p>
    
    <h6 class="fas fa-phone"> Telefono</h6>
    
    <p > ${objdata.phoneNumber}<br><br></p>
    
    <h6><strong> Descripcion</strong> </h6>
    <p style="padding-right: 2%;">${objdata.description}<br><br></p>

    <h6 class="precio fas fa-map-marker-alt"> ${objdata.province}</h6>
    
    `;
  } else if (objdata.type == "Destino") {
    setMapa(objdata.coordN, objdata.coordW);

    let imageElem = "";
    images.forEach((element) => {
      imageElem += `<img src="${element}" class="imge" alt="">`;
    });

    document.getElementById("modal_info").innerHTML = `
    <div id="slider">
    <figure class="modal-image-container">
   ${imageElem}
  </figure>
    </div>
    <h2><b>${objdata.name}</b></h2>
    <h6>${objdata.type}<br><br></h6>
   
    <h6><strong> Descripcion</strong> </h6>
    <p style="padding-right: 2%;">${objdata.description}<br><br></p>

    <h6 class="precio fas fa-map-marker-alt"> ${objdata.province}</h6>
    `;
  } else if (objdata.type == "Actividad") {
    setMapa(objdata.coordN, objdata.coordW);

    let imageElem = "";
    images.forEach((element) => {
      imageElem += `<img src="${element}" class="imge" alt="">`;
    });

    document.getElementById("modal_info").innerHTML = `
    <div id="slider">
    <figure class="modal-image-container">
   ${imageElem}
  </figure>
    </div>

    <h2><b>${objdata.name}</b></h2>
    <h6>${objdata.type}<br><br></h6>
   
    <h6><strong> Descripcion</strong> </h6>
    <p style="padding-right: 2%;">${objdata.description}<br><br></p>

    <h6 class="precio fas fa-map-marker-alt"> ${objdata.province}</h6>
    `;
  }

  $("#myModal").modal();
}

$("document").ready(function () {
  let containerToAnimate = document.getElementById("cardContainer");
  if (document.getElementById("searchbtn")) {
    getParams();
    let allData;

    function test() {
      if (allData) {
        let province = document.getElementById("inputProvincia").value;
        let hotels;
        let restaurants;
        let activities;
        let destinations;

        let finalData = {};

        let selectedHotel = document.getElementById("selectHotel");
        let selectedRestaurante = document.getElementById("selectRestaurante");
        let selectedActividad = document.getElementById("selectActividad");
        let selectedDestino = document.getElementById("selectDestino");

        if (!province == "") {
          hotels = allData.filter(
            (allData) =>
              "TypeOf" in allData &&
              allData.TypeOf == "Hotel" &&
              allData.Province == province
          );
          restaurants = allData.filter(
            (allData) =>
              "TypeOf" in allData &&
              allData.TypeOf == "Restaurante" &&
              allData.Province == province
          );
          activities = allData.filter(
            (allData) => "idActivity" in allData && allData.Province == province
          );
          destinations = allData.filter(
            (allData) =>
              "idDestination" in allData && allData.Province == province
          );
        } else {
          province = "";
          hotels = allData.filter(
            (allData) => "TypeOf" in allData && allData.TypeOf == "Hotel"
          );
          restaurants = allData.filter(
            (allData) => "TypeOf" in allData && allData.TypeOf == "Restaurante"
          );
          activities = allData.filter((allData) => "idActivity" in allData);
          destinations = allData.filter(
            (allData) => "idDestination" in allData
          );
        }

        finalData.hotels = hotels;
        finalData.restaurants = restaurants;
        finalData.activities = activities;
        finalData.destinations = destinations;

        if (selectedHotel.checked) {
          finalData.hotels = hotels;
        } else {
          delete finalData.hotels;
        }
        if (selectedRestaurante.checked) {
          finalData.restaurants = restaurants;
        } else {
          delete finalData.restaurants;
        }
        if (selectedActividad.checked) {
          finalData.activities = activities;
        } else {
          delete finalData.activities;
        }
        if (selectedDestino.checked) {
          finalData.destinations = destinations;
        } else {
          delete finalData.destinations;
        }
        if (
          !selectedDestino.checked &&
          !selectedActividad.checked &&
          !selectedRestaurante.checked &&
          !selectedHotel.checked
        ) {
          finalData.hotels = hotels;
          finalData.restaurants = restaurants;
          finalData.activities = activities;
          finalData.destinations = destinations;
        }
        let arr = [];

        Object.values(finalData).forEach((element) => {
          element.forEach((el) => {
            arr.push(el);
          });
        });
        if (document.getElementById("bywhat").value == "top") {
          arr.sort(function (a, b) {
            return a.SearchedTimes - b.SearchedTimes;
          });

          arr.reverse();
        } else if (document.getElementById("bywhat").value == "random") {
          arr.sort(() => Math.random() - 0.5);
        }
        if (document.getElementById("order").value == "ascendant") {
          arr.reverse();
        }
        //console.log(arr);

        hide(containerToAnimate);

        createCard(arr);

        show(containerToAnimate);
      }
    }
    on();
    if (document.getElementById("search_input").value != "") {
      fetch(`https://finalproject-309315.uc.r.appspot.com/search?ts=${text}`)
        .then((response) => response.json())
        .then(function (data) {
          allData = data;
          test();
          off();
        });
    } else {
      fetch(`https://finalproject-309315.uc.r.appspot.com/search?ts=`)
        .then((response) => response.json())
        .then(function (data) {
          allData = data;
          test();
          off();
        });
    }
    document.getElementById("searchbtn").addEventListener("click", () => {
      let text = document.getElementById("search_input").value;
      container.innerHTML = "";

      fetch(`https://finalproject-309315.uc.r.appspot.com/search?ts=${text}`)
        .then((response) => response.json())
        .then(function (data) {
          allData = data;
          test();
        });
    });
    document.getElementById("filter").addEventListener("change", () => {
      test();
    });

    document.getElementById("inputProvincia").addEventListener("change", () => {
      test();
    });
  }

  if (document.getElementById("restaurant-count")) {
    fetch(`https://finalproject-309315.uc.r.appspot.com/search/count`)
      .then((resp) => resp.json())
      .then((data) => {
        let obj = {};
        obj.restaurant = data.restaurant;
        obj.hotel = data.hotel;
        obj.activities = data.activities;
        obj.destination = data.destination;

        document.getElementById("restaurant-count").innerHTML =
          obj.restaurant + " Resultados";
        document.getElementById("hotel-count").innerHTML =
          obj.hotel + " Resultados";
        document.getElementById("activities-count").innerHTML =
          obj.activities + " Resultados";
        document.getElementById("destination-count").innerHTML =
          obj.destination + " Resultados";
      });

    fetch(`https://finalproject-309315.uc.r.appspot.com/search/popular`)
      .then((resp) => resp.json())
      .then((data) => {
        let toInsert;
        for (let i = 0; i < data.length; i++) {
          data.reverse();
          const elem = data[i];

          let tmp = elem.Image.split(",");
          let image = tmp[0].slice(1, tmp[0].length);
          console.log(image);

          if (elem.hasOwnProperty("idDestination")) {
            toInsert = `
          <a href="search.html" class="remove-underline" style="text-decoration: none; color: black;">
          <div class="card2">
          <img src="${image}" class="imgIdx">

          
          <div class="info">
          <p class="categoria paseo">Destino</p>
          <p class="titulo">${elem.Name}</p>
          <p class="precio fas fa-map-marker-alt">  ${elem.Province}</p>
          </div>
          
          </div>
          </a>
          `;
          } else if ("idBusiness" in elem) {
            if (elem.TypeOf == "Hotel") {
              toInsert = `       
            <a href="search.html" class="remove-underline" style="text-decoration: none; color: black;">
            <div class="card2">
            <img src="${image}" class="imgIdx">

            
            <div class="info">
            <p class="categoria hospedaje">${elem.TypeOf}</p>
            <p class="titulo">${elem.Name}</p>
            <p class="precio fas fa-map-marker-alt">  ${elem.Province}</p>
            </div>
            
            </div>
            </a>
            `;
            } else if (elem.TypeOf == "Restaurante") {
              toInsert = `       
            <a href="search.html" class="remove-underline" style="text-decoration: none; color: black;">
            <div class="card2">
            <img src="${image}" class="imgIdx">
            
            <div class="info">
            <p class="categoria comida">${elem.TypeOf}</p>
            <p class="titulo">${elem.Name}</p>
            <p class="precio fas fa-map-marker-alt">  ${elem.Province}</p>
            </div>
            
            </div>
            </a>
        `;
            }
          } else if ("idActivities" in elem) {
            toInsert = `        
      <a href="search.html" class="remove-underline" style="text-decoration: none; color: black;">
      <div class="card2">
      
      <img src="${image}" class="imgIdx">

      <div class="info">
      <p class="categoria actividad">Actividad</p>
      <p class="titulo">${elem.Name}</p>
      <p class="precio fas fa-map-marker-alt">  ${elem.Province}</p>
      </div>
      
      </div>
      </a>
      `;
          }

          document.getElementById("top-container").innerHTML += toInsert;
        }
      });
  }

  if (document.getElementById("checkboxHotel")) {
    let checkboxes = document.getElementsByClassName("searchbox");
    let searchinput = document.getElementById("search-text");
    let searchButton = document.getElementById("search-button");
    let province = document.getElementById("inputProvincia");

    searchButton.addEventListener("click", () => {
      if (searchinput.value != "") {
        if (searchButton.getAttribute("href").includes("?")) {
          searchButton.setAttribute(
            "href",
            searchButton.getAttribute("href") + "&text=" + searchinput.value
          );
        } else {
          searchButton.setAttribute(
            "href",
            searchButton.getAttribute("href") + "?text=" + searchinput.value
          );
        }

        console.log(searchButton.getAttribute("href"));
      } else {
        console.log(searchinput.value);
      }

      if (province.value == "") {
        console.log("doesnt exists");
      } else {
        if (searchButton.getAttribute("href").includes("?")) {
          searchButton.setAttribute(
            "href",
            searchButton.getAttribute("href") + "&province=" + province.value
          );
        } else {
          searchButton.setAttribute(
            "href",
            searchButton.getAttribute("href") + "?province=" + province.value
          );
        }
        console.log(searchButton.getAttribute("href"));
        console.log(province.value);
      }
    });

    document.getElementById("on-change").addEventListener("change", () => {
      let params = [];
      let str = "";
      let x;
      for (let i = 0; i < checkboxes.length; i++) {
        let element = checkboxes[i];

        if (element.checked) {
          if (element.id == "checkboxHotel") {
            x = "hotel";
          }
          if (element.id == "checkboxRestaurante") {
            x = "restaurant";
          }
          if (element.id == "checkboxDestino") {
            x = "destination";
          }
          if (element.id == "checkboxActividad") {
            x = "activities";
          }
          params.push(x);
        }
      }
      params.forEach((element) => {
        str += element + "-";
      });
      console.log(str.slice(0, str.length - 1));
      if (str == "") {
        document
          .getElementById("search-button")
          .setAttribute("href", `search.html`);
      } else {
        document
          .getElementById("search-button")
          .setAttribute(
            "href",
            `search.html?type=${str.slice(0, str.length - 1)}`
          );
      }
    });
  }
});
