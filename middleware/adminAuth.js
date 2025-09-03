import jwt from 'jsonwebtoken';

const adminAuth = (req, res, next) => {
  try {
    const token = req.cookies?.adminToken;
    if (!token) return res.status(401).json({ message: "No admin token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.email) return res.status(403).json({ message: "Invalid admin token" });

    // optional: compare with expected admin email in .env
    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ message: "Not an admin" });
    }

    req.adminEmail = decoded.email;
    next();
  } catch (err) {
    console.error("adminAuth error:", err);
    return res.status(401).json({ message: "Admin authentication failed" });
  }
};

export default adminAuth;
