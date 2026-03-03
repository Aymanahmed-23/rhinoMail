import transporter from "../config/nodemailer.js";

export const sendEmail = async ({ to, subject, html }) => {
  return await transporter.sendMail({
    from: `"RhinoMail" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html
  });
};