function redirecionar(event) {
  event.preventDefault();
  window.location.href = "dashboard.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", redirecionar);
  }
});
