
//  Clases con ECMAScript y ECMAScript avanzado
class Products {
    array = [];
    constructor() {}

    addProduct(id,title, description, price, thumbnail, code, stock) {
        this.array.push({id,title, description, price, thumbnail, code, stock});
    }

    getGroupInfo() {
        return this.array;
    }
}

let p1 = new Products();
p1.addProduct(1, "Avena integral", "Avena integral 500gr", 1899, 'https://www.jumbo.cl/avena-integral-la-fuente-natural-bolsa-500-g/p', '1235', 2);
p1.addProduct(2, "Avena sin glúten", "Avena integral 400gr", 2779, 'https://www.jumbo.cl/avena-mi-tierra-sin-gluten-400-g/p', '1234', 2);
console.log(p1.getGroupInfo());
