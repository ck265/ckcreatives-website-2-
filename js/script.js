// CK Creatives interactions: mobile navigation, portfolio filters, current year.
(() => {
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("navLinks");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open navigation");
      });
    });
  }

  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.filter;
      filterButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });

      projectCards.forEach((card) => {
        const show = category === "All" || card.dataset.category === category;
        card.classList.toggle("is-hidden", !show);
      });
    });
    button.setAttribute("aria-pressed", String(button.classList.contains("active")));
  });

  // Tap a portfolio artwork to see a larger square preview that fits the screen.
  const preview = document.getElementById("artworkPreview");
  const previewImage = document.getElementById("artworkPreviewImage");
  const previewClose = document.getElementById("artworkPreviewClose");
  let previouslyFocused = null;

  function closeArtworkPreview() {
    if (!preview || !previewImage) return;
    preview.classList.remove("is-open");
    document.body.classList.remove("preview-open");
    previewImage.src = "";
    if (previouslyFocused) previouslyFocused.focus();
  }

  if (preview && previewImage && previewClose) {
    document.querySelectorAll(".project-image").forEach((imageBox) => {
      imageBox.style.cursor = "zoom-in";
      imageBox.addEventListener("click", () => {
        const image = imageBox.querySelector("img");
        if (!image) return;
        previouslyFocused = imageBox;
        previewImage.src = image.currentSrc || image.src;
        previewImage.alt = image.alt || "Portfolio artwork";
        preview.classList.add("is-open");
        document.body.classList.add("preview-open");
        previewClose.focus();
      });
    });
    previewClose.addEventListener("click", closeArtworkPreview);
    preview.addEventListener("click", (event) => {
      if (event.target === preview) closeArtworkPreview();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && preview.classList.contains("is-open")) closeArtworkPreview();
    });
  }

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();