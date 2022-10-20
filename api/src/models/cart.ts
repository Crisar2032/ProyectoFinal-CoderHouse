import Product from './product'

class Cart {
    id: string;
    timestamp: number;
    products: Array<Product>;


    constructor(id: string, timestamp: number, products: Array<Product>) {
        this.id = id;
        this.timestamp = timestamp;
        this.products = products;

    }
}

export default Cart