import mongoose from 'mongoose';
// const ObjectId = Schema.Types.ObjectId;
import {model,Schema} from 'mongoose';


//  mongoose.connect("mongodb+srv://gujjubhai734:Lx6RbzLU7A72TpYO@cluster0.wvwpdqi.mongodb.net/week15")

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String }
})

const contentSchema = new Schema({
    link: String,
    type: String,
    title: String,
    tags: [{ type: mongoose.Types.ObjectId, ref: 'Tag' }],
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
})

const tagSchema = new Schema({
    title: { type: String, required: true, unique: true }
})

const linkSchema = new Schema({
    hash: { type: String, required: true },
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true,unique:true},
})


export const userModel =  model('User',userSchema);
export const contentModel =model('Content', contentSchema);
export const tagModel = model('Tag', tagSchema);
export const linkModel = model('Link', linkSchema);

// module.exports = {
//     userModel, 
//     contentModel,
//     tagModel,
//     linkModel
// };