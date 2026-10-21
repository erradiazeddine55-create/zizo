const phoneDisplay = "06 77 14 19 64";
const toast = document.querySelector("#toast");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

document.querySelector("#year").textContent = new Date().getFullYear();

const cardToggle = document.querySelector("#card-toggle");
const cardHintText = document.querySelector("#card-hint-text");

cardToggle.addEventListener("click", () => {
  const rectoVisible = cardToggle.classList.toggle("is-flipped");
  cardToggle.setAttribute("aria-pressed", String(rectoVisible));
  cardToggle.setAttribute(
    "aria-label",
    rectoVisible ? "Afficher le verso de la carte" : "Afficher le recto de la carte",
  );
  cardHintText.textContent = rectoVisible
    ? "Cliquez pour revoir le verso"
    : "Cliquez pour voir le recto";
});

document.querySelector("#copy-phone").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(phoneDisplay);
    showToast("Numéro copié");
  } catch {
    showToast(`Numéro : ${phoneDisplay}`);
  }
});

document.querySelector("#share-card").addEventListener("click", async () => {
  const shareData = {
    title: "ElectroZizo — Électricité & sécurité",
    text: `ElectroZizo — ${phoneDisplay}`,
    url: window.location.href,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return;
    } catch (error) {
      if (error.name === "AbortError") return;
    }
  }

  try {
    await navigator.clipboard.writeText(window.location.href);
    showToast("Lien de la carte copié");
  } catch {
    showToast("Partage non disponible sur ce navigateur");
  }
});

if ("serviceWorker" in navigator && window.location.protocol.startsWith("http")) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  });
}
