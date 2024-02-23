import { Store } from './js/store.js';
import './js/OtsAside.js';
import './js/OtsForm.js'
import './js/OtsEnde.js'
import './js/OtsFinish.js'
import './js/OtsPlan.js'
import './js/OtsAddon.js'

document.addEventListener('DOMContentLoaded', () => {
    const store = Store.getInstance();
    if (!localStorage.getItem('page')) {
        console.log(store)
        store.save();
    }
    const section = document.querySelector('#page');
    const aside = document.querySelector('ots-aside');
    const form = document.querySelector('ots-form');
    const ende = document.querySelector('ots-ende');
    const finish = document.querySelector('ots-finish');
    const addon = document.querySelector('ots-addon');
    const plan = document.querySelector('ots-plan');

    const next = document.querySelector('#btn-next');
    const back = document.querySelector('#btn-back');

    const views = [form, plan, addon, finish, ende];

    refresh();

    function refresh() {
        nextButton(store.page);
        aside.setAttribute('active', store.page);
        views.forEach((el, i) => {
            if (i !== store.page - 1) {
                el.style.display = 'none';
            } else {
                el.style.display = 'block';
            }
        });
    }

    function nextButton(page) {
        console.log(form.isValid)
        if (page === 1) {

            back.style.visibility = 'hidden';
        } else {
            back.style.visibility = 'visible';
        }
        if (page >= 1) {
            next.textContent = 'Next Step';
        }
        if (page === 4) {
            next.textContent = 'Confirm';
        }
        if (page === 5) {
            next.style.display = 'none';
            back.style.visibility = 'hidden';
        }
    }

    next.addEventListener('click', (e) => {
        // const s = store.load();
        // section.appendChild(views[store.page + 1]);
        if (form.isValid === false) {
            return
        }
        views[store.page - 1].style.display = 'none';
        store.page++;
        aside.setAttribute('active', store.page);

        views[store.page - 1].style.display = 'block';
        nextButton(store.page);
        if (store.page === 5) {
            store.page = 1
        }

        console.log(form.formData)
        store.email = form.formData.email;
        store.name = form.formData.name;
        store.phone = form.formData.phone;

        store.save();
    });

    back.addEventListener('click', (e) => {
        if (store.page === 1) {
            return;
        }
        views[store.page - 1].style.display = 'none';
        store.page--
        nextButton(store.page);
        aside.setAttribute('active', store.page);
        views[store.page - 1].style.display = 'block';
        store.save();
    })

});