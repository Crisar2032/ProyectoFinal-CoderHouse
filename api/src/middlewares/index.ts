const authMiddleware = (req:any, res:any, next:any) => {
    if(req.headers.rol == "admin"){
        next()
    }else{
        res.json({error : -1, description: `route ${req.originalUrl} method ${req.method} unauthorized`})
    }
}

export default authMiddleware;