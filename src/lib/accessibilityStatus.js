export const ACCESSIBILITY_STATUS = Object.freeze({
  safe: Object.freeze({
    id: "safe",
    label: "Accessible & Safe",
    labelWithBadge: "Accessible & Safe 🟢",
    badge: "🟢",
    verifiedLabel: "Verified Accessible & Safe",
  }),
  vulnerable: Object.freeze({
    id: "vulnerable",
    label: "Caution / Vulnerable",
    labelWithBadge: "Caution / Vulnerable 🟡",
    badge: "🟡",
  }),
  danger: Object.freeze({
    id: "danger",
    label: "Severe Hazard",
    labelWithBadge: "Severe Hazard ⛔",
    badge: "⛔",
  }),
});
