import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { contactServiceOptions } from "@/lib/contact";

export interface ContactFormData {
  fullName: string;
  email?: string;
  phone: string;
  service?: string;
  message?: string;
}

const transporter = nodemailer.createTransport({
  service:process.env.SMTP_SERVICE,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string) {
  const cleaned = phone.replace(/[^0-9]/g, "");
  return /^[0-9+\-().\s]{7,25}$/.test(phone) && cleaned.length >= 7;
}

async function sendEmail(data: ContactFormData) {
  await transporter.sendMail({
    from: `"Contact Form" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_USER,
    subject: `New Contact Form Submission from ${data.fullName}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <table cellpadding="8" cellspacing="0" border="1" style="border-collapse: collapse;">
        <tr>
          <td><strong>Full Name</strong></td>
          <td>${data.fullName}</td>
        </tr>
        <tr>
          <td><strong>Email</strong></td>
          <td>${data.email ?? "Not provided"}</td>
        </tr>
        <tr>
          <td><strong>Phone Number</strong></td>
          <td>${data.phone || "Not provided"}</td>
        </tr>
        <tr>
          <td><strong>Service interested in</strong></td>
          <td>${data.service || "Not specified"}</td>
        </tr>
        <tr>
          <td><strong>Message</strong></td>
          <td>${data.message ? data.message.replace(/\n/g, "<br>") : "Not provided"}</td>
        </tr>
      </table>
    `,
  });
}

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as ContactFormData;

    const email = data.email?.trim();
    const phone = data.phone?.trim();
    const fullName = data.fullName?.trim();
    const message = data.message?.trim() ?? "";
    const service = typeof data.service === "string" ? data.service.trim() : "";

    if ((data.service != null && typeof data.service !== "string") ||
        (service && !contactServiceOptions.includes(service))) {
      return NextResponse.json(
        { error: "Please select a valid service." },
        { status: 400 }
      );
    }

    if (!fullName || !phone) {
      return NextResponse.json(
        { error: "Please provide your name and phone number." },
        { status: 400 }
      );
    }

    if (email && !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!isValidPhone(phone)) {
      return NextResponse.json(
        { error: "Please provide a valid phone number." },
        { status: 400 }
      );
    }

    await sendEmail({
      fullName,
      email: email || undefined,
      phone,
      service: service || undefined,
      message,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "There was an error sending your message." },
      { status: 500 }
    );
  }
}
