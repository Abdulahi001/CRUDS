let small = document.getElementById('small');
let price = document.getElementById('price');
let ads = document.getElementById('ads');
let taxes = document.getElementById('taxes');
let name = document.getElementById('name');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('create');

//Create and Update mood

let mood = 'create';
let up;

// Delete all pop-up part
let shadow = document.getElementById('shadow')
shadow.style.display = 'none'
let popUp = document.getElementById('delete-pop-up');
popUp.style.display = 'none';
let btn1 = document.getElementById('btn-1');
let btn2 = document.getElementById('btn-2')


//Search part
let searchInput = document.getElementById('search')
let searchByName = document.getElementById('by-name');
let searchByCategory = document.getElementById('by-category');






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
        
              

                if(mood == 'create')  {
                      // count input : hoew many product you are creating in one time
                  
                    if( dataObj.count > 1) {
                        for(let i = 0;i < dataObj.count; i++) {
                            data.push(dataObj)
                        }
                    } else {

                         
                        data.push(dataObj)
                    }
                } else {
                     // update

                    data[up] = dataObj
                    submit.innerHTML = 'Create'
                    count.style.display = 'block'
                    searchInput.style.display = 'block'
                    searchByName.style.display = 'block'
                    searchByCategory.style.display = 'block';
                    clearData()
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
                    <td><button onclick="updateData(${i})" id="update">Update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                    </tr>
        
        `
    }

    document.getElementById('tbody').innerHTML = table;
    let deleteAllDiv = document.getElementById('delete-div')

    if(data.length > 1) {
        deleteAllDiv.innerHTML = `<button onclick="deleteAllPopup()" id="delete-all">Delete All (${data.length})</button> `
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

function deleteAllPopup() {
    popUp.style.display = 'flex';
    shadow.style.display = 'block'
    document.body.style.overflowY = 'hidden'
}

btn1.onclick = function () {
    deleteAll();
     popUp.style.display = 'none';
    shadow.style.display = 'none'
    document.body.style.overflowY = 'scroll'
}
btn2.onclick = function() {
     popUp.style.display = 'none';
    shadow.style.display = 'none'
    document.body.style.overflowY = 'scroll'
}

// update

function updateData(i) {
    name.value = data[i].name;
    price.value = data[i].price;
    ads.value = data[i].ads;
    taxes.value = data[i].taxes;
    total()
    category.value = data[i].category;
    count.style.display = 'none';
    submit.innerHTML = 'Update';
    searchInput.style.display = 'none'
    searchByName.style.display = 'none'
    searchByCategory.style.display = 'none';
    mood = 'update'

     up = i;

     scroll( {
        top:'0',
        'behavior':'smooth'
     })
    
}

// search



let searchMood= 'search by name';













 