const template = document.createElement('template');
template.innerHTML = /*html*/`
<style>
@import url(./base.css);
</style>
<article>
    <img src="" alt="plan image">
    <h2>Arcade</h2>
    <p>$90/yr</p>
    <p>2 months free</p>
</article>
`

class OtsPlanCard extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    static observedAttributes = ['title', 'price'];

    get title() {
        return this.getAttribute('title');
    }
    set title(value) {
        this.setAttribute('title', value);
    }
    get price() {
        return this.getAttribute('price');
    }
    set price(value) {
        this.setAttribute('price', value);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.shadowRoot.querySelector('h2').innerText = this.title;
        this.shadowRoot.querySelector('p').innerText = this.price;
    }

}

customElements.define('ots-plan-card', OtsPlanCard);
