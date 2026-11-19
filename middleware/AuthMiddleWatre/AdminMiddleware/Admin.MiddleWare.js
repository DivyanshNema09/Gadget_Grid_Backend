const jwt = require("jsonwebtoken");

const adminMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.adminToken;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Please login as admin first"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_ADMIN_SECRET
        );

        req.admin = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired admin token"
        });
    }
};

module.exports = adminMiddleware;