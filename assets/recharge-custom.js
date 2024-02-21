window.onload = function() {
  // Find all the subscription radio buttons
  var subscriptionRadios = document.querySelectorAll('.subscription-radio');

  // Loop through each subscription radio button
  subscriptionRadios.forEach(function(radio) {
    // Get the price label and discount label elements
    var priceLabel = radio.querySelector('.price-label');
    var discountLabel = radio.querySelector('.discount-label');

    // Check if both labels exist
    if (priceLabel && discountLabel) {
      // Create a wrapper element to hold the labels
      var labelWrapper = document.createElement('span');
      labelWrapper.classList.add('label-wrapper');

      // Move the discount label inside the wrapper element
      labelWrapper.appendChild(discountLabel);

      // Insert the wrapper element before the price label
      priceLabel.parentNode.insertBefore(labelWrapper, priceLabel);

      // Append the price label inside the wrapper element
      labelWrapper.appendChild(priceLabel);
    }
  });

  // Find all the one-time purchase radio buttons
  var oneTimeRadios = document.querySelectorAll('.onetime-radio');

  // Loop through each one-time purchase radio button
  oneTimeRadios.forEach(function(radio) {
    // Get the price label and discount label elements
    var priceLabel = radio.querySelector('.price-label');
    var discountLabel = radio.querySelector('.discount-label');

    // Check if both labels exist
    if (priceLabel && discountLabel) {
      // Create a wrapper element to hold the labels
      var labelWrapper = document.createElement('span');
      labelWrapper.classList.add('label-wrapper');

      // Move the discount label inside the wrapper element
      labelWrapper.appendChild(discountLabel);

      // Insert the wrapper element before the price label
      priceLabel.parentNode.insertBefore(labelWrapper, priceLabel);

      // Append the price label inside the wrapper element
      labelWrapper.appendChild(priceLabel);
    }
  });

  // Get the original price and calculate the discounted price
  var originalPrice = {{ product.price | divided_by: 100 }};  // Get the original price using Liquid
  var discountRate = 0.10;  // 10% discount
  var discountedPrice = originalPrice * (1 - discountRate);

  // Create the pricing HTML
  var pricingHTML = `
    $${discountedPrice.toFixed(2)} <s style="color: #AFC42E;">$${originalPrice.toFixed(2)}</s>
  `;

  // Find the .price-label elements of the subscription radio buttons
  var priceLabels = document.querySelectorAll('.subscription-radio .price-label');

  // Update the content of the price labels with the pricing information
  priceLabels.forEach(function(priceLabel) {
    priceLabel.innerHTML = pricingHTML;
  });

  // Find the parent element of the .rc-selling-plans section
  var parentElement = document.querySelector('.rc-template__radio-group');

  // Create the bullet list
  var bulletList = document.createElement('ul');
  bulletList.innerHTML = `
    <li style="list-style-type: none;">✓ Free shaker on first order</li>
    <li style="list-style-type: none;">✓ Free shipping on all orders</li>
    <li style="list-style-type: none;">✓ Modify, pause, cancel any time</li>
  `;

  // If the parent element exists, create a MutationObserver
  if (parentElement) {
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        // If the .rc-selling-plans section is added, insert the bullet list
        var sellingPlans = document.querySelector('.rc-selling-plans');
        if (sellingPlans && !sellingPlans.nextSibling) {
          sellingPlans.parentNode.insertBefore(bulletList, sellingPlans.nextSibling);
        }
        // If the .rc-selling-plans section is removed, remove the bullet list
        else if (!sellingPlans && bulletList.parentNode) {
          bulletList.parentNode.removeChild(bulletList);
        }
      });
    });

    // Start observing the parent element for changes to its child list
    observer.observe(parentElement, { childList: true });
  }
};