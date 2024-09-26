import { checkSchema, checkExact } from "express-validator";

export default class {
    static register() {
        return [
            checkSchema({
                email: {
                    notEmpty: {
                        errorMessage: "Email is required",
                    },
                    isString: {
                        errorMessage: "Email must be a string",
                    },
                    isEmail: {
                        errorMessage: "Email must be valid",
                    },
                },
                password: {
                    notEmpty: {
                        errorMessage: "Password is required",
                    },
                    isString: {
                        errorMessage: "Password must be a string",
                    },
                },
            }),
            checkExact(),
        ];
    }
    static login() {
        return [
            checkSchema({
                email: {
                    notEmpty: {
                        errorMessage: "Email is required",
                    },
                    isString: {
                        errorMessage: "Email must be a string",
                    },
                    isEmail: {
                        errorMessage: "Email must be valid",
                    },
                },
                password: {
                    notEmpty: {
                        errorMessage: "Password is required",
                    },
                    isString: {
                        errorMessage: "Password must be a string",
                    },
                },
            }),
            checkExact(),
        ];
    }
}
