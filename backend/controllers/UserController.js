const bcrypt = require('bcryptjs');
const User = require('../module/User');




const registerUser = async (req,res) =>{
    const {username,email,password} = req.body;
    try {
        
        const userExsiste = await User.findOne({email});
        if(userExsiste){
            return res.status(400).json({message:"User already exsiste"});
        }
        const newUser = new User({username,email,password});
        await newUser.save();
        res.status(201).json({message:"User registered successfully"});
    }catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({message:"Server error"});
    }

   

};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }


    req.session.userId = user._id;
    
    return res.status(200).json({
      message: "Login successful",
      
    });

  } catch (error) {
    console.error('Error logging in user:', error);
    return res.status(500).json({ message: "Server error" });
  }
};
const updateEmail = async (req, res) =>{
  const { email} = req.body;
  try{
    const userId = req.session.userId;
    if(!userId){
      return res.status(401).json({message:"Unauthorized"});
    }
    await User.findByIdAndUpdate(userId,{email});
    res.status(200).json({message:"Email updated successfully"}); 
  }catch{
    res.status(500).json({message:"Server error"});
  }
};
const updatePassword = async (req, res) =>{
  const { password} = req.body;
  try{
    const userId = req.session.userId;
    if(!userId){
      return res.status(401).json({message:"Unauthorized"});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(userId,{password:hashedPassword});
    res.status(200).json({message:"Password updated successfully"}); 
  }catch{
    res.status(500).json({message:"Server error"});
  }
};
const getUser = async (req, res) => {
  try {
    const userId = req.session.userId;  
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {registerUser,loginUser,updateEmail, updatePassword,getUser};