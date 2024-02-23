const template = document.createElement('template');
template.innerHTML = /*html*/`
<style>
    ul li {
        list-style: none;
        margin-bottom: 2rem;
        color: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 2rem;
    }
    ul li >span {
        display: inline-block;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        background-color: transparent;
        padding: .5rem;
        width: 2rem;        
        height: 2rem;
        border-radius: 50%;
        border: 1px solid white;
        &.active {
            background-color: var(--Pastel-blue);
            color: var(--Marine-blue);
        }
    }
    ul li p {
        display: flex;
        flex-direction: column;
        & span {
            text-transform: uppercase;
        }
        & span:first-child {
            color: var(--Pastel-blue);    
        }
        & span:last-child {
            font-family: var(--font-family-bold);
        }
    }
</style>
<ul>
    <li>
            <span class="active">1</span>
            <p>
                    <span>Step 1</span>
                <span>Your info</span>
            </p>
    </li>
    <li>
            <span class="">2</span>
            <p>
                <span>Step 2</span>
                <span>Select Pan</span>
            </p
    </li>
    <li>
            <span class="">3</span>
            <p>
                <span>Step 3</span>
                <span>Add-ons </span>
            </p
    </li>
    <li>
            <span class="">4</span>
            <p>
                <span>Step 4</span>
                <span>Summary</span>
            </p
    </li>
</ul>
`

export class OtsAside extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.shadow.appendChild(template.content.cloneNode(true));
    }

    static observedAttributes = ['active'];

    get active() {
        return this.getAttribute('active');
    }
    set active(value) {
        this.setAttribute('active', value);
    }

    connectedCallback() {
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'active') {
            let active = this.shadow.querySelectorAll('li>span');
            if (newValue > active.length || newValue < 1)
                return
            active.forEach((el) => el.classList.remove('active'));
            active[newValue - 1].classList.add('active');
        }
    }
}

customElements.define('ots-aside', OtsAside);