var main = document.querySelector("#main");
var btnForAnotherInfo = document.querySelector(".btnForAnotherInfo");
var AddAnotherInfo = document.querySelector(".AddAnotherInfo");
var blockSkills = document.querySelector(".Skills");
var btnClearForm = document.querySelector(".btnClearForm");
var btnAddPhoto = document.querySelector(".inputForPhoto");
var btnCheckResult = document.querySelector(".btnCheckResult");
var template = document.querySelector("#tmpl");
btnForAnotherInfo.addEventListener('click', AddInput);
btnClearForm.addEventListener('click', ClearForm);
btnAddPhoto.addEventListener('click', AddPhoto);
btnCheckResult.addEventListener('click', saveResult);
btnCheckResult.addEventListener('click', downloadFile);
window.addEventListener('load', getResult);
function downloadFile() {
    var inputs = document.getElementsByTagName('input');
    var lables = document.getElementsByTagName('label');
    var link = document.createElement('a');
    link.download = "MyCV.doc";
    var arr1 = Array.from(lables).map(function (item) { return item.textContent; });
    var arr2 = Array.from(inputs).map(function (item) { return item.value; });
    var text = createFile(arr1, arr2);
    var blob = new Blob([text], { type: 'image/png' });
    console.log(URL.createObjectURL(blob));
    link.href = URL.createObjectURL(blob);
    link.click();
}
function AddInput() {
    var div = document.createElement("div");
    var input = document.createElement("input");
    var label = document.createElement("label");
    var button = document.createElement("button");
    var div2 = document.createElement("div");
    div.classList.add('AnotherInfo');
    button.classList.add('editBtn');
    div2.classList.add('DivEditTextarea');
    input.name = "DopInfo";
    label.htmlFor = "DopInfo";
    label.insertAdjacentHTML("afterbegin", "Another information");
    button.insertAdjacentHTML("afterbegin", '<img src="icons/editbtn.png" alt="">');
    blockSkills.append(div);
    div.append(div2);
    div2.append(label, button);
    div.append(input);
    EditLabel(button, label);
}
window.onbeforeunload = function () {
    return false;
};
function EditLabel(button, label) {
    button.addEventListener('click', showAreaForEdit);
    function showAreaForEdit() {
        var areaForEdit = document.createElement("textarea");
        areaForEdit.placeholder = 'Edit title';
        areaForEdit.classList.add('editInput');
        button.before(areaForEdit);
        areaForEdit.focus();
        Edit(areaForEdit, label);
        button.removeEventListener('click', showAreaForEdit);
    }
    function Edit(textarea, label) {
        textarea.onchange = function () {
            label.innerHTML = textarea.value;
            textarea.style.display = "none";
            button.addEventListener('click', showAreaForEdit);
        };
    }
}
function ClearForm() {
    var inputs = document.getElementsByTagName('input');
    Array.from(inputs).map(function (item) { return item.value = ""; });
    localStorage.clear();
    btnAddPhoto.src = "./icons/photo.png";
    var anotherInfo = document.getElementsByClassName('AnotherInfo');
    Array.from(anotherInfo).map(function (item) { return item.remove(); });
}
function AddPhoto() {
    document.body.prepend(template.content.cloneNode(true));
    var btnCloseForm = document.querySelector(".btnCloseForm");
    var background = document.querySelector(".blackBackground");
    var btnSubmit = document.querySelector(".btnSubmit");
    var inputForAddPhoto = document.querySelector(".inputForAddPhoto");
    btnCloseForm.onclick = function () {
        background.remove();
    };
    btnSubmit.onclick = function () {
        EditPhoto(inputForAddPhoto, background);
    };
}
function EditPhoto(input, background) {
    if (!input.files) {
        return;
    }
    var file = input.files[0];
    var url = URL.createObjectURL(file);
    btnAddPhoto.src = url;
    background.remove();
}
function saveResult() {
    var inputs = document.getElementsByTagName('input');
    Array.from(inputs).map(function (item, index) { return localStorage.setItem(String(index), item.value); });
}
function getResult() {
    var inputs = document.getElementsByTagName('input');
    Array.from(inputs).map(function (item, index) { var _a; return item.value = (_a = localStorage.getItem(String(index))) !== null && _a !== void 0 ? _a : ''; });
}
function createFile(arr1, arr2) {
    var str = "";
    var photo = arr1[0], labels = arr1.slice(1);
    for (var i = 0; i < arr2.length; i++) {
        if (i == 1 || i == 7)
            continue;
        if (i == 0 || i == 6) {
            str += "".concat(labels[i], ":   ").concat(labels[i + 1], ":\n").concat(arr2[i], "    ").concat(arr2[i + 1], "\n\n");
        }
        else {
            str += "".concat(labels[i], ":\n").concat(arr2[i], "\n\n");
        }
    }
    return str;
}
