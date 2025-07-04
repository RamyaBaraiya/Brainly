"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const signup_1 = __importDefault(require("./routes/signup"));
const app = (0, express_1.default)();
// ✅ Add these two middlewares BEFORE router
app.use((0, cors_1.default)());
app.use(express_1.default.json()); // <-- This is critical
app.use("/api/v1", signup_1.default);
mongoose_1.default.connect("mongodb+srv://gujjubhai734:Lx6RbzLU7A72TpYO@cluster0.wvwpdqi.mongodb.net/week15").then(() => {
    console.log("Connected to MongoDB");
});
app.listen(3000, () => {
    console.log("Listening on port 3000");
});
