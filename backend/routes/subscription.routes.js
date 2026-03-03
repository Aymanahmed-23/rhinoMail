import { Router } from "express";
import {
  subscribe,
  verifySubscriber,
  unsubscribe,
  getAllSubscribers,
  sendNewsletter
} from "../controllers/subscription.controller.js";

import authorize from "../middlewares/auth.middleware.js";

const router = Router();

// Public
router.post("/subscribe", subscribe);
router.get("/verify/:token", verifySubscriber);
router.post("/unsubscribe", unsubscribe);

// Admin / Creator
router.get("/", authorize, getAllSubscribers);
router.post("/send", authorize, sendNewsletter);

export default router;