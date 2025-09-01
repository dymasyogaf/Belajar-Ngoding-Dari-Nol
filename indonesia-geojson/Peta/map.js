// Inisialisasi peta
var map = L.map('map').setView([-2.5, 118], 5);

// Tambahkan tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap'
}).addTo(map);

// Load GeoJSON provinsi and population data
Promise.all([
  fetch('../indonesia-province.json').then(res => res.json()),
  fetch('population.json').then(res => res.json())
]).then(([geoData, populationData]) => {
  L.geoJSON(geoData, {
    style: {
      color: "blue",
      weight: 1,
      fillColor: "orange",
      fillOpacity: 0.5
    },
    onEachFeature: function (feature, layer) {
      // Get population from populationData using province name (case insensitive)
      let provinceName = feature.properties.Propinsi.toUpperCase();
      let population = populationData[provinceName] || 'Data belum ada';

      // Bikin konten popup
      let popupContent = `
        <h3>${feature.properties.Propinsi}</h3>
        <p><b>Jumlah Penduduk:</b> ${population}</p>
      `;

      // Event: klik provinsi
      layer.on('click', function () {
        // Zoom ke area provinsi
        map.fitBounds(layer.getBounds());
      });

      layer.on('mouseover', function () {
        // Tampilkan popup
        layer.bindPopup(popupContent).openPopup();
      });

      // Event: hover (optional, biar ada highlight)
      layer.on('mouseover', function () {
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
