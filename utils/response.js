const baseResponse = {
    success: false,
    message: '',
    data: null
};

module.exports = {
    sendError: (message, data = null) => ({
        ...{},
        ...baseResponse,
        message,
        data
    }),
    sendSuccess: (message, data = null) => ({
        ...{},
        ...baseResponse,
        message,
        data,
        success: true
    })
};
