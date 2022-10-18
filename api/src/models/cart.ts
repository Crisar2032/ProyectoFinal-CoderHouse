import Product from './product'

class Cart {
    id: string;
    timestamp: Date;
    products: Array<Product>;


    constructor(id: string, timestamp: Date, products: Array<Product>) {
        this.id = id;
        this.timestamp = timestamp;
        this.products = products;

    }
}

export default Cart