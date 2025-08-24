import { Router } from "express";
import { 
    addSkills,
    accessChat,
    changeCurrentPassword, 
    getCurrentUser, 
    loginUser, 
    logoutUser, 
    refreshAccessToken, 
    registerUser, 
    updateAccountDetails, 
    updateUserAvatar, 
    getAllSkills,
    getUsersBySkill,
    sendMessage,
    getMessages
    //updateUserCover 
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser)


router.route("/login").post(loginUser)    

router.route("/logout").post(verifyJWT, logoutUser)

router.route("/refresh-token").post(refreshAccessToken)

router.route("/change-password").post(verifyJWT, changeCurrentPassword)

router.route("/current-user").get(verifyJWT, getCurrentUser)

router.route("/update-account").patch(verifyJWT, updateAccountDetails)

router.route("/update-skills").patch(verifyJWT, addSkills)

router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)

router.get("/skills",verifyJWT, getAllSkills);

router.get("/skills/:skillId",verifyJWT, getUsersBySkill);

router.post("/chats", verifyJWT, accessChat);
router.post("/messages/:chatId", verifyJWT, sendMessage);
router.get("/getmsg/:chatId", verifyJWT, getMessages);


export default router
