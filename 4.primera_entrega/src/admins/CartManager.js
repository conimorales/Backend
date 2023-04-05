

const fs = require("fs");


const path = './Carts.json'


class CartManager {
    constructor(path){
        this.path = path;
    }

    async validateExisteFile () {
        try{
            await fs.promises.stat(path)
        }catch(error){
            await fs.promises.writeFile(path, JSON.stringify([]));
        }
    }  

    async guardarCarts (carts){
        try{        
        const data = JSON.stringify(carts, null, '\t')
        console.log(data)
        await fs.promises.writeFile(this.path, data)
        }catch(error){
            console.log("error00000")
        }
    };

    async createCartJSON() {
        const data = await fs.promises.readFile(path, 'utf-8')
        let analys = JSON.parse(data)
        let array_cart = []
        let arr_cart = []
            
            for (let i = 0; i<analys.length; i++){
                analys[i]['id']= i
                array_cart.push(analys[i]) 
            }

            for (let i = 0; i<array_cart.length; i++){
                let dict = {}
                dict.id = analys[i]['id']
                dict.products = analys[i]['products']             
                arr_cart.push(dict)
            }
            await this.guardarCarts(arr_cart);
        

        } catch (error) {
            console.error('Error')
            throw new Error(error)
        }
    


    async getCartId (idBuscado){
        try{
            const cart = await this.getAll();
            const indice = cart.findIndex((cart) => cart.id === idBuscado );
        
            if(indice < 0) {
                throw new Error('El id en el carrito no existe');
            }
        
            return cart[indice];
        }catch(error){
            console.log("Error")
        }
    }

    async createCart(data) {
        let analys = data
        let array_products = []
        let arr_products = []
        
        for (let i = 0; i<analys.length; i++){
            analys[i]['id']= i
            array_products.push(analys[i]) 
        }

        for (let i = 0; i<array_products.length; i++){
            let dict = {}
            dict.id = analys[i]['id']
            dict.products = analys[i]['products']          
            
            arr_products.push(dict)
        }
        await this.guardarCarts(arr_products);
    }
    


}

const gestionCart = new CartManager(path)



module.exports = {
    gestionCart
}


/* class CartManager{
    constructor(path){
        this.path = path;
    }

    createCart(){
        const cartList = this.getData();
        const cart = {products: []}

        // Asignarle un ID
        if(cartList.length == 0){
            cart.id = 1
        }else{
            let lastItemID = cartList[cartList.length - 1].id
            cart.id = lastItemID + 1
        }

        cartList.push(cart);
        fs.writeFileSync(this.path,JSON.stringify(cartList, null, 2))
        return cart;
    }

    getCartByID(cid){
        // conseguir un carrito por su ID
        const cartList = this.getData();

        let searchCart = cartList.find(cart => cart.id == cid);
        if(searchCart){
            return searchCart;
        }else{
            return {err: 'A cart with that ID does not exist.'};
        }
    }

    addProductToCart(cid, pid){
        // Agregar un producto al carrito
        const cartList = this.getData();

        let indexCart = cartList.findIndex(cart => cart.id == cid);
        if(indexCart == -1){
            return {err: 'A cart with that ID does not exist.'};
        }

        // Ver si el producto ya se encuentra en el carrito
        let productIndex = cartList[indexCart].products.findIndex(prod => prod.id == pid )
        if(productIndex == -1){
            const toAdd = {id: pid, quantity: 1}

            cartList[indexCart].products.push(toAdd)
            fs.writeFileSync(this.path,JSON.stringify(cartList, null, 2))

            return {message: 'added to cart', cart: cartList[indexCart].products};
        
        }else{
            cartList[indexCart].products[productIndex].quantity += 1;

            fs.writeFileSync(this.path,JSON.stringify(cartList, null, 2))

            return {message: 'added to cart', cart: cartList[indexCart].products}
        }
    }
    
    getData(){
        // Extrae data del archivo. Si no existe aun, devuelve un array vacio.
        let data = []
        try{
            const productos = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
            productos.forEach(element => {
                data.push(element)
            });

        }catch{
            console.log('The file was empty or did not exist.')
        }
        return data;
    }

}

export default CartManager;
 */