
const main = document.querySelector("#main");
const btnForAnotherInfo = <HTMLButtonElement>document.querySelector(".btnForAnotherInfo");
const AddAnotherInfo = <HTMLDivElement>document.querySelector(".AddAnotherInfo");
const blockSkills = <HTMLDivElement>document.querySelector(".Skills");
const btnClearForm = <HTMLButtonElement>document.querySelector(".btnClearForm");
const btnAddPhoto = <HTMLImageElement>document.querySelector(".inputForPhoto");
const btnCheckResult = <HTMLButtonElement>document.querySelector(".btnCheckResult");
const template = <HTMLTemplateElement>document.querySelector("#tmpl");



btnForAnotherInfo.addEventListener('click', AddInput);
btnClearForm.addEventListener('click', ClearForm);
btnAddPhoto.addEventListener('click', AddPhoto);
btnCheckResult.addEventListener('click', saveResult);
btnCheckResult.addEventListener('click', downloadFile);
window.addEventListener('load', getResult);


function downloadFile(): void {
    let inputs: HTMLCollectionOf<HTMLInputElement> = document.getElementsByTagName('input');
    let lables: HTMLCollectionOf<HTMLLabelElement> = document.getElementsByTagName('label');
    let link = document.createElement('a');
    link.download = "MyCV.doc";
    let arr1: (string | null)[] = Array.from(lables).map(item => item.textContent);
    let arr2: (string | null)[] = Array.from(inputs).map(item => item.value);
    let text: string = createFile(arr1, arr2);


    let blob = new Blob([text], { type: 'image/png' })
    console.log(URL.createObjectURL(blob));
    link.href = URL.createObjectURL(blob);
    link.click();
}

function AddInput(): void {
    let div = <HTMLDivElement>document.createElement("div");
    let input = <HTMLInputElement>document.createElement("input");
    let label = <HTMLLabelElement>document.createElement("label");
    let button = <HTMLButtonElement>document.createElement("button");
    let div2 = <HTMLDivElement>document.createElement("div");

    div.classList.add('AnotherInfo');
    button.classList.add('editBtn');
    div2.classList.add('DivEditTextarea');

    input.name = "DopInfo";
    label.htmlFor = "DopInfo";
    label.insertAdjacentHTML("afterbegin", "Another information");
    button.insertAdjacentHTML("afterbegin", '<img src="icons/editbtn.png" alt="">');

    blockSkills.append(div);
    div.append(div2);
    div2.append(label, button)
    div.append(input)

    EditLabel(button, label);

}
window.onbeforeunload = function () {
    return false;
};

function EditLabel(button: HTMLButtonElement, label: HTMLLabelElement): void {
    button.addEventListener('click', showAreaForEdit);
    function showAreaForEdit() {
        let areaForEdit = document.createElement("textarea");
        areaForEdit.placeholder = 'Edit title';


        areaForEdit.classList.add('editInput');
        button.before(areaForEdit);
        areaForEdit.focus();
        Edit(areaForEdit, label);
        button.removeEventListener('click', showAreaForEdit);

    }


    function Edit(textarea: HTMLTextAreaElement, label: HTMLLabelElement) {
        textarea.onchange = () => {
            label.innerHTML = textarea.value;
            textarea.style.display = "none";
            button.addEventListener('click', showAreaForEdit);
        }
    }

}


function ClearForm(): void {

    let inputs: HTMLCollectionOf<HTMLInputElement> = document.getElementsByTagName('input');
    Array.from(inputs).map(item => item.value = "");
    localStorage.clear()


    btnAddPhoto.src = "./icons/photo.png";

    let anotherInfo: HTMLCollectionOf<Element> = document.getElementsByClassName('AnotherInfo');

    Array.from(anotherInfo).map(item => item.remove());

}


function AddPhoto(): void {
    document.body.prepend(template.content.cloneNode(true))
    let btnCloseForm = <HTMLButtonElement>document.querySelector(".btnCloseForm");
    let background = <HTMLDivElement>document.querySelector(".blackBackground");
    let btnSubmit = <HTMLButtonElement>document.querySelector(".btnSubmit")
    let inputForAddPhoto = <HTMLInputElement>document.querySelector(".inputForAddPhoto");
    btnCloseForm.onclick = () => {
        background.remove();
    };

    btnSubmit.onclick = () => {
        EditPhoto(inputForAddPhoto, background);
    };

}

function EditPhoto(input: HTMLInputElement, background: HTMLDivElement) {
    if (!input.files) {
        return;
    }
    let file = input.files[0];
    let url = URL.createObjectURL(file);

    btnAddPhoto.src = url;

    background.remove();
}

function saveResult() {
    let inputs = document.getElementsByTagName('input');
    Array.from(inputs).map((item, index) => localStorage.setItem(String(index), item.value));
}

function getResult(): void {
    let inputs: HTMLCollectionOf<HTMLInputElement> = document.getElementsByTagName('input');
    Array.from(inputs).map((item, index) => item.value = localStorage.getItem(String(index)) ?? '');
}

function createFile(arr1: (string | null)[], arr2: (string | null)[]): string {
    let str = ``;
    let [photo, ...labels] = arr1;
    for (let i = 0; i < arr2.length; i++) {
        if (i == 1 || i == 7) continue;
        if (i == 0 || i == 6) {
            str += `${labels[i]}:   ${labels[i + 1]}:\n${arr2[i]}    ${arr2[i + 1]}\n\n`;
        }
        else {
            str += `${labels[i]}:\n${arr2[i]}\n\n`;
        }
    }
    return str;
}
