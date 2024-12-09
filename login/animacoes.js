document.addEventListener('DOMContentLoaded', () => {
    const gradientElement = document.querySelector('.login-container');

    let gradientPosition = 50;

    setInterval(() => {
        gradientPosition += 0.5;
        if (gradientPosition > 50) gradientPosition = 50; // Reset the gradient position
        gradientElement.style.background = `linear-gradient(to right, rgba(0, 0, 0, 0.9) ${gradientPosition - 20}%, rgba(0, 0, 0, 0.3), transparent ${gradientPosition}%)`;
    }, 50);
});
