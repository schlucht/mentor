import { Store } from './store.js';
import { addons } from './datas.js';

const template = document.createElement('template');
template.innerHTML = /*html*/`
<style>
    @import url(./base.css);


#features {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    flex-direction: column;
    
}
.features-detail {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 1rem;
    border: 1px solid var(--Pastel-blue);
    border-radius: 5px;
    color: var(--Cool-gray);
    cursor: pointer;
    & label {
        display: flex;
        gap: 1rem;
        align-items: center;
    }
    &.checked {
        border: 1px solid var(--Purplish-blue);
        background-color: var(--Magnolia);
    }
    &:hover {
        border: 1px solid var(--Purplish-blue);
    }
    
    input[type="checkbox"] {
        accent-color: var(--Purplish-blue);
        
    }
}

h2{
    color: var(--Marine-blue);
    font-size: 1.5rem;
    &>p {
        color: var(--Cool-gray);
        font-size: 1.2rem;       
    }
}

</style>
<h1>Pick add-ons
    <p>Add-ons help enhance your gaming experience.</p>
</h1>
<div id="features">    
   
    
</div>
`
class OtsAddon extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.store = Store.getInstance();
        this.store.load();

    }

    connectedCallback() {
        this.createAddon();
    }

    createAddon() {
        const feature = this.shadowRoot.getElementById('features');


        feature.innerHTML = '';
        addons.forEach(addon => {
            const ck = this.store.addons.find(f => addon.id === f) ? 'checked' : '';
            feature.innerHTML += /*html*/`
                <div class="features-detail ${ck}">
                <label>
                    <input type="checkbox"value="${addon.id}" 
                        ${ck}
                        >
                    <h2>${addon.title}
                        <p>${addon.desc}</p>
                    </h2>
                </label>
                <p>
                    ${this.store.planType === 'yearly' ? '+$' + addon.yearly + '/yr' : '+$' + addon.monthly + '/mo'}
                </p>
            </div>
            `
        })
        const checkbox = feature.querySelectorAll('input[type="checkbox"]');
        checkbox.forEach((el) => {
            el.addEventListener('change', (e) => {
                const id = e.target.value;
                if (e.target.checked) {
                    this.store.addons.push(id);
                } else {
                    this.store.addons.splice(this.store.addons.indexOf(id), 1);
                }
                this.store.save();
            })
        })
    }
}


customElements.define('ots-addon', OtsAddon);
