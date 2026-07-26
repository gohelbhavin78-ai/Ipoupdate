/* ==========================================================
   CONFIGURABLE DATA & DEFAULT FALLBACK
   ========================================================== */

const BUSINESS_CONFIG = {
  brandName: "BHAVINKUMAR GOHEL",
  brandTagline: "AMFI-Registered Mutual Fund Distributor - 326820",
  contactName: "Bhavinkumar Gohel",
  phone: "+91 97120 87970",
  phoneRaw: "919712087970",
  email: "bvgohel.bhavin@gmail.com",
  address: "E-27, Maitri Lake View, Zundal, Gandhinagar, Gujarat 382421",
  disclaimer: "Disclaimer: Equity and IPO investments are subject to market risks. Read all scheme-related documents carefully before investing. Information provided here is for informational and educational purposes only and does not constitute financial advice. Grey Market Premium (GMP)/Est. Listing Gain is an unofficial, unregulated, and speculative market price indicator. GMP can fluctuate rapidly based on market sentiment and does not guarantee the actual listing price or performance of the stock."
};

const SERVICES = [
  { title: "Stock Broking", icon: "fa-chart-pie" },
  { title: "IPO Bidding & Advisory", icon: "fa-rocket" },
  { title: "Mutual Funds", icon: "fa-piggy-bank" },
  { title: "Loans & Finance", icon: "fa-hand-holding-dollar" },
  { title: "Insurance Solutions", icon: "fa-shield-halved" },
  { title: "Portfolio Management", icon: "fa-briefcase" }
];

// Fallback IPO details if nothing has been saved yet
const DEFAULT_IPO = {
  name: "Caliber Mining & Logistics Limited",
  category: "Mainboard IPO",
  description: "Comprehensive mining operations and integrated logistics solution provider expanding infrastructure and fleet capability.",
  details: [
    { label: "Bidding Dates", value: "Jul 28 - Jul 30, 2026" },
    { label: "Price Band", value: "₹140 - ₹147 Per share" },
    { label: "Issue Size", value: "₹450.00 Cr" },
    { label: "Lot Size", value: "100 Shares (₹14,700)" },
    { label: "Listing On", value: "BSE & NSE" },
    { label: "Expected Listing", value: "Aug 04, 2026" },
    { label: "Retail Quota", value: "35%" },
    { label: "Est. Listing Gain", value: "+28% to +35%", isHighlight: true }
  ]
};

// Retrieve active IPO data from browser storage
function getActiveIpoData() {
  const saved = localStorage.getItem("CUSTOM_IPO_DATA");
  return saved ? JSON.parse(saved) : DEFAULT_IPO;
}

// Helper utility to safely populate text content without throwing errors
function setElementText(id, text) {
  const el = document.getElementById(id);
  if (el) {
    el.innerText = text || "";
  } else {
    console.warn(`[Warning] Element with id="${id}" was not found in HTML.`);
  }
}

/* ==========================================================
   PAGE RENDER LOGIC
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  renderBranding();
  renderServices();
  renderIpoDetails();
  setupActionButtons();
});

function renderBranding() {
  const currentIpo = getActiveIpoData();

  setElementText("brandName", BUSINESS_CONFIG.brandName);
  setElementText("brandTagline", BUSINESS_CONFIG.brandTagline);
  setElementText("contactName", BUSINESS_CONFIG.contactName);
  setElementText("contactPhone", BUSINESS_CONFIG.phone);
  setElementText("contactEmail", BUSINESS_CONFIG.email);
  setElementText("contactAddress", BUSINESS_CONFIG.address);
  setElementText("disclaimerText", BUSINESS_CONFIG.disclaimer);

  const currentYear = new Date().getFullYear();
  setElementText("copyrightText", `© ${currentYear} ${BUSINESS_CONFIG.brandName}. All Rights Reserved.`);

  // WhatsApp Call To Action Link for Free Demat Account
  const ctaBtn = document.getElementById("ctaBtn");
  if (ctaBtn) {
    const ctaMsg = encodeURIComponent(`Hello ${BUSINESS_CONFIG.contactName}, I would like to open a free Demat account for ${currentIpo.name}. Please guide me through the process.`);
    ctaBtn.href = `https://wa.me/${BUSINESS_CONFIG.phoneRaw}?text=${ctaMsg}`;
  }
}

function renderServices() {
  const container = document.getElementById("servicesGrid");
  if (!container) return;

  container.innerHTML = SERVICES.map(s => `
    <div class="service-card">
      <i class="fa-solid ${s.icon}"></i>
      <h4>${s.title}</h4>
    </div>
  `).join("");
}

function renderIpoDetails() {
  const ipo = getActiveIpoData();

  // Safely set primary text fields
  setElementText("ipoName", ipo.name);
  setElementText("ipoCategory", ipo.category);
  setElementText("ipoDescription", ipo.description);

  // Safely update Key IPO Details Grid
  const gridContainer = document.getElementById("ipoDetailsGrid");
  if (gridContainer) {
    gridContainer.innerHTML = (ipo.details || []).map(d => `
      <div class="detail-card">
        <div class="detail-label">${d.label}</div>
        <div class="detail-value ${d.isHighlight ? 'highlight-val' : ''}">${d.value}</div>
      </div>
    `).join("");
  }

  // Safely update Highlights list (if element exists)
  const listContainer = document.getElementById("highlightsList");
  if (listContainer) {
    listContainer.innerHTML = (ipo.highlights || []).map(h => `
      <li>${h}</li>
    `).join("");
  }
}

/* ==========================================================
   EVENT HANDLERS & EXPORT LOGIC
   ========================================================== */

function setupActionButtons() {
  const ipo = getActiveIpoData();

  // 1. Download card as PNG
  const downloadBtn = document.getElementById("downloadBtn");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", async function () {
      const cardElement = document.getElementById("exportableCard");

      if (!cardElement) {
        alert("Error: Card container (#exportableCard) not found.");
        return;
      }

      if (typeof html2canvas !== "function") {
        alert("Error: html2canvas library missing from head script.");
        return;
      }

      const originalBtnText = downloadBtn.innerHTML;
      downloadBtn.disabled = true;
      downloadBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Exporting...`;

      try {
        const canvas = await html2canvas(cardElement, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#FFFFFF",
          logging: false
        });

        const image = canvas.toDataURL("image/png", 1.0);
        const cleanIpoName = (ipo.name || "IPO").replace(/[^a-zA-Z0-9]/g, "_");
        
        const link = document.createElement("a");
        link.download = `${cleanIpoName}_Update.png`;
        link.href = image;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

      } catch (err) {
        console.error("PNG Export Failed:", err);
        alert("Could not generate PNG image. Please try again.");
      } finally {
        downloadBtn.disabled = false;
        downloadBtn.innerHTML = originalBtnText;
      }
    });
  }

  // 2. Copy details as text
  const copyBtn = document.getElementById("copyBtn");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      let textToCopy = `📈 *IPO UPDATE: ${ipo.name}*\nCategory: ${ipo.category}\n\n`;
      (ipo.details || []).forEach(d => {
        textToCopy += `• *${d.label}:* ${d.value}\n`;
      });
      textToCopy += `\n*Open Free Demat Account & Get Bidding Assistance:*\n${BUSINESS_CONFIG.contactName}\n📞 ${BUSINESS_CONFIG.phone}\n📍 ${BUSINESS_CONFIG.address}`;

      navigator.clipboard.writeText(textToCopy)
        .then(() => alert("IPO details copied to clipboard!"))
        .catch(err => console.error("Clipboard copy failed:", err));
    });
  }

  // 3. Share details on WhatsApp
  const shareWhatsappBtn = document.getElementById("shareWhatsappBtn");
  if (shareWhatsappBtn) {
    shareWhatsappBtn.addEventListener("click", () => {
      let message = `🚨 *NEW IPO ALERT* 🚨\n\n*${ipo.name}* (${ipo.category})\n\n`;
      (ipo.details || []).forEach(d => {
        message += `▪️ *${d.label}:* ${d.value}\n`;
      });
      message += `\nOpen Free Demat Account & Apply:\n👤 *${BUSINESS_CONFIG.contactName}*\n📞 *Call/WhatsApp:* ${BUSINESS_CONFIG.phone}`;

      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`, "_blank");
    });
  }
}
