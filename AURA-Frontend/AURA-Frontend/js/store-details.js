// ================= Get URL Params =================

const params = new URLSearchParams(window.location.search);
const storeId = Number(params.get("id"));
const storeType = params.get("type");

// ================= Store Data =================

const storesData = {
  shopping: [
    {
      id: 1,
      name: "Urban Fashion Store",
      address: "Banjara Hills, Hyderabad",
      lat: 17.4065,
      lng: 78.4772
    }
  ],
  food: [
    {
      id: 2,
      name: "Urban Brew Café",
      address: "Jubilee Hills, Hyderabad",
      lat: 17.4326,
      lng: 78.4071
    }
  ],
  services: [
    {
      id: 3,
      name: "FitZone Gym",
      address: "Gachibowli, Hyderabad",
      lat: 17.4401,
      lng: 78.3489
    }
  ],
  travel: [
    {
      id: 4,
      name: "AURA Travel Partner",
      address: "Hitech City, Hyderabad",
      lat: 17.4483,
      lng: 78.3915
    }
  ]
};

// ================= Find Store =================

const store = storesData[storeType]?.find(s => s.id === storeId);

document.getElementById("storeName").textContent = store.name;
document.getElementById("storeAddress").textContent = store.address;

// ================= Distance Calculation =================

function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;

  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

// ================= Navigation =================

navigator.geolocation.getCurrentPosition(
  position => {
    const userLat = position.coords.latitude;
    const userLng = position.coords.longitude;

    const distance = getDistanceKm(
      userLat,
      userLng,
      store.lat,
      store.lng
    ).toFixed(2);

    document.getElementById("storeDistance").textContent =
      `Distance: ${distance} km`;

    document.getElementById("mapLink").href =
      `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${store.lat},${store.lng}`;

    document.getElementById("uberLink").href =
      `https://m.uber.com/ul/?action=setPickup&pickup[latitude]=${userLat}&pickup[longitude]=${userLng}&dropoff[latitude]=${store.lat}&dropoff[longitude]=${store.lng}`;
  },
  () => {
    document.getElementById("storeDistance").textContent =
      "Location access required";

    document.getElementById("mapLink").href =
      `https://www.google.com/maps/search/?api=1&query=${store.lat},${store.lng}`;
  }
);

// ================= QR CODE =================

const USER_ID = "USER123"; // replace later with real user

const payload = `AURA|${USER_ID}|${store.id}|${Date.now()}`;

new QRious({
  element: document.getElementById("qrCode"),
  size: 180,
  value: payload
});

// ================= Simulate Scan =================

document.getElementById("simulateScan").addEventListener("click", () => {
  let points =
    Number(localStorage.getItem("availableRewardPoints")) || 0;

  points += 100;
  localStorage.setItem("availableRewardPoints", points);

  alert("Scan successful! +100 reward points credited.");
});
