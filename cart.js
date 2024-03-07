let label = document.getElementById('label');
let shoppingCart = document.getElementById('shopping-cart');

let shopItemsData = [
    {
        id: "AOC1",
        name: "AOC C27G2ZE/BK",
        price: 2750,
        desc: "Lorem ipsum, dolor sit amet consectetur adipisicing.",
        img: "img/AOC01.webp"
    },
    {
        id: "AOC2",
        name: "AOC C32G2ZE/BK",
        price: 3250,
        desc: "Lorem ipsum, dolor sit amet consectetur adipisicing.",
        img: "img/AOC02.webp"
    },
    {
        id: "ASUS1",
        name: "ASUS XG27AQ",
        price: 3750,
        desc: "Lorem ipsum, dolor sit amet consectetur adipisicing.",
        img: "img/ASUS01.webp"
    },
    {
        id: "SAMSUNG1",
        name: "samsung odyssey g9 ls49cg950euxen curved",
        price: 6500,
        desc: "Lorem ipsum, dolor sit amet consectetur adipisicing.",
        img: "img/Samsung01.webp"
    },
    {
        id: "AsusKey1",
        name: "Asus ROG Azoth",
        price: 1520,
        desc: "Lorem ipsum, dolor sit amet consectetur adipisicing.",
        img: "img/asuskey1.webp"
    },
    {
        id: "Logitech1",
        name: "Logitech Pro X TKL Linear",
        price: 1520,
        desc: "Lorem ipsum, dolor sit amet consectetur adipisicing.",
        img: "img/Logitech1.webp"
    }
];

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let generateCartItems = () => {
    if (basket.length !== 0) {
        return (shoppingCart.innerHTML = basket
            .map((x) => {
                let { id, item } = x;
                let search = shopItemsData.find((y) => y.id === id) || [];
                return `
            <div class="cart-item">
                <img width="100" src=${search.img} alt"produkt bild">
                <div class="details">
                    <div class="title-price-x">
                        <h4 class="title-price">
                            <p>${search.name}</p>
                            <p class"cart-item-price">${search.price} kr</p>
                        </h4>
                        <i onclick="remove(${id})" class="bi bi-x-lg"></i>
                    </div>
                    
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity"> ${item} </div>
                    <i onclick="increment(${id})" class="bi bi-plus-lg"></i>  
                </div>
                    
                    <h3>${item * search.price} kr</h3>
                </div>    
            </div>
            `;
            }).join(""));
    } else {
        shoppingCart.innerHTML = ``;
        label.innerHTML = `
        <h2>Varukorgen är tomt</h2>
        <a href="store.html">
            <button class="homeBtn">Gå tillbaka</button>
        </a>
        `;
    }
};

generateCartItems();

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    } else {
        search.item += 1;
    }
    generateCartItems();
    update(selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.item -= 1;
    }
    basket = basket.filter((x) => x.item !== 0);
    generateCartItems();
    update(selectedItem.id);

    localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    //console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    totalAmount();
};

// ta bort varor
let remove = (id) => {
    let selectedItem = id;
    //console.log(selectedItem.id)
    basket = basket.filter((x) => x.id !== selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket));
    generateCartItems();
};

let clearCart = () => {
    basket = [];
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
};

//totala priset
let totalAmount = () => {
    if (basket.length !== 0) {
        let amount = basket.map((x) => {
            let { item, id } = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            return item * search.price;
        }).reduce((x, y) => x + y, 0)
        //console.log(amount)
        label.innerHTML = `
        <h2>Total belopp: ${amount} kr</h2>
        <button class="checkout">Betala nu</button>
        <button onclick="clearCart()" class="removeAll">Ta bort allt</button>
        `
    } else return;
};

totalAmount();