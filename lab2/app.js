
const pakistanLimits = L.latLngBounds(
  [21.5, 58.5],
  [39.0, 80.5]
);

const map = L.map("map", {
  maxBounds: pakistanLimits,
  maxBoundsViscosity: 1.0,
  minZoom: 5
}).setView([30.3753, 69.3451], 5);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

const provinceSelect = document.getElementById("province");
const countDisplay = document.getElementById("count");

let districts = null;
let districtLayer = null;


// Format values safely for district popups.
function show(value) {
  if (value === null || value === undefined || value === "") {
    return "Not recorded";
  }

  if (typeof value === "number") {
    return value.toLocaleString();
  }

  const numericValue = Number(value);

  if (typeof value === "string" && value.trim() !== "" &&
      Number.isFinite(numericValue)) {
    return numericValue.toLocaleString();
  }

  return String(value);
}


// Assign a colour according to the population.
function colourFor(population) {
  if (
    population === null ||
    population === undefined ||
    population === ""
  ) {
    return "#c9cfd1";
  }

  const value = Number(population);

  if (!Number.isFinite(value)) {
    return "#c9cfd1";
  }

  if (value > 3000000) return "#7f2704";
  if (value > 1500000) return "#d94801";
  if (value > 750000) return "#f16913";
  if (value > 300000) return "#fd8d3c";

  return "#fdd0a2";
}


// Style each district.
function styleFor(feature) {
  return {
    color: "#23373b",
    weight: 1,
    fillColor: colourFor(feature.properties.pop_2023),
    fillOpacity: 0.8
  };
}


// Create a popup for each district.
function onEachFeature(feature, layer) {
  const p = feature.properties;

  layer.bindPopup(
    "<strong>" + show(p.district) + "</strong><br>" +
    "Province: " + show(p.province) + "<br>" +
    "Population: " + show(p.pop_2023) + "<br>" +
    "Area: " + show(p.area_km2) + " km<sup>2</sup>"
  );
}


// Populate the province selector from the GeoJSON data.
function fillProvinceList() {
  const provinces = [
    ...new Set(
      districts.features
        .map(feature => feature.properties.province)
        .filter(Boolean)
    )
  ].sort();

  // Keep the existing "All provinces" option.
  provinceSelect.innerHTML = "";

  const allOption = document.createElement("option");
  allOption.value = "All";
  allOption.textContent = "All provinces";
  provinceSelect.appendChild(allOption);

  for (const name of provinces) {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    provinceSelect.appendChild(option);
  }
}


// Draw the selected districts on the map.
function displayDistricts() {
  if (!districts) return;

  const selectedProvince = provinceSelect.value;

  const filteredFeatures = districts.features.filter(feature =>
    selectedProvince === "All" ||
    feature.properties.province === selectedProvince
  );

  // Remove the previous layer before drawing another one.
  if (districtLayer) {
    map.removeLayer(districtLayer);
  }

  districtLayer = L.geoJSON(
    {
      type: "FeatureCollection",
      features: filteredFeatures
    },
    {
      style: styleFor,
      onEachFeature: onEachFeature
    }
  ).addTo(map);

  countDisplay.textContent =
    filteredFeatures.length + " districts";

  // Zoom to the selected districts when available.
  if (filteredFeatures.length > 0) {
    map.fitBounds(districtLayer.getBounds(), {
      padding: [10, 10],
      maxZoom: 9
    });
  }
}


// Add the population legend.
const legend = L.control({
  position: "bottomright"
});

legend.onAdd = function () {
  const div = L.DomUtil.create("div", "legend");

  const breaks = [
    0,
    300000,
    750000,
    1500000,
    3000000
  ];

  const labels = [
    "Under 300,000",
    "300,000–750,000",
    "750,000–1.5 million",
    "1.5–3 million",
    "Over 3 million"
  ];

  div.innerHTML = "<strong>Population (2023)</strong><br>";

  for (let i = 0; i < breaks.length; i++) {
    div.innerHTML +=
      '<i style="background:' +
      colourFor(breaks[i] + 1) +
      '"></i> ' +
      labels[i] +
      "<br>";
  }

  div.innerHTML +=
    '<i style="background:' +
    colourFor(null) +
    '"></i> No census data';

  return div;
};

legend.addTo(map);


// Load the GeoJSON file.
async function loadData() {
  try {
    countDisplay.textContent = "Loading districts...";

    const response = await fetch("data/districts.geojson");

    if (!response.ok) {
      throw new Error(
        "Could not load GeoJSON: HTTP " + response.status
      );
    }

    districts = await response.json();

    if (
      !districts ||
      !Array.isArray(districts.features)
    ) {
      throw new Error("Invalid GeoJSON FeatureCollection.");
    }

    console.log("District count:", districts.features.length);
    console.log("First district:", districts.features[0]);

    fillProvinceList();

    // Draw all districts initially.
    displayDistricts();

  } catch (error) {
    console.error("Error loading district data:", error);
    countDisplay.textContent =
      "Failed to load districts. Check the Console.";
  }
}


// Redraw the map whenever the province changes.
provinceSelect.addEventListener(
  "change",
  displayDistricts
);

loadData();
