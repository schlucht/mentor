class Store {

    static getInstance() {
        if (!Store.instance) {
            Store.instance = new Store();
        }
        return Store.instance;
    }

    save() {
        localStorage.setItem('page', JSON.stringify(this));
    }

    load() {
        const s = JSON.parse(localStorage.getItem('page'));
        if (s) {
            this.page = s.page || 1;
            this.name = s.name || '';
            this.email = s.emai || '';
            this.phone = s.phone || '';
            this.plan = s.plan || '';
            this.planType = s.planType || 'arcade';
            this.addons = s.addons || [];
        }
        return this;
    }

    clear() {
        this.page = '';
        this.name = '';
        this.email = '';
        this.phone = '';
        this.plan = '';
        this.planType = '';
        this.addons = [];
        // localStorage.removeItem('page');
    }

}


export { Store };