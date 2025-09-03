import jwt from 'jsonwebtoken';
import User from '../model/userModel.js';

export const getCurrentUser = async (req, res) => {
  try {
    console.log("🔥 COOKIES:", req.cookies);

    // Prefer req.userId set by middleware
    let userId = req.userId;

    // Fallback: decode token if middleware didn't set userId
    if (!userId) {
      const token = req.cookies?.token;
      if (!token) return res.status(401).json({ message: "Not authenticated" });

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded?.id || decoded?.userId;
      console.log("✅ Decoded Token:", decoded);
    }

    const user = await User.findById(userId).select('-password');
    console.log("✅ Found User:", user);

    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json(user);
  } catch (err) {
    console.error("❌ getCurrentUser error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAdmin = async(req,res)=>{

  try {
    let adminEmail = req.adminEmail;
    if(!adminEmail){
       return res.status(404).json({ message: "Admin not found" })
    }

    return res.status(201).json({
      email:adminEmail,
      role:"admin"
    })
  } catch (error) {
     console.error("❌ getAdmin error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
 
  }

}
