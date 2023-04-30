import jwt from "jsonwebtoken";

const JWTsign = (data) => {
   const key = process.env.JWT_SECRET;
   const token = jwt.sign(data, key, { expiresIn: "30d" });
   return token;
};

const JWTverity = (req, res, next) => {
   const authHeader = req.header("Authorization");
   const token = authHeader && authHeader.split(" ")[1];
   const key = process.env.JWT_SECRET;
   if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
   }
   try {
      const data = jwt.verify(token, key);
      req.userId = data._id;
      next();
   } catch (error) {
      console.log(error);
      return res.status(403).json({ message: "Forbidden" });
   }
};

export { JWTsign, JWTverity };
