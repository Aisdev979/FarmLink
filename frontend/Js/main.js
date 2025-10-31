// js/main.js

let productsParent = document.querySelector('.product');
const categories = document.querySelector('#categories');
const marketPlaceBtn = document.querySelector('.marketplace__button');

let allProducts = [];

// ✅ toggle between mock data and JSON fetch
const USE_MOCK = true;

async function getData() {
    try {
        if (USE_MOCK) {
            // from mockData.js
            allProducts = mockProducts;
        } else {
            // from local data.json
            const res = await fetch('../data/data.json');
            allProducts = await res.json();
        }
    } catch (error) {
        console.log("Error loading data:", error);
    }
}

function renderProducts(products) {
    productsParent.innerHTML = '';

    products.map(data => {
        let productCard = 
        `
            <div id="product-details" class="product__card">

                <img src="${data.image}" alt="${data.productName}" class="product__image" />

                <div class="details">
                    <div class="product__farmer">
                        <img src="${data.farmer.logo}" alt="${data.farmer.name} logo" class="product__farmer-logo" />
                        <div class="product__farmer-info">
                            <p class="product__farmer-name">${data.farmer.name}</p>
                            <span class="product__farmer-location">
                                <img src="./assets/location.png" alt="Location icon" class="product__location-icon">
                                ${data.farmer.location}
                            </span>
                        </div>
                    </div>

                    <h3 class="product__name">${data.productName}</h3>
                    <p class="product__description">
                        ${data.description}
                    </p>

                    <div class="product__pricing">
                        <p class="product__price">
                            <strong class="product__price-value">${data.price}</strong>
                            <span class="product__price-unit">/${data.unit}</span>
                        </p>

                        <div class="product__availability">
                            <div class="product__availability-count">
                                <img src="./assets/house.png" alt="House icon" class="product__availability-icon" />
                                <p class="product__availability-number">${data.available}</p>
                            </div>
                            <span class="product__availability-label">Available</span>
                        </div>
                    </div>

                    <div class="contact">
                        <button>
                            <div>
                                <img src="./assets/call.png" alt="call logo" />
                                <p>Call</p>
                            </div>
                        </button>
                        <button>
                            <div>
                                <img src="./assets/whatsapp.png" alt="whatsapp logo" />
                                <p>Whatsapp</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        productsParent.innerHTML += productCard;
    });
}

async function init() {
    await getData();
    renderProducts(allProducts);
}

init();

categories.addEventListener('change', async (event) => {
    const selectedCategory = event.target.value;
    const filteredProducts = allProducts.filter(data => data.category === selectedCategory);

    renderProducts(filteredProducts);

    if (filteredProducts.length === 0) {
        productsParent.innerHTML = `<p class='invalid'>Not available</p>`;
    }
});

marketPlaceBtn.addEventListener('click', init);
