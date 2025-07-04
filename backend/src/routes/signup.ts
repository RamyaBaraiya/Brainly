import express from 'express';
import z from 'zod'
import authmiddleware from '../middleware/auth';
import { contentModel, userModel,linkModel } from '../db';
import { random } from '../utils';
import jwt from 'jsonwebtoken';
const router = express.Router();
const app = express();
app.use(express.json());
const JWT_SECRET = "mysecretkey"

router.post('/signup', async function (req, res) {
    

    const requiredBody = z.object({
        username: z.string().min(3).max(10),
        password: z.string()
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
    
    
    try{
       
        await userModel.create({
            username: username,
            password: password
            
        })
        res.json({
            message: 'User created successfully',
        })

    } catch (e) {
        res.json({
            message: 'error creating user',
        })
        error = true;
    }
    if (!error) {
        res.json({
            message: 'User created successfully'
        })
    }
});

router.post('/signin', async function (req, res) {

    const username = req.body.username;
    const password = req.body.password;

    const user = await userModel.findOne({
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
        const token = jwt.sign({
            id: user._id.toString(),
        }, JWT_SECRET)
        res.json(
            {
                message: 'User signed in successfully',
                token: token
            }
        )
    }
    else {
        res.status(401).json({
            message: 'Invalid password'
        });
    }

})
// @ts-ignore
router.post('/content', authmiddleware , async function (req, res) {
    const link = req.body.link;
    const type = req.body.type;
    const title = req.body.title;
    
    await contentModel.create({
        link: link,
        type: type,
        title: title,
        //@ts-ignore
        userId: req.userId,
        tags:[]

    })
    return res.json({
        message: 'Content created successfully'
    })
    

})
//@ts-ignore
router.get('/get-content', authmiddleware, async function (req, res) {

    //@ts-ignore
    const userId = req.userId;
    const content = await contentModel.find({
        userId: userId
    }).populate("userId","username")
    return res.json({
        message: 'Content fetched successfully',
        content: content
    })
})
//@ts-ignore
router.delete('/delete-content', authmiddleware, async function (req, res) {
    const contentId = req.body.contentId;
    //@ts-ignore
    const userId = req.userId;
    const result = await contentModel.deleteOne({
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
//@ts-ignore
router.post("/brain/share", authmiddleware, async (req, res) => {
    const share = req.body.share;
    if (share) {
            const existingLink = await linkModel.findOne({
                //@ts-ignore
                userId: req.userId
            });

            if (existingLink) {
                res.json({
                    hash: existingLink.hash
                })
                return;
            }
            const hash = random(10);
            await linkModel.create({
                //@ts-ignore
                userId: req.userId,
                hash: hash
            })

            res.json({
                hash
            })
    } else {
        await linkModel.deleteOne({
            //@ts-ignore
            userId: req.userId
        });

        res.json({
            message: "Removed link"
        })
    }
})

router.get("/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;

    const link = await linkModel.findOne({
        hash
    });

    if (!link) {
        res.status(411).json({
            message: "Sorry incorrect input"
        })
        return;
    }
    // userId
    const content = await contentModel.find({
        userId: link.userId
    })

    const user = await userModel.findOne({
        _id: link.userId
    })

    if (!user) {
        res.status(411).json({
            message: "user not found, error should ideally not happen"
        })
        return;
    }

    res.json({
        username: user.username,
        content: content
    })

})


export default router;


