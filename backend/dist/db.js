"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkModel = exports.tagModel = exports.contentModel = exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// const ObjectId = Schema.Types.ObjectId;
const mongoose_2 = require("mongoose");
//  mongoose.connect("mongodb+srv://gujjubhai734:Lx6RbzLU7A72TpYO@cluster0.wvwpdqi.mongodb.net/week15")
const userSchema = new mongoose_2.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String }
});
const contentSchema = new mongoose_2.Schema({
    link: String,
    type: String,
    title: String,
    tags: [{ type: mongoose_1.default.Types.ObjectId, ref: 'Tag' }],
    userId: { type: mongoose_1.default.Types.ObjectId, ref: 'User', required: true },
});
const tagSchema = new mongoose_2.Schema({
    title: { type: String, required: true, unique: true }
});
const linkSchema = new mongoose_2.Schema({
    hash: { type: String, required: true },
    userId: { type: mongoose_1.default.Types.ObjectId, ref: 'User', required: true, unique: true },
});
exports.userModel = (0, mongoose_2.model)('User', userSchema);
exports.contentModel = (0, mongoose_2.model)('Content', contentSchema);
exports.tagModel = (0, mongoose_2.model)('Tag', tagSchema);
exports.linkModel = (0, mongoose_2.model)('Link', linkSchema);
// module.exports = {
//     userModel, 
//     contentModel,
//     tagModel,
//     linkModel
// };
