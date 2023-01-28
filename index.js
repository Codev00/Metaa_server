import app from "./app.js";

const PORT = process.env.PORT || 3000;

// Run Server
app.listen(PORT, () => {
   console.log(`Server is running localhost ${PORT}`);
});
