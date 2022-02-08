
let cartQuantity = 0;
let cartPrice = 0;


console.log(localStorage);

let productCart = JSON.parse(localStorage.getItem("cart"));
console.log(productCart);

function productGet(){
    let productName = e.target.closest('article').querySelector('h2').textContent;
    let productColor = e.target.closest('article').querySelector('.cart__item__content__description').querySelector('p').textContent;
}



//                                                          rmvObj permet de supprimer un produit ET de modifier la quantite/prix total en consequence

    



//                                                              Je stocke chaque produit du localStorage dans un tableau
                               
                      



//                                                          Quand la page est chargee, je charge le contenu dynamique
document.addEventListener("DOMContentLoaded", event =>{
    for (let i =0; i<productCart.length; i++){                       
        document.getElementById("cart__items").innerHTML += `
            <article class="cart__item" data-id="${productCart[i]._id}" data-color="${productCart[i].color}">                                       
                <div class="cart__item__img">
                    <img src="${productCart[i].imageUrl}">
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__description">
                        <h2>${productCart[i].name}</h2>
                        <p>${productCart[i].color}</p>
                        <p>${productCart[i].price} €</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté : ${productCart[i].quantity}</p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productCart[i].quantity}">
                        </div>
                        <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                </div>
            </article> 
        `;       
    }
})


//                                                     Une fois que tous les elements de la page sont charges, j'initialise les fonctions
window.addEventListener('load', event => {
//                                                                             Changement quantite 
    document.querySelector("#cart__items")
    .addEventListener('change', (e) => {
        e.target.previousElementSibling.innerHTML =  "Qté : " + e.target.value;

//                                                    Suppression de l'objet (dom et localStorage) si quantity = 0 et affichage de la quantite totale      
        if (e.target.value == 0){
            let productName = e.target.closest('article').querySelector('h2').textContent;
            let productColor = e.target.closest('article').querySelector('.cart__item__content__description').querySelector('p').textContent;

            if (productCart.find(x => x.name ===  productName && x.color === productColor)){

                let productFinded = productCart.find(x => x.name === productName && x.color === productColor);
                let productIndex = productCart.indexOf(productFinded);
    
                cartQuantity += e.target.value - productFinded.quantity;
                document.getElementById('totalQuantity').innerHTML = cartQuantity;
    
                cartPrice += (e.target.value - productFinded.quantity) * productFinded.price;
                document.getElementById('totalPrice').innerHTML = cartPrice;
    
                productCart.splice(productIndex, 1);
                localStorage.setItem("cart", JSON.stringify(productCart));
    
                console.log(productCart);
    
                e.target.closest('article').remove();
    
            }
        }else{


//                                                           Sinon enregistrement de la nouvelle quantite dans localStorage et affichage de la quantite totale
            for (let x = 0; x<productCart.length; x++){
                    localStorageParse = JSON.parse(localStorage.getItem(localStorage.key(x)));
                
                if (localStorageParse.name == e.target.closest('article').querySelector('h2').textContent 
                && localStorageParse.color == e.target.closest('article').querySelector('.cart__item__content__description').querySelector('p').textContent){
                    cartQuantity += e.target.value - localStorageParse.quantity;
                    document.getElementById('totalQuantity').innerHTML = cartQuantity;
    
                    cartPrice += (e.target.value-localStorageParse.quantity) * localStorageParse.price
                    document.getElementById('totalPrice').innerHTML = cartPrice;
    
                    localStorageParse.quantity = e.target.value;                   
                    localStorage.setItem(localStorageParse.id + " " +localStorageParse.color, JSON.stringify(localStorageParse));                   
                }
            }
        } 
    });  


 //                                                                              Bouton delete

        document.querySelector('#cart__items')
        .addEventListener('click', (e) =>{  
            if (e.target.classList.contains('deleteItem')){
                let productName = e.target.closest('article').querySelector('h2').textContent;
                let productColor = e.target.closest('article').querySelector('.cart__item__content__description').querySelector('p').textContent;

                if (productCart.find(x => x.name ===  productName && x.color === productColor)){

                    let productFinded = productCart.find(x => x.name === productName && x.color === productColor);
                    let productIndex = productCart.indexOf(productFinded);
        
                    cartQuantity -= productFinded.quantity;
                    document.getElementById('totalQuantity').innerHTML = cartQuantity;
        
                    cartPrice -= productFinded.quantity * productFinded.price;
                    document.getElementById('totalPrice').innerHTML = cartPrice;
        
                    productCart.splice(productIndex, 1);
                    localStorage.setItem("cart", JSON.stringify(productCart));
        
                    console.log(productCart);
        
                    e.target.closest('article').remove();
        
                }
            }
        });


//                                                                             Affichage quantite 
    for (let i = 0; i<productCart.length; i++){
        let quantityDOM = document.getElementsByClassName('itemQuantity')[i].value;
        cartQuantity += parseInt(quantityDOM);
        document.getElementById('totalQuantity').innerHTML = cartQuantity;


//                                                                             Affichage prix total
    priceDOM = document.getElementsByClassName('cart__item__content__description')[i].querySelector('p').nextElementSibling.textContent;
    cartPrice += parseInt(priceDOM) * quantityDOM;
    document.getElementById('totalPrice').innerHTML = cartPrice;
    };
})

