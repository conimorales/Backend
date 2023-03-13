import { promises as fs } from "fs";

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.id = 1;
    }

    async check() {
        this.products = await fs.readFile(this.path, "utf-8");
        return JSON.parse(this.products);
    }

    async getProducts() {

        return await this.check();

    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        let codeErr = false;

        if (!title || !description || !price || !thumbnail || !code || !stock) {
        return console.log("Completa todos los campos!");
        } else {
        const newProduct = {
            id: this.id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };

        this.products.map((result) => {
            if (result.code === newProduct.code) {
            codeErr = true;
            }
        });

        !codeErr && this.id++;

        codeErr === true
            ? console.log("El codigo ya esta en uso")
            : this.products.push(newProduct);

        await fs.writeFile(this.path, JSON.stringify(this.products));
        }
    }

    async getProductById(id) {
        let allproducts = await this.check();

        let result = allproducts.find((product) => product.id === id);

        return result;
    }

    async deleteProductById(id) {
        let allproducts = await this.check();

        let result = allproducts.find((product) => product.id === id);

        let destroyProduct = allproducts.filter((product) => product.id != id);

        return result
        ? await fs.writeFile(this.path, JSON.stringify(destroyProduct))
        : console.log("ID no valido");
    }

    async updateProducts({ id, ...updateProduct }) {
        await this.deleteProductById(id);

        let otherProducts = await this.check();

        let updatedProduct = [{ id, ...updateProduct }, ...otherProducts];

        return await fs.writeFile(this.path, JSON.stringify(updatedProduct));
    }
}

const nombreArchivo = './files/Products.json'
const archivo = new ProductManager(nombreArchivo);

const main = async () => {
    try{           
        let products = await archivo.getProducts(); 
        console.log(products);



    } catch (error) {
        console.log("Problemas!", error);
        }
};
main();

