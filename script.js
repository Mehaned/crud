// const { JSON } = require("mysql/lib/protocol/constants/types");

const titel = document.getElementById('titel');
const price = document.getElementById('price');
const taxes = document.getElementById('taxes');
const ads = document.getElementById('ads');
const discount = document.getElementById('discount');
const count = document.getElementById('count');
const total = document.getElementById('total');
const category = document.getElementById('category');
const submit = document.getElementById('submit');
let mood = 'create';
let temp;

// get total
function getTotal() {
    if(price.value != '') {
        const result = (+price.value + +taxes.value + +ads.value ) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = '#040'
    }else {
        total.innerHTML = '';
        total.style.backgroundColor = 'rgb(209, 37, 37)'
    }
}

//create product
let dataPro;
if(localStorage.product !=  null) {
    dataPro = JSON.parse(localStorage.product)
}else {
    dataPro = [];
}
// const dataPro = [];
submit.onclick = function() {
    const newPro = {
        titel : titel.value.toLowerCase(),
        price : price.value,
        taxes : taxes.value,
        ads   : ads.value,
        discount : discount.value,
        count : count.value,
        total : total.innerHTML,
        category : category.value.toLowerCase()

    }
    if(titel.value != '') {
         if(mood === 'create') {
            if(newPro.count > 1) {
                for(let i = 0; i < newPro.count; i++){
                    dataPro.push(newPro)
                }
            }else {
                dataPro.push(newPro)
            }
        }else {
            dataPro[temp] = newPro;
            submit.innerHTML='create';
            mood ='create';
            count.style.display='block';
        
        }
        clearData()
    }
// save LocalStrategy
    localStorage.setItem('product', JSON.stringify(dataPro));
    // console.log(dataPro);

    
    readData()
}


// clear inputs
function clearData() {
    titel.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    count.value='';
    total.innerHTML='';
    category.value='';
}

//read

function readData() {
    getTotal()
    let table = '';
    for (let i = 0; i < dataPro.length; i++){
        table +=`
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].titel}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick='updateData(${i})' id="update">Update</button></td>
            <td><button onclick='deleteData(${i})' id="delete">Delete</button></td>
        </tr>
        `
    }
    document.getElementById('table').innerHTML=table
    
    if(dataPro.length > 0) {
        document.getElementById('deleteAll').innerHTML = `<button onclick='deleteAll()'>Delete All (${dataPro.length})</button>`
    }else {
        document.getElementById('deleteAll').innerHTML = ''
    }
}
readData()
//delete
function deleteData(i) {
    dataPro.splice(i, 1)
    localStorage.product = JSON.stringify(dataPro)
    readData()
}
function deleteAll() {
    localStorage.clear()
    dataPro.splice(0)
    readData()
}
//count
//update
function updateData(i) {
    titel.value = dataPro[i].titel;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal();
    count.style.display='none'
    submit.innerHTML = 'Update'
    category.value = dataPro[i].category;
    mood = 'update';
    temp = i;
    scroll({
        top:0,
        behavior:'smooth'
    }) 
    
}

//search
let searchMood = 'title';

function getSearchData(id) {
    if(id == 'title') {
        searchMood = 'title';
        document.getElementById('search').focus();

    }else {
        searchMood = 'category';
        document.getElementById('search').focus();
        
    }
    document.getElementById('search').placeholder = 'Search By '+ searchMood
    document.getElementById('search').value = ''
}

function searchData(value) {
    // console.log(value);
    let table = '';
    if(searchMood == 'title') {
        for(let i = 0; i < dataPro.length; i++) {
            if(dataPro[i].titel.includes(value.toLowerCase())) {
                table +=`
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].titel}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick='updateData(${i})' id="update">Update</button></td>
                    <td><button onclick='deleteData(${i})' id="delete">Delete</button></td>
                </tr>
                `
            }
        }
    }else {
        for(let i = 0; i < dataPro.length; i++) {
            if(dataPro[i].category.includes(value.toLowerCase())) {
                table +=`
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].titel}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick='updateData(${i})' id="update">Update</button></td>
                    <td><button onclick='deleteData(${i})' id="delete">Delete</button></td>
                </tr>
                `
            }
        }
    }
    document.getElementById('table').innerHTML=table
}




//clean data




