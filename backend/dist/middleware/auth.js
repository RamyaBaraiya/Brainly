"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = "mysecretkey";
function authmiddleware(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({
            message: 'Unauthorized'
        });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        //@ts-ignore
        req.userId = decoded.id;
        next();
    }
    catch (error) {
        return res.status(403).json({
            message: 'Unauthorized'
        });
    }
}
exports.default = authmiddleware;
