"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = __importDefault(require("zod"));
const auth_1 = __importDefault(require("../middleware/auth"));
const db_1 = require("../db");
const utils_1 = require("../utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const JWT_SECRET = "mysecretkey";
router.post('/signup', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const requiredBody = zod_1.default.object({
            username: zod_1.default.string().min(3).max(10),
            password: zod_1.default.string()
                .min(8, "Password must be at least 8 characters")
                .max(20, "Password must be at most 20 characters")
        });
        const parsedData = requiredBody.safeParse(req.body);
        if (!parsedData.success) {
            res.status(400).json({
                message: 'Invalid request body',
                errors: parsedData.error.errors
            });
            return;
        }
        const username = req.body.username;
        const password = req.body.password;
        let error = false;
        try {
            yield db_1.userModel.create({
                username: username,
                password: password
            });
            res.json({
                message: 'User created successfully',
            });
        }
        catch (e) {
            res.json({
                message: 'error creating user',
            });
            error = true;
        }
        if (!error) {
            res.json({
                message: 'User created successfully'
            });
        }
    });
});
router.post('/signin', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = req.body.username;
        const password = req.body.password;
        const user = yield db_1.userModel.findOne({
            username: username,
        });
        if (!user) {
            res.status(404).json({
                message: 'User not found'
            });
            return;
        }
        // Check if the password is correct using === comparison
        const isPasswordCorrect = user.password === password;
        if (isPasswordCorrect) {
            const token = jsonwebtoken_1.default.sign({
                id: user._id.toString(),
            }, JWT_SECRET);
            res.json({
                message: 'User signed in successfully',
                token: token
            });
        }
        else {
            res.status(401).json({
                message: 'Invalid password'
            });
        }
    });
});
// @ts-ignore
router.post('/content', auth_1.default, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const link = req.body.link;
        const type = req.body.type;
        const title = req.body.title;
        yield db_1.contentModel.create({
            link: link,
            type: type,
            title: title,
            //@ts-ignore
            userId: req.userId,
            tags: []
        });
        return res.json({
            message: 'Content created successfully'
        });
    });
});
//@ts-ignore
router.get('/get-content', auth_1.default, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //@ts-ignore
        const userId = req.userId;
        const content = yield db_1.contentModel.find({
            userId: userId
        }).populate("userId", "username");
        return res.json({
            message: 'Content fetched successfully',
            content: content
        });
    });
});
//@ts-ignore
router.delete('/delete-content', auth_1.default, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const contentId = req.body.contentId;
        //@ts-ignore
        const userId = req.userId;
        const result = yield db_1.contentModel.deleteOne({
            _id: contentId,
            userId: userId
        });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Content not found or not authorized' });
        }
        return res.json({
            message: 'Content deleted successfully'
        });
    });
});
//@ts-ignore
router.post("/brain/share", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    if (share) {
        const existingLink = yield db_1.linkModel.findOne({
            //@ts-ignore
            userId: req.userId
        });
        if (existingLink) {
            res.json({
                hash: existingLink.hash
            });
            return;
        }
        const hash = (0, utils_1.random)(10);
        yield db_1.linkModel.create({
            //@ts-ignore
            userId: req.userId,
            hash: hash
        });
        res.json({
            hash
        });
    }
    else {
        yield db_1.linkModel.deleteOne({
            //@ts-ignore
            userId: req.userId
        });
        res.json({
            message: "Removed link"
        });
    }
}));
router.get("/brain/:shareLink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    const link = yield db_1.linkModel.findOne({
        hash
    });
    if (!link) {
        res.status(411).json({
            message: "Sorry incorrect input"
        });
        return;
    }
    // userId
    const content = yield db_1.contentModel.find({
        userId: link.userId
    });
    const user = yield db_1.userModel.findOne({
        _id: link.userId
    });
    if (!user) {
        res.status(411).json({
            message: "user not found, error should ideally not happen"
        });
        return;
    }
    res.json({
        username: user.username,
        content: content
    });
}));
exports.default = router;
