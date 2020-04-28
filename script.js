const content = document.querySelector(".content"),
  form = document.getElementById("form"),
  newInfo = document.querySelector(".newInfo"),
  newInfoTitle = document.querySelector(".newInfo h3"),
  newInfoButton = document.querySelector(".newInfo button"),
  operationName = document.querySelector(".operation__name"),
  operationAddress = document.querySelector(".operation__address"),
  operationPhone = document.querySelector(".operation__phone"),
  addButton = document.querySelector(".addButton"),
  newInfoInput = document.querySelectorAll(".newInfo input");

let idTable = 0;
let info = JSON.parse(localStorage.getItem("crud")) || [];

const renderOperation = (operation, ind) => {
  const listItem = document.createElement("tr");

  listItem.innerHTML = `<td data-label="Full Name">${operation.full_name}</td>
                        <td data-label="Address">${operation.address}</td>
                        <td data-label="Phone">${operation.phone}</td>
                        <td class="action"><button class='info_edit' data-id="${ind}">Edit</button>
                        <button class='info_delete' data-id="${ind}">Delete</button></td>`;

  content.append(listItem);
};

const addOperation = (event) => {
  event.preventDefault();

  const operationNameValue = operationName.value,
    operationAddressValue = operationAddress.value,
    operationPhoneValue = operationPhone.value;

  operationName.style.borderColor = "";
  operationAddress.style.borderColor = "";
  operationPhone.style.borderColor = "";

  if (operationNameValue && operationAddressValue && operationPhoneValue) {
    const operation = {
      full_name: operationNameValue,
      address: operationAddressValue,
      phone: operationPhoneValue,
    };

    if (event.target.dataset.change == "add") {
      info.push(operation);
    } else {
      info.splice(idTable, 1, operation);
    }

    init();
    operationName.value = "";
    operationAddress.value = "";
    operationPhone.value = "";
    newInfo.classList.add("hidden");
  } else {
    if (!operationNameValue) operationName.style.borderColor = "red";
    if (!operationAddressValue) operationAddress.style.borderColor = "red";
    if (!operationPhoneValue) operationPhone.style.borderColor = "red";
  }
};

const changeOperation = (e) => {
  if (e.target.classList.contains("info_delete")) {
    info.splice(e.target.dataset.id, 1);
    newInfo.classList.add("hidden");
    init();
  } else if (e.target.classList.contains("info_edit")) {
    editOperation(e.target.dataset.id);
  }
};

const editOperation = (index) => {
  changeValue("edit");
  const arr = Object.values(info[index]);
  newInfoInput.forEach((item, ind) => {
    item.value = arr[ind];
  });
  idTable = index;
};

const changeValue = (value) => {
  newInfo.classList.remove("hidden");
  newInfoTitle.textContent =
    value == "edit" ? "Edit information" : "Write new information";
  newInfoButton.textContent =
    value == "edit" ? "Edit information" : "Add information";
  form.dataset.change = value;
};

const openWrapper = () => {
  changeValue("add");
  newInfoInput.forEach((item) => {
    item.value = "";
  });
};

form.addEventListener("submit", addOperation);
content.addEventListener("click", changeOperation);
addButton.addEventListener("click", openWrapper);

const init = () => {
  content.textContent = "";
  info.forEach((item, ind) => renderOperation(item, ind));
  localStorage.setItem("crud", JSON.stringify(info));
};

init();
