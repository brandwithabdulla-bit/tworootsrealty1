import nodemailer from 'nodemailer';

export function validateLead(data){
  const errors = {};
  if (!data || typeof data !== 'object') return { form: 'Invalid form.' };
  if (typeof data.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'A valid email is required.';
  if (data.variant !== 'newsletter') {
    if (typeof data.name !== 'string' || !data.name.trim()) errors.name = 'Name is required.';
    if (typeof data.phone !== 'string' || !/^\+?[\d\s().-]{7,25}$/.test(data.phone)) errors.phone = 'Valid phone is required.';
  }
  if (data.variant === 'referral') {
    if (typeof data.country !== 'string' || !data.country.trim()) errors.country = 'Country is required.';
    if (typeof data.nationality !== 'string' || !data.nationality.trim()) errors.nationality = 'Nationality is required.';
  }
  if (!data.consent) errors.consent = 'Acknowledgement required.';
  if (Object.values(data).some(v => typeof v === 'string' && v.length > 5000)) errors.form = 'Input too long.';
  return errors;
}

function getVariantLabel(variant) {
  switch (variant) {
    case 'newsletter': return 'Newsletter Subscription';
    case 'brochure': return 'Official Brochure Request';
    case 'callback': return 'Call Back Request';
    case 'investor': return 'Investor Consultation';
    case 'referral': return 'Partnership / Referral';
    case 'career': return 'Career Application';
    case 'sticky': return 'Direct Property Enquiry';
    case 'full': return 'Detailed Property Requirement';
    default: return 'Quick Enquiry';
  }
}

export async function submitLead(data) {
  // If called without data (or in demo mode without credentials), return demo status
  if (!data || process.env.LEADS_MODE === 'demo' || !process.env.SMTP_PASS) {
    return { mode: 'demo', delivered: false, stored: false };
  }

  const host = process.env.SMTP_HOST || 'smtp.hostinger.com';
  const port = Number(process.env.SMTP_PORT) || 465;
  const secure = process.env.SMTP_SECURE !== 'false';
  const user = process.env.SMTP_USER || 'info@tworootsrealty.com';
  const pass = process.env.SMTP_PASS;
  const recipient = process.env.LEAD_RECIPIENT_EMAIL || user;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    connectionTimeout: 10000,
  });

  const variantLabel = getVariantLabel(data.variant);
  const subject = `[Two Roots Lead] ${variantLabel}: ${data.name || data.email}${data.context ? ` (${data.context})` : ''}`;
  
  const rawPhone = data.phone || data.phoneNumber || '';
  const cleanPhone = rawPhone.replace(/[^0-9]/g, '');
  const waUrl = cleanPhone ? `https://wa.me/${cleanPhone}` : '';

  const details = [
    ['Lead Name', data.name],
    ['Phone', rawPhone],
    ['Email', data.email],
    ['Inquiry Category', variantLabel],
    ['Context / Project', data.context],
    ['Selected Requirement', data.requirement],
    ['Preferred Location', data.location],
    ['Budget', data.budget],
    ['Property Type', data.propertyType],
    ['Bedrooms', data.bedrooms],
    ['Preferred Contact Method', data.contactMethod],
    ['Country of Residence', data.country],
    ['Nationality', data.nationality],
    ['Investment Goal', data.goal],
    ['Position of Interest', data.role],
    ['CV / Portfolio Link', data.portfolio],
    ['Message / Notes', data.message],
  ].filter(([, val]) => val && String(val).trim());

  const rowsHtml = details.map(([label, val]) => `
    <tr>
      <td style="padding:10px 14px;border-bottom:1px solid #eee;font-weight:600;color:#333;width:35%;background:#fafafa;">${label}</td>
      <td style="padding:10px 14px;border-bottom:1px solid #eee;color:#111;">${String(val).replace(/\n/g, '<br/>')}</td>
    </tr>
  `).join('');

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"/></head>
    <body style="margin:0;padding:24px;background:#f4f6f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1a1a1a;">
      <div style="max-width:620px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.06);border:1px solid #e5e7eb;">
        
        <!-- Header -->
        <div style="background:#08121e;padding:28px 24px;text-align:center;border-bottom:3px solid #c5a880;">
          <h1 style="margin:0;color:#ffffff;font-size:22px;letter-spacing:1px;font-weight:600;">TWO ROOTS REALTY</h1>
          <p style="margin:6px 0 0;color:#c5a880;font-size:13px;letter-spacing:1.5px;text-transform:uppercase;">New Website Enquiry Received</p>
        </div>

        <!-- Banner -->
        <div style="padding:24px;">
          <div style="background:#f9f7f4;border-left:4px solid #c5a880;padding:14px 18px;border-radius:4px;margin-bottom:20px;">
            <p style="margin:0;font-size:15px;color:#2c2c2c;font-weight:600;">
              ${variantLabel} ${data.context ? `&bull; <span style="color:#08121e;">${data.context}</span>` : ''}
            </p>
            <p style="margin:4px 0 0;font-size:13px;color:#666;">
              Received: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Dubai' })} (Dubai Time)
            </p>
          </div>

          <!-- Quick Action Buttons -->
          <div style="margin:20px 0;display:flex;gap:10px;flex-wrap:wrap;">
            ${waUrl ? `
              <a href="${waUrl}" style="background:#25D366;color:#ffffff;text-decoration:none;padding:10px 18px;border-radius:6px;font-size:13px;font-weight:600;display:inline-block;margin-right:8px;margin-bottom:8px;">
                💬 Message on WhatsApp
              </a>
            ` : ''}
            ${rawPhone ? `
              <a href="tel:${rawPhone}" style="background:#08121e;color:#ffffff;text-decoration:none;padding:10px 18px;border-radius:6px;font-size:13px;font-weight:600;display:inline-block;margin-right:8px;margin-bottom:8px;">
                📞 Call ${rawPhone}
              </a>
            ` : ''}
            ${data.email ? `
              <a href="mailto:${data.email}?subject=Two%20Roots%20Realty%20-%20Following%20up%20on%20your%20enquiry" style="background:#4b5563;color:#ffffff;text-decoration:none;padding:10px 18px;border-radius:6px;font-size:13px;font-weight:600;display:inline-block;margin-bottom:8px;">
                ✉️ Reply via Email
              </a>
            ` : ''}
          </div>

          <!-- Lead Details Table -->
          <h3 style="font-size:15px;color:#08121e;margin:24px 0 12px;border-bottom:1px solid #e5e7eb;padding-bottom:6px;">Enquiry Details</h3>
          <table style="width:100%;border-collapse:collapse;font-size:14px;background:#ffffff;border:1px solid #eee;border-radius:6px;overflow:hidden;">
            ${rowsHtml}
          </table>

        </div>

        <!-- Footer -->
        <div style="background:#fafafa;padding:18px 24px;text-align:center;font-size:12px;color:#888;border-top:1px solid #eaeaea;">
          <p style="margin:0;">Two Roots Realty LLC &bull; Port Saeed, Deira, Dubai, UAE</p>
          <p style="margin:4px 0 0;">This notification was generated automatically from the website contact system.</p>
        </div>

      </div>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: `"Two Roots Realty Website" <${user}>`,
      to: recipient,
      replyTo: data.email || user,
      subject,
      html: htmlContent,
      text: details.map(([k, v]) => `${k}: ${v}`).join('\n'),
    });

    // Send auto-acknowledgement email to the visitor if applicable (non-blocking)
    if (data.email && data.variant !== 'newsletter') {
      try {
        await transporter.sendMail({
          from: `"Two Roots Realty" <${user}>`,
          to: data.email,
          subject: `Thank you for contacting Two Roots Realty`,
          html: `
            <div style="max-width:560px;margin:0 auto;font-family:sans-serif;color:#222;line-height:1.6;padding:20px;">
              <h2 style="color:#08121e;margin-top:0;">Thank you for getting in touch.</h2>
              <p>Dear ${data.name || 'Valued Client'},</p>
              <p>We have received your enquiry${data.context ? ` regarding <strong>${data.context}</strong>` : ''}. Our senior advisory desk is reviewing your request and will connect with you shortly.</p>
              <p>If you require immediate assistance or prefer to connect directly, you can reach our team anytime on WhatsApp:</p>
              <p><a href="https://wa.me/971585830569" style="background:#08121e;color:#c5a880;padding:10px 18px;text-decoration:none;border-radius:6px;display:inline-block;font-weight:600;">Chat on WhatsApp (+971 58 583 0569)</a></p>
              <br/>
              <p style="font-size:13px;color:#666;border-top:1px solid #eee;padding-top:12px;">
                Two Roots Realty LLC<br/>
                Office 707, City Avenue Building, Port Saeed, Deira, Dubai, UAE<br/>
                <a href="https://www.tworootsrealty.com" style="color:#08121e;">www.tworootsrealty.com</a>
              </p>
            </div>
          `,
        });
      } catch (autoErr) {
        console.warn('Auto-acknowledgement email could not be sent:', autoErr.message);
      }
    }

    return { mode: 'live', delivered: true, stored: true };
  } catch (err) {
    console.error('Failed to dispatch lead email via SMTP:', err.message);
    throw new Error('Unable to dispatch email. Please check SMTP credentials or try again later.');
  }
}
