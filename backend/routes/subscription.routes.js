import { Router } from "express";
import {
  subscribe,
  verifySubscriber,
  unsubscribe,
  getAllSubscribers,
  sendNewsletter
} from "../controllers/subscription.controller.js";

import authorize from "../middlewares/auth.middleware.js";
import adminOnly from "../middlewares/admin.middleware.js";

const router = Router();

// Public
router.post("/subscribe", subscribe);
router.get("/verify/:token", verifySubscriber);
router.post("/unsubscribe", unsubscribe);

// Admin / Creator


router.get("/", authorize, adminOnly, getAllSubscribers);
router.post("/send", authorize, adminOnly, sendNewsletter);

export default router;