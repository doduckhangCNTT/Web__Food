const iconBars = document.querySelector('.icon__bars')
const iconClose = document.querySelector('.icon__close')
const iconSearch = document.querySelector('.icon__search')
const navContainer = document.querySelector('.nav__container')
const navEl = document.querySelectorAll('.nav__container a')
const searchForm = document.querySelector('.search__form')
const searchInput = document.querySelector('.search__input')


console.log(navEl)

iconBars.addEventListener('click', function() {
    navContainer.classList.add('active')
})
iconClose.addEventListener('click', function() {
    navContainer.classList.remove('active')
})

navEl.forEach((currentNav) => {
    currentNav.addEventListener('click', function() {
        navContainer.classList.remove('active')
    })
})

iconSearch.addEventListener('click', function() {
    searchForm.classList.add('activeSearch')
})

searchForm.addEventListener('click', function() {
    searchForm.classList.remove('activeSearch')
})
searchInput.addEventListener('click', function(e) {
    e.stopPropagation();
})

const Header = document.querySelector('.header')

function showHeader() {
    if(this.scrollY > 200) {
        Header.classList.add('activeHeader')
    }else {
        Header.classList.remove('activeHeader')
    }
}
window.addEventListener('scroll', showHeader);


const sections =document.querySelectorAll('section')
const navLinks = document.querySelectorAll('header .nav__container a')

console.log(navLinks)
function showNav() {
    let scrollY = window.pageYOffset
    sections.forEach(current => {
        let scrollTop = current.offsetTop -150
        let scrollHeight = current.offsetHeight
        let scrollID = current.getAttribute('id')
        if(scrollY >= scrollTop && scrollY < scrollTop + scrollHeight) {
            navLinks.forEach(links => {
                links.classList.remove('nav__active')
                document.querySelector(`header .nav__container a[href*=${scrollID}]`).classList.add('nav__active')
            })
        }
    })
}
const upBtn = document.querySelector('.upBtn')

function showBtnUp () {
    if(this.scrollY > 100) {
        upBtn.classList.add('activeBtnUp')
    } else {
        upBtn.classList.remove('activeBtnUp')
    }
}

window.addEventListener('scroll', showBtnUp)


window.addEventListener('scroll', showNav);



const homeImg = document.querySelector('.home__img img')


var swiper = new Swiper(".home__container", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  
  });

const searchFormAbout = document.querySelector('.search-form')
const searchResults= document.querySelector('.menu__container')
const APP_ID = '231eb943'
const APP_key = '9a7ec44a16787c7a81b753f830ddd83b'
let searchQuery = ''

searchFormAbout.addEventListener('submit', function(e) {
    e.preventDefault()
    searchQuery = e.target.querySelector('input').value
    fetchAPI();
})

async function fetchAPI() {
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&to=6`;

    var stringJson = await fetch(baseURL)
    var stringJs = await stringJson.json()
    console.log(stringJs)
    generateHTML(stringJs.hits)
}

function generateHTML(current) {
    let htmls = ''
    current.map(value => {
        htmls += `
        <div class="menu__content">
            <div class="menu__img">
                <img src="${value.recipe.image}" 
                alt="" />
                <div class="menu__img-icon">
                    <a target="_blank" href="${value.recipe.url}" class="fas fa-eye icon-eye"></a>
                    <i class="fas fa-heart icon-heart"></i>
                </div>
            </div>
            <div class="menu__content-info">
                <div class="menu__content-buy">
                    <div class="menu__content-icon">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star-half-alt"></i>
                    </div>
                    <h3 class="menu__content-title">${value.recipe.label}</h3>
                    <p class="menu__content-description">${value.recipe.ingredientLines}</p>
                </div>
                <div class="menu__content-price">
                    <a class="btn-primary">
                        Add to Card
                    </a>
                    <span>${parseFloat(value.recipe.digest[0].total).toFixed(2)}</span>$
                </div>
            </div>
        </div>
        `
    })
    searchResults.innerHTML = htmls
}

const addCart = document.querySelectorAll(".btn-primary")
console.log(addCart.length)

addCart.forEach((btn, index) => {
    btn.addEventListener("click", (e) => {{
        e.preventDefault()
        let addItem = e.target
        let element = addItem.closest(".dishes__info")
        let addCartImg = element.querySelector("img").src
        let addCartName = element.querySelector("h3").innerText
        let addCartPrice = element.querySelector("span").innerText
        console.log(addCartImg, addCartName, addCartPrice)
        addProductCart(addCartImg, addCartName, addCartPrice)
    }})
})

addCart.forEach((btn, index) => {
    btn.addEventListener("click", (e) => {{
        e.preventDefault()
        let addItem = e.target
        let element = addItem.closest(".menu__content")
        console.log(element)
        let addCartImg = element.querySelector("img").src
        let addCartName = element.querySelector("h3").innerText
        let addCartPrice = element.querySelector("span").innerText
        console.log(addCartImg, addCartName, addCartPrice)
        addProductCart(addCartImg, addCartName, addCartPrice)
    }})
})

function addProductCart(addCartImg, addCartName, addCartPrice) {
    var addElement = document.createElement("div")
    var addContent = `
        <div class="show__cart-info">
            <div class="img__cart">
                <img
                src="${addCartImg}"
                alt=""
                />
            </div>
            <div class="show__cart-desc">
                <span class="add_CartItem">${addCartName}</span>
                <input class="qualityCart" value="1" type="number" min="1" max="5">
            </div>
            <div class="price__sp">${addCartPrice}</div>
            <button class="deleteCartItem" >Xoa</button>
        </div>
    `

    var cartItem = document.querySelectorAll('.show__mycart .show__cart-info')
    for(var i = 0; i < cartItem.length; i++) {
        const productName = document.querySelectorAll(".add_CartItem")
        console.log(productName[i].innerHTML, addCartName)
        if(addCartName ===  productName[i].innerText) {
            alert('Sp đã có trong giỏ hàng')
            return 
        }
    }
    addElement.innerHTML = addContent
    var myCart_Product = document.querySelector('.show__mycart')
    myCart_Product.append(addElement)
    
    cartTotal()

    const callBtnDelete = document.querySelectorAll(".deleteCartItem")
    console.log(callBtnDelete.length)
    for(var i = 0; i < callBtnDelete.length; i++) {
        callBtnDelete[i].addEventListener('click', deleteCartItem(i) )
    }
}

function deleteCartItem(i) {
    const deleteCart = document.querySelectorAll('.deleteCartItem')
    console.log(deleteCart, i)
    var cartItem = document.querySelectorAll('.show__mycart .show__cart-info')
    console.log(cartItem)

    // for(var i = 0; i < cartItem.length; i++) {
        let productName = cartItem[i].querySelector(".add_CartItem").innerText
        console.log(productName)
        deleteCart[i].addEventListener('click', (e) => {
            e.preventDefault();
            var deleteItem = e.target
            console.log(i)
            var delete1 = deleteItem.closest(".show__cart-info")
            var deleteName = delete1.querySelector('.add_CartItem').innerText
            console.log(deleteName, productName, cartItem[i])

            if(deleteName ===  productName) {
                cartItem[i].remove();
                console.log("Ok", cartItem.length)
                cartTotal()
                return 
            }
        })
    // }
}

function cartTotal() {
    var cartItem = document.querySelectorAll('.show__mycart .show__cart-info')
    var numberCart = document.querySelector(".number__cart")
    var cartTotalPrice = document.querySelector(".total span")
    var cartQuantity = document.querySelector(".qualityCart")
    numberCart.innerHTML = cartItem.length
    console.log(cartItem.length)
    
    var cartShowProduct = []
    cartShowProduct.push(cartItem)
    console.log(cartShowProduct)
    var total = 0;
    for(var i=0; i< cartItem.length; i++) {
        var qualityProduct = cartItem[i].querySelector(".qualityCart").value
        var productPrice = cartItem[i].querySelector(".price__sp").innerHTML
        total += +productPrice* +qualityProduct
    }
    console.log(total, cartItem.length)
    cartTotalPrice.innerHTML = parseFloat(total).toFixed(2)
}











const iconCart = document.querySelector('.icon__cart')
const myCart = document.querySelector('.show__mycart')

iconCart.addEventListener('click', function() {
    myCart.classList.toggle('activeCart')
})

var swiper = new Swiper(".review__container", {
    slidesPerView: 3,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

function loader() {
    document.querySelector('.loader-container').classList.add('fade-out')
}

function fadeOut() {
     setInterval(loader, 500)
}
window.onload = fadeOut;









