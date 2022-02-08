window.addEventListener("DOMContentLoaded", getProducts);

function getProducts() {
    fetch('http://localhost:3000/api/products')
    .then((res) => res.json())
    .then((data) => {
        let output = "";
        data.forEach(function(product) {
            output += `
                <a href="product.html?id=${product._id}">
                    <article>
                        <img src="${product.imageUrl}" alt="${product.altTxt}">
                        <h3 class="${product.name}">${product.name}</h3>
                        <p class="${product.name}Description">${product.description}</p>
                    </article>
                </a>
            `;
        });
        document.getElementById("items").innerHTML = output;
    })
    .catch((err) => console.log(err));
}