//generera shoppen
let shop = document.getElementById("shop");

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

let generateShop = () => {
    return (shop.innerHTML = shopItemsData
        .map((x) => {
            let { id, name, price, desc, img } = x;
            let search = basket.find((x) => x.id === id) || []
            return `
    <div id=product-id-${id} class="item">
        <a href="aoc1.html">
          <img src=${img} width="220" />
        </a>
        <div class="details">
          <h3>${name}</h3>
          <p>
            ${desc}
          </p>
            <div class="price">
                <h2>${price} kr</h2>
                <div class="buttons">
                    <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                    <div id=${id} class="quantity">
                    ${search.item === undefined ? 0 : search.item}
                    </div>
                    <i onclick="increment(${id})" class="bi bi-plus-lg"></i>  
                </div>
            </div>
        </div>
    </div>
      `
        }).join(""));
};

generateShop();

// öka eller sänka kvantitet
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
    //console.log(basket)
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
    //console.log(basket)
    update(selectedItem.id);
    
    localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    //console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
};

// kalkylera från kvantitet och pris till varukorg med localstorage
let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

