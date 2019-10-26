module.exports = {
    ok: {
        status: 200,
        response: {
            statusCode: 200,
            success: 'OK',
            message: 'Requisição bem sucedida!',
        },
        responseUpdate: {
            statusCode: 200,
            success: 'OK',
            message: 'Dados atualizados!',
        }
    },
    created: {
        status: 201,
        response: {
            statusCode: 201,
            success: 'CREATED',
            message: 'Requisição bem sucedida e recurso solicitado criado!',
            data: ''
        }
    },
    customSuccess : function(message = null, data = null) {
        let customSuccess = {
            status: 200,
            response: {
                statusCode: 200,
                success: 'OK',
                message: message || 'Requisição bem sucedida!',
                data: data
            }
        }
        return customSuccess;
    },
    customCreated : function(message = null, data = null) {
        let customCreated = {
            status: 201,
            response: {
                statusCode: 201,
                success: 'CREATED',
                message: message || 'Requisição bem sucedida e recurso solicitado criado!',
                data: data
            }
        }
        return customCreated;
    }
}