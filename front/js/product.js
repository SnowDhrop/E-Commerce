//                                                                                      Recuperation de l'URL
const url = new URL(window.location.href);
const search_params = new URLSearchParams(url.search);
let id = search_params.get("id")
let product={};
let productCart = [];



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
                    product._id = data._id;
                    product.name = data.name;
                    product.imageUrl = data.imageUrl;
               
    })
    .catch((err) => console.log(err));
};


//                                                                               Bouton "ajouter au panier"
document.getElementById('addToCart').addEventListener('click', event => {

    event.preventDefault();

    product.color = document.getElementById('colors').value;
    product.quantity = parseInt(document.getElementById('quantity').value);

//                                                                      Ajoute le produit au panier seulement si quantite > 0
    if (document.getElementById("quantity").value > 0 && document.getElementById("colors").value){

        
//                Si il y a quelque chose dans le localStorage, j'enregistre le localStorage dans un tableau 

            productCart = JSON.parse(localStorage.getItem("cart")) || [];

            let productFoundIndex = productCart.findIndex(x=> x._id === product._id && x.color === product.color);

//                           Si il y a un objet dans le tableau qui a le meme id et la meme couleur, j'incremente la nouvelle quantite a l'objet puis j'enregistre le tableau dans le localStorage           
                if (productFoundIndex>=0){                                       
                    productCart[productFoundIndex].quantity += product.quantity;    
                    console.log(productCart[productFoundIndex]);                

//                    Sinon je rajoute l'objet au tableau productCart et je l'enregistre dans le localStorage
                }else{
                    productCart.push(product);
                    
                }           
//                 Puis j'ajoute le produit au localStorage
        localStorage.setItem("cart", JSON.stringify(productCart));
    }                        
})     

