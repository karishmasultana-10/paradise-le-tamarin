// scripts/review.js
function formatDate(dateStr) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const date = new Date(dateStr);
  const day = date.getDate().toString().padStart(2, '0');
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

const bookingData = JSON.parse(localStorage.getItem("bookingData"));

if (bookingData) {
  document.getElementById("userDetails").innerHTML = `
    <p><strong>Name:</strong> ${bookingData.name}</p>
    <p><strong>Email:</strong> ${bookingData.email}</p>
    <p><strong>Phone:</strong> ${bookingData.phone}</p>
  `;

  document.getElementById("stayDetails").innerHTML = `
  <p><strong>Check-in:</strong> ${formatDate(bookingData.checkIn)}</p>
  <p><strong>Check-out:</strong> ${formatDate(bookingData.checkOut)}</p>
  <p><strong>Guests:</strong> ${bookingData.guests}</p>
  <p><strong>Room Type:</strong> ${bookingData.roomType}</p>
  
`;


document.getElementById("amountToPay").innerHTML = `
  <p><strong>Total Tariff:</strong> ₹${bookingData.totalAmount}</p>
  <p><strong>Advance Payment (20%):</strong> ₹${bookingData.advanceAmount}</p>
  <p><strong>Remaining Payment (Pay at Hotel):</strong> ₹${(bookingData.totalAmount - bookingData.advanceAmount)}</p>
`;


  document.getElementById("payNowBtn").addEventListener("click", function () {
    const options = {
      key: "rzp_live_olZWPNDyOHUUTe", // Replace with your Razorpay Test Key ID
      amount: bookingData.advanceAmount * 100, // Amount in paise
      currency: "INR",
      name: "Paradise Wild Sand",
      description: "20% Advance Payment",
      image: "https://yourhotelwebsite.com/logo.png", // optional
      handler: function (response) {
        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
        // You can redirect or store confirmation here
      },
      prefill: {
        name: bookingData.name,
        email: bookingData.email,
        contact: bookingData.phone,
      },
      theme: {
        color: "#007bff",
      },
    };

    const rzp = new Razorpay(options);
    rzp.open();
  });
} else {
  document.querySelector(".container").innerHTML = `
    <h2>No Booking Data Found</h2>
    <p>Please complete the booking form first.</p>
  `;
}
