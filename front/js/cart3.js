                                  // RECUPERATION DES OBJETS DANS LOCALSTORAGE + DONNEES SUR SERVEUR + GENERATION DE PAGE AVEC CES DONNEES    //
let cartQuantity = 0;
let cartPrice = 0;



let objectItemsArr = [];

for (let i=0; i<localStorage.length; i++){                                  // Je parcours chaque entree de localStorage

    let objectKey = localStorage.key(i);                                      //          Je recupere la cle de chaque entree dans objectKey               
                                                                        //        objectItemsArr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));    <==           Version courte               ==>>
    let objectItem = JSON.parse(localStorage.getItem(objectKey))            //      Je recupere l'entree qui correspond a la cle, la parse et la stocke dans objectItem       
    objectItemsArr.push(objectItem);                                    //          Je push objectItem dans objectItemArr pour stocker chaque entree du localStorage dans une variable
}

// console.log(objectItemsArr);
// console.log(localStorage);
// console.log(localStorage.key(0));

fetch('http://localhost:3000/api/products')
.then((res) => res.json())
.then((data) => {
    data.forEach(function(product){                                                 // Je parcours chaque objet du serveur

        for (let i =0; i<objectItemsArr.length; i++){                               // Je parcours chaque entree de objectItemsArr 

            if (objectItemsArr[i].id === product._id){                    // Je regarde si l'id de chaque entree de objectItemsArr correspond a l'id de l'objet parcouru sur le serveur

                objectItemsArr
                document
                .getElementById("cart__items")                              // Si ca correspond je genere une page
                .innerHTML += `
                    <article class="cart__item" data-id="${product._id}" data-color="${objectItemsArr[i].color}">                                       
                        <div class="cart__item__img">
                            <img src="${product.imageUrl}">
                        </div>
                        <div class="cart__item__content">
                            <div class="cart__item__content__description">
                                <h2>${product.name}</h2>
                                <p>${objectItemsArr[i].color}</p>
                                <p>${product.price} €</p>
                            </div>
                            <div class="cart__item__content__settings">
                                <div class="cart__item__content__settings__quantity">
                                    <p>Qté : ${objectItemsArr[i].quantity}</p>
                                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${objectItemsArr[i].quantity}">
                                </div>
                                <div class="cart__item__content__settings__delete">
                                    <p class="deleteItem">Supprimer</p>
                                </div>
                            </div>
                        </div>
                    </article> -->
                `; 

                // console.log(product)

                
                
            }
        }
    })    
});


                                         // GESTION  DE LA QUANTITEE ET SUPPRESSION D'ARTICLES //

// setTimeout(() =>{

//     for (let i = 0; i<localStorage.length; i++){

//         document
//         .getElementsByClassName('itemQuantity')[i]
//         .addEventListener('change', (event) => {
//                                                                                                         / Ca c'etait avant que je ne decouvre les siblings... ///
//             document.getElementsByClassName('cart__item__content__settings__quantity')[i]
//             .querySelector('p').innerHTML = `Qté : ${event.target.value}`;

//             if (event.target.value == 0){
//                 console.log('supprimé !')
//             }

//         })
//     }
// }, 1000);

// console.log(objectItemsArr)



setTimeout(() =>{

    for (const key in localStorage){

        if (localStorage.hasOwnProperty(key)){
            let key = localStorage.key(key);

                                                            // Change quantity 
        document
        .getElementsByClassName('itemQuantity')[localStorage.key(key)]                                                            
        .addEventListener('change', (event) => {
                 
            event.target
            .previousElementSibling
            .innerHTML = `Qté : ${event.target.value}`;       
            
            objectItemsArr[i].quantity = event.target.value;


                                                        // Delete item if quantity = 0
        if (event.target.value == 0){

            event.target.closest('article').remove();
            localStorage.removeItem(key);
            
            console.log(event.target.closest('article'));
            console.log(objectItemsArr)
        }

        console.log(localStorage);
console.log(objectItemsArr);

        })

        





                                                                                       // Delete Item //
    // document.getElementsByClassName("deleteItem")[i]
    //     .addEventListener('click', (event) => {

    //         console.log(objectItemsArr);
    //         console.log(i);

    //         if  (document.getElementsByClassName("deleteItem").length <=1){
    //             event.target
    //             .closest('article')
    //             .remove();
    //             objectItemsArr.splice(0, 1);
    //             localStorage.removeItem(localStorage.key(0));

    //         }else{
    //             event.target
    //             .closest('article')
    //             .remove()
    //             objectItemsArr.splice(i, 1);
    //             localStorage.removeItem(localStorage.key(i));
    //         }  
    //     })    
        }
    }   
}, 500);





// for (let i = 0; i<objectItemsArr.length; i++){
//     cartQuantity += parseInt(objectItemsArr[i].quantity);
//     document.getElementById('totalQuantity').innerHTML = cartQuantity;                                      // Affichage de la quantite et du prix total du panier

//     cartPrice += parseInt(objectItemsArr[i].price) * parseInt(objectItemsArr[i].quantity);
//     document.getElementById('totalPrice').innerHTML = cartPrice;
// }




// window.onload = function() {
//     console.log(localStorage);
//     console.log(objectItemsArr)

// }
