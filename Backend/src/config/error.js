module.exports = {
    badrequest: {
        status: 400,
        response: {
            statusCode: 400,
            error: 'BADREQUEST',
            message: 'JSON em formato inválido!'
        }
    },
    unauthorized: {
        status: 401,
        response: {
            statusCode: 401,
            error: 'UNAUTHENTICATED',
            message: 'Usuário não autenticado!'
        }
    },
    forbidden: {
        status: 403,
        responseEmail: {
            statusCode: 403,
            error: 'FORBIDDEN',
            message: 'E-mail informado não está cadastrado no sistema!',
        },
        responsePswd: {
            statusCode: 403,
            error: 'FORBIDDEN',
            message: 'Senha incorreta!',
        }
    },
    alreadyExist: {
        status: 403,
        response: {
            statusCode: 403,
            error: 'ALREADYEXIST',
            message: 'E-mail já cadastrado no sistema!'
        }
    },
    notFound: {
        status: 404,
        response: {
            statusCode: 404,
            error: 'NOTFOUND',
            message: 'Página solicitada não encontrada!'
        }
    },
    serverError: {
        status: 500,
        response: {
            statusCode: 500,
            error: 'SERVERERROR',
            message: 'Ocorreu um erro inesperado!'
        }
    },
    notImplemented: {
        status: 501,
        response: {
            statusCode: 501,
            error: 'NOTIMPLEMENTED',
            message: 'Requisição não suportada!'
        }
    },
    serverUnavailable: {
        status: 503,
        response: {
            statusCode: 503,
            error: 'SERVERUNAVAILABLE',
            message: 'Servidor indisponível!'
        }
    },
    customServerError : function(err) {
        let customError = {
            status: 500,
            response: {
                statusCode: 500,
                error: err.toString(),
                message: 'Ocorreu um erro inesperado!'
            }
        }
        return customError;
    }
}