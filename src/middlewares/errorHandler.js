import AppError from '../utils/AppError.js';

//Ninguna ruta coincide  con la petición -> 404
export function notFound(req, res) {
    res.status(404).json({ error: 'Ruta no encontrada' });
}

export function errorHandler(err, req, res, next) {
    //erores propios lanzados desde los servicios
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ error: err.message });
    }


    //Errores de validación del esquema de Mongoose
    if (err.name === 'ValidationError') {
        const details = Object.values(err.errors).map((e) => e.message);
        return res.status(400).json({ error: 'Datos no válidos', details });
    }

    //Valor repetido en un campo  unique (por ejemplo, el email)
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        return res.status(409).json({ error: `Ya existe un registro con ese ${field}` });
    }

    //Id con formato no válido 
    if (err.name === 'CastError') {
        return res.status(400).json({ error: 'Identificador no válido' });
    }

    //JSON mal escrito en el body
    if (err.type === 'entity.parse.failed') {
        return res.status(400).json({ error: 'El JSON enviado no es válido' });
    }

    //Cualquier otro error
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
}

