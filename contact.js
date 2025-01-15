
document.getElementById('menu-icon').addEventListener('click', function() {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('active');
});
function updateContactNumber() {
    const branch = document.getElementById('branch').value;
    const contactNumberElement = document.getElementById('contact-number');

    if (branch === "kankurgachi") {
        contactNumberElement.textContent = "Contact Number: +91-9830152992";
    } else if (branch === "saltlake") {
        contactNumberElement.textContent = "Contact Number: +91-9051950854";
    } else {
        contactNumberElement.textContent = "";
    }
}

