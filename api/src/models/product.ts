class Product {
    id: string;
    timestamp: number;
    name: string;
    description: string;
    code: string;
    photo: string;
    price: string;
    stock: number;


    constructor(id: string, timestamp: number, name: string, description: string, code: string, photo: string, price: string, stock: number) {

        this.id = id;
        this.timestamp = timestamp;
        this.name = name;
        this.description = description;
        this.code = code;
        this.photo = photo;
        this.price = price;
        this.stock = stock;


    }
}

export default Product