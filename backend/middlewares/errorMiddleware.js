import { customError } from "../utils/customError.js";

export const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode ? err.statusCode : "500";
    err.message = err.message ? err.message : "Internal Server Error";

    //check validation error
    if (err.name === "ValidationError") {
        const validationErrors = [];
        for (const field in err.errors) {
            if (err.errors.hasOwnProperty(field)) {
                validationErrors.push(err.errors[field].message);
            }
        }
        return res.status(500).json({ errors: validationErrors });
    }

    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};
