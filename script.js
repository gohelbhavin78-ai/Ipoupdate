/* ==========================================================
   CONFIGURABLE DATA - EDIT YOUR DETAILS AND IPO INFO HERE
   ========================================================== */

// 1. Fixed Business & Branding Configuration
const BUSINESS_CONFIG = {
  brandName: "BHAVINKUMAR GOHEL",
  brandTagline: "AMFI-registered Mutual Fund Distributor - 326820",
  contactName: "Bhavinkumar Gohel",
  phone: "+91 97120 87970",
  phoneRaw: "919712087970",
  email: "bvgohel.bhavin@gmail.com",
  address: "E-27, Maitri Lake View, Zundal, Gandhinagar",
  disclaimer: "Disclaimer: Equity and IPO investments are subject to market risks. Read all scheme-related documents carefully before investing. Information provided here is for informational and educational purposes only and does not constitute financial advice."
};

// 2. Fixed Services Offered
const SERVICES = [
  { title: "Stock Broking", icon: "fa-chart-pie" },
  { title: "IPO Update", icon: "fa-rocket" },
  { title: "Mutual Funds", icon: "fa-piggy-bank" },
  { title: "Loans & Finance", icon: "fa-hand-holding-dollar" },
  { title: "Insurance Solutions", icon: "fa-shield-halved" },
  { title: "Portfolio Management", icon: "fa-briefcase" }
];

// Default IPO data if nothing is saved in browser storage yet
const DEFAULT_IPO = {
  name: "Caliber Mining & Logistics Limited",
  category: "Mainboard IPO",
  description: "Comprehensive mining operations and integrated logistics solution provider expanding infrastructure and fleet capability.",
  details: [
    { label: "Bidding Dates", value: "Jul 28 - Jul 30, 2026" },
    { label: "Price Band", value: "₹140 - ₹147 / share" },
    { label: "Issue Size", value: "₹450.00 Cr" },
    { label: "Lot Size", value: "100 Shares (₹14,700)" },
    { label: "Listing On", value: "BSE & NSE" },
    { label: "Expected Listing", value: "Aug 04, 2026" },
    { label: "Retail Quota", value: "35%" },
    { label: "Est. Listing Gain", value: "+28% to +35%", isHighlight: true }
  ]
};

/* ==========================================================
   APPLICATION LOGIC - DO NOT MODIFY BELOW UNLESS NEEDED
   ========================================================== */

// Check for local saved entries, or use DEFAULT_IPO
function getActiveIpoData() {
  const saved = localStorage.getItem("CUSTOM_IPO_DATA");
  return saved ? JSON.parse(saved) : DEFAULT_IPO;
}

/* ==========================================================
   PAGE RENDER LOGIC
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Only run render logic if index.html layout elements exist
  if (document.getElementById("brandName")) {
    renderBranding();
    renderServices();
    renderIpoDetails();
    setupActionButtons();
  }
});

function renderBranding() {
  const currentIpo = getActiveIpoData();
  
  document.getElementById("brandName").innerText = BUSINESS_CONFIG.brandName;
  document.getElementById("brandTagline").innerText = BUSINESS_CONFIG.brandTagline;
  document.getElementById("contactName").innerText = BUSINESS_CONFIG.contactName;
  document.getElementById("contactPhone").innerText = BUSINESS_CONFIG.phone;
  document.getElementById("contactEmail").innerText = BUSINESS_CONFIG.email;
  document.getElementById("contactAddress").innerText = BUSINESS_CONFIG.address;
  document.getElementById("disclaimerText").innerText = BUSINESS_CONFIG.disclaimer;
  
  const currentYear = new Date().getFullYear();
  document.getElementById("copyrightText").innerText = `© ${currentYear} ${BUSINESS_CONFIG.brandName}. All Rights Reserved.`;

  // Free Demat CTA link
  const ctaMsg = encodeURIComponent(`Hello ${BUSINESS_CONFIG.contactName}, I would like to open a free Demat account for ${currentIpo.name}. Please guide me.`);
  document.getElementById("ctaBtn").href = `https://wa.me/${BUSINESS_CONFIG.phoneRaw}?text=${ctaMsg}`;
}

function renderServices() {
  const container = document.getElementById("servicesGrid");
  container.innerHTML = SERVICES.map(s => `
    <div class="service-card">
      <i class="fa-solid ${s.icon}"></i>
      <h4>${s.title}</h4>
    </div>
  `).join("");
}

function renderIpoDetails() {
  const ipo = getActiveIpoData();

  document.getElementById("ipoName").innerText = ipo.name;
  document.getElementById("ipoCategory").innerText = ipo.category;
  document.getElementById("ipoDescription").innerText = ipo.description;

  const gridContainer = document.getElementById("ipoDetailsGrid");
  gridContainer.innerHTML = ipo.details.map(d => `
    <div class="detail-card">
      <div class="detail-label">${d.label}</div>
      <div class="detail-value ${d.isHighlight ? 'highlight-val' : ''}">${d.value}</div>
    </div>
  `).join("");

  const listContainer = document.getElementById("highlightsList");
  listContainer.innerHTML = (ipo.highlights || []).map(h => `
    <li>${h}</li>
  `).join("");
}

function setupActionButtons() {
  const ipo = getActiveIpoData();

  // 1. Download PNG
  document.getElementById("downloadBtn")?.addEventListener("click", () => {
    const cardElement = document.getElementById("exportableCard");
    html2canvas(cardElement, { scale: 2, useCORS: true, backgroundColor: "#FFFFFF" }).then(canvas => {
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      const cleanIpoName = ipo.name.replace(/[^a-zA-Z0-9]/g, "_");
      link.download = `${cleanIpoName}_Update.png`;
      link.href = image;
      link.click();
    });
  });

  // 2. Copy Details
  document.getElementById("copyBtn")?.addEventListener("click", () => {
    let textToCopy = `📈 *IPO UPDATE: ${ipo.name}*\nCategory: ${ipo.category}\n\n`;
    ipo.details.forEach(d => { textToCopy += `• *${d.label}:* ${d.value}\n`; });
    textToCopy += `\n*Open Free Demat Account & Bidding Assistance:*\n${BUSINESS_CONFIG.contactName}\n📞 ${BUSINESS_CONFIG.phone}\n📍 ${BUSINESS_CONFIG.address}`;

    navigator.clipboard.writeText(textToCopy).then(() => alert("IPO details copied!"));
  });

  // 3. Share WhatsApp
  document.getElementById("shareWhatsappBtn")?.addEventListener("click", () => {
    let message = `🚨 *NEW IPO ALERT* 🚨\n\n*${ipo.name}* (${ipo.category})\n\n`;
    ipo.details.forEach(d => { message += `▪️ *${d.label}:* ${d.value}\n`; });
    message += `\nOpen Free Demat Account & Apply:\n👤 *${BUSINESS_CONFIG.contactName}*\n📞 *Call/WhatsApp:* ${BUSINESS_CONFIG.phone}`;

    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`, "_blank");
  });
}
