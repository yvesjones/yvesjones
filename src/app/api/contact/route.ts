import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "yvesjonesmusic@gmail.com";
const FROM_EMAIL = "onboarding@resend.dev"; // Change to your verified domain email

const typeLabels: Record<string, string> = {
  booking: "Booking Enquiry",
  press: "Press / Media",
  collaboration: "Collaboration",
  general: "General",
};

export async function POST(request: Request) {
  try {
    const { name, email, type, subject, message } = await request.json();

    if (!name || !email || !type || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    const typeLabel = typeLabels[type] || type;

    // Send notification email to site owner
    const notificationResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: CONTACT_EMAIL,
      subject: `[${typeLabel}] ${subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #555; vertical-align: top;">Name</td>
              <td style="padding: 8px 12px;">${name}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 8px 12px; font-weight: bold; color: #555; vertical-align: top;">Email</td>
              <td style="padding: 8px 12px;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #555; vertical-align: top;">Type</td>
              <td style="padding: 8px 12px;">${typeLabel}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 8px 12px; font-weight: bold; color: #555; vertical-align: top;">Subject</td>
              <td style="padding: 8px 12px;">${subject}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #555; vertical-align: top;">Message</td>
              <td style="padding: 8px 12px; white-space: pre-wrap;">${message}</td>
            </tr>
          </table>
        </div>
      `,
    });

    console.log("Notification result:", JSON.stringify(notificationResult));

    if (notificationResult.error) {
      console.error("Resend notification error:", notificationResult.error);
      return NextResponse.json(
        { error: notificationResult.error.message },
        { status: 500 },
      );
    }

    // Send confirmation email to the sender
    const confirmationResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `We got your message — Yves Jones`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Thanks for reaching out, ${name}!</h2>
          <p style="color: #555; line-height: 1.6;">
            This is a quick confirmation that your message has been received.
            We'll get back to you as soon as possible.
          </p>
          <div style="margin: 24px 0; padding: 16px; background: #f9f9f9; border-radius: 8px;">
            <p style="margin: 0 0 4px; font-weight: bold; color: #333;">${subject}</p>
            <p style="margin: 0; color: #666; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #999; font-size: 14px;">— Yves Jones</p>
        </div>
      `,
    });

    console.log("Confirmation result:", JSON.stringify(confirmationResult));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
