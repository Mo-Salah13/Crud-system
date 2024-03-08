let nameInput = document.getElementById('productName');
let priceInput = document.getElementById('productPrice');
let cateInput = document.getElementById('productCate');
let descInput = document.getElementById('productDesc');
let searchInput = document.getElementById('searchOutPut');
let addBtn = document.getElementById('addBtn');
let updateBtn = document.getElementById('updateBtn');
let nameAlert = document.getElementById('nameAlert');
let priceAlert = document.getElementById('priceAlert');
let newData = '' //* (update fun) خاص بال  
let productList = [];

if (localStorage.getItem('products') != null) { //* (showData fun) خاص بال 
    productList = JSON.parse(localStorage.getItem('products'));
    showData();
}
function addProduct() {
    if (validName() == true && validPrice() == true) {
        let item = {
            noun: nameInput.value,
            price: Number(priceInput.value),
            cate: cateInput.value,
            desc: descInput.value,
        }
        productList.push(item);
        localStorage.setItem('products', JSON.stringify(productList));
        showData();
        clearForm();
    }
}
function showData() {
    let container = ``;
    for (i = 0; i < productList.length; i++) {
        container += `<tr>
        <td>${(i + 1)}</td>
        <td>${productList[i].noun}</td>
        <td>${productList[i].price}</td>
        <td>${productList[i].cate}</td>
        <td>${productList[i].desc}</td>
        <td><button type="button" onclick='update(${i})' class="btn btn-outline-info"> <i class="fa-regular fa-pen-to-square"></i></button></td>
        <td><button type="button" onclick='deleteProduct(${i})' class="btn btn-danger"> <i class="fa-solid fa-trash-can"></i></button></td>
    </tr>`
    }
    document.getElementById('display').innerHTML = container;
}
function clearForm() {
    nameInput.value = '';
    priceInput.value = '';
    cateInput.value = '';
    descInput.value = '';
    nameInput.classList.remove('is-valid');
    nameInput.classList.remove('is-invalid');
    priceInput.classList.remove('is-invalid');
    priceInput.classList.remove('is-valid');
}
function deleteProduct(index) {
    productList.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(productList));
    showData();
}
function search() {
    let searchValue = searchInput.value.toLowerCase();
    let container = ``;
    for (i = 0; i < productList.length; i++) {
        if (productList[i].noun.toLowerCase().includes(searchValue) == true || productList[i].cate.toLowerCase().includes(searchValue) == true) {
            container += `<tr>
        <td>${(i + 1)}</td>
        <td>${productList[i].noun.toLowerCase().replace(searchValue, `<span class='bg-info'>${searchValue}</span>`)}</td>
        <td>${productList[i].price}</td>
        <td>${productList[i].cate.toLowerCase().replace(searchValue, `<span class='bg-info'>${searchValue}</span>`)}</td>
        <td>${productList[i].desc}</td>
        <td><button type="button" class="btn btn-info"> <i class="fa-regular fa-pen-to-square"></i></button></td>
        <td><button type="button" onclick='deleteProduct(${i})' class="btn btn-danger"> <i class="fa-solid fa-trash-can"></i></button></td>
    </tr>`
        }
    }
    document.getElementById('display').innerHTML = container;
}
function update(i) {
    newData = i
    addBtn.classList.replace('d-block', 'd-none');
    updateBtn.classList.replace('d-none', 'd-block');
    nameInput.value = productList[i].noun;
    priceInput.value = productList[i].price;
    cateInput.value = productList[i].cate;
    descInput.value = productList[i].desc;
}
function newUpdate() {
    if (validName() == true && validPrice() == true) {
        addBtn.classList.replace('d-none', 'd-block');
        updateBtn.classList.replace('d-block', 'd-none');
        productList[newData].noun = nameInput.value;
        productList[newData].price = priceInput.value;
        productList[newData].cate = cateInput.value;
        productList[newData].desc = descInput.value;
        localStorage.setItem('products', JSON.stringify(productList));
        clearForm();
        showData();
    }
}
nameInput.addEventListener('keyup', validName);
function validName() {
    let rgxName = /^[A-Za-z]{2,10}[0-9]{0,4}$/;
    if (rgxName.test(nameInput.value) == true) {
        nameInput.classList.add('is-valid');
        nameInput.classList.remove('is-invalid');
        nameAlert.classList.add('d-none');
        return true
    }
    else {
        nameInput.classList.add('is-invalid');
        nameInput.classList.remove('is-valid');
        nameAlert.classList.remove('d-none');
        return false;
    }
}
priceInput.addEventListener('keyup', validPrice);
function validPrice() {
    let rgxPrice = /^[1-9][0-9]{1,6}$/;
    if (rgxPrice.test(priceInput.value) == true) {
        priceInput.classList.add('is-valid');
        priceInput.classList.remove('is-invalid');
        priceAlert.classList.add('d-none')
        return true;
    }
    else {
        priceInput.classList.add('is-invalid');
        priceInput.classList.remove('is-valid');
        priceAlert.classList.remove('d-none');
        return false;
    }
}


