const modalButtons = document.querySelectorAll("[data-modal]");
const closeButtons = document.querySelectorAll(".close-modal");
const overlays = document.querySelectorAll(".modal-overlay");

modalButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const modalName = button.dataset.modal;
        const modal = document.querySelector(`#modal-${modalName}`);

        modal.classList.add("active");
    });
});

closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const modal = button.closest(".modal");

        modal.classList.remove("active");
    });
});

overlays.forEach((overlay) => {
    overlay.addEventListener("click", () => {
        const modal = overlay.closest(".modal");

        modal.classList.remove("active");
    });
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        const activeModal = document.querySelector(".modal.active");

        if (activeModal) {
            activeModal.classList.remove("active");
        }
    }
});