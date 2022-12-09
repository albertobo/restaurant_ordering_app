//import {v4 as uuidv4} from './uuid'
import {menuArray} from "./data.js" 

const menu = document.getElementById("menu")
const orderList = document.getElementById("order-list")
const form = document.getElementById("hidden-form")
let orderListArray = []
let htmlOrderList = ""
let id = 0
let totalPrice = 0

menu.innerHTML = getHtml()

document.addEventListener("click", function(e) {
    if(e.target.dataset.id){
        document.getElementById("your-order").innerHTML = "Your order"
        document.getElementById("total-price").innerHTML = `Total price`
        document.getElementById("complete-button").classList.remove("hidden")
        menuArray.forEach(function(element) {
            if(element.id == e.target.dataset.id){
                const orderElement = {
                    name: element.name,
                    price: element.price,
                    button: "remove",
                    id: id
                }
                totalPrice += element.price
                document.getElementById("total-price-num").innerHTML =`${totalPrice}$`
                id++
                 
                orderListArray.push(orderElement)               
            }
            })
            orderListArray.forEach(function(element) {
                htmlOrderList = ` <div class="order-element-container">
                                  <h3>${element.name}</h3>
                                  <button class="remove-btn" data-order="${element.id}">${element.button}</button>
                                  <h3>${element.price}$</h3>
                                  </div>
                                  `
            })
            orderList.innerHTML += htmlOrderList         
        
    }
     if(e.target.dataset.order){
        orderListArray.forEach(function(element) {
            if(e.target.dataset.order == element.id){
                totalPrice -= element.price
                document.getElementById("total-price-num").innerHTML =`${totalPrice}$`
                if(orderListArray.indexOf(element) != 0){
                let a = orderListArray.splice(orderListArray.indexOf(element), orderListArray.indexOf(element))
                orderListArray.push(a)
                orderListArray.pop()                
                } else if(orderListArray.indexOf(element) == 0) {
                    orderListArray.shift()
                }
            }
            
        })
            if(orderListArray.length === 0){
                htmlOrderList = ""
                orderList.innerHTML = htmlOrderList
            }
            else {
                  htmlOrderList = ""
                  orderListArray.forEach(function(element) {
                  htmlOrderList += `<div class="order-element-container">
                                   <h3>${element.name}</h3>
                                   <button class="remove-btn" data-order="${element.id}">${element.button}</button>
                                   <h3>${element.price}$</h3>
                                   </div>
                                   `
                  })
                  orderList.innerHTML = htmlOrderList
              }
            
    }
    
    if(e.target.dataset.complete) {
        form.style.display = "block"
    }
    
    if(e.target.dataset.pay) {
        form.style.display = "none"
        const name = document.getElementById("name").value
        const deleteItem = document.getElementById("delete")
        deleteItem.innerHtML = `<h3 class="center">Thanks ${name}, your order is on its way!</h3>`
        deleteItem.innerHTML = `
                                <div class="center">
                                <h3>Thanks ${name}, your order is on its way!</h3>
                                </div>`        
    }
})

function getHtml(){
let htmlStr = ""
for(let item in menuArray){
  htmlStr += `<div class="item">
              <p class="emoji">
               ${menuArray[item].emoji}
                <p>
                 <div class="menu-text">
                 <h3 class="name">
                  ${menuArray[item].name}
                   </h3>
                    <p class="ingredients">
                     ${menuArray[item].ingredients}
                      </p>
                       <p class="price">
                        ${menuArray[item].price + "$"} 
                         </p>
                          </div>
                           <button class="add-btn" data-id="${menuArray[item].id}">
                            +
                            </button>
                             </div>
                             `
                  
}
return htmlStr
}




