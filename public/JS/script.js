const STORAGE_KEY = "peopleList";

function validateForm() {
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const address = document.getElementById("address").value;
    const email = document.getElementById("email").value;

    if (!name || !age || age < 1 || !address || !email) {
        alert("Campos Inválidos!");
        return false;
    }

    return true;
}

function showData() {
    let peopleList = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    let html = "";

    peopleList.forEach((element, index) => {
        html += `<tr>
            <td>${element.name}</td>
            <td>${element.age}</td>
            <td>${element.address}</td>
            <td>${element.email}</td>
            <td>
                <button onclick="deleteData(${index})" class="btn btn-danger">Deletar</button>
                <button onclick="updateData(${index})" class="btn btn-warning m-2">Editar</button>
            </td>
        </tr>`;
    });

    document.querySelector("#crudTable tbody").innerHTML = html;
}

window.onload = showData;

function AddData() {
    if (validateForm()) {
        const name = document.getElementById("name").value;
        const age = document.getElementById("age").value;
        const address = document.getElementById("address").value;
        const email = document.getElementById("email").value;

        let peopleList = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

        peopleList.push({ name, age, address, email });

        localStorage.setItem(STORAGE_KEY, JSON.stringify(peopleList));
        showData();
        clearForm();
    }
}

function deleteData(index) {
    let peopleList = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    peopleList.splice(index, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(peopleList));
    showData();
}

function updateData(index) {
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    let peopleList = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    document.getElementById("name").value = peopleList[index].name;
    document.getElementById("age").value = peopleList[index].age;
    document.getElementById("address").value = peopleList[index].address;
    document.getElementById("email").value = peopleList[index].email;

    // remove eventos antigos
    const updateBtn = document.getElementById("Update");
    updateBtn.replaceWith(updateBtn.cloneNode(true));
    document.getElementById("Update").onclick = function () {
        if (validateForm()) {
            peopleList[index] = {
                name: document.getElementById("name").value,
                age: document.getElementById("age").value,
                address: document.getElementById("address").value,
                email: document.getElementById("email").value
            };

            localStorage.setItem(STORAGE_KEY, JSON.stringify(peopleList));
            showData();
            clearForm();

            document.getElementById("Submit").style.display = "block";
            document.getElementById("Update").style.display = "none";
        }
    }
}

function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("address").value = "";
    document.getElementById("email").value = "";
}
