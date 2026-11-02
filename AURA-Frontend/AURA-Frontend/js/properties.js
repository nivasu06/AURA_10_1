document.addEventListener("DOMContentLoaded", () => {

  /* ================= MODALS ================= */

  const opportunityModal = document.getElementById("opportunityModal");
  const collaborationModal = document.getElementById("collaborationModal");

  document.getElementById("uploadOpportunityBtn")?.addEventListener("click", (e) => {
    e.stopPropagation();
    opportunityModal.style.display = "flex";
  });

  document.getElementById("uploadCollaborationBtn")?.addEventListener("click", (e) => {
    e.stopPropagation();
    collaborationModal.style.display = "flex";
  });

  document.querySelectorAll(".close-modal").forEach(btn => {
    btn.addEventListener("click", () => {
      opportunityModal.style.display = "none";
      collaborationModal.style.display = "none";
    });
  });

  // ✅ close only when clicking outside modal-content
  window.addEventListener("click", e => {
    if (e.target === opportunityModal) {
      opportunityModal.style.display = "none";
    }
    if (e.target === collaborationModal) {
      collaborationModal.style.display = "none";
    }
  });

  setupImagePreview("opportunityImage", "opportunityPreview");
  setupImagePreview("collaborationImage", "collaborationPreview");

  /* =====================================================
     FRANCHISE OPPORTUNITIES FILTER
  ===================================================== */

  const fKeyword = document.getElementById("franchiseKeyword");
  const fLocation = document.getElementById("franchiseLocation");
  const fBtn = document.getElementById("franchiseSearchBtn");
  const fCards = document.querySelectorAll(".franchise-card");

  function resetFranchise() {
    fCards.forEach(card => card.style.display = "");
  }

  function searchFranchise() {
    const keyword = fKeyword.value.trim().toLowerCase();
    const location = fLocation.value.trim().toLowerCase();

    if (!keyword) {
      resetFranchise();
      return;
    }

    fCards.forEach(card => {
      const { name = "", category = "", city = "" } = card.dataset;

      const match =
        (name.includes(keyword) || category.includes(keyword)) &&
        (!location || city.includes(location));

      card.style.display = match ? "" : "none";
    });
  }

  fBtn.addEventListener("click", searchFranchise);
  fKeyword.addEventListener("keydown", e => e.key === "Enter" && searchFranchise());
  fLocation.addEventListener("keydown", e => e.key === "Enter" && searchFranchise());
  fKeyword.addEventListener("input", () => !fKeyword.value && resetFranchise());

  /* =====================================================
     FRANCHISE COLLABORATION FILTER
  ===================================================== */

  const cKeyword = document.getElementById("collabKeyword");
  const cLocation = document.getElementById("collabLocation");
  const cBtn = document.getElementById("collabSearchBtn");
  const cCards = document.querySelectorAll(".collaboration-card");

  function resetCollaboration() {
    cCards.forEach(card => card.style.display = "");
  }

  function searchCollaboration() {
    const keyword = cKeyword.value.trim().toLowerCase();
    const location = cLocation.value.trim().toLowerCase();

    if (!keyword) {
      resetCollaboration();
      return;
    }

    cCards.forEach(card => {
      const { name = "", category = "", city = "" } = card.dataset;

      const match =
        (name.includes(keyword) || category.includes(keyword)) &&
        (!location || city.includes(location));

      card.style.display = match ? "" : "none";
    });
  }

  cBtn.addEventListener("click", searchCollaboration);
  cKeyword.addEventListener("keydown", e => e.key === "Enter" && searchCollaboration());
  cLocation.addEventListener("keydown", e => e.key === "Enter" && searchCollaboration());
  cKeyword.addEventListener("input", () => !cKeyword.value && resetCollaboration());
});

/* ================= IMAGE PREVIEW ================= */

function setupImagePreview(inputId, previewId) {
  const input = document.getElementById(inputId);
  const preview = document.getElementById(previewId);

  if (!input || !preview) return;

  input.addEventListener("change", () => {
    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      preview.src = reader.result;
      preview.style.display = "block";
    };
    reader.readAsDataURL(file);
  });
}
