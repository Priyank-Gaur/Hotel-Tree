import express from "express";
import { getUserData } from "../controllers/userConrollers.js";
import { protect, storeRecentSearchedCities } from "../middleware/authMIddleware.js";


const userRouter = express.Router();

userRouter.get("/", protect, getUserData);
userRouter.post("/store-recent-search", protect, storeRecentSearchedCities);

export default userRouter;
