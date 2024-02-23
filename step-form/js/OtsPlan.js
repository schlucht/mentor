
import { Store } from './store.js'
import { plans } from './datas.js';

const template = document.createElement('template');
template.innerHTML = /*html*/`

<style>
@import url(./base.css);

#cards {
    display: flex;
    justify-content: space-between;   
    gap: 1rem;
    height: 30%;
    margin-top: 3rem;
}

article {
    border: 1px solid var(--Light-gray);
    padding: 2rem 1rem;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    cursor: pointer;
    &.active {
        border: 1px solid var(--Purplish-blue);
        background-color: var(--Magnolia);
    }
    &:hover {
        border: 1px solid var(--Purplish-blue);
    }
}
article img{
    width: 36px;
    height: 36px;
    margin-bottom: 1rem;    
}

h2{
    font-size: 1.5rem;   
}

.select-month{
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin: 5rem 0;
    padding: 1rem 0;
    background-color: var(--Magnolia);
}

</style>
<h1>Select your plan
    <p>You have the option of monthly or yearly billing.</p>
</h1>
<div id="cards">
    
</div>
<div class="select-month">
    <span>Monthly</span>
    <label class="chk-wrapper">
    <input type="checkbox" id="plan">
    <div class="chk-slider">
        <div class="chk-knob"></div>
    </div>
</label>
<span>Yearly</span>
</div>
`

class OtsPlan extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.store = Store.getInstance();
        this.store.load();
    }

    connectedCallback() {
        this.check = this.shadowRoot.querySelector('#plan');
        this.check.checked = this.store.plan === 'yearly';
        this.createPlan(this.store.plan);
        this.check.addEventListener('change', () => {
            if (this.check.checked) {
                this.store.plan = 'yearly';
            } else {
                this.store.plan = 'monthly';
            }
            this.createPlan(this.store.plan);
            this.store.save();
        });

    }

    createPlan(plan) {
        const planPrices = this.shadowRoot.querySelector('#cards');
        planPrices.innerHTML = '';
        plans.forEach((p) => {
            const article = document.createElement('article');
            article.dataset.plan = p.title.toLocaleLowerCase();
            if (this.store.planType === p.title.toLocaleLowerCase()) {
                article.classList.add('active');
            }
            article.addEventListener('click', () => {
                this.store.planType = article.dataset.plan;
                this.store.save();
                planPrices.querySelectorAll('article').forEach((article) => {
                    article.classList.remove('active');
                })
                article.classList.add('active');
            })
            article.innerHTML = `                
                    <img src="${p.image}" alt="plan image">
                    <div>
                        <h2>${p.title}</h2>
                        <p class="price">$${plan === 'yearly' ? p.yearly + '/yr' : p.monthly + '/mo'}</p>
                        ${plan === 'yearly' ? '<p class="discount">2 months free</p>' : ''}                        
                    </div>                 
                `
            planPrices.appendChild(article);
        })
    }
}

customElements.define('ots-plan', OtsPlan);