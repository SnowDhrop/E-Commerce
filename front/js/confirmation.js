const url = new URL (window.location.href);
const searchParams = new URLSearchParams(url.search);
let id = searchParams.get("id");

orderId.innerHTML = id;

localStorage.clear();