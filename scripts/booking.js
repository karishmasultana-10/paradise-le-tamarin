/* ----------  CLOSED‑DATE SUPPORT  ---------- */
// read dates the admin blocked
const closedDates = JSON.parse(localStorage.getItem("closedDates")) || [];

function isDateBlocked(startISO, endISO) {
  const start = new Date(startISO);
  const end   = new Date(endISO);

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    if (closedDates.includes(d.toISOString().split("T")[0])) return true;
  }
  return false;
}
/* ------------------------------------------ */

// price map per room
const roomPrices = {
  "Forest Breeze": 2000,
  "Nature’s King": 3000,
  "Super Saver Suite": 1500,
  "Mixed Dormitory": 800
};

/* MAIN PRICE CALCULATION */
function calculateTotalPrice() {
  const name       = document.querySelector('input[name="name"]').value.trim();
  const email      = document.querySelector('input[name="email"]').value.trim();
  const phone      = document.querySelector('input[name="phone"]').value.trim();
  const guests     = +document.querySelector('input[name="guests"]').value || 0;
  const checkInISO = document.getElementById("check-in").value;
  const checkOutISO= document.getElementById("check-out").value;

  if (!name || !email || !phone || !guests || !checkInISO || !checkOutISO) {
    alert("Please fill in all fields correctly.");
    return null;
  }

  /* block‑date validation */
  if (isDateBlocked(checkInISO, checkOutISO)) {
    alert("Sorry! Booking is not available for one or more selected dates.");
    return null;
  }

  const nights =
    (new Date(checkOutISO) - new Date(checkInISO)) / (1000 * 60 * 60 * 24);
  if (nights <= 0) { alert("Check‑out must be after check‑in."); return null; }

  /* selected room categories (checkboxes) */
  const selectedRooms = [...document.querySelectorAll(
      'input[name="roomType"]:checked')].map(cb => cb.value);

  if (selectedRooms.length === 0) {
    alert("Please select at least one room type.");
    return null;
  }

  let total = 0;
  selectedRooms.forEach(room =>
    total += (roomPrices[room] || 0) * nights * guests
  );

  /* save for review page */
  localStorage.setItem("bookingData", JSON.stringify({
    name, email, phone,
    checkIn:  checkInISO,
    checkOut: checkOutISO,
    guests,
    roomTypes: selectedRooms,
    totalAmount: total,
    advanceAmount: total * 0.2
  }));

  return total;
}

/* -------- UI helpers ---------- */
function showPrice(total) {
  document.getElementById("priceDetails").style.display   = "block";
  document.getElementById("proceedPaymentContainer").style.display = "block";

  const adv = total * 0.2, rem = total * 0.8;
  document.getElementById("totalPrice").textContent    = `₹${total.toFixed(2)}`;
  document.getElementById("advanceAmount").textContent = `₹${adv.toFixed(2)}`;
  document.getElementById("remainingAmount").textContent= `₹${rem.toFixed(2)}`;
  document.getElementById("priceDisplay").textContent  = `Total Price: ₹${total}`;
}

/* -------- Event listeners ---------- */
document.getElementById("checkPriceBtn")
  .addEventListener("click", () => {
    const total = calculateTotalPrice();
    if (total !== null) showPrice(total);
  });

document.getElementById("proceedPaymentBtn")
  .addEventListener("click", () => {
    const total = calculateTotalPrice();
    if (total !== null) window.location.href = "review.html";
  });

/* pre‑check URL ?room=... */
window.addEventListener("DOMContentLoaded", () => {
  const paramRoom = new URLSearchParams(location.search).get("room");
  if (!paramRoom) return;
  document.querySelectorAll('input[name="roomType"]').forEach(cb=>{
    if (cb.value === paramRoom) cb.checked = true;
  });
});

function displayClosedDates() {
  const closedDatesList = document.getElementById("closedDatesList");
  const noticeBox = document.getElementById("closedDatesNotice");

  if (!closedDatesList || !noticeBox) return;

  closedDatesList.innerHTML = "";

  const closedDates = JSON.parse(localStorage.getItem("closedDates")) || [];

  if (closedDates.length === 0) {
    noticeBox.style.display = "none";
    return;
  }

  closedDates.forEach((date) => {
    const li = document.createElement("li");
    li.textContent = `📅 ${date}`;
    closedDatesList.appendChild(li);
  });

  noticeBox.style.display = "block";
}

// Run it after DOM is loaded
document.addEventListener("DOMContentLoaded", displayClosedDates);
