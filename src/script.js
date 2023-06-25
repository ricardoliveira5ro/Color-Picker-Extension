const clearBtn = document.getElementById('clear');
const pickerBtn = document.getElementById('color-picker');
const colorList = document.querySelector('.picked_colors_list')
const pickedColors = JSON.parse(localStorage.getItem("picked_colors") || "[]");

const clearAll = () => {
    console.log('aaa')
    pickedColors.length = 0;
    localStorage.setItem("picked_colors", JSON.stringify(pickedColors))
    fetchColors()
}

const copyToClipboard = (elem) => {
    var color = elem.dataset.color;
    navigator.clipboard.writeText(color);

    document.getElementById("C-" + color).style.display = "none";
    document.getElementById("Copied-" + color).style.display = "inline";

    setTimeout(() => {
        document.getElementById("C-" + color).style.display = "inline";
        document.getElementById("Copied-" + color).style.display = "none";
    }, 1000)
}

const fetchColors = () => {
    colorList.innerHTML = pickedColors.map(color => `
        <li class="color">
            <span class="preview_block" style="background: ${color}; border: 1px solid ${color == "#ffffff" ? "#ccc" : color}"></span>
            <img class="copied" id="Copied-${color}" src="../icons/check.png" alt="Copied">
            <span class="color_value" id="C-${color}" data-color="${color}">${color}</span>
        </li>
    `).join("")

    document.querySelectorAll('.color').forEach(row => {
        row.addEventListener('click', e => copyToClipboard(e.currentTarget.lastElementChild));
    })
}
fetchColors();


const enableEyeDropper = async () => {
    try {
        const eyeDropper = new EyeDropper();
        const { sRGBHex } = await eyeDropper.open();

        if (!pickedColors.includes(sRGBHex)) {
            pickedColors.push(sRGBHex);
            localStorage.setItem("picked_colors", JSON.stringify(pickedColors))
            fetchColors();
        }

    } catch (error) { }
}


pickerBtn.addEventListener('click', enableEyeDropper);
clearBtn.addEventListener('click', clearAll)