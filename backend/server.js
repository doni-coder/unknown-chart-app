// import mongoose from "mongoose";
import { server } from "./app.js";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

server.listen(process.env.PORT || 5000, () => {
  console.log(`server is listining on port ${process.env.port}`);
});

// const connectDB = async () => {
//   console.log(process.env.MONGO_DB);

//   try {
//     const connectionDB = await mongoose.connect(
//       `${process.env.MONGO_DB}/single-chat`
//     );
//     console.log(`mongodb connection success`);
//   } catch (error) {
//     console.log("error : mongodb connection error :: ", error);
//   }
// };

// connectDB()
//   .then(() => {
//     server.listen(process.env.PORT || 5000, () => {
//       console.log(`server is listining on port ${process.env.port}`);
//     });
//   })
//   .catch(() => {
//     console.log("mongodb connection error");
//   });
