'use strict';

const list = document.querySelector('#list');
const cart = document.querySelector('#cart');
const total = document.querySelector('#total');
const clear = document.querySelector('#clear');
const checkout = document.querySelector('#checkout');
const balance = document.querySelector('#balance');

const popup = document.querySelector('#popup');
const popupConfirm = document.querySelector('#popup-confirm');
const popupNoItems = document.querySelector('#popup-no-items');
const popupNoMoney = document.querySelector('#popup-no-money');
const popupSucceed = document.querySelector('#popup-succeed');

let totalSum = 0;
let balanceSum = 400;

const listItems = [
    {
        name: 'Antique Chair',
        url: './res/antique-chair.jpg',
        price: '999.00'
    },

    { 
        name: 'Bed Table',
        url: './res/bed-table.jpg',
        price: '65.99'
    },

    { 
        name: 'Blue Chair',
        url: './res/blue-chair.jpg',
        price: '150.00'
    },

    {
        name: 'Green Cupboard',
        url: './res/green-cupboard.jpg',
        price: '80.00'
    },

    {
        name: 'Modern Sofa',
        url: './res/modern-sofa.jpg',
        price: '249.99'
    },

    {
        name: 'Old Chair',
        url: './res/old-chair.jpg',
        price: '13.00'
    },

    {
        name: 'Pink Chair',
        url: './res/pink-chair.jpg',
        price: '88.49'
    },

    {
        name: 'Plastic Chair',
        url: './res/plastic-chair.jpg',
        price: '10.00'
    },

    {
        name: 'Round Chair',
        url: './res/round-chair.jpg',
        price: '24.69'
    },

    {
        name: 'Stool',
        url: './res/stool.jpg',
        price: '19.99'
    },

    {
        name: 'White Chair',
        url:'./res/white-chair.jpg',
        price: '178.00'
    },

    {
        name: 'Yellow Chair',
        url: './res/yellow-chair.jpg',
        price: '120.00'
    }
];

const clearCartAndTotal = () => {
    cart.innerHTML = '';
    totalSum = 0;
    total.textContent = `£0.00`;
}

const init = () => {
    /*initialize dynamically list items (left section)*/
    listItems.map(curr => {
        list.insertAdjacentHTML('beforeend', 
            `
                <div class="cart__box column transition-fast" style="background-image: linear-gradient(rgba(0,0,0,0.47), rgba(0,0,0,0.47)), url(${curr.url})">
                    <h2 class="cart__h2">${curr.name}</h2>

                    <h2 class="cart__h2--pricing">£${curr.price}</h2>

                    <button class="cart__btn cart__btn--gold center transition">+ Add</button>

                    <!-- PLACING IMAGE URL HERE SO I CAN EASILY DOM TRAVERSE AND GET .TEXTCONTENT URL FOR +Add button -->
                    <h5 style="position: absolute; display: none;">${curr.url}</h5>
                </div>
            `
        );
    });

    //EVENT DELEGATION ON PARENT LIST CONTAINER (good for when dynamically generating elements you want to DOM select)
    list.addEventListener('click', (e) => {
        const itemImg = e.target.nextElementSibling.textContent;
        const itemName = e.target.previousElementSibling.previousElementSibling.textContent;
        const itemPrice = e.target.previousElementSibling.textContent;

        //guard clause
        if(!e.target.closest('.cart__list')) return;
        
        cart.insertAdjacentHTML('beforeend', 
            `
                <div class="cart__item row transition">
                    <img class="cart__img" src="${itemImg}">

                    <div class="cart__item--column column">
                        <h3 class="cart__h3">${itemName}</h3>

                        <h2 class="cart__h2 cart__h2--black">${itemPrice}</h2>
                    </div>

                    <button class="cart__icon-btn center">
                        <svg class="cart__icon cart__icon--gold transition">
                            <use xlink:href="./res/sprite.svg#icon-trash"></use>
                        </svg>
                    </button>
                </div>
            `
        );

        /*add price to total; remove £ sign and convert to float, increment from total and result to 2dp*/
        totalSum += Number.parseFloat(itemPrice.slice(1));
        total.textContent = `£${totalSum.toFixed(2)}`;
    });

    //EVENT DELEGATION ON PARENT CART CONTAINER
    cart.addEventListener('click', (e) => {
        if(!e.target.closest('.cart__shopping')) return;

        //getting price located in DOM relative from e.target
        const deletedPrice = e.target.closest('.cart__item').firstElementChild.nextElementSibling.lastElementChild.textContent;
        
        /*remove price from total; remove £ sign and convert to float, decrement from total and result to 2dp*/
        totalSum -= Number.parseFloat(deletedPrice.slice(1));
        total.textContent = `£${totalSum.toFixed(2)}`;

        e.target.closest('.cart__item').remove();
    });
};

init();

    

//EVENT DELEGATION ON PARENT POPUP CONTAINER
popup.addEventListener('click', (e) => {
    if(e.target.classList.contains('popup__btn--yes')){
        e.target.closest('.popup__box').classList.add('hidden');
        e.target.closest('.popup__box').nextElementSibling.nextElementSibling.nextElementSibling.classList.remove('hidden');

        balanceSum = (balanceSum - totalSum).toFixed(2);
        balance.textContent = `£${balanceSum}`;

        clearCartAndTotal(); 
    } else {
        e.target.closest('.popup__box').classList.add('hidden');
        popup.classList.add('hidden');

        //removing 'flash' animation class, so if pressed again will play animation
        if(e.target.closest('.popup__box').firstElementChild.classList.contains('flash')) e.target.closest('.popup__box').firstElementChild.classList.remove('flash');
    }
});



//CHECKOUT BUTTON
checkout.addEventListener('click', () => {
    popup.classList.remove('hidden');

    if(cart.innerHTML === '') {
        popupNoItems.classList.remove('hidden');
        popupNoItems.firstElementChild.classList.add('flash');
        return;
    }

    if(balanceSum < totalSum) {
        popupNoMoney.classList.remove('hidden');
        popupNoMoney.firstElementChild.classList.add('flash');
        return;
    };

    popupConfirm.classList.remove('hidden');
});



//CLEAR BUTTON
clear.addEventListener('click', () => {
    clearCartAndTotal(); 
});
