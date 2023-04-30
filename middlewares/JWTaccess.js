import { Jwt } from "jsonwebtoken";

const JWTsign = (data) => {
   const key = process.env.JWT_SECRET;
   const token = Jwt.sign(data, key, { expiresIn: "30d" });
   return token;
};

const JWTverity = (token) => {
   const key = process.env.JWT_SECRET;
   const data = Jwt.verify(token, key);
   return data;
};

export { JWTsign, JWTverity };
