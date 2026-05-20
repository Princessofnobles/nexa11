"use client";
import { useState } from "react";

interface Plan {
  id: string;
  name: string;
  price: string;
  emoji: string;
  hex: string;
  bg: string;
  tc: string;
  limit: string;
  popular: boolean;
  features: string[];
}

const PLANS: Plan[] = [
  {
    id: "basic", name: "Basic", price: "$49", emoji: "💬",
    hex: "#16a34a", bg: "#f0fdf4", tc: "#14532d", limit: "1,500 orders/mo", popular: false,
    features: ["WhatsApp integration","Internal CRM dashboard","Auto order capture","Auto order received message","Manual tracking entry","Admin panel"],
  },
  {
    id: "smart", name: "Smart", price: "$99", emoji: "⚡",
    hex: "#2563eb", bg: "#eff6ff", tc: "#1e3a8a", limit: "10,000 orders/mo", popular: true,
    features: ["Everything in Basic","Shopify webhooks","Auto order sync","TCS / Leopards courier API","Auto tracking messages","Follow-up automation"],
  },
  {
    id: "business", name: "Business", price: "$199", emoji: "🏪",
    hex: "#d97706", bg: "#fffbeb", tc: "#92400e", limit: "50,000 orders/mo", popular: false,
    features: ["Everything in Smart","POS system","Inventory management","Multi-store support","Low stock alerts","AI pricing insights"],
  },
  {
    id: "aios", name: "AI OS", price: "$399", emoji: "🤖",
    hex: "#7c3aed", bg: "#f5f3ff", tc: "#4c1d95", limit: "Unlimited", popular: false,
    features: ["Everything in Business","Voice AI verification","White-label dashboards","Full automation workflows","Advanced analytics","Plugin marketplace"],
  },
];

export default function Home() {
  const [modal, setModal] = useState<Plan | null>(null);
  const [storeName, setStoreName] = useState("");
  const [payment, setPayment] = useState("");
  const [step, setStep] = useState(1);

  function openModal(plan: Plan) {
    setModal(plan);
    setStep(1);
    setStoreName("");
    setPayment("");
  }

  function handleContinue() {
    if (!storeName || !payment) return;
    setStep(2);
    setTimeout(() => {
      window.location.href = "/dashboard?store=" + encodeURIComponent(storeName);
    }, 1500);
  }

  return (
    <div style={{minHeight:"100vh", background:"#f4f6f9", fontFamily:"Arial, sans-serif"}}>

      <nav style={{background:"#fff", borderBottom:"1px solid #e8eaf0", padding:"0 32px", height:"60px", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
        <div style={{fontSize:"20px", fontWeight:"700", color:"#0f1117"}}>
          NEXA<span style={{color:"#000000"}}>11</span> AI
        </div>
        <div style={{display:"flex", gap:"8px"}}>
          <button style={{padding:"8px 16px", border:"1px solid #e8eaf0", borderRadius:"8px", background:"#fff", cursor:"pointer", color:"#0f1117"}}>Log in</button>
          <button style={{padding:"8px 16px", border:"none", borderRadius:"8px", background:"#2563eb", color:"#fff", cursor:"pointer", fontWeight:"600"}}>Free Trial</button>
        </div>
      </nav>

      <div style={{textAlign:"center", padding:"64px 24px 48px", maxWidth:"640px", margin:"0 auto"}}>
        <h1 style={{fontSize:"44px", fontWeight:"800", lineHeight:"1.1", marginBottom:"16px", color:"#0f1117"}}>
          Commerce Automation <span style={{color:"#2563eb"}}>Operating System</span>
        </h1>
        <p style={{fontSize:"18px", color:"#374151", marginBottom:"32px"}}>
          Connect WhatsApp, Shopify, and your courier in one dashboard.
        </p>
        <button
          onClick={() => document.getElementById("pricing")!.scrollIntoView({behavior:"smooth"})}
          style={{padding:"14px 28px", background:"#2563eb", color:"#fff", border:"none", borderRadius:"12px", fontSize:"15px", fontWeight:"700", cursor:"pointer"}}>
          View Plans
        </button>
      </div>

      <div id="pricing" style={{padding:"48px 24px", maxWidth:"1100px", margin:"0 auto"}}>
        <h2 style={{textAlign:"center", fontSize:"32px", fontWeight:"800", marginBottom:"8px", color:"#0f1117"}}>
          Choose your plan
        </h2>
        <p style={{textAlign:"center", color:"#374151", marginBottom:"40px"}}>
          Start small, scale big. Upgrade anytime.
        </p>
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))", gap:"20px"}}>
          {PLANS.map((plan) => (
            <div key={plan.id} style={{background:"#fff", borderRadius:"20px", border: plan.popular ? "2px solid "+plan.hex : "1px solid #e8eaf0", padding:"24px", display:"flex", flexDirection:"column", position:"relative", boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>
              {plan.popular && (
                <div style={{position:"absolute", top:"-12px", left:"50%", transform:"translateX(-50%)", background:plan.hex, color:"#fff", padding:"3px 14px", borderRadius:"20px", fontSize:"11px", fontWeight:"700", whiteSpace:"nowrap"}}>
                  MOST POPULAR
                </div>
              )}
              <div style={{fontSize:"24px", marginBottom:"12px"}}>{plan.emoji}</div>
              <div style={{fontSize:"20px", fontWeight:"700", marginBottom:"4px", color:"#0f1117"}}>{plan.name}</div>
              <div style={{fontSize:"12px", color:plan.hex, fontWeight:"600", marginBottom:"12px"}}>{plan.limit}</div>
              <div style={{fontSize:"32px", fontWeight:"800", marginBottom:"20px", color:"#0f1117"}}>
                {plan.price}<span style={{fontSize:"14px", color:"#6b7280"}}>/mo</span>
              </div>
              <ul style={{listStyle:"none", padding:"0", marginBottom:"24px", flex:"1"}}>
                {plan.features.map((f) => (
                  <li key={f} style={{fontSize:"13px", color:"#374151", marginBottom:"8px", display:"flex", gap:"8px"}}>
                    <span style={{color:plan.hex}}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => openModal(plan)}
                style={{width:"100%", padding:"12px", background: plan.popular ? plan.hex : plan.bg, color: plan.popular ? "#fff" : plan.tc, border:"none", borderRadius:"10px", fontSize:"14px", fontWeight:"700", cursor:"pointer"}}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>

      {modal && (
        <div style={{position:"fixed", inset:"0", background:"rgba(0,0,0,0.5)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000}}>
          <div style={{background:"#fff", borderRadius:"20px", padding:"36px", width:"100%", maxWidth:"420px", position:"relative", boxShadow:"0 24px 64px rgba(0,0,0,0.15)"}}>
            <button onClick={() => setModal(null)} style={{position:"absolute", top:"14px", right:"14px", background:"#f3f4f6", border:"none", borderRadius:"8px", width:"30px", height:"30px", cursor:"pointer", fontSize:"14px"}}>✕</button>
            {step === 1 ? (
              <div>
                <div style={{background:modal.bg, color:modal.tc, display:"inline-block", padding:"4px 12px", borderRadius:"20px", fontSize:"12px", fontWeight:"600", marginBottom:"16px"}}>
                  {modal.name} Plan — {modal.price}/mo
                </div>
                <h2 style={{fontSize:"22px", fontWeight:"800", marginBottom:"4px", color:"#0f1117"}}>Set up your store</h2>
                <p style={{fontSize:"13px", color:"#6b7280", marginBottom:"24px"}}>Takes less than 60 seconds.</p>
                <div style={{marginBottom:"16px"}}>
                  <div style={{fontSize:"13px", fontWeight:"600", marginBottom:"6px", color:"#0f1117"}}>Store Name</div>
                  <input
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    placeholder="e.g. Ahmed Fashion Store"
                    style={{width:"100%", padding:"11px 14px", border:"1.5px solid #e8eaf0", borderRadius:"10px", fontSize:"14px", outline:"none", boxSizing:"border-box", color:"#0f1117"}}
                  />
                </div>
                <div style={{marginBottom:"24px"}}>
                  <div style={{fontSize:"13px", fontWeight:"600", marginBottom:"6px", color:"#0f1117"}}>Payment Method</div>
                  <select
                    value={payment}
                    onChange={(e) => setPayment(e.target.value)}
                    style={{width:"100%", padding:"11px 14px", border:"1.5px solid #e8eaf0", borderRadius:"10px", fontSize:"14px", background:"#fff", boxSizing:"border-box", color:"#0f1117"}}>
                    <option value="">Select payment method</option>
                    <option value="stripe">Credit / Debit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="manual">Bank Transfer</option>
                  </select>
                </div>
                <button
                  onClick={handleContinue}
                  disabled={!storeName || !payment}
                  style={{width:"100%", padding:"13px", background: storeName && payment ? modal.hex : "#e5e7eb", color: storeName && payment ? "#fff" : "#9ca3af", border:"none", borderRadius:"10px", fontSize:"14px", fontWeight:"700", cursor: storeName && payment ? "pointer" : "not-allowed"}}>
                  Continue
                </button>
              </div>
            ) : (
              <div style={{textAlign:"center", padding:"20px 0"}}>
                <div style={{fontSize:"48px", marginBottom:"16px"}}>✅</div>
                <h2 style={{fontSize:"20px", fontWeight:"800", marginBottom:"8px", color:"#0f1117"}}>Activating your store</h2>
                <p style={{fontSize:"13px", color:"#6b7280"}}>Setting up {storeName} on the {modal.name} plan.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}