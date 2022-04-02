const isAdmin = rol => {
    


    return (req, res ,next) => {
        if (rol) {
            next()
        } else {
            res.status(403).json({
                error: -1 , 
                descripcion: `Ruta: ${req.baseUrl} NO AUTORIZADA , kpa`
            })
        }
    }
}

module.exports = isAdmin