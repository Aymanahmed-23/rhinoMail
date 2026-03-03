import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const response = await resend.emails.send({
      from: "RhinoMail <onboarding@resend.dev>", // test sender
      to,
      subject,
      html,
    });

    return response;

  } catch (error) {
    console.error("Email sending failed:", error);
    throw error;
  }
};