import { Store } from './store.js';
const template = document.createElement('template');
template.innerHTML = /*html*/`
<style>
    @import url(./base.css);
    h1 {
    margin-top: 5rem;
}
article{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;    
    height: 80%;
    padding: 1rem 1rem;
    p {
    text-align:center;
        color: var(--Cool-gray);
    }
}
</style>

<article>
    <img src="./assets/images/icon-thank-you.svg" alt="Thank you">
    <h1>Thank you!</h1>
    <p>
    Thanks for confirming your subscription! We hope you have fun 
    using our platform. If you ever need support, please feel free 
    to email us at support@loremgaming.com.
    </p>
</article>
`
class OtsEnde extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.store = Store.getInstance();
        this.store.clear();
    }

    connectedCallback() {
    }
}

customElements.define('ots-ende', OtsEnde);