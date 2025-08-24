import { NextResponse, NextRequest } from 'next/server';

function sanitize(s: unknown) {
  return String(s ?? '').toString().trim().slice(0, 500);
}
function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(req: NextRequest) {
  try {
    let data: Record<string, any> = {};

    // Try JSON first
    try {
      data = await req.clone().json();
    } catch {
      // Fallback to FormData
      const fd = await req.clone().formData();
      data = Object.fromEntries(fd.entries());
    }

    const service = sanitize(data.service);
    const name    = sanitize(data.name);
    const email   = sanitize(data.email);
    const city    = sanitize(data.city);
    const phone   = sanitize(data.phone);

    if (!service) return NextResponse.json({ ok: false, error: 'service required' }, { status: 400 });
    if (!name)    return NextResponse.json({ ok: false, error: 'name required' }, { status: 400 });
    if (!email || !isEmail(email)) return NextResponse.json({ ok: false, error: 'valid email required' }, { status: 400 });
    if (!city)    return NextResponse.json({ ok: false, error: 'city required' }, { status: 400 });

    // Honeypot
    const hp = sanitize(data.company || '');
    if (hp) return NextResponse.json({ ok: true }, { status: 200 });

    const to   = process.env.LEAD_TO_EMAIL!;
    const from = process.env.RESEND_FROM || 'Solovoro <no-reply@solovoro.ca>';

    const rows = Object.entries(data)
      .filter(([k]) => k !== 'company')
      .map(([k, v]) =>
        `<tr><td style="padding:6px 10px;border-bottom:1px solid #eee;"><b>${k}</b></td><td style="padding:6px 10px;border-bottom:1px solid #eee;">${String(v ?? '')}</td></tr>`
      ).join('');

    const html = `
      <div style="font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#111">
        <h2 style="margin:0 0 6px 0;font-size:18px;">New Lead</h2>
        <p style="margin:0 0 14px 0;color:#444;">Service: <b>${service}</b> • City: <b>${city}</b></p>
        <table style="border-collapse:collapse;width:100%;max-width:640px">${rows}</table>
        <p style="margin-top:18px;color:#666">Delivered by Solovoro API · ${new Date().toISOString()}</p>
      </div>
    `;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: email,
        subject: `New Lead: ${service} in ${city}`,
        html,
      }),
    });

    if (!res.ok) {
      const msg = await res.text().catch(() => '');
      return NextResponse.json({ ok: false, error: `resend_error ${res.status}: ${msg}` }, { status: 502 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'server_error' }, { status: 500 });
  }
}

