"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserSchema = exports.signupUserSchema = void 0;
const zod_1 = require("zod");
exports.signupUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({ required_error: "Name is Required" }),
        email: (0, zod_1.string)({ required_error: "Email is Required" }).email("Email is not Valid"),
        password: (0, zod_1.string)({ required_error: "Password is required" }).min(6, "Password must be 6 characters long!"),
    }),
});
exports.loginUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: (0, zod_1.string)({ required_error: "Email is Required !" }).email("Invalid email"),
        password: (0, zod_1.string)({ required_error: "Password is Required !" }),
    }),
});
