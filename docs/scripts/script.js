document
  .getElementById("login-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("https://Matiass37.pythonanywhere.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);

      // Fetch request to dashboard with credentials
      const dashboardResponse = await fetch(data.redirect_url, {
        method: "GET",
        credentials: "include", // Ensure cookies are sent
      });

      if (dashboardResponse.ok) {
        // Redirect to the dashboard page if successful
        window.location.href = data.redirect_url;
      } else {
        alert("Failed to load the dashboard. Please try again.");
      }
    } else {
      alert(data.error);
    }
  });
