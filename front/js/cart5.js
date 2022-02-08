
let cartQuantity = 0;
let cartPrice = 0;

let objectItemsArr = [];


//                                                          rmvObj permet de supprimer un produit ET de modifier la quantite/prix total en consequence
function rmvObj(e) {
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
}


//                                                              Je stocke chaque produit du localStorage dans un tableau
for (let i=0; i<localStorage.length; i++){                                   
    objectItemsArr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));                           
}


//                                                          Quand la page est chargee, je charge le contenu dynamique
document.addEventListener("DOMContentLoaded", event =>{
    for (let i =0; i<objectItemsArr.length; i++){                       
        document.getElementById("cart__items").innerHTML += `
            <article class="cart__item" data-id="${objectItemsArr[i]._id}" data-color="${objectItemsArr[i].color}">                                       
                <div class="cart__item__img">
                    <img src="${objectItemsArr[i].imageUrl}">
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__description">
                        <h2>${objectItemsArr[i].name}</h2>
                        <p>${objectItemsArr[i].color}</p>
                        <p>${objectItemsArr[i].price} €</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté : ${objectItemsArr[i].quantity}</p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="0" max="100" value="${objectItemsArr[i].quantity}">
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
            rmvObj(e);
        }else{


//                                                           Sinon enregistrement de la nouvelle quantite dans localStorage et affichage de la quantite totale
            for (let x = 0; x<localStorage.length; x++){
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
    for (let i =0; i<localStorage.length; i++){
        document.getElementsByClassName('deleteItem')[i]
        .addEventListener('click', (e) =>{           
            rmvObj(e);
        });
    };

//                                                                             Affichage quantite 
    for (let i = 0; i<localStorage.length; i++){
        let quantityDOM = document.getElementsByClassName('itemQuantity')[i].value;
        cartQuantity += parseInt(quantityDOM);
        document.getElementById('totalQuantity').innerHTML = cartQuantity;


//                                                                             Affichage prix total
    priceDOM = document.getElementsByClassName('cart__item__content__description')[i].querySelector('p').nextElementSibling.textContent;
    cartPrice += parseInt(priceDOM) * quantityDOM;
    document.getElementById('totalPrice').innerHTML = cartPrice;
    };
})
