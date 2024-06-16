let small = document.getElementById('small');
let price = document.getElementById('price');
let ads = document.getElementById('ads');
let taxes = document.getElementById('taxes');
let name = document.getElementById('name');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('create');
let popUp = document.getElementById('delete-pop-up');
popUp.classList.add('hidden')

// get total
function total() {
    if(price.value != '') {
        small.style.background = 'green'
        let result = +price.value + +ads.value + +taxes.value;
        small.innerHTML = result
    } else {
        small.innerHTML = '';
        small.style.background = '#ca1111'
       
    }

    
   
    
  
}

// create product


let data;
if(localStorage.product != null) {
    data = JSON.parse(localStorage.product)
} else {
     data = [];
}




    submit.onclick = function () {
        let dataObj = {
            name:name.value,
            price:price.value,
            ads:ads.value,
            taxes:taxes.value,
            small:small.innerHTML,
            count:count.value,
            category:category.value,
        }

        // count input : hoew many product you are creating in one time
        if( dataObj.count > 1) {
            for(let i = 0;i < dataObj.count; i++) {
                data.push(dataObj)
            }
        } else {
            data.push(dataObj)
        }
    
        
        localStorage.setItem('product',JSON.stringify(data));
    
        clearData()
        readData()
        
    
    
    
        
    }


// Clear inputs function

function clearData() {
    name.value = '';
    price.value = '';
    ads.value = '';
    taxes.value = '';
    small.innerHTML = '';
    count.value = '';
    category.value = '';
}



// Read Function

function readData() {
    let table = '';
    for(let i = 0; i < data.length; i++) {
        table += `
              <tr>
                    <td>${i + 1}</td>
                    <td>${data[i].name}</td>
                    <td>${data[i].price} $</td>
                    <td>${data[i].ads} $</td>
                    <td>${data[i].taxes} $</td>
                    <td>${data[i].small} $</td>
                    <td>${data[i].category}</td>
                    <td><button onclick="deleteData(${i})" id="update">Update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                    </tr>
        
        `
    }

    document.getElementById('tbody').innerHTML = table;
    let deleteAllDiv = document.getElementById('delete-div')

    if(data.length > 1) {
        deleteAllDiv.innerHTML = `<button onclick="deleteAll()" id="delete-all">Delete (${data.length})</button> `
    } else {
        deleteAllDiv.innerHTML = ''
    }
}

readData() 


// Delete 

function deleteData(i) {
    data.splice(i,1);
    localStorage.product = JSON.stringify(data);
    readData()
}
// Delete all

function deleteAll() {
    data.splice(0);
    localStorage.clear()
    readData()
}
let deleteAllBtn = document.getElementById('delete-all');
deleteAllBtn.onclick = function () {
  
}


// update

