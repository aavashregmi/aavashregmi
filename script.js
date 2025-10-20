// Open/Close donation modal
const donateBtn = document.getElementById("donateBtn");
const closeBtn = document.getElementById("closeDonate");
const modal = document.getElementById("donationModal");

let paypalRendered = false;

donateBtn.addEventListener("click", () => {
  modal.style.display = "flex";

  // Render PayPal button only once
  if (!paypalRendered) {
    paypal.Buttons({
      style: {
        shape: 'rect',
        color: 'gold',
        layout: 'vertical',
        label: 'paypal'
      },
      createOrder: function(data, actions) {
        const amount = '10'; // Default $10 donation
        return actions.order.create({
          purchase_units: [{
            amount: { value: amount }
          }]
        });
      },
      onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
          alert('Thank you, ' + details.payer.name.given_name + '! Your donation has been received.');
          modal.style.display = "none";
        });
      },
      onError: function(err) {
        console.error(err);
        alert('Payment failed. Try again.');
      }
    }).render('#paypal-container');

    paypalRendered = true;
  }
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});
