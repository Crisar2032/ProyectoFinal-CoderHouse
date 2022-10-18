const authMiddleware = (req:any, res:any, next:any) => {
    if(req.headers.rol == "admin"){
        next()
    }else{
        res.send('No estas autorizado')
    }
}

export default authMiddleware;