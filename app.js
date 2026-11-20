const WHATSAPP_NUMBER = "243817817177"; // Remplace par ton numéro sans le +

const demos = [
  {
    id: 1,
    title: "Pharmacie du 30 Juin — Gombe",
    category: "ecommerce",
    categoryLabel: "E-commerce & Santé",
    image: "Pharmajess.jpg",
    description:
      "Maquette mobile avec commande directe sur WhatsApp, recherche de médicaments, catégories (Médicaments, Bébé, Beauté) et produits populaires."
  }
];

const grid = document.getElementById("demo-grid");
const filterButtons = document.querySelectorAll(".filter-btn");
const modal = document.getElementById("modal");
const closeModalBtn = document.getElementById("close-modal");

function renderDemos(filter = "all") {
  const list = filter === "all" ? demos : demos.filter((d) => d.category === filter);
  grid.innerHTML = "";

  list.forEach((item) => {
    const card = document.createElement("article");
    card.className = "demo-card";
    card.innerHTML = `
      <div class="demo-thumb">
        <img src="${item.image}" alt="${item.title}" loading="lazy" />
      </div>
      <div class="demo-info">
        <span class="demo-cat">${item.categoryLabel}</span>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </div>
    `;
    card.addEventListener("click", () => openModal(item));
    grid.appendChild(card);
  });
}

function openModal(item) {
  document.getElementById("modal-img").src = item.image;
  document.getElementById("modal-img").alt = item.title;
  document.getElementById("modal-cat").textContent = item.categoryLabel;
  document.getElementById("modal-title").textContent = item.title;
  document.getElementById("modal-desc").textContent = item.description;

  const text = encodeURIComponent(
    `Bonjour Higherjess Business, je souhaite en savoir plus sur la démo : ${item.title}`
  );
  document.getElementById("modal-whatsapp").href = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

closeModalBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderDemos(btn.dataset.filter);
  });
});

renderDemos();
