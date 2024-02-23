import { Store } from './store.js';
import { addons, plans } from './datas.js';

const template = document.createElement('template');
template.innerHTML = /*html*/`
<style>
    @import url(./base.css);
   
    table {
        margin-top: 3rem;
        width: 100%;
        border-collapse: collapse;
        color: var(--Cool-gray);
        tr {
            background-color: var(--Magnolia);
            
            &:last-child {
                background-color: var(--White);
            }
        }
        th, td {
            padding: 1rem 1rem;
            border-bottom: 1px solid var(--Light-gray);
        }
        td:last-child, th:last-child {
            text-align: right;
        }
        th {
            text-align: left; 
            color: var(--Marine-blue);           
            a {
                display: block;
                color: var(--Cool-gray);                
                font-size: 1.3rem;
                &:hover {
                    color: var(--Purplish-blue);
                }
            }        
        }
        .sum {
            color: var(--Purplish-blue);
            font-weight: 700;
        }
    }
</style>
<h1>Finishing up
    <p>Double-check everthing looks OK before confirming</p>
</h1>
<table>
</table>
`

class OtsFinish extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.store = Store.getInstance();
        this.store.load();
        this.plan = plans.find(p => p.title.toLowerCase() === this.store.planType);
        this.addons = addons.filter(a => this.store.addons.includes(a.id));
    }

    connectedCallback() {
        this.createTable()
    }

    disconnectedCallback() {
        this.store = null;
        this.store.save();
    }

    createTable() {
        if (this.plan === undefined) {
            return;
        }
        const table = this.shadowRoot.querySelector('table');
        const tbody = document.createElement('tbody');
        table.appendChild(tbody);
        let tr = document.createElement('tr');
        tbody.appendChild(tr);
        let th = document.createElement('th');
        th.textContent = this.plan.title;
        th.innerHTML += `<a href="#">Change</a>`;
        tr.appendChild(th);
        th = document.createElement('th');
        if (this.store.plan === 'yearly') {
            th.textContent = `$${this.plan.yearly}/yr`;
        } else {
            th.textContent = `$${this.plan.monthly}/mo`;
        }
        tr.appendChild(th);
        tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let sum = 0;
        this.store.addons.forEach(a => {
            const addon = this.addons.find(ad => ad.id === a);            
            let p1 = document.createElement('p');
            let p2 = document.createElement('p');
            p1.textContent = addon.title;
            if (this.store.plan === 'yearly') {
                p2.textContent = `$${addon.yearly}/yr`;
                sum += addon.yearly;
            } else {
                p2.textContent = `$${addon.monthly}/mo`;
                sum += addon.monthly;
            }            
            td1.appendChild(p1);
            td2.appendChild(p2);
        })
        tr.appendChild(td1);
        tr.appendChild(td2);
        tbody.appendChild(tr);
        tr = document.createElement('tr');
        let td = document.createElement('td');
        td.textContent = 'Total (per year)';
        tr.appendChild(td);
        td = document.createElement('td');
        td.classList.add('sum');
        if (this.store.plan === 'yearly') {
            td.textContent = `$${this.plan.yearly + sum}/yr`;
        } else {
            td.textContent = `$${this.plan.monthly + sum}/mo`;
        }
        tr.appendChild(td);
        tbody.appendChild(tr);
    }
}


customElements.define('ots-finish', OtsFinish);