const labels = document.querySelectorAll("form label")
for(let label of labels) {
    const input = label.querySelector("input[type=date]")
    const p = label.querySelector("p")
    input.addEventListener("input", e => {
        p.innerHTML = input.value.replaceAll("-", "/")
    })
    label.addEventListener("click", e => {
        e.preventDefault();
        input.showPicker();
    })
}