// ================= URL PARAM =================
const params = new URLSearchParams(window.location.search);
const storeType = params.get("type");

// ================= STORE DATA =================
const storesData = {
  shopping: [
    {
      id: 1,
      name: "Urban Fashion Store",
      address: "Banjara Hills, Hyderabad",
      lat: 17.4065,
      lng: 78.4772,
      reward: "10 pts / ₹100"
    }
  ],
  food: [
    {
      id: 2,
      name: "Urban Brew Café",
      address: "Jubilee Hills, Hyderabad",
      lat: 17.4326,
      lng: 78.4071,
      reward: "10 pts / ₹100"
    }
  ],
  services: [
    {
      id: 3,
      name: "FitZone Gym",
      address: "Gachibowli, Hyderabad",
      lat: 17.4401,
      lng: 78.3489,
      reward: "15 pts / ₹100"
    }
  ],
  travel: [
    {
      id: 4,
      name: "AURA Travel Partner",
      address: "Hitech City, Hyderabad",
      lat: 17.4483,
      lng: 78.3915,
      reward: "20 pts / ₹100"
    }
  ]
};

// ================= DISTANCE =================
function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;

  return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(2);
}

// ================= RENDER STORES =================
function renderStores(userLat, userLng) {
  const container = document.getElementById("storesList");
  container.innerHTML = "";

  const stores = storesData[storeType] || [];

  if (stores.length === 0) {
    container.innerHTML = "<p>No partner stores found.</p>";
    return;
  }

  stores.forEach(store => {
    const distance = getDistanceKm(
      userLat,
      userLng,
      store.lat,
      store.lng
    );

    container.innerHTML += `
      <div class="card">
        <h3>${store.name}</h3>
        <p><strong>Address:</strong> ${store.address}</p>
        <p><strong>Rewards:</strong> ${store.reward}</p>
        <p><strong>Distance:</strong> ${distance} km</p>

        <a class="btn-outline"
           href="store-details.html?id=${store.id}&type=${storeType}">
           View Store
        </a>
      </div>
    `;
  });
}

// ================= LOCATION BUTTON =================
document.getElementById("allowLocationBtn").addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(
    position => {
      renderStores(
        position.coords.latitude,
        position.coords.longitude
      );
    },
    () => {
      alert("Location access is required to show nearby partner stores.");
    }
  );
});
