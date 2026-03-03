import crypto from "crypto";
import Subscription from "../model/subscription.model.js";
import { sendEmail } from "../utils/email.service.js";


export const subscribe = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }

    const existing = await Subscription.findOne({ email });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Already subscribed"
      });
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");

    await Subscription.create({
      name,
      email,
      verificationToken
    });

    const verifyUrl = `${process.env.BASE_URL}/api/v1/subscriptions/verify/${verificationToken}`;

    await sendEmail({
      to: email,
      subject: "Verify your subscription",
      html: `
        <h2>Confirm your subscription</h2>
        <p>Click below to verify:</p>
        <a href="${verifyUrl}">${verifyUrl}</a>
      `
    });

    res.status(201).json({
      success: true,
      message: "Verification email sent"
    });

  } catch (error) {
    next(error);
  }
};



/**
 * Verify Subscriber
 */
export const verifySubscriber = async (req, res, next) => {
  try {
    const { token } = req.params;

    const subscriber = await Subscription.findOne({
      verificationToken: token
    });

    if (!subscriber) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token"
      });
    }

    subscriber.isVerified = true;
    subscriber.verificationToken = undefined;

    await subscriber.save();

    res.status(200).json({
      success: true,
      message: "Subscription verified successfully"
    });

  } catch (error) {
    next(error);
  }
};



/**
 * Unsubscribe
 */
export const unsubscribe = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }

    const subscriber = await Subscription.findOne({ email });

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: "Subscriber not found"
      });
    }

    subscriber.isUnsubscribed = true;
    await subscriber.save();

    res.status(200).json({
      success: true,
      message: "Unsubscribed successfully"
    });

  } catch (error) {
    next(error);
  }
};



/**
 * Get All Subscribers (Admin)
 */
export const getAllSubscribers = async (req, res, next) => {
  try {
    const subscribers = await Subscription.find().select("-verificationToken");

    res.status(200).json({
      success: true,
      data: subscribers
    });

  } catch (error) {
    next(error);
  }
};



/**
 * Send Newsletter (Admin)
 */
export const sendNewsletter = async (req, res, next) => {
  try {
    const { subject, content } = req.body;

    if (!subject || !content) {
      return res.status(400).json({
        success: false,
        message: "Subject and content are required"
      });
    }

    const subscribers = await Subscription.find({
    isVerified: true,
    $or: [
      { isUnsubscribed: false },
      { isUnsubscribed: { $exists: false } }
   ]
      });

    for (const sub of subscribers) {
      await sendEmail({
        to: sub.email,
        subject,
        html: `
          <h1>Hello ${sub.name || "Subscriber"} 👋</h1>
          <p>${content}</p>
        `
      });
    }

    res.status(200).json({
      success: true,
      message: `Newsletter sent to ${subscribers.length} subscribers`
    });

  } catch (error) {
    next(error);
  }
};