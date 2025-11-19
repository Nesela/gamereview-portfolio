const spans = document.querySelectorAll(".panel span")

spans.forEach(panel => {
    panel.addEventListener("mouseover", function() {
        const dtpanel = panel.getAttribute("data-subpanel")
        const sbpanel = document.getElementById(dtpanel)
        sbpanel.style.display = 'block';
    });
    panel.addEventListener("mouseout", function() {
        const dtpanel = panel.getAttribute("data-subpanel")
        const sbpanel = document.getElementById(dtpanel)
        sbpanel.style.display = 'none';
    });
});