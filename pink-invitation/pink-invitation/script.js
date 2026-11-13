/* ===== EDIT THESE DETAILS ===== */
const CONFIG = {
  weddingDate: "2026-11-25",          // year-month-day
  whatsapp:    "9779849243997",       // WhatsApp number with country code, digits only (977 = Nepal)
  phone:       "+9779808652772",      // number used by the Call button
  email:       "swagatnepal17@gmail.com",
  mapLink:     "https://maps.app.goo.gl/jR6pjzTWY2Ts4uWA9"  // paste your venue's Google Maps link
};
/* ================================ */

// Guest name from the link: yoursite.com/#Ram-Thapa  ->  "Dear Ram Thapa,"
function guestName(){
  let raw = (location.hash || "").replace(/^#/, ""), name = raw;
  try { name = decodeURIComponent(raw); } catch(e) {}
  return name.replace(/[-_+]+/g, " ").replace(/[^\p{L}\p{M}\s.']/gu, "").replace(/\s+/g, " ").trim().slice(0, 60);
}
function showGuest(){
  const n = guestName();
  document.getElementById("dear").textContent = n ? "Dear " + n + "," : "Dear Guest,";
  const f = document.getElementById("fName");
  if (n && !f.value) f.value = n;
}
showGuest();
window.addEventListener("hashchange", showGuest);

// Date in three hearts: yy / mm / dd
(function(){
  const [y, m, d] = CONFIG.weddingDate.split("-");
  const parts = [[y, "YEAR"], [m, "MONTH"], [d, "DAY"]];
  const heart = "M50 86 C8 56 -2 30 14 14 C28 2 46 9 50 25 C54 9 72 2 86 14 C102 30 92 56 50 86Z";
  document.getElementById("hearts").innerHTML = parts.map(p =>
    `<div class="heart"><svg viewBox="0 0 100 92" role="img">
       <path d="${heart}" fill="#f7cfdb" stroke="#e59ab3" stroke-width="2"/>
       <text class="num" x="50" y="50" text-anchor="middle">${p[0]}</text>
       <text class="lab" x="50" y="64" text-anchor="middle">${p[1]}</text>
     </svg></div>`).join("");
  const dt = new Date(CONFIG.weddingDate + "T00:00:00");
  document.getElementById("dateFull").textContent =
    dt.toLocaleDateString("en-GB", {weekday:"long", day:"numeric", month:"long", year:"numeric"});
})();

// Contact buttons
document.getElementById("callBtn").href = "tel:" + CONFIG.phone;
document.getElementById("waBtn").href   = "https://wa.me/" + CONFIG.whatsapp;
document.getElementById("mailBtn").href = "mailto:" + CONFIG.email;
document.getElementById("mapBtn").href  = CONFIG.mapLink;

// Feedback: opens WhatsApp with the message ready to send to you
document.getElementById("feedback").addEventListener("submit", function(e){
  e.preventDefault();
  const text = "Wedding invitation reply\n" +
    "Name: " + document.getElementById("fName").value + "\n" +
    "Attending: " + document.getElementById("fAttend").value + "\n" +
    "Message: " + document.getElementById("fMsg").value;
  window.open("https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(text), "_blank");
});
