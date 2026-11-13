/* ===== यहाँ आफ्नो विवरण राख्नुहोस् (EDIT THESE) ===== */
const CONFIG = {
  // विवाहको मिति विक्रम सम्वत् (BS) मा, अंग्रेजी अंकमा लेख्नुहोस्। यो नमूना मिति मात्र हो।
  bsYear: 2083,
  bsMonth: 8,          // १ = बैशाख ... १० = माघ ... १२ = चैत
  bsDay: 9,
  weekday: "बुधबार",    // बार आफैँ लेख्नुहोस् (आइतबार, सोमबार, मंगलबार, बुधबार, बिहिबार, शुक्रबार, शनिबार)

  whatsapp: "9779849243997",          // देशको कोडसहित नम्बर, अंक मात्र (977 = नेपाल)
  phone:    "+9779808652772",         // फोन गर्ने बटनका लागि
  email:    "swagatnepal17@gmail.com",
  mapLink:  "https://maps.app.goo.gl/jR6pjzTWY2Ts4uWA9", // विवाह स्थलको Google Maps लिंक

  // अभिवादनको शब्द: "आदरणीय [नाम] ज्यू,"
  greetStart: "श्री ",
  greetEnd:   " ज्यू,",
  greetNoName: "आदरणीय अतिथि ज्यू,"
};
/* ================================================ */

const BS_MONTHS = ["बैशाख","जेठ","असार","श्रावण","भदौ","असोज","कार्तिक","मंसिर","पौष","माघ","फागुन","चैत"];
const toNe = n => String(n).replace(/[0-9]/g, d => "०१२३४५६७८९"[d]);

// लिंकबाट अतिथिको नाम: yoursite.com/#राम-थापा  ->  "आदरणीय राम थापा ज्यू,"
function guestName(){
  let raw = (location.hash || "").replace(/^#/, ""), name = raw;
  try { name = decodeURIComponent(raw); } catch(e) {}
  return name.replace(/[-_+]+/g, " ").replace(/[^\p{L}\p{M}\s.']/gu, "").replace(/\s+/g, " ").trim().slice(0, 60);
}
function showGuest(){
  const n = guestName();
  document.getElementById("dear").textContent = n ? CONFIG.greetStart + n + CONFIG.greetEnd : CONFIG.greetNoName;
  const f = document.getElementById("fName");
  if (n && !f.value) f.value = n;
}
showGuest();
window.addEventListener("hashchange", showGuest);

// मिति तीनवटा मुटुमा: साल / महिना / गते
(function(){
  const yy = String(CONFIG.bsYear).slice(-2);
  const parts = [[toNe(yy), "साल"], [toNe(String(CONFIG.bsMonth).padStart(2,"0")), "महिना"], [toNe(String(CONFIG.bsDay).padStart(2,"0")), "गते"]];
  const heart = "M50 86 C8 56 -2 30 14 14 C28 2 46 9 50 25 C54 9 72 2 86 14 C102 30 92 56 50 86Z";
  document.getElementById("hearts").innerHTML = parts.map(p =>
    `<div class="heart"><svg viewBox="0 0 100 92" role="img">
       <path d="${heart}" fill="#f7cfdb" stroke="#e59ab3" stroke-width="2"/>
       <text class="num" x="50" y="50" text-anchor="middle">${p[0]}</text>
       <text class="lab" x="50" y="66" text-anchor="middle">${p[1]}</text>
     </svg></div>`).join("");
  document.getElementById("dateFull").textContent =
    toNe(CONFIG.bsYear) + " " + BS_MONTHS[CONFIG.bsMonth - 1] + " " + toNe(CONFIG.bsDay) + " गते, " + CONFIG.weekday;
})();

// सम्पर्क बटनहरू
document.getElementById("callBtn").href = "tel:" + CONFIG.phone;
document.getElementById("waBtn").href   = "https://wa.me/" + CONFIG.whatsapp;
document.getElementById("mailBtn").href = "mailto:" + CONFIG.email;
document.getElementById("mapBtn").href  = CONFIG.mapLink;

// प्रतिक्रिया: WhatsApp खुल्छ र सन्देश तयार हुन्छ
document.getElementById("feedback").addEventListener("submit", function(e){
  e.preventDefault();
  const text = "विवाह निमन्त्रणाको जवाफ\n" +
    "नाम: " + document.getElementById("fName").value + "\n" +
    "उपस्थिति: " + document.getElementById("fAttend").value + "\n" +
    "सन्देश: " + document.getElementById("fMsg").value;
  window.open("https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(text), "_blank");
});
