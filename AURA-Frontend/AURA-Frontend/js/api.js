const API = {
  login: (data) => {
    return fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
  },

  getResources: () => {
    return fetch("/api/resources");
  }
};
