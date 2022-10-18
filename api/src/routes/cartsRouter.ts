import { Router } from "express";
const routerCarritos  = Router();



routerCarritos.get('/', (req, res) => {
    res.send('get carritos ok')
})

routerCarritos.post('/', (req, res) => {
    console.log('Crea nuevo carrito y devuelve su id')
})

routerCarritos.post('/:id/productos/:id_prod', (req, res) => {
    //buscar carrito por id
    // buscar producto por id 
    // voy a tener objeto carrito y objeto producto
    // hago un push del objeto producto en el array "productos" del objeto carrito 

    //tener en cuenta que hay que sobreescribir archivo 
})

export default routerCarritos;
