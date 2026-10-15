class CatalogArray {
    constructor() {
        this.items = [];
    }

    add(item) {
        this.items.push(item);
    }

    remove(id) {
        const index = this.items.findIndex(
            item => item.id === id
        );

        if (index !== -1) {
            this.items.splice(index, 1);
            return true;
        }

        return false;
    }

    search(keyword) {
        return this.items.filter(item =>
            item.name
                .toLowerCase()
                .includes(keyword.toLowerCase())
        );
    }

    sortByName() {
        this.items.sort((a, b) =>
            a.name.localeCompare(b.name)
        );
    }

    getAll() {
        return this.items;
    }

    size() {
        return this.items.length;
    }
}

const productCatalog = new CatalogArray();