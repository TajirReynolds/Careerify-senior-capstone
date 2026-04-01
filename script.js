function showForm(formId) {
    // Hide all forms
    document.querySelectorAll(".form-box").forEach(function(form) {
        form.classList.remove("active");
    });

    // Get the form to show
    const formToShow = document.getElementById(formId);

    // Only add active if the element exists
    if (formToShow) {
        formToShow.classList.add("active");
    } else {
        console.warn(`No form found with ID: ${formId}`);
    }
}
