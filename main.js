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
let btn2 = document.getElementById('btn-2');


let search = document.getElementById('search')
let byName = document.getElementById('by-name');
let byCategory = document.getElementById('by-category')



// get total
function total() {
    // if the price input is not empty 
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
// creating the array that is going to store the product data
let data;
// if the localstore.product is not empty show all data in it
if(localStorage.product != null) {
    data = JSON.parse(localStorage.product)
} else {
    // if it is empty create empty array
     data = [];
}

// clicking creating and updating button function
submit.onclick = function () {
    // store one product data in object
                let dataObj = {
                    name:name.value.toLowerCase(),
                    price:price.value,
                    ads:ads.value,
                    taxes:taxes.value,
                    small:small.innerHTML,
                    count:count.value,
                    category:category.value.toLowerCase(),
                }
        
              //  this condition means don't create or update unless you fill this inputs and count value must be lessthan 200
                if(name.value != '' 
                    && price.value != ''
                    && category.value != ''
                    && dataObj.count < 200
                ) {
                    if(mood == 'create')  {
                        // count input : how many product you are creating in one time
                    
                      if( dataObj.count > 1) {
                          for(let i = 0;i < dataObj.count; i++) {
                            // pushing the new product created inside the array if the count input value is greater than one(1)
                              data.push(dataObj)
                          }
                      } else {
                        // pushing the one new product if the count is not cretet than one(1) 
                          data.push(dataObj)
                      }
                      
                  } else {
                       // update 
  
                      data[up] = dataObj
                      mood = 'create'
                      submit.innerHTML = 'Create'
                      count.style.display = 'block'
                      search.style.display = 'block'
                      byName.style.display = 'block'
                      byCategory.style.display = 'block';
                      clearData()
                  }
                  clearData()
                }

                // putting the data array inside the localstorage
                localStorage.setItem('product',JSON.stringify(data));
                
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
    // creating a variable that going to hold the new product addid in the table
    let table = '';
    // loop to the data array
    for(let i = 0; i < data.length; i++) {
        // putting the data inside the data array in to the variable
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
    // adding table varieble inside the html inside the tbody
    document.getElementById('tbody').innerHTML = table;
    // calling the delete-div element
    let deleteAllDiv = document.getElementById('delete-div')
    
    if(data.length > 1) {
        // if the data inside the data array is greater than 1 put inside the delete-div element delete all button 
        deleteAllDiv.innerHTML = `<button onclick="deleteAllPopup()" id="delete-all">Delete All (${data.length})</button> `
    } else { 
        deleteAllDiv.innerHTML = ''
    }

    total()
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
    search.style.display = 'none'
    byName.style.display = 'none'
    byCategory.style.display = 'none';
    mood = 'update'

     up = i;

     scroll( {
        top:'0',
        'behavior':'smooth'
     })
    
}

// search


// creating search mood variable
let searchMood = 'name';

// function that we get the mood if it is name or category 
// this function it work when you click the search-by-name btn or search-by-category btn
// it holds as a parameter the id of search-by-name btn and search-by-category btn
function getMood(id) 
 {
    let searchInput = document.getElementById('search') 
    // it means if you click search-by-name btn
    if(id == 'by-name') {
        searchMood = 'name';
        searchInput.placeholder = 'search by name';
    } else {
         // else if you click search-by-category btn
        searchMood = 'category'
        searchInput.placeholder = 'search by category';
    }
    // if you click search-by-name btn or search-by-category btn
    searchInput.focus()
    searchInput.value = '';
    readData()
 }

    // when you write something inside search input it hold as a parameter the value of search input
 function searchData(value) {
    // creating variable that holds all the products that have the same name or category
    let table = '';
    // it means if you click the search-by-name btn
    if(searchMood == 'name') {
        for(let i = 0; i < data.length; i++) {
            // if the value of search input is includes to the name of the produts that are inthe array
            if(data[i].name.includes(value.toLowerCase())) {
                // add the table variable the all products
                table += `
                <tr>
                      <td>${i}</td>
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
        }
    } else {
        for(let i = 0; i < data.length; i++) {
                 // if the value of search input is includes to the category of the produts that are inthe array
            if(data[i].category.includes(value.toLowerCase())) {
                // add the table variable the all products
                table += `
                <tr>
                      <td>${i}</td>
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
        }
    }

// add the table variable inse the tbody element
    document.getElementById('tbody').innerHTML = table;

 }




// Light dark mood

let lightDarkMood = document.getElementById('light-dark-mood')
let darkLightMood = document.getElementById('dark-light-mood')
let inputs = document.querySelectorAll('input')
let table = document.getElementById('table')
let  tBody = document.getElementById('tbody')
let header1 = document.getElementById('header-1')
let pragraph = document.getElementById('pragraph')

darkLightMood.style.display = 'none'


lightDarkMood.onclick = function() {
    lightDarkMood.style.display = 'none'
    darkLightMood.style.display = 'block'
    document.body.style.background = '#ffffffb9'
    table.classList.add('table-light')
    header1.style.color = '#000'
    pragraph.style.color = '#000'
    inputs.forEach((input) => {
        input.style.background = 'transparent'
        input.style.border = '1px solid #000'
        input.style.color = '#000'
    })
    popUp.style.background = '#fff'
    popUp.style.color = '#000'
}

darkLightMood.onclick = function() {
    darkLightMood.style.display = 'none'
    lightDarkMood.style.display = 'block'
    document.body.style.background = '#444'
    table.classList.remove('table-light')
     header1.style.color = '#fff'
    pragraph.style.color = '#fff'
    inputs.forEach((input) => {
        input.style.background = '#222'
        input.style.color = '#fff'
         input.style.border = 'none'
        
    })
    popUp.style.background = '#222'
    popUp.style.color = '#fff'
   
     
}









 