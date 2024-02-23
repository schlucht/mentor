import { Store } from './store.js';

const template = document.createElement('template');
template.innerHTML = /*html*/`
<style>
@import url(./base.css);
form {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;   
    gap: 1.6rem;

.control-group {
    display: flex;
    flex-direction: column;
    width: 100%; 
    padding-bottom: 2rem;
    label,
    input {
        
        color: var(--Marine-blue);
        font-family: var(--font-family-regular);
        font-weight: var(--font-weight);       
    }
    label{
        width: 100%;
        display: flex;
        flex-direction: column;
        position: relative;
    }
    input {
        padding: 1.2rem;
        border: 1px solid var(--Light-gray);
        border-radius: 0.5rem;
        font-size: 1.3rem;        
    }

    input:focus {
        outline: none;
        border-color: var( --Purplish-blue);
    }

    input:required,  input:invalid{
        border-color: var( --Strawberry-red);    
    }

    input:required~span::after {
        content: 'This field is required';
        position: absolute;
        right: 0;
        top: 0.8rem;
        font-size: 1.2rem;
        color: var(--Strawberry-red);
    }

    .error-message {
        display: none;
        color: var(--Strawberry-red);
        font-size: 1.2rem;
    }
}

</style>

<form>  

    <h1>Personal info
        <p>Please provide your name, email address, and phone number.</p>  
    </h1> 
        <div class="control-group">
            <label>Name
                <input type="text"
                    placeholder="e.g. Stephen King">
                    <span></span>
            </label>
            <p class="error-message">Please enter your name</p>
        </div>
        <div class="control-group">
            <label>Email Address
                <input type="email"
                    placeholder="e.g. stephenking@lorem.com">
                    <span></span>
            </label>
            <p class="error-message">Please enter your email</p>
        </div>
        <div class="control-group">
            <label>Phone Number
                <input type="tel"
                    placeholder="e.g. +12 3456 7890">
                    <span></span>
            </label>
            <p class="error-message">Please enter your phonenumber</p>
        </div>
      
</form>
`

class OtsForm extends HTMLElement {

    constructor() {
        super();
        this.store = Store.getInstance();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.isValid = false;
        this.formData = this.store.load();
    }

    connectedCallback() {

        this.name = this.shadowRoot.querySelector('input[type="text"]');
        this.email = this.shadowRoot.querySelector('input[type="email"]');
        this.phone = this.shadowRoot.querySelector('input[type="tel"]');

        this.errorText = this.name.offsetParent.nextElementSibling;
        this.errorMail = this.email.offsetParent.nextElementSibling;
        this.errorPhone = this.phone.offsetParent.nextElementSibling;


        this.name.addEventListener('blur', this.textValidate.bind(this));
        this.email.addEventListener('blur', this.emailValidate.bind(this));
        this.phone.addEventListener('blur', this.phoneValidate.bind(this));

        console.log("Form", this.formData)
        if (this.formData) {
            if (this.formData.name !== '' ||
                this.formData.email !== '' ||
                this.formData.phone !== '') {
                this.name.value = this.formData.name;
                this.email.value = this.formData.email;
                this.phone.value = this.formData.phone;
                this.isValid = true;
            }
        }
    }

    static get observedAttributes() {
        return ['visible'];
    }

    get visible() {
        return this.hasAttribute('visible');
    }

    set visible(value) {
        if (value) {
            this.setAttribute('visible', '');
        } else {
            this.removeAttribute('visible');
        }
    }

    attributeChangesCallback(name, oldValue, newValue) {
        if (name === 'visible') {
            const form = this.shadowRoot.querySelector('form');
            if (newValue) {
                form.style.display = 'flex';
            } else {
                form.style.display = 'none';
            }
        }
    }

    textValidate(e) {
        this.formData.name = ''
        if (e.target.value.trim() === '') {
            this.name.setAttribute('required', '');
            this.isValid = false
            return
        }

        if (e.target.value.length < 3) {
            this.errorText.style.display = 'block';
            this.errorText.textContent = 'The name must be at least 3 characters long';
            this.isValid = false
            return
        }
        this.errorText.style.display = 'none';
        this.name.removeAttribute('required');
        this.isValid = true;

        this.formData.name = e.target.value;
    }

    emailValidate(e) {
        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        this.formData.email = ''
        if (e.target.value.trim() === '') {
            this.email.setAttribute('required', '');
            this.isValid = false
            return
        }
        if (!e.target.value.match(mailformat)) {
            this.errorMail.style.display = 'block';
            this.errorMail.textContent = 'Email is not valid';
            this.isValid = false
            return
        }
        this.errorMail.style.display = 'none';
        this.email.removeAttribute('required');
        this.isValid = true;

        this.formData.email = e.target.value;
    }
    phoneValidate(e) {
        const phoneformat = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
        this.formData.phone = ''
        if (e.target.value.trim() === '') {
            this.email.setAttribute('required', '');
            this.isValid = false
            return
        }
        if (!e.target.value.match(phoneformat)) {
            this.errorPhone.style.display = 'block';
            this.errorPhone.textContent = 'Phonenummer is not valid (+12 3456 7890)';
            this.isValid = false
            return
        }
        this.errorPhone.style.display = 'none';
        this.email.removeAttribute('required');
        this.isValid = true;
        this.formData.phone = e.target.value;
    }

}

customElements.define('ots-form', OtsForm);