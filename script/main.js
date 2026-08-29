// Gestion des cartes cochables avec sauvegarde en sessionStorage

const STORAGE_KEY = "cardsSelection";

// Récupère l'objet de sélection stocké (ou objet vide si rien de stocké)
function getStoredSelection() {
  const raw = sessionStorage.getItem(STORAGE_KEY);
  try {
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

// Sauvegarde l'objet de sélection complet
function saveSelection(selection) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(selection));
}

// Applique visuellement l'état coché/décoché sur une carte
function setCardState(cardEl, checked) {
  const checkbox = cardEl.querySelector(".card-checkbox");
  checkbox.checked = checked;
  cardEl.classList.toggle("checked", checked);
}

// Met à jour le sessionStorage pour une carte donnée
function updateStorage(id, checked) {
  const selection = getStoredSelection();
  if (checked) {
    selection[id] = true;
  } else {
    delete selection[id];
  }
  saveSelection(selection);
}

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card-select");
  const stored = getStoredSelection();

  cards.forEach((card) => {
    const id = card.dataset.id;
    const checkbox = card.querySelector(".card-checkbox");

    // Restaure l'état sauvegardé au chargement de la page
    if (stored[id]) {
      setCardState(card, true);
    }

    // Clic sur la carte entière (hors checkbox) = toggle
    card.addEventListener("click", (e) => {
      if (e.target === checkbox) return; // la checkbox gère son propre clic
      const newState = !checkbox.checked;
      setCardState(card, newState);
      updateStorage(id, newState);
    });

    // Clic direct sur la checkbox
    checkbox.addEventListener("change", () => {
      setCardState(card, checkbox.checked);
      updateStorage(id, checkbox.checked);
    });
  });
});