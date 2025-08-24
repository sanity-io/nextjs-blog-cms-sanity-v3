export default function Home() {
  return (
    <main style={{maxWidth:960, margin:"72px auto", padding:"0 20px"}}>
      <h1 style={{fontWeight:700, letterSpacing:"-0.02em", fontSize:48, marginBottom:12}}>Solovoro</h1>
      <p style={{maxWidth:560, color:"#444", fontSize:18, lineHeight:1.6}}>
        Get trusted quotes from top local services — fast.
      </p>

      <div style={{height:12}} />

      {/* Temporary form (swap to /api later) */}
      <form action="https://formspree.io/f/XXXXXXX" method="POST" style={{display:"grid", gap:12, maxWidth:480}}>
        <input name="name" placeholder="Your name" required />
        <input name="email" type="email" placeholder="Your email" required />
        <input name="city" placeholder="City" required />
        <select name="service" required defaultValue="">
          <option value="">Select a service</option>
          <option>Moving</option>
          <option>Plumbing</option>
          <option>Cleaning</option>
          <option>Roofing</option>
        </select>
        <button type="submit" style={{padding:"12px 16px", fontWeight:600}}>Get Free Quotes</button>
      </form>
    </main>
  );
}
