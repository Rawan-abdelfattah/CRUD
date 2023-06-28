// function calcolate price 
// cerate product
// save in localStorage
// clear all inputs
// delete
// count 
// delete all
// update 
// search 
// clean data 

let title=document.querySelector('#title');
let price=document.querySelector('#price');
let taxies=document.querySelector('#taxies');
let ads=document.querySelector('#ads');
let discount=document.querySelector('#discount');
let total=document.querySelector('#total');
let spanTotal=document.querySelector('#spanTotal');
let count=document.querySelector('#count');
let category=document.querySelector('#category');
let create=document.querySelector('#create');


let mood='Create';

let tmp;

let searchMood='title';

// let search=document.querySelector('#search');

//count total
function getTotal(){
    if(price.value !=''){
    let result=(+price.value+ +taxies.value+ +ads.value)- +discount.value
    total.innerHTML=result;
    spanTotal.style.background=('green');
    }
    else{
    total.innerHTML='';
    spanTotal.style.background=('red');
    }
}
//create

let productarray;
if(localStorage.productStored !=null){
    productarray=JSON.parse( localStorage.productStored );
}
else{
    productarray=[];
}
create.onclick=function(){
    let  product={
        title:title.value.toLowerCase(),
        price:price.value,
        taxies:taxies.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()
    };

    if(title.value!='' 
    && price.value!=''
    && category.value!=''
    && count.value<100
    ){    
        if(mood==='Create'){  
        if(product.count>1){
        for (let i = 0; i <product.count; i++) {
                productarray.push(product);     
                clearAll();  
             } 
    }else{
        productarray.push(product);
        clearAll();
        
    }
   

}else{
        productarray[tmp]=product;
        mood='Create';
        create.innerHTML='Create';
        count.style.display='block';
    }  
}
 
        localStorage.setItem('productStored' , JSON.stringify(productarray))
       
        readData();
} 
// clear 
function clearAll(){
    title.value='';
    price.value='';
    taxies.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    spanTotal.style.background=('red');
    count.value='';
    category.value='';
}
function readData(){
    let table='';
    let i=0;
    for( i;i<productarray.length;i++){
        table +=`
        <tr>
        <td>${i+1}</td>
        <td>${productarray[i].title}</td>
        <td>${productarray[i].price}</td>
        <td>${productarray[i].table}</td>
        <td>${productarray[i].ads}</td>
        <td>${productarray[i].discount}</td>
        <td>${productarray[i].total}</td>
        <td>${productarray[i].category}</td>
        <td><button onclick='updataData(${i})'       class="update">update</button></td>
        <td><button onclick='deleteSingalData(${i})' class="delete">delete</button></td>
    </tr>`
    } 
    document.getElementById('tbody').innerHTML=table;  
    if(productarray.length>0){
        document.getElementById('deleteAll').innerHTML=`
        <button onclick=deleteAllData(${i}) id="delete" class="button form-control " >Delete All (${i})</button>
        `;
    }
        else{
            document.getElementById('deleteAll').innerHTML='';
        } 
}
readData();
// delete singal data 
function deleteSingalData(i){

    productarray.splice(i,1);
    localStorage.productStored=JSON.stringify(productarray);
    readData();
}
function deleteAllData(){
    localStorage.clear();
    productarray.splice(0);
    readData();
}

function updataData(i){
    title.value=productarray[i].title;
    price.value=productarray[i].price;
    taxies.value=productarray[i].taxies;
    ads.value=productarray[i].ads;
    discount.value=productarray[i].discount;
    getTotal();
    category.value=productarray[i].category;
    count.style.display='none';
    create.innerHTML='Update';
    mood='Update';

    tmp=i;
    scroll({
        top:0,
        behavior:'smooth'
    });
}

function getSearchMood(id){

    let search=document.getElementById('search');
  
    
    if(id=='search-by-title'){
        searchMood='title';


    }else{
        searchMood='category';
    } 
    search.placeholder='Search By '+searchMood;
    // search.value=''; 
     search.focus();
    readData();
    
}

function searchData(value){
    let table='';
     for(let i=0;i<productarray.length;i++){
    if(searchMood =='title') {
        if(productarray[i].title.includes(value.toLowerCase()))  { 
            table +=`
            <tr>
            <td>${i}</td>
            <td>${productarray[i].title}</td>
            <td>${productarray[i].price}</td>
            <td>${productarray[i].table}</td>
            <td>${productarray[i].ads}</td>
            <td>${productarray[i].discount}</td>
            <td>${productarray[i].total}</td>
            <td>${productarray[i].category}</td>
            <td><button onclick='updataData(${i})'       class="update">update</button></td>
            <td><button onclick='deleteSingalData(${i})' class="delete">delete</button></td>
        </tr>`        
    }
    }
    
    else{
            if(productarray[i].category.includes(value.toLowerCase())) {
                table +=`
                <tr>
                <td>${i}</td>
                <td>${productarray[i].title}</td>
                <td>${productarray[i].price}</td>
                <td>${productarray[i].table}</td>
                <td>${productarray[i].ads}</td>
                <td>${productarray[i].discount}</td>
                <td>${productarray[i].total}</td>
                <td>${productarray[i].category}</td>
                <td><button onclick='updataData(${i})'       class="update">update</button></td>
                <td><button onclick='deleteSingalData(${i})' class="delete">delete</button></td>
            </tr>`
            
        }
        }
    
}

document.getElementById('tbody').innerHTML=table;  
}