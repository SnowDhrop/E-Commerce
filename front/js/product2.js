//                                                                                      Recuperation de l'URL
const url = new URL(window.location.href);
const search_params = new URLSearchParams(url.search);
let id = search_params.get("id")
let product="";



getProduct();
//                                                                                              Fetch
function getProduct(){
    fetch('http://localhost:3000/api/products/' + id)
    .then((res) => res.json())
    .then((data) => {

//                                                                                      Construction du DOM
                    document.getElementsByClassName('item__img')[0].innerHTML = `<img src = "${data.imageUrl}" alt="${data.altTxt}" >`;

                    document.getElementById('title').innerHTML = data.name;

                    document.getElementById('price').innerHTML = data.price;

                    document.getElementById('description').innerHTML = data.description;

//                                                                    Je fais une boucle pour recuperer toutes les couleurs du produit
                    for (let i = 0; i<data.colors.length; i++){
                        document.getElementById('colors').innerHTML += `<option value="${data.colors[i]}">${data.colors[i]}`
                    }
                    product = data;

                    
     
    })
    .catch((err) => console.log(err));
};



//                                                                               Bouton "ajouter au panier"
document.getElementById('addToCart').addEventListener('click', event => {

    event.preventDefault();
//                                                                      Ajoute le produit au panier seulement si quantite>0
    if (document.getElementById("quantity").value > 0 && document.getElementById("colors").value){

        product.color = document.getElementById('colors').value;
        product.quantity = parseInt(document.getElementById('quantity').value);
        console.log(product._id +" "+product.color);


//                                          Si le produit (meme couleur) est deja present dans le localStorage, j'ajoute la valeur de localStorage.quantity a product.quantity
        if (localStorage[product._id + " " + product.color]){         
            let localStorageProduct = JSON.parse(localStorage.getItem(product._id + " " + product.color));

            if (localStorageProduct.color = product.color){
                product.quantity += parseInt(localStorageProduct.quantity);
            }
        }

//                                                                        Puis j'ajoute le produit au localStorage
        localStorage.setItem(product._id + " " +product.color, JSON.stringify(product));

        console.log(localStorage);
    }                        
})     
console.log(localStorage);