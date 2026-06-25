import { Resend } from 'resend';

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  budget: string;
  projectType: string;
  description: string;
}

export async function sendContactEmail(data: ContactFormData): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error('RESEND_API_KEY env variable not set');

  const to = process.env.CONTACT_EMAIL;
  if (!to) throw new Error('CONTACT_EMAIL env variable not set');

  const resend = new Resend(apiKey);

  await resend.emails.send({
    from: 'Velt Contact Form <onboarding@resend.dev>',
    to,
    replyTo: data.email,
    subject: `New project enquiry from ${data.name}${data.company ? ` (${data.company})` : ''}`,
    html: buildEmailHtml(data),
  });
}

function buildEmailHtml(data: ContactFormData): string {
  const companyRow = data.company
    ? `
      <tr>
        <td style="padding: 16px 24px; border-bottom: 1px solid #27272a;">
          <p style="margin: 0 0 4px 0; font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #71717a;">Company</p>
          <p style="margin: 0; font-size: 15px; color: #ffffff;">${escapeHtml(data.company)}</p>
        </td>
      </tr>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Project Enquiry</title>
</head>
<body style="margin: 0; padding: 0; background-color: #09090b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #09090b; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px;">

          <!-- Header -->
          <tr>
            <td style="padding-bottom: 32px; text-align: center;">
              <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #6366f1;">Velt</p>
              <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #ffffff; line-height: 1.3;">New Project Enquiry</h1>
              <p style="margin: 8px 0 0 0; font-size: 14px; color: #71717a;">Submitted via the contact form</p>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background-color: #18181b; border: 1px solid #27272a; border-radius: 12px; overflow: hidden;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">

                <!-- Name -->
                <tr>
                  <td style="padding: 16px 24px; border-bottom: 1px solid #27272a;">
                    <p style="margin: 0 0 4px 0; font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #71717a;">Name</p>
                    <p style="margin: 0; font-size: 15px; color: #ffffff;">${escapeHtml(data.name)}</p>
                  </td>
                </tr>

                <!-- Email -->
                <tr>
                  <td style="padding: 16px 24px; border-bottom: 1px solid #27272a;">
                    <p style="margin: 0 0 4px 0; font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #71717a;">Email</p>
                    <p style="margin: 0; font-size: 15px; color: #6366f1;">
                      <a href="mailto:${escapeHtml(data.email)}" style="color: #6366f1; text-decoration: none;">${escapeHtml(data.email)}</a>
                    </p>
                  </td>
                </tr>

                ${companyRow}

                <!-- Budget -->
                <tr>
                  <td style="padding: 16px 24px; border-bottom: 1px solid #27272a;">
                    <p style="margin: 0 0 4px 0; font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #71717a;">Budget</p>
                    <p style="margin: 0;">
                      <span style="display: inline-block; padding: 3px 10px; background-color: #1e1b4b; border: 1px solid #3730a3; border-radius: 6px; font-size: 13px; font-weight: 600; color: #a5b4fc;">${escapeHtml(data.budget)}</span>
                    </p>
                  </td>
                </tr>

                <!-- Project Type -->
                <tr>
                  <td style="padding: 16px 24px; border-bottom: 1px solid #27272a;">
                    <p style="margin: 0 0 4px 0; font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #71717a;">Project Type</p>
                    <p style="margin: 0;">
                      <span style="display: inline-block; padding: 3px 10px; background-color: #0c0a09; border: 1px solid #27272a; border-radius: 6px; font-size: 13px; font-weight: 600; color: #d4d4d8;">${escapeHtml(data.projectType)}</span>
                    </p>
                  </td>
                </tr>

                <!-- Description -->
                <tr>
                  <td style="padding: 16px 24px;">
                    <p style="margin: 0 0 8px 0; font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #71717a;">Project Description</p>
                    <p style="margin: 0; font-size: 15px; line-height: 1.7; color: #d4d4d8; white-space: pre-wrap;">${escapeHtml(data.description)}</p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top: 24px; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #3f3f46;">Reply directly to this email to respond to ${escapeHtml(data.name)}.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
