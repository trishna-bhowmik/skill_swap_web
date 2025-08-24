import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiEroor } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { Skill } from "../models/skill.models.js";
import { Message } from "../models/message.models.js";
import { Chat } from "../models/chat.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateAccessAndRefreshTokens = async (userId) => {
  const accessToken = jwt.sign(
    { _id: userId },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );

  const refreshToken = jwt.sign(
    { _id: userId },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );

  return { accessToken, refreshToken };
};

const registerUser = asyncHandler( async (req, res) => {
    const fullname = req.body.fullname?.trim();
    const email = req.body.email?.trim().toLowerCase();
    const username = req.body.username?.trim().toLowerCase();
    const password = req.body.password;

    //console.log("email:", email);
    
    if (!fullname || !email || !username || !password) {
        throw new ApiEroor(400, "All fields are required");
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if(existedUser) {
        throw new ApiEroor(409, "User with email or username already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;

    if(!avatarLocalPath){
        throw new ApiEroor(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    

    if(!avatar) {
        throw new ApiEroor(400, "Avatar file is required")
    }

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiEroor(500, "Something went wrong while registering the user")
    }


    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfully")
    )
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if (!username && !email) {
    throw new ApiEroor(400, "Username or email is required");
  }

  const query = [
    username ? { username: username.toLowerCase() } : null,
    email ? { email: email.toLowerCase() } : null,
  ].filter(Boolean);

  const user = await User.findOne({ $or: query });
  if (!user) throw new ApiEroor(404, "User does not exist");

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) throw new ApiEroor(401, "Invalid user credentials");

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

  const loggedInUser = await User.findById(user._id)
    .select("-password -refreshToken")
    .populate("skills", "name specialization description");

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", 
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, 
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      { user: loggedInUser, accessToken, refreshToken },
      "User Logged In Successfully"
    )
  );
});


const logoutUser = asyncHandler( async (req, res) =>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    ) 

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logged Out"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if(!incomingRefreshToken){
        throw new ApiEroor(401, "Unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
    
        const user = User.findById(decodedToken?._id)
    
        if(!user){
            throw new ApiEroor(401, "Invalid refresh token")
        }
    
        if(incomingRefreshToken !== user?.refreshToken){
            throw new ApiEroor(401, "Refresh token is expired or used")
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, newrefreshToken} = await generateAccessAndRefreshTokens(user._id)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken",newrefreshToken, options)
        .json(
            new ApiResponse(200,
                {accessToken, refreshToken: newrefreshToken},
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new ApiEroor(401, error?.message || "Invalid refresh token")
    }
})

const changeCurrentPassword = asyncHandler( async (req, res) => {
    const {oldPassword, newPassword} = req.body

    const user = await User.findById(req.user?._id)
    const isPasswordValid = await user.isPasswordCorrect(oldPassword)

    if(!isPasswordValid){
        throw new ApiEroor(400, "Invalid old password")
    }

    user.password = newPassword
    await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(
        new ApiResponse(200, {}, "Password Changed Successfully")
    )
})

const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password -refreshToken")
  .populate("skills", "name specialization description");;
  if (!user) throw new ApiEroor(404, "User not found");
  
  res.status(200).json(
    new ApiResponse(200, { user }, "User fetched successfully")
  );
});

const updateAccountDetails = asyncHandler(async (req, res) => {
    const { fullname, email, location, bio } = req.body;

    const updateData = {};

    if (fullname) updateData.fullname = fullname;
    if (email) updateData.email = email;
    if (location) updateData.location = location;
    if (bio) updateData.bio = bio;

    if (Object.keys(updateData).length === 0) {
        throw new ApiEroor(400, "No data provided to update");
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        { $set: updateData },
        { new: true }
    ).select("-password");

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Account details updated successfully"));
});


const addSkills = asyncHandler(async (req, res) => {
  const { skills } = req.body;

  if (!skills || !Array.isArray(skills) || skills.length === 0) {
    throw new ApiEroor(400, "Skills array is required");
  }

  if (!req.user || !req.user._id) {
    throw new ApiEroor(401, "Unauthorized");
  }

  const user = await User.findById(req.user._id);
  if (!user) throw new ApiEroor(404, "User not found");

  const createdSkills = [];

  for (const skillData of skills) {
    if (!skillData.name || typeof skillData.name !== "string") continue;

    // Check if the skill already exists (by name) and current user is not already an owner
    let skill = await Skill.findOne({ name: skillData.name.trim() });

    if (skill) {
      // Skill exists, add user to owner array if not already present
      if (!skill.owners.includes(req.user._id)) {
        skill.owners.push(req.user._id);
        await skill.save();
      }
    } else {
      // Create new skill with current user as initial owner
      skill = await Skill.create({
        name: skillData.name.trim(),
        specialization: (skillData.specialization || "").trim(),
        owners: [req.user._id],
      });
    }

    createdSkills.push(skill);

    // Add skill to user's skill list if not already present
    if (!user.skills.includes(skill._id)) {
      user.skills.push(skill._id);
    }
  }

  await user.save();

  return res
    .status(201)
    .json(new ApiResponse(201, createdSkills, "Skills added and linked to user"));
});


const updateUserAvatar = asyncHandler( async (req, res) => {
    const avatarLocalPath = req.files?.path
    if(!avatarLocalPath){
        throw new ApiEroor(400, "Avatar file is missing")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    if(!avatar.url){
        throw new ApiEroor(400, "Error while uploading on avatar")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                avatar: avatar.url
            }
        },
        {new: true}
    ).select("-password")

    return res
    .status(200)
    .json(new ApiResponse(200, user, "Avatar Updated Successfully"))
})


const getAllSkills = asyncHandler(async (req, res) => {
  const skills = await Skill.find().populate("owners", "fullname email");
  res.status(200).json({ success: true, data: skills });
});

const getUsersBySkill = asyncHandler(async (req, res) => {
  const { skillId } = req.params;

  const skill = await Skill.findById(skillId);
  if (!skill) {
    throw new ApiEroor(404, "Skill not found");
  }

  // Get all users whose skills include this skillId
  const users = await User.find({ skills: skillId }).select("owners username email");

  return res.status(200).json(
    new ApiResponse(200, {
      skillName: skill.name,
      users,
    })
  );
});

const sendMessage = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const { chatId } = req.params;

  if (!content || !chatId) {
    throw new ApiEroor(400, "Invalid data passed into request");
  }

  const newMessage = await Message.create({
    sender: req.user._id,
    content,
    chat: chatId,
  });

  const populatedMessage = await newMessage.populate("sender", "name email");
  await Chat.findByIdAndUpdate(chatId, { latestMessage: populatedMessage });

  res.status(200).json(populatedMessage);
});


const accessChat = asyncHandler(async (req, res) => {
    if (!req.body) {
    console.log("❌ Request body is missing");
    throw new ApiEroor(400, "Request body is missing");
  }
  const { _id: userId } = req.body;

  if (!userId) {
    throw new ApiEroor(400, "User ID is required in request body");
  }

  // Check if chat already exists between these two users
  let chat = await Chat.findOne({
    isGroupChat: false,
    users: { $all: [req.user._id, userId] }, // simpler and cleaner
  })
    .populate("users", "-password")
    .populate("latestMessage");

  if (chat) {
    return res.status(200).json(chat);
  }

  // Create new chat if not found
  const newChat = await Chat.create({
    chatName: "sender",
    isGroupChat: false,
    users: [req.user._id, userId],
  });

  const fullChat = await Chat.findById(newChat._id).populate("users", "-password");

  res.status(200).json(fullChat);
});

const getMessages = asyncHandler(async (req, res) => {
  const { chatId } = req.params;

  const messages = await Message.find({ chat: chatId })
    .populate("sender", "name email")
    .populate("chat");

  res.status(200).json(messages);
});

export { 
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    addSkills,
    updateUserAvatar,
    getAllSkills,
    getUsersBySkill,
    sendMessage,
    accessChat,
    getMessages
}
