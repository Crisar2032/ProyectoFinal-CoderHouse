import express from 'express';
import cartsRouter from './cartsRouter';
import productsRouter from './productsRouter';

const router = express.Router();

router.use('/api/productos', productsRouter);
router.use('/api/carritos', cartsRouter);


router.get('/', (req, res, next) => {
    res.send('Api funcionando correctamente');
  });



  router.use((req, res) =>{{
    return res.status(404).send({
        success: false,
        message: 'Resource not found.'
      });
  }})
  

export default router;