/*some functions to respond to errors*/ 

function throwCustomError(code, msg) {
    throw new Error(JSON.stringify({code, msg}));
}

function respondWithError(res, e) {
    try{
        const err = JSON.parse(e.message);
        res.status(err.code).json({
            mensaje: "unsuccessful.",
            err: err.msg,
        })
    } catch (parseError) {
        // Manejar otros errores (como ValidationError de Mongoose)
        if (e.name === 'ValidationError') {
            const messages = Object.values(e.errors).map(err => err.message);
            res.status(400).json({
                mensaje: "unsuccessful.",
                err: messages,
            });
        } else {
            // Error genérico del servidor
            res.status(500).json({
                mensaje: "unsuccessful.",
                err: e.message || "Unknown server error",
            });
        }
    }
    
}

module.exports = {
    throwCustomError,
    respondWithError
}