let cartQuantity = 0;
let cartPrice = 0;



let objectItemsArr = [];

for (let i=0; i<localStorage.length; i++){                                  // Je parcours chaque entree de localStorage

    objectKey = localStorage.key(i);                                      //          Je recupere la cle de chaque entree dans objectKey               
                                                                        //        objectItemsArr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));    <==           Version courte               ==>>
    let objectItem = JSON.parse(localStorage.getItem(objectKey))            //      Je recupere l'entree qui correspond a la cle, la parse et la stocke dans objectItem       
    objectItemsArr.push(objectItem);                                    //          Je push objectItem dans objectItemArr pour stocker chaque entree du localStorage dans une variable
}

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

setTimeout(() =>{

    console.log(objectItemsArr);



    objectItemsArr.forEach(product => {

        document.querySelector("#cart__items")
        .addEventListener('change', (e) => {

            e.target
            .previousElementSibling
            .innerHTML =  "Qté : " + e.target.value;


            console.log(e.target.value);

        })  
    })
}, 500)