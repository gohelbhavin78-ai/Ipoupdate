/* ==========================================================
   CONFIGURABLE DATA - EDIT YOUR DETAILS AND IPO INFO HERE
   ========================================================== */

// 1. Fixed Business & Branding Configuration
const BUSINESS_CONFIG = {
  brandName: "BHAVINKUMAR GOHEL",
  brandTagline: "Stock Broking & Financial Services",
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
  { title: "IPO Bidding & Advisory", icon: "fa-rocket" },
  { title: "Mutual Funds", icon: "fa-piggy-bank" },
  { title: "Loans & Finance", icon: "fa-hand-holding-dollar" },
  { title: "Insurance Solutions", icon: "fa-shield-halved" },
  { title: "Portfolio Management", icon: "fa-briefcase" }
];

// 3. Dynamic IPO Details Configuration (Update this whenever a new IPO launches!)
const CURRENT_IPO = {
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
  ],
  highlights: [
    "Consistent revenue growth over the last 3 financial years.",
    "Strong order book with major public and private infrastructure contracts.",
    "Debt reduction strategy using funds raised from the fresh issue.",
    "Promoter holding post-issue remains robust at 68.5%."
  ]
};

/* ==========================================================
   APPLICATION LOGIC - DO NOT MODIFY BELOW UNLESS NEEDED
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  renderBranding();
  renderServices();
  renderIpoDetails();
  setupActionButtons();
});

// Populate Branding Information
function renderBranding() {
  document.getElementById("brandName").innerText = BUSINESS_CONFIG.brandName;
  document.getElementById("brandTagline").innerText = BUSINESS_CONFIG.brandTagline;
  document.getElementById("contactName").innerText = BUSINESS_CONFIG.contactName;
  document.getElementById("contactPhone").innerText = BUSINESS_CONFIG.phone;
  document.getElementById("contactEmail").innerText = BUSINESS_CONFIG.email;
  document.getElementById("contactAddress").innerText = BUSINESS_CONFIG.address;
  document.getElementById("disclaimerText").innerText = BUSINESS_CONFIG.disclaimer;
  
  const currentYear = new Date().getFullYear();
  document.getElementById("copyrightText").innerText = `© ${currentYear} ${BUSINESS_CONFIG.brandName}. All Rights Reserved.`;

  // WhatsApp Call To Action Link
  const ctaMsg = encodeURIComponent(`Hello ${BUSINESS_CONFIG.contactName}, I would like to apply for the ${CURRENT_IPO.name} IPO. Please guide me with the application process.`);
  document.getElementById("ctaBtn").href = `https://wa.me/${BUSINESS_CONFIG.phoneRaw}?text=${ctaMsg}`;
}

// Populate Services
function renderServices() {
  const container = document.getElementById("servicesGrid");
  container.innerHTML = SERVICES.map(s => `
    <div class="service-card">
      <i class="fa-solid ${s.icon}"></i>
      <h4>${s.title}</h4>
    </div>
  `).join("");
}

// Populate Dynamic IPO Details & Highlights
function renderIpoDetails() {
  document.getElementById("ipoName").innerText = CURRENT_IPO.name;
  document.getElementById("ipoCategory").innerText = CURRENT_IPO.category;
  document.getElementById("ipoDescription").innerText = CURRENT_IPO.description;

  // Grid Details
  const gridContainer = document.getElementById("ipoDetailsGrid");
  gridContainer.innerHTML = CURRENT_IPO.details.map(d => `
    <div class="detail-card">
      <div class="detail-label">${d.label}</div>
      <div class="detail-value ${d.isHighlight ? 'highlight-val' : ''}">${d.value}</div>
    </div>
  `).join("");

  // Highlights
  const listContainer = document.getElementById("highlightsList");
  listContainer.innerHTML = CURRENT_IPO.highlights.map(h => `
    <li>${h}</li>
  `).join("");
}

// Setup Event Handlers for Export / Copy / Share
function setupActionButtons() {
  // 1. Download as PNG
  document.getElementById("downloadBtn").addEventListener("click", () => {
    const cardElement = document.getElementById("exportableCard");
    
    // Temporarily apply adjustments if needed for canvas rendering
    html2canvas(cardElement, {
      scale: 2, // High resolution
      useCORS: true,
      backgroundColor: "#FFFFFF"
    }).then(canvas => {
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      const cleanIpoName = CURRENT_IPO.name.replace(/[^a-zA-Z0-9]/g, "_");
      link.download = `${cleanIpoName}_Update.png`;
      link.href = image;
      link.click();
    });
  });

  // 2. Copy IPO Details to Clipboard
  document.getElementById("copyBtn").addEventListener("click", () => {
    let textToCopy = `📈 *IPO UPDATE: ${CURRENT_IPO.name}*\n`;
    textToCopy += `Category: ${CURRENT_IPO.category}\n\n`;
    
    CURRENT_IPO.details.forEach(d => {
      textToCopy += `• *${d.label}:* ${d.value}\n`;
    });

    textToCopy += `\n*Contact for Bidding & Assistance:*\n`;
    textToCopy += `${BUSINESS_CONFIG.contactName}\n`;
    textToCopy += `📞 ${BUSINESS_CONFIG.phone}\n`;
    textToCopy += `📧 ${BUSINESS_CONFIG.email}\n`;
    textToCopy += `📍 ${BUSINESS_CONFIG.address}`;

    navigator.clipboard.writeText(textToCopy).then(() => {
      alert("IPO details copied to clipboard!");
    }).catch(err => {
      console.error("Failed to copy details: ", err);
    });
  });

  // 3. Share on WhatsApp
  document.getElementById("shareWhatsappBtn").addEventListener("click", () => {
    let message = `🚨 *NEW IPO ALERT* 🚨\n\n`;
    message += `*${CURRENT_IPO.name}* (${CURRENT_IPO.category})\n\n`;
    
    CURRENT_IPO.details.forEach(d => {
      message += `▪️ *${d.label}:* ${d.value}\n`;
    });

    message += `\nApply now with expert support:\n`;
    message += `👤 *${BUSINESS_CONFIG.contactName}*\n`;
    message += `📞 *Call/WhatsApp:* ${BUSINESS_CONFIG.phone}\n`;
    message += `📍 ${BUSINESS_CONFIG.address}`;

    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  });
}
