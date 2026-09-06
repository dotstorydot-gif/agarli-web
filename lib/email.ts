import { Resend } from 'resend';

type LeadNotificationData = {
  name: string;
  phone: string;
  email: string;
  propertyLocation: string;
  propertyType: string;
  notes?: string;
  createdAt?: string;
};

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function sendLeadNotificationEmail(lead: LeadNotificationData) {
  const recipient = process.env.NOTIFICATION_EMAIL || 'Joe.mounir0@gmail.com';
  const cleanPhone = lead.phone.replace(/[^0-9+]/g, '');
  const waLink = `https://wa.me/${cleanPhone.replace('+', '')}?text=${encodeURIComponent(
    `Hello ${lead.name}, this is Joe from Agarli regarding your consultation request for your property in ${lead.propertyLocation}.`
  )}`;

  const submissionTime = lead.createdAt
    ? new Date(lead.createdAt).toLocaleString('en-EG', { timeZone: 'Africa/Cairo', dateStyle: 'full', timeStyle: 'short' })
    : new Date().toLocaleString('en-EG', { timeZone: 'Africa/Cairo', dateStyle: 'full', timeStyle: 'short' });

  if (!resend) {
    console.warn(
      `[Email Warning] RESEND_API_KEY is not set in environment variables. Lead received for ${lead.name}, but email was not sent to ${recipient}. Add RESEND_API_KEY to your Vercel Environment Variables to enable live email delivery.`
    );
    return { ok: false, error: 'RESEND_API_KEY not configured' };
  }

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F7F5F2; margin: 0; padding: 24px; color: #1B2D45; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #E5E7EB; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
    .header { background: #0B1A30; padding: 28px 32px; color: #ffffff; text-align: center; }
    .badge { display: inline-block; background: rgba(201,169,110,0.25); color: #C9A96E; padding: 4px 12px; border-radius: 999px; font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 8px; }
    .title { margin: 0; font-size: 22px; font-weight: 600; letter-spacing: -0.02em; }
    .body { padding: 32px; }
    .field-card { background: #FAF8F5; border: 1px solid #EAE6DF; border-radius: 12px; padding: 16px 20px; margin-bottom: 14px; }
    .field-label { font-size: 11px; font-weight: 700; color: #6B7280; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px; }
    .field-value { font-size: 16px; font-weight: 600; color: #1B2D45; }
    .cta-group { margin-top: 28px; display: flex; gap: 12px; }
    .btn-wa { display: inline-block; background: #25D366; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 999px; font-weight: 600; font-size: 14px; text-align: center; }
    .btn-mail { display: inline-block; background: #1B2D45; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 999px; font-weight: 600; font-size: 14px; text-align: center; }
    .footer { padding: 20px 32px; background: #FAF8F5; border-top: 1px solid #EAE6DF; font-size: 12px; color: #9CA3AF; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="badge">★ New Website Lead</div>
      <h1 class="title">Consultation Request Received</h1>
    </div>

    <div class="body">
      <div class="field-card">
        <div class="field-label">Full Name</div>
        <div class="field-value">${lead.name}</div>
      </div>

      <div class="field-card">
        <div class="field-label">Phone / WhatsApp</div>
        <div class="field-value">
          <a href="tel:${cleanPhone}" style="color: #1B2D45; text-decoration: none;">${lead.phone}</a>
        </div>
      </div>

      <div class="field-card">
        <div class="field-label">Email Address</div>
        <div class="field-value">
          <a href="mailto:${lead.email}" style="color: #1B2D45; text-decoration: none;">${lead.email}</a>
        </div>
      </div>

      <div class="field-card">
        <div class="field-label">Property Location</div>
        <div class="field-value" style="color: #C9A96E;">📍 ${lead.propertyLocation}</div>
      </div>

      <div class="field-card">
        <div class="field-label">Property Type</div>
        <div class="field-value">🏡 ${lead.propertyType}</div>
      </div>

      ${
        lead.notes
          ? `
      <div class="field-card">
        <div class="field-label">Owner Notes</div>
        <div class="field-value" style="font-size: 14px; font-weight: 400; line-height: 1.5;">${lead.notes}</div>
      </div>`
          : ''
      }

      <div style="margin-top: 24px; text-align: center;">
        <a href="${waLink}" class="btn-wa" target="_blank" style="margin-right: 8px;">
          💬 Chat on WhatsApp
        </a>
        <a href="mailto:${lead.email}" class="btn-mail">
          ✉️ Reply via Email
        </a>
      </div>
    </div>

    <div class="footer">
      Submitted on ${submissionTime} via <strong>agarli.com</strong><br/>
      Notification dispatched to ${recipient}
    </div>
  </div>
</body>
</html>
  `;

  try {
    const data = await resend.emails.send({
      from: 'Agarli Website <onboarding@resend.dev>',
      to: [recipient],
      replyTo: lead.email,
      subject: `[New Lead] ${lead.name} - ${lead.propertyLocation} (${lead.propertyType})`,
      html: htmlContent,
    });
    return { ok: true, data };
  } catch (error: any) {
    console.error('[Email Dispatch Error]:', error);
    return { ok: false, error: error?.message || 'Unknown error sending email' };
  }
}
