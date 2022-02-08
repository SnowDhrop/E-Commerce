//                   Recuperation de l'URL
const url = new URL(window.location.href);
const search_params = new URLSearchParams(url.search);
let id = search_params.get("id")


//                                                                                              Fetch
function getProduct(){
    fetch('http://localhost:3000/api/products/:id')
    .then((res) => res.json())
    .then((data) => {
//                                                                                      Si l'URL a le terme "id" je parcours chaque objet du fetch
        if (search_params.has('id')){    
            data.forEach(function(product){
//                                                                                  Si l'id de l'objet parcouru correspond a l'id recupere dans l'url, j'insere les ptes de l'objet dans le DOM
                if (product._id === search_params.get("id")){

                    document.getElementsByClassName('item__img')[0].innerHTML = `<img src = "${product.imageUrl}" alt="${product.altTxt}" >`;

                    document.getElementById('title').innerHTML = product.name;

                    document.getElementById('price').innerHTML = product.price;

                    document.getElementById('description').innerHTML = product.description;
//                                                                          Je fais une boucle pour recuperer toutes les couleurs du produit
                    for (let i = 0; i<product.colors.length; i++){
                        document.getElementById('colors').innerHTML += `<option value="${product.colors[i]}">${product.colors[i]}`
                    }

                    
//                                                                       Bouton "ajouter au panier"
                    document.getElementById('addToCart').addEventListener('click', event => {

                        event.preventDefault();
//                                                                      Ajoute le produit au panier seulement si quantite>0
                        if (document.getElementById("quantity").value > 0 && document.getElementById("colors").value){
                            let productCart = {};
    
                            productCart.id = product._id;

                            productCart.price = product.price;

                            productCart.name = product.name;
    
                            productCart.color = document.getElementById('colors').value;
                            
                            productCart.quantity = document.getElementById('quantity').value;
    
                            productName = product._id+" "+document.getElementById('colors').value;
    
                            localStorage.setItem(productName, JSON.stringify(productCart));

                        }                        
                    })          
                }
            }) 

        }else{
            console.log ("Veuillez sélectionner un produit")
            }

    })
    .catch((err) => console.log(err));
};







