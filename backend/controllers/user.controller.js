import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createUser = asyncHandler(async (req,res)=>{
  console.log(req.body);
  const {username} = req.body
  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }
  const user = await User.findOne({username})

  if (user) {
    return res.status(400).json({ message: "Username already taken" });
  }

  const newUser = new User({
    username
  })
  await newUser.save()

  return res.status(200).json({ message: "user created" });
})

const searchUser = async (req, res) => {
  
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }
  try {
    // Check if the user already exists
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Username not found" });
    }

    return res.status(201).json({ receiver_id: user._id, user });
  } catch (error) {
    return res.status(500).json({ message: "Error search user", error });
  }
};

export { createUser, searchUser };
