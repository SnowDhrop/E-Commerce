//                                              Chemin du formulaire
let form = document.querySelector(".cart__order__form");

//                                               Definition des regex
const nameRegex = new RegExp('^[A-Za-z\'àâäéèêëïîôöùûüç-]{1,50}$');
const adressRegex = new RegExp('^[0-9]{1,3}( [0-9A-Za-z\'àâäéèêëïîôöùûüç-]+)+$');
const cityRegex = new RegExp ('^([0-9A-Za-z\'àâäéèêëïîôöùûüç-] ?){1,58}$');
const emailRegex = new RegExp ('^([a-z0-9]+[-._]?[a-z0-9]+)+@([a-z0-9]+[_-]?){2,}\.[a-z]{2,4}$');


//                                              Fonctions validation des champs + messages
class Valid {
    static firstName() {
        if (!nameRegex.test(firstName.value)){
           firstName.nextElementSibling.innerHTML = "Veuillez remplir ce champ";
        }else{
            firstName.nextElementSibling.innerHTML ="";
        }
    }

    static lastName(){
        if (!nameRegex.test(lastName.value)){
            lastName.nextElementSibling.innerHTML = "Veuillez remplir ce champ";
         }else{
            lastName.nextElementSibling.innerHTML ="";
         }
    }

    static adress(){
        if (!adressRegex.test(adress.value)){
            adress.nextElementSibling.innerHTML = "Veuillez remplir ce champ"
        }else{
            adress.nextElementSibling.innerHTML ="";
        }
    }

    static city(){
        if (!cityRegex.test(city.value)){
            city.nextElementSibling.innerHTML = "Veuillez remplir ce champ";
        }else{
            city.nextElementSibling.innerHTML = "";
        }
    }

    static email(){
        if (!emailRegex.test(email.value)){
            email.nextElementSibling.innerHTML = "Veuillez remplir ce champ"
        }else{
            email.nextElementSibling.innerHTML = "";
        }
    }
}

//                                              Ecoute des champs + validation

form.firstName.addEventListener("change", e =>{
    Valid.firstName();
})

form.lastName.addEventListener("change", e => {
    Valid.lastName();
})

form.adress.addEventListener("change", e => {
    Valid.adress();
})

form.city.addEventListener("change", e => {
    Valid.city();
})

form.email.addEventListener("change", e => {
    Valid.email();
});



//                                              Quand on clique sur "Commander !"
document.getElementById("order").addEventListener('click', e =>{

    e.preventDefault();

//                                              Verifie si champs ne sont pas vides
    if (firstName.value
        && lastName.value
        && adress.value
        && city.value
        && email.value){

//                                              Verifie qu'il n'y a pas de message d'erreur
            if (firstNameErrorMsg.textContent !== "Veuillez remplir ce champ" &&
                lastNameErrorMsg.textContent !== "Veuillez remplir ce champ" &&
                cityErrorMsg.textContent !== "Veuillez remplir ce champ" &&
                adressErrorMsg.textContent !== "Veuillez remplir ce champ" &&
                emailErrorMsg.textContent !== "Veuillez remplir ce champ"){

//                                              Creation de l'objet contact
                    let contact = {
                        firstName: firstName.value,
                        lastName: lastName.value,
                        address: adress.value,
                        city: city.value,
                        email: email.value
                    }

//                                              Creation du tableau des id des produits
                    let products = JSON.parse(localStorage.getItem("cart"));
                    let productsSend=[];
                    
                    for (let i=0; i<products.length; i++){                       
                        productsSend.push(products[i]._id);
                    }

//                                                 Envoi de la requete + reception de l'orderId
                    fetch ('http://localhost:3000/api/products/order', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            contact: contact,
                            products: productsSend
                        })
                    })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data.orderId);
                        document.location= 'confirmation.html?id=' + data.orderId;

                    })
                    .catch(err => console.log(err))

//                                      Si des messages d'erreurs sont encore actifs lorsque l'utilisateur clique sur "Commander !"
            }else{
                alert('Veuillez remplir correctement tous les champs');
            }

//                                     S'il y a des champs vides
    }else{
        alert('Veuillez remplir tous les champs');
    }
})                                               