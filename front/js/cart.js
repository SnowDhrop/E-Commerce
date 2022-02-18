let cartQuantity = 0;
let cartPrice = 0;


let productCart = JSON.parse(localStorage.getItem("cart"));


//                                                          rmvObj permet de supprimer un produit ET de modifier la quantite/prix total en consequence
function rmvObj(e){
//  Enregistrement du nom du produit sélectionné et de sa couleur dans deux variables différentes
    let productName = e.target.closest('article').querySelector('h2').textContent;
    let productColor = e.target.closest('article').querySelector('.cart__item__content__description').querySelector('p').textContent;

    if (productCart.find(x => x.name ===  productName && x.color === productColor)){       
//      Enregistrement du produit trouve et de sa clef dans deux variables differentes 
        let productFound = productCart.find(x => x.name === productName && x.color === productColor);
        let productIndex = productCart.indexOf(productFound);
//      Ajustement de la quantite totale et affichage  
        cartQuantity -= productFound.quantity;
        document.getElementById('totalQuantity').innerHTML = cartQuantity;
//      Ajustement du prix total et affichage
        cartPrice -= productFound.quantity * productFound.price;
        document.getElementById('totalPrice').innerHTML = cartPrice;
//      Suppression du produit dans tableau
        productCart.splice(productIndex, 1);
//      Insertion du tableau dans le localStorage
        localStorage.setItem("cart", JSON.stringify(productCart));
//      Suppression du produit dans le DOM
        e.target.closest('article').remove();

    }
}      


function changeQuantity(e){
//  Enregistrement du nom du produit sélectionné et de sa couleur dans deux variables différentes
    let productName = e.target.closest('article').querySelector('h2').textContent;
    let productColor = e.target.closest('article').querySelector('.cart__item__content__description').querySelector('p').textContent;
//                  Recherche du produit s'il existe
    if (productCart.find(x => x.name ===  productName && x.color === productColor)){
//      Enregistrement du produit trouve et de sa clef dans deux variables differentes  
        let productFound = productCart.find(x => x.name === productName && x.color === productColor);
        let productIndex = productCart.indexOf(productFound);
//      Ajustement de la quantite totale et affichage    
        cartQuantity += e.target.value - productFound.quantity;
        document.getElementById('totalQuantity').innerHTML = cartQuantity;
//      Ajustement du prix total et affichage
        cartPrice += (e.target.value - productFound.quantity) * productFound.price;
        document.getElementById('totalPrice').innerHTML = cartPrice;
//      Enregistrement de la nouvelle quantite dans tableau   
        productCart[productIndex].quantity = parseInt(e.target.value);
//      Enregistrement du tableau dans localStorage   
        localStorage.setItem("cart", JSON.stringify(productCart));
    }
};


function change(){
    document.querySelector("#cart__items")
        .addEventListener('change', (e) => {
//          Affichage de la nouvelle valeur rentrée par l'utilisateur
            e.target.previousElementSibling.innerHTML =  "Qté : " + e.target.value;   
//          Si la valeur = 0, suppression de l'objet (dom et localStorage)     
            if (e.target.value == 0){
                rmvObj(e);           
            }else{
    
//  Sinon enregistrement de la nouvelle quantite dans localStorage et affichage de la quantite/prix total
            changeQuantity(e);
        } 
    });  
}


function deleteButton(){
    document.querySelector('#cart__items')
    .addEventListener('click', (e) =>{ 
//      Si le bouton sur lequel l'utilisateur clique contient deleteItem, suppression de l'objet 
        if (e.target.classList.contains('deleteItem')){          
           rmvObj(e);
       };
   });
};


function displayPriceQuantity(i){
//                      Affichage quantite totale
    cartQuantity += parseInt(productCart[i].quantity);
    document.getElementById('totalQuantity').innerHTML = cartQuantity;

//                      Affichage prix total
    cartPrice += productCart[i].price * productCart[i].quantity;
    document.getElementById('totalPrice').innerHTML = cartPrice;

}

function displayDOM(){
//  Parcours tous les objets du tableau
    for (let i = 0; i < productCart.length; i++){
        fetch ('http://localhost:3000/api/products/' + productCart[i]._id ) 
        .then (res => res.json())
        .then (data => {
//                                      Affichage du DOM
            document.getElementById("cart__items").innerHTML += `
                <article class="cart__item" data-id="${data._id}" data-color="${data.color}">                                       
                    <div class="cart__item__img">
                        <img src="${data.imageUrl}">
                    </div>

                    <div class="cart__item__content">
                        <div class="cart__item__content__description">
                            <h2>${data.name}</h2>
                            <p>${productCart[i].color}</p>
                            <p>${data.price} €</p>
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
//         Enregistrement du prix dans tableau
            productCart[i].price = data.price;
//           Affichage prix/quantite                  
            displayPriceQuantity(i);
        });  
    }
};

displayDOM();

change();
deleteButton();