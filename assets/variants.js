class VariantSelects extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('change', this.onVariantChange);
  }

  onVariantChange() {
    this.updateOptions();
    this.updateMasterId();
    this.toggleAddButton(true, '', false);
    this.updatePickupAvailability();

    if (!this.currentVariant) {
      this.toggleAddButton(true, '', true);
      this.setUnavailable();
    } else {
      this.updateMedia();
      this.updateURL();
      this.updateVariantInput();
      this.renderProductInfo();
    }
  }

  updateOptions() {
    this.options = Array.from(this.querySelectorAll('select'), (select) => select.value);
  }

  updateMasterId() {
    this.currentVariant = this.getVariantData().find((variant) => {
      return !variant.options.map((option, index) => {
        return this.options[index] === option;
      }).includes(false);
    });

  }

  updateMedia() {
    if (!this.currentVariant || !this.currentVariant?.featured_media) return;
    const newMedia = document.querySelector(
      `[data-media-id="${this.dataset.section}-${this.currentVariant.featured_media.id}"]`
    );
    if (!newMedia) return;
    const slickId = newMedia.getAttribute("data-slick-index");
    $('.slider-for').slick('slickGoTo', slickId,  true);
    //const parent = newMedia.parentElement;
   // parent.prepend(newMedia);
    //window.setTimeout(() => { parent.scroll(0, 0) });
  }

  updateURL() {
    if (!this.currentVariant) return;
    window.history.replaceState({ }, '', `${this.dataset.url}?variant=${this.currentVariant.id}`);

  }

  updateVariantInput() {
    const productForms = document.querySelectorAll(`#product-form-${this.dataset.section}, #product-form-installment`);
    productForms.forEach((productForm) => {
      const input = productForm.querySelector('input[name="id"]');
      if (input !== null) {
        input.value = this.currentVariant.id;
        //input.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
  }

  updatePickupAvailability() {
    const pickUpAvailability = document.querySelector('pickup-availability');
    if (!pickUpAvailability) return;

    if (this.currentVariant?.available) {
      pickUpAvailability.fetchAvailability(this.currentVariant.id);
    } else {
      pickUpAvailability.removeAttribute('available');
      pickUpAvailability.innerHTML = '';
    }
  }

  renderProductInfo() {
    fetch(`${this.dataset.url}?variant=${this.currentVariant.id}&section_id=${this.dataset.section}`)
      .then((response) => response.text())
      .then((responseText) => {
        const id = `price-${this.dataset.section}`;
        const html = new DOMParser().parseFromString(responseText, 'text/html')
        const destination = document.getElementById(id);
        const source = html.getElementById(id);
        if (source && destination) destination.innerHTML = source.innerHTML;

        document.getElementById(`price-${this.dataset.section}`)?.classList.remove('visibility-hidden');
        this.toggleAddButton(!this.currentVariant.available, window.variantStrings.soldOut);
       
        if (document.querySelector('.rc-option--active') !== null) {
          const active_rc_option = document.querySelector('.rc-option--active')
          const active_price_rc = active_rc_option.querySelector('.rc-option__price').textContent;
          const regular_price = document.querySelector('.price-item');
          regular_price.innerHTML = active_price_rc;
        }
      });
  }




  toggleAddButton(disable = true, text, modifyClass = true) {
const addButton = document.getElementById(`product-form-${this.dataset.section}`)?.querySelector('[name="add"]');
if (!addButton) return;
if (disable) {
addButton.setAttribute('disabled', true);
if (text) addButton.textContent = text;
 } else {
addButton.removeAttribute('disabled');
addButton.textContent = window.variantStrings.addToCart;
}
if (!modifyClass) return;
}

setUnavailable() {
const addButton = document.getElementById(`product-form-${this.dataset.section}`)?.querySelector('[name="add"]');
if (!addButton) return;
addButton.textContent = window.variantStrings.unavailable;
document.getElementById(`price-${this.dataset.section}`)?.classList.add('visibility-hidden');  }

  
  
  getVariantData() {
    this.variantData = this.variantData || JSON.parse(this.querySelector('[type="application/json"]').textContent);
    return this.variantData;
  }
}

customElements.define('variant-selects', VariantSelects);


class SectionRadios extends VariantSelects {
  constructor() {
    super();
  }

  updateOptions() {
    const fieldsets = Array.from(this.querySelectorAll('fieldset'));
    this.options = fieldsets.map((fieldset) => {
      return Array.from(fieldset.querySelectorAll('input')).find((radio) => radio.checked).value;
    });
  }
}
customElements.define('section-data', SectionRadios);