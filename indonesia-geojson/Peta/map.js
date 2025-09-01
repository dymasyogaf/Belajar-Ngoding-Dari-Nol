// Inisialisasi peta
var map = L.map('map').setView([-2.5, 118], 5);

// Tambahkan tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap'
}).addTo(map);

// Link Google Sheet dalam format CSV
const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQAWQ2sCK5xrq7tlCXligWX3xeFduFQew9Pk8QLVpww1C1fAcTxBAd6YeSd45tHENtcx3kEvQ_u2n7W/pub?output=csv";

// Mapper nama GeoJSON -> nama di Sheet
const nameMapper = {
  "DKI JAKARTA": "DKI JAKARTA",
  "DI YOGYAKARTA": "YOGYAKARTA",
  "BANGKA BELITUNG": "KEPULAUAN BANGKA BELITUNG",
  "KEPULAUAN RIAU": "KEPULAUAN RIAU",
};

// Ambil GeoJSON dan data penduduk dari Sheet
Promise.all([
  fetch('../indonesia-province.json').then(res => res.json()),
  fetch(sheetUrl).then(res => res.text())
]).then(([geoData, csvData]) => {
  // Convert CSV ke object
  let populationData = {};
  let rows = csvData.trim().split("\n").slice(1); // buang header
  rows.forEach(row => {
    let columns = row.split(",");
    if (columns.length >= 3) {
      let provinsi = columns[1].trim();
      let populationStr = columns[2].trim();
      let population = parseInt(populationStr.replace(/\./g, ''));
      if (provinsi && !isNaN(population)) {
        populationData[provinsi.toUpperCase()] = population;
      }
    }
  });

  console.log("Population Data:", populationData);

  // Fungsi untuk memberi warna berdasarkan jumlah penduduk
  function getColor(population) {
    if (typeof population !== "number" || isNaN(population)) return '#FFEDA0';
    return population > 40000000 ? '#800026' :
      population > 20000000 ? '#BD0026' :
        population > 10000000 ? '#E31A1C' :
          population > 5000000 ? '#FC4E2A' :
            population > 2000000 ? '#FD8D3C' :
              population > 1000000 ? '#FEB24C' :
                population > 500000 ? '#FED976' :
                  '#FFEDA0';
  }

  // Render GeoJSON ke peta
  L.geoJSON(geoData, {
    style: {
      color: "blue",
      weight: 1,
      fillColor: "orange",
      fillOpacity: 0.5
    },
    onEachFeature: function (feature, layer) {
      let provinceName = feature.properties.Propinsi.trim().toUpperCase();
      let mappedName = nameMapper[provinceName] || provinceName;
      let population = populationData[mappedName] || 'Data belum ada';

      let popupContent = `
        <h3>${feature.properties.Propinsi}</h3>
        <p><b>Jumlah Penduduk:</b> ${typeof population === "number"
          ? population.toLocaleString("id-ID")
          : population
        }</p>
      `;

      layer.on('mouseover', function () {
        layer.bindPopup(popupContent).openPopup();
        layer.setStyle({
          fillColor: "yellow",
          fillOpacity: 0.7
        });
      });

      layer.on('mouseout', function () {
        layer.setStyle({
          fillColor: "orange",
          fillOpacity: 0.5
        });
        layer.closePopup();
      });
    }
  }).addTo(map);
});
