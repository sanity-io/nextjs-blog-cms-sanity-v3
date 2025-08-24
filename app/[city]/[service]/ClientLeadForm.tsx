'use client';

import { useState } from 'react';

export default function ClientLeadForm({
  city,
  service,
  capCity,
  capService,
}: {
  city: string;
  service: string;
  capCity: string;
  capService: string;
}) {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/lead', { method: 'POST', body: formData });
      if (res.ok) {
        setStatus('success');
        e.currentTarget.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <>
      {status === 'success' && (
        <p style={{ color: 'green' }}>Thanks — your request has been received.</p>
      )}
      {status === 'error' && (
        <p style={{ color: 'red' }}>Error: please try again later.</p>
      )}
      {status === 'idle' && (
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12, maxWidth: 480 }}>
          <input name="name" placeholder="Your name" required />
          <input name="email" type="email" placeholder="Your email" required />
          <p>{capCity}</p>
          <input type="hidden" name="city" value={city.toLowerCase()} />
          <input type="hidden" name="service" value={service.toLowerCase()} />
          <input type="text" name="company" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
          <button type="submit" style={{ padding: '12px 16px', fontWeight: 600 }}>Get Free Quotes</button>
        </form>
      )}
    </>
  );
}
