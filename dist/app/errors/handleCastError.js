"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (err) => {
    const statusCode = 400;
    const error = [{
            details: err === null || err === void 0 ? void 0 : err.message,
        }];
    return {
        statusCode,
        message: 'Invalid ID',
        error,
    };
};
exports.default = handleCastError;
