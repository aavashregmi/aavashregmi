// PayPal Donation Button
paypal.Buttons({
  style: {
    color: 'gold',
    shape: 'pill',
    label: 'donate',
  },
  createOrder: function(data, actions) {
    return actions.order.create({
      purchase_units: [{
        amount: { value: '5.00' } // default donation
      }]
    });
  },
  onApprove: function(data, actions) {
    return actions.order.capture().then(function(details) {
      alert('🔥 Thanks for the support, ' + details.payer.name.given_name + '! You’re a real one 💯');
    });
  }
}).render('#paypal-button-container');

// Fade-in animation on scroll
const fadeEls = document.querySelectorAll('.fade-in');
window.addEventListener('scroll', () => {
  fadeEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.style.opacity = 1;
    }
  });
});
