// document.getElementById("loginForm").addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const name = e.target.name.value;
//   const password = e.target.password.value;

//   const res = await fetch("/login", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ name, password })
//   });

//   const data = await res.json();

//   if (!res.ok) {
//     document.getElementById("error").textContent = data.error;
//   } else {
//     window.location.href = "home.html"; // redirect on success
//   }
// });

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = e.target.name.value;
  const password = e.target.password.value;

  try {
    const res = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password })
    });

    // ✅ If server returned HTML (sendFile or redirect), just navigate:
    if (res.ok) {
      // If your server uses res.redirect("/home"), still do a manual redirect:
      window.location.href = "/home";   // or "home.html" if you prefer the file directly
      return;
    }

    // ❌ Error path: try parse JSON; if not JSON, fall back to text
    let message = "Login failed";
    const ct = res.headers.get("content-type") || "";
    if (ct.includes("application/json")) {
      const data = await res.json();
      message = data.error || message;
    } else {
      message = await res.text();
    }
    document.getElementById("error").textContent = message;
  } catch (err) {
    document.getElementById("error").textContent = "Network error. Try again.";
  }
});

