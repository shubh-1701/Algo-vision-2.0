class HashTable {
    constructor() {
        this.table = {};
    }

    set(key, value) {
        this.table[key] = value;
    }

    get(key) {
        return this.table[key];
    }

    has(key) {
        return Object.prototype.hasOwnProperty.call(this.table, key);
    }

    remove(key) {
        delete this.table[key];
    }

    getAll() {
        return this.table;
    }
}

const orderDatabase = new HashTable();