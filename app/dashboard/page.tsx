"use client";
import { useState } from "react";

const ORDERS = [
  { id:"#N1042", customer:"Ahmed Al Mansoori", product:"Nike Air Max 270", status:"Shipped", amount:"$189", date:"May 20" },
  { id:"#N1041", customer:"Sara Khan", product:"Levi's 501 Jeans", status:"Delivered", amount:"$94", date:"May 19" },
  { id:"#N1040", customer:"Riya Nair", product:"Apple Watch SE", status:"Processing", amount:"$329", date:"May 19" },
  { id:"#N1039", customer:"Omar Farooq", product:"Ray-Ban Aviators", status:"Shipped", amount:"$156", date:"May 18" },
  { id:"#N1038", customer:"Meera Pillai", product:"Zara Trench Coat", status:"Delivered", amount:"$211", date:"May 17" },
];

const CUSTOMERS = [
  { name:"Ahmed Al Mansoori", phone:"+971 55 123 4567", orders:7, spent:"$1,240", status:"VIP" },
  { name:"Sara Khan", phone:"+92 300 987 6543", orders:4, spent:"$540", status:"Active" },
  { name:"Riya Nair", phone:"+91 98765 43210", orders:2, spent:"$329", status:"New" },
  { name:"Omar Farooq", phone:"+971 50 456 7890", orders:11, spent:"$2,890", status:"VIP" },
];

const MESSAGES = [
  { from:"customer", name:"Ahmed", text:"Hi, I want to order Nike Air Max 270 size 42", time:"10:02 AM" },
  { from:"bot", text:"✅ Order received! Your order #N1042 has been placed.", time:"10:02 AM" },
  { from:"customer", name:"Sara", text:"What is the status of my order?", time:"10:15 AM" },
  { from:"bot", text:"📦 Your order #N1041 has been delivered! Thank you.", time:"10:15 AM" },
  { from:"customer", name:"Omar", text:"Can I get tracking for #N1039?", time:"11:30 AM" },
  { from:"bot", text:"🚚 Tracking #TCS-88291 — your order is on the way! Expected: May 21.", time:"11:30 AM" },
];

function StatusBadge({ status }: { status: string }) {
  const colors = {
    Shipped:    { bg:"#eff6ff", color:"#1e3a8a" },
    Delivered:  { bg:"#f0fdf4", color:"#14532d" },
    Processing: { bg:"#fffbeb", color:"#92400e" },
    VIP:        { bg:"#f5f3ff", color:"#4c1d95" },
    Active:     { bg:"#f0fdf4", color:"#14532d" },
    New:        { bg:"#eff6ff", color:"#1e3a8a" },
  };
  const s = colors[status] || { bg:"#f3f4f6", color:"#374151" };
  return (
    <span style={{background:s.bg, color:s.color, padding:"3px 10px", borderRadius:"20px", fontSize:"12px", fontWeight:"600"}}>
      {status}
    </span>
  );
}

function Avatar({ letter, size = 36 }) {
  return (
    <div style={{width:size, height:size, borderRadius:"50%", background:"#eff6ff", color:"#2563eb", fontWeight:"700", fontSize:size*0.38, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0}}>
      {letter}
    </div>
  );
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id:"overview",  label:"Overview",  icon:"▦" },
    { id:"orders",    label:"Orders",    icon:"📦" },
    { id:"crm",       label:"CRM",       icon:"👥" },
    { id:"whatsapp",  label:"WhatsApp",  icon:"💬" },
    { id:"analytics", label:"Analytics", icon:"📈" },
  ];

  const stats = [
    { label:"Total Orders", value:"1,042", change:"+12%", bg:"#eff6ff", color:"#1e3a8a", icon:"📦" },
    { label:"Revenue",      value:"$48,290", change:"+8%", bg:"#f0fdf4", color:"#14532d", icon:"💰" },
    { label:"Customers",    value:"394",   change:"+22%", bg:"#f5f3ff", color:"#4c1d95", icon:"👥" },
    { label:"Delivered",    value:"987",   change:"+5%",  bg:"#fffbeb", color:"#92400e", icon:"✅" },
  ];

  return (
    <div style={{display:"flex", minHeight:"100vh", background:"#f4f6f9", fontFamily:"Arial, sans-serif"}}>

      {/* SIDEBAR */}
      <div style={{width:"220px", background:"#fff", borderRight:"1px solid #e8eaf0", display:"flex", flexDirection:"column", padding:"0 0 24px", flexShrink:0}}>
        <div style={{padding:"20px 20px 16px", borderBottom:"1px solid #e8eaf0"}}>
          <div style={{fontSize:"18px", fontWeight:"700", color:"#0f1117"}}>NEXA<span style={{color:"#2563eb"}}>11</span> AI</div>
          <div style={{marginTop:"12px", background:"#f4f6f9", borderRadius:"10px", padding:"10px 12px"}}>
            <div style={{fontSize:"11px", color:"#9ca3af", marginBottom:"2px"}}>Active Store</div>
            <div style={{fontSize:"13px", fontWeight:"700", color:"#0f1117"}}>My Store</div>
            <div style={{display:"inline-block", marginTop:"4px", background:"#eff6ff", color:"#1e3a8a", fontSize:"10px", fontWeight:"700", padding:"2px 8px", borderRadius:"10px"}}>Smart Plan</div>
          </div>
        </div>

        <nav style={{padding:"16px 12px", flex:1}}>
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              style={{width:"100%", textAlign:"left", padding:"10px 12px", borderRadius:"10px", border:"none", cursor:"pointer", background: activeTab === tab.id ? "#eff6ff" : "transparent", color: activeTab === tab.id ? "#2563eb" : "#6b7280", fontSize:"14px", fontWeight: activeTab === tab.id ? "700" : "500", display:"flex", alignItems:"center", gap:"10px", marginBottom:"2px"}}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </nav>

        <div style={{padding:"0 12px"}}>
          <div style={{background:"#eff6ff", borderRadius:"12px", padding:"14px"}}>
            <div style={{fontSize:"12px", fontWeight:"700", color:"#2563eb", marginBottom:"4px"}}>🤖 AI Automation</div>
            <div style={{fontSize:"11px", color:"#6b7280", lineHeight:"1.5"}}>All workflows running. 47 messages sent today.</div>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div style={{flex:1, padding:"28px", overflowY:"auto"}}>

        {/* TOP BAR */}
        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"28px"}}>
          <div>
            <h1 style={{fontSize:"22px", fontWeight:"800", color:"#0f1117", marginBottom:"2px"}}>
              {tabs.find((t) => t.id === activeTab)?.label}
            </h1>
            <p style={{fontSize:"13px", color:"#9ca3af"}}>Wednesday, May 20, 2026</p>
          </div>
          <div style={{display:"flex", gap:"10px", alignItems:"center"}}>
            <div style={{background:"#fff", border:"1px solid #e8eaf0", borderRadius:"10px", padding:"8px 16px", fontSize:"13px", color:"#374151"}}>🔔 3 new orders</div>
            <div style={{width:"38px", height:"38px", borderRadius:"50%", background:"#eff6ff", color:"#2563eb", fontWeight:"700", display:"flex", alignItems:"center", justifyContent:"center"}}>M</div>
          </div>
        </div>

        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div>
            <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(180px, 1fr))", gap:"16px", marginBottom:"24px"}}>
              {stats.map((s) => (
                <div key={s.label} style={{background:"#fff", borderRadius:"16px", padding:"20px", boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>
                  <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"12px"}}>
                    <span style={{fontSize:"22px"}}>{s.icon}</span>
                    <span style={{background:s.bg, color:s.color, fontSize:"12px", fontWeight:"700", padding:"3px 8px", borderRadius:"8px"}}>{s.change}</span>
                  </div>
                  <div style={{fontSize:"26px", fontWeight:"800", color:"#0f1117"}}>{s.value}</div>
                  <div style={{fontSize:"13px", color:"#6b7280", marginTop:"2px"}}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{background:"#fff", borderRadius:"16px", padding:"24px", boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>
              <div style={{fontSize:"15px", fontWeight:"700", color:"#0f1117", marginBottom:"16px"}}>Recent Orders</div>
              {ORDERS.slice(0,4).map((o) => (
                <div key={o.id} style={{display:"flex", alignItems:"center", gap:"12px", marginBottom:"14px"}}>
                  <Avatar letter={o.customer[0]} size={32} />
                  <div style={{flex:1}}>
                    <div style={{fontSize:"13px", fontWeight:"600", color:"#0f1117"}}>{o.customer}</div>
                    <div style={{fontSize:"12px", color:"#9ca3af"}}>{o.id} • {o.product}</div>
                  </div>
                  <div style={{fontSize:"13px", fontWeight:"700", color:"#0f1117"}}>{o.amount}</div>
                  <StatusBadge status={o.status} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ORDERS */}
        {activeTab === "orders" && (
          <div style={{background:"#fff", borderRadius:"16px", boxShadow:"0 2px 8px rgba(0,0,0,0.05)", overflow:"hidden"}}>
            <div style={{padding:"20px 24px", borderBottom:"1px solid #f3f4f6", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
              <div style={{fontSize:"15px", fontWeight:"700", color:"#0f1117"}}>All Orders</div>
              <button style={{background:"#eff6ff", color:"#2563eb", border:"none", borderRadius:"10px", padding:"8px 16px", fontSize:"13px", fontWeight:"700", cursor:"pointer"}}>+ New Order</button>
            </div>
            <table style={{width:"100%", borderCollapse:"collapse"}}>
              <thead>
                <tr style={{background:"#f9fafb"}}>
                  {["Order ID","Customer","Product","Amount","Status","Date"].map((h) => (
                    <th key={h} style={{padding:"12px 20px", textAlign:"left", fontSize:"12px", fontWeight:"700", color:"#6b7280"}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ORDERS.map((o) => (
                  <tr key={o.id} style={{borderTop:"1px solid #f3f4f6"}}>
                    <td style={{padding:"14px 20px", fontSize:"13px", fontWeight:"700", color:"#2563eb"}}>{o.id}</td>
                    <td style={{padding:"14px 20px"}}>
                      <div style={{display:"flex", alignItems:"center", gap:"8px"}}>
                        <Avatar letter={o.customer[0]} size={28} />
                        <span style={{fontSize:"13px", color:"#0f1117"}}>{o.customer}</span>
                      </div>
                    </td>
                    <td style={{padding:"14px 20px", fontSize:"13px", color:"#374151"}}>{o.product}</td>
                    <td style={{padding:"14px 20px", fontSize:"13px", fontWeight:"700", color:"#0f1117"}}>{o.amount}</td>
                    <td style={{padding:"14px 20px"}}><StatusBadge status={o.status} /></td>
                    <td style={{padding:"14px 20px", fontSize:"13px", color:"#9ca3af"}}>{o.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* CRM */}
        {activeTab === "crm" && (
          <div style={{background:"#fff", borderRadius:"16px", boxShadow:"0 2px 8px rgba(0,0,0,0.05)", overflow:"hidden"}}>
            <div style={{padding:"20px 24px", borderBottom:"1px solid #f3f4f6"}}>
              <div style={{fontSize:"15px", fontWeight:"700", color:"#0f1117"}}>Customer Database</div>
            </div>
            {CUSTOMERS.map((c) => (
              <div key={c.name} style={{padding:"18px 24px", borderTop:"1px solid #f3f4f6", display:"flex", alignItems:"center", gap:"16px"}}>
                <Avatar letter={c.name[0]} size={44} />
                <div style={{flex:1}}>
                  <div style={{fontSize:"14px", fontWeight:"700", color:"#0f1117"}}>{c.name}</div>
                  <div style={{fontSize:"13px", color:"#9ca3af"}}>{c.phone}</div>
                </div>
                <div style={{textAlign:"center", minWidth:"50px"}}>
                  <div style={{fontSize:"16px", fontWeight:"800", color:"#0f1117"}}>{c.orders}</div>
                  <div style={{fontSize:"11px", color:"#9ca3af"}}>Orders</div>
                </div>
                <div style={{textAlign:"center", minWidth:"70px"}}>
                  <div style={{fontSize:"16px", fontWeight:"800", color:"#0f1117"}}>{c.spent}</div>
                  <div style={{fontSize:"11px", color:"#9ca3af"}}>Spent</div>
                </div>
                <StatusBadge status={c.status} />
              </div>
            ))}
          </div>
        )}

        {/* WHATSAPP */}
        {activeTab === "whatsapp" && (
          <div style={{background:"#fff", borderRadius:"16px", boxShadow:"0 2px 8px rgba(0,0,0,0.05)", overflow:"hidden"}}>
            <div style={{padding:"20px 24px", borderBottom:"1px solid #f3f4f6", display:"flex", alignItems:"center", gap:"8px"}}>
              <span style={{width:"8px", height:"8px", borderRadius:"50%", background:"#16a34a", display:"inline-block"}}></span>
              <span style={{fontSize:"15px", fontWeight:"700", color:"#0f1117"}}>WhatsApp Live Feed</span>
              <span style={{marginLeft:"auto", fontSize:"12px", color:"#9ca3af"}}>Auto-responding enabled</span>
            </div>
            <div style={{padding:"24px", display:"flex", flexDirection:"column", gap:"16px"}}>
              {MESSAGES.map((msg, i) => (
                <div key={i} style={{display:"flex", gap:"10px", flexDirection: msg.from === "bot" ? "row-reverse" : "row"}}>
                  {msg.from === "customer"
                    ? <Avatar letter={msg.name[0]} size={34} />
                    : <div style={{width:"34px", height:"34px", borderRadius:"50%", background:"#f0fdf4", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"16px", flexShrink:0}}>🤖</div>
                  }
                  <div style={{maxWidth:"65%"}}>
                    {msg.from === "customer" && <div style={{fontSize:"11px", color:"#9ca3af", marginBottom:"3px"}}>{msg.name}</div>}
                    <div style={{background: msg.from === "bot" ? "#eff6ff" : "#f3f4f6", padding:"10px 14px", borderRadius:"12px", fontSize:"13px", color:"#0f1117", lineHeight:"1.5"}}>
                      {msg.text}
                    </div>
                    <div style={{fontSize:"11px", color:"#9ca3af", marginTop:"3px", textAlign: msg.from === "bot" ? "right" : "left"}}>{msg.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ANALYTICS */}
        {activeTab === "analytics" && (
          <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))", gap:"16px"}}>
            {[
              { label:"Order Volume", value:"1,042", change:"+12% this month", bg:"#eff6ff", color:"#1e3a8a" },
              { label:"Total Revenue", value:"$48,290", change:"+8% this month", bg:"#f0fdf4", color:"#14532d" },
              { label:"WhatsApp Messages", value:"2,847", change:"+31% this month", bg:"#f5f3ff", color:"#4c1d95" },
              { label:"Delivery Rate", value:"94.7%", change:"+2% this month", bg:"#fffbeb", color:"#92400e" },
            ].map((a) => (
              <div key={a.label} style={{background:"#fff", borderRadius:"16px", padding:"24px", boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>
                <div style={{fontSize:"13px", color:"#6b7280", marginBottom:"8px"}}>{a.label}</div>
                <div style={{fontSize:"32px", fontWeight:"800", color:"#0f1117", marginBottom:"8px"}}>{a.value}</div>
                <div style={{display:"inline-block", background:a.bg, color:a.color, fontSize:"12px", fontWeight:"600", padding:"4px 10px", borderRadius:"8px"}}>{a.change}</div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}