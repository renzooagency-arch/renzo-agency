import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// This securely grabs your key from the .env.local vault
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    const data = await resend.emails.send({
from: 'Renzo Agency <onboarding@resend.dev>',      to: 'renzooagency@gmail.com', // <--- Your email is locked in here!
      subject: `New Agency Lead: ${name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2 style="color: #0055FF;">New Project Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p style="background: #f4f4f4; padding: 15px; border-radius: 5px;">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Resend Error:", error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}