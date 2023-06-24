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
    navigator.clipboard.writeText(elem.dataset.color);
}

const fetchColors = () => {
    colorList.innerHTML = pickedColors.map(color => `
        <li class="color">
            <span class="preview_block" style="background: ${color}; border: 1px solid ${color == "#ffffff" ? "#ccc" : color}"></span>
            <span class="color_value" data-color="${color}">${color}</span>
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

        //navigator.clipboard.writeText(sRGBHex)

        if (!pickedColors.includes(sRGBHex)) {
            pickedColors.push(sRGBHex);
            localStorage.setItem("picked_colors", JSON.stringify(pickedColors))
            fetchColors();
        }

    } catch (erorr) {

    }
}


pickerBtn.addEventListener('click', enableEyeDropper);
clearBtn.addEventListener('click', clearAll)