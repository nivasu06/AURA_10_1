const Auth = {
  // REGISTER NEW USER
  register() {
    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim().toLowerCase();
    const password = document.getElementById("registerPassword").value;
    const terms = document.getElementById("termsCheck");

    // Validate input fields
    if (!name || !email || !password) {
      alert("Please fill in all required fields.");
      return;
    }

    if (!terms || !terms.checked) {
      alert("Please accept the Terms & Conditions and Privacy Policy.");
      return;
    }

    if (password.length < 8) {
      alert("Password must contain at least 8 characters.");
      return;
    }

    // Retrieve existing registered users
    const users = JSON.parse(
      localStorage.getItem("auraUsers") || "[]"
    );

    // Check whether the email already exists
    const existingUser = users.find(
      user => user.email.toLowerCase() === email
    );

    if (existingUser) {
      alert("This email is already registered. Please log in.");
      return;
    }

    // Create a new user
    const newUser = {
      name: name,
      email: email,
      password: password
    };

    // Save registered users
    users.push(newUser);
    localStorage.setItem("auraUsers", JSON.stringify(users));

    alert("Registration successful! Please log in.");

    // Redirect to login page
    window.location.href = "login.html";
  },

  // LOGIN EXISTING USER
  login() {
    const emailInput = document.getElementById("loginEmail");
    const passwordInput = document.getElementById("loginPassword");

    if (!emailInput || !passwordInput) {
      alert("Login form fields not found.");
      return;
    }

    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;

    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    const users = JSON.parse(
      localStorage.getItem("auraUsers") || "[]"
    );

    const matchedUser = users.find(
      user => user.email.toLowerCase() === email &&
              user.password === password
    );

    if (!matchedUser) {
      alert("Invalid email or password. Please try again.");
      return;
    }

    // Save current user session
    const loggedInUser = {
      name: matchedUser.name,
      email: matchedUser.email
    };

    localStorage.setItem("aura_user", JSON.stringify(loggedInUser));
    localStorage.setItem("auth_user", JSON.stringify(loggedInUser));

    alert("Login successful!");

    window.location.href = "index.html";
  },

  // LOGOUT
  logout() {
    localStorage.removeItem("aura_user");
    localStorage.removeItem("auth_user");

    window.location.href = "login.html";
  },

  // GET CURRENT USER
  getUser() {
    return JSON.parse(
      localStorage.getItem("aura_user") || "null"
    );
  },

  // CHECK LOGIN STATUS
  isLoggedIn() {
    return !!this.getUser();
  }

};