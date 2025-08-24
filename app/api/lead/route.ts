import { NextResponse, NextRequest } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function sanitize(s: unknown) {
  return String(s ?? '').toString().trim().slice(0, 500);
}

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const service = sanitize((body as any).service);
    const name    = sanitize((body as any).name);
    const email   = sanitize((body as any).email);
    const city    = sanitize((body as any).city);
    const phone   = sanitize((body as any).phone);
    const meta    = { ...body };
    // Basic required fields
    if (!service) return NextResponse.json({ ok: false, error: 'service required' }, { status: 400 });
    if (!name)    return NextResponse.json({ ok: false, error: 'name required' }, { status: 400 });
    if (!email || !isEmail(email)) {
      return NextResponse.json({ ok: false, error: 'valid email required' }, { status: 400 });
    }
    if (!city)    return NextResponse.json({ ok: false, error: 'city required' }, { status: 400 });

    // Simple honeypot/rate hints (optional): reject obvious bots
    const hp = sanitize((body as any).company || ''); // e.g., hidden field “company”
    if (hp) return NextResponse.json({ ok: true }, { status: 200 }); // silently succeed

    const to = process.env.LEAD_TO_EMAIL!;
    const from = process.env.RESEND_FROM || 'Solovoro <no-reply@solovoro.ca>';

    const subject = `New Lead: ${service} in ${city}`;
    const rows = Object.entries(meta)
      .filter(([k]) => !['hp','company'].includes(k))
      .map(([k,v]) => `<tr><td style="padding:6px 10px;border-bottom:1px solid #eee;"><b>${k}</b></td><td style="padding:6px 10px;border-bottom:1px solid #eee;">${String(v ?? '').toString()}</td></tr>`)
      .join('');

    const html = `
      <div style="font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#111">
        <h2 style="margin:0 0 6px 0;font-size:18px;">New Lead</h2>
        <p style="margin:0 0 14px 0;color:#444;">Service: <b>${service}</b> • City: <b>${city}</b></p>
        <table style="border-collapse:collapse;width:100%;max-width:640px">${rows}</table>
        <p style="margin-top:18px;color:#666">Delivered by Solovoro API · ${new Date().toLocaleString()}</p>
      </div>
    `;

    await resend.emails.send({
      from,
      to,
      reply_to: email, // so providers can reply to the client directly
      subject,
      html,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'server_error' }, { status: 500 });
  }
}
