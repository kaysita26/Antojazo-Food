const WHATSAPP="51992044102"

const products=[

  {
    id:1,
    name:"Pollo Broaster",
    category:"pollo",
    price:10,
    image:"https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=1200"
  },

  {
    id:2,
    name:"Hamburguesa Clásica",
    category:"burger",
    price:14,
    image:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200"
  },

  {
    id:3,
    name:"Salchipapa Especial",
    category:"salchi",
    price:15,
    image:"https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=1200"
  },

  {
    id:4,
    name:"Chicha Morada",
    category:"drink",
    price:5,
    image:"https://images.unsplash.com/photo-1547592180-85f173990554?w=1200"
  }

]

let cart=[]
let selectedProduct=null
let qty=1

const creamNames=[
  "Ají",
  "Mayonesa",
  "Ketchup",
  "Mostaza",
  "BBQ",
  "Tártara",
  "Golf",
  "Aceituna"
]

let creamCounts={}

renderProducts(products)

function renderProducts(list){

  document.getElementById("products").innerHTML=list.map(p=>`

    <div class="card">

      <img src="${p.image}">

      <div class="card-body">

        <h3>${p.name}</h3>

        <p>Delicioso y recién preparado</p>

        <div class="price">
          Desde S/${p.price}
        </div>

        <button onclick="openProduct(${p.id})">
          Personalizar
        </button>

      </div>

    </div>

  `).join('')

}

function filterProducts(category){

  if(category==="all"){
    renderProducts(products)
    return
  }

  renderProducts(
    products.filter(p=>p.category===category)
  )

}

function openProduct(id){

  selectedProduct=products.find(p=>p.id===id)

  qty=1

  creamCounts={}

  creamNames.forEach(c=>{
    creamCounts[c]=0
  })

  document.getElementById("productModal").style.display="flex"

  document.getElementById("modalTitle").innerHTML=selectedProduct.name

  document.getElementById("modalImage").src=selectedProduct.image

  let html=''

  if(selectedProduct.category==="pollo"){

    html+=`

      <div class="option-group">

        <h4>Tamaño</h4>

        <div class="option-row">

          <div class="option">
            <label>
              <input type="radio" name="size" value="10" checked>
              1/8 • S/10
            </label>
          </div>

          <div class="option">
            <label>
              <input type="radio" name="size" value="16">
              1/4 • S/16
            </label>
          </div>

        </div>

      </div>

      <div class="option-group">

        <h4>Presa</h4>

        <div class="option-row">

          <div class="option">
            <label>
              <input type="radio" name="presa" checked>
              Pecho + Ala
            </label>
          </div>

          <div class="option">
            <label>
              <input type="radio" name="presa">
              Pierna + Encuentro
            </label>
          </div>

        </div>

      </div>

      <div class="option-group">

        <h4>Guarniciones</h4>

        <div class="option-row">

          <div class="option">
            <label>
              <input type="checkbox" checked>
              Papas
            </label>
          </div>

          <div class="option">
            <label>
              <input type="checkbox" checked>
              Ensalada
            </label>
          </div>

          <div class="option">
            <label>
              <input type="checkbox" checked>
              Arroz
            </label>
          </div>

          <div class="option">
            <label>
              <input type="checkbox">
              Chaufa +3
            </label>
          </div>

        </div>

      </div>

    `
  }

  if(selectedProduct.category==="burger"){

    html+=`

      <div class="option-group">

        <h4>Adicionales</h4>

        <div class="option-row">

          <div class="option">
            <label>
              <input type="checkbox">
              Queso +2
            </label>
          </div>

          <div class="option">
            <label>
              <input type="checkbox">
              Huevo +2
            </label>
          </div>

          <div class="option">
            <label>
              <input type="checkbox">
              Tocino +3
            </label>
          </div>

          <div class="option">
            <label>
              <input type="checkbox">
              Doble carne +5
            </label>
          </div>

        </div>

      </div>

    `
  }

  html+=`

    <div class="option-group">

      <h4>Cremas</h4>

      <div class="creams-grid">

        ${creamNames.map(c=>`

          <div class="cream-item">

            <div class="cream-top">
              <span>${c}</span>
              <span id="count-${c}">0</span>
            </div>

            <div class="cream-controls">

              <button onclick="changeCream('${c}',-1)">
                -
              </button>

              <button onclick="changeCream('${c}',1)">
                +
              </button>

            </div>

          </div>

        `).join('')}

      </div>

    </div>

    <div class="qty">

      <button onclick="changeQty(-1)">-</button>

      <span id="qtyText">1</span>

      <button onclick="changeQty(1)">+</button>

    </div>

  `

  document.getElementById("modalOptions").innerHTML=html

}

function changeCream(name,value){

  creamCounts[name]+=value

  if(creamCounts[name]<0){
    creamCounts[name]=0
  }

  document.getElementById(`count-${name}`).innerHTML=
    creamCounts[name]

}

function changeQty(value){

  qty+=value

  if(qty<1){
    qty=1
  }

  document.getElementById("qtyText").innerHTML=qty

}

function closeModal(id){
  document.getElementById(id).style.display="none"
}

function addToCart(){

  let total=selectedProduct.price*qty

  if(selectedProduct.category==="pollo"){

    const size=
      document.querySelector(
        'input[name="size"]:checked'
      ).value

    total=parseFloat(size)*qty

  }

  const observation=
    document.getElementById("productObservation").value

  cart.push({

    name:selectedProduct.name,
    qty,
    total,
    creams:{...creamCounts},
    observation

  })

  updateCart()

  closeModal("productModal")

}

function updateCart(){

  if(cart.length===0){

    document.getElementById("cartFloat").style.display="none"

    return
  }

  let total=0
  let qtyTotal=0

  cart.forEach(item=>{

    total+=item.total
    qtyTotal+=item.qty

  })

  document.getElementById("cartFloat").style.display="block"

  document.getElementById("cartFloat").innerHTML=
    `🛒 ${qtyTotal} • S/${total}`

}

function openCart(){

  document.getElementById("cartModal").style.display="flex"

  renderCart()

}

function renderCart(){

  let subtotal=0

  document.getElementById("cartItems").innerHTML=
    cart.map(item=>{

      subtotal+=item.total

      return `

        <div class="cart-item">

          <strong>${item.name}</strong>

          <div>x${item.qty}</div>

          <div>S/${item.total}</div>

          ${
            item.observation
            ?
            `<div>📝 ${item.observation}</div>`
            :
            ''
          }

        </div>

      `

    }).join('')

  document.getElementById("subtotal").innerHTML=
    `S/${subtotal}`

  document.getElementById("total").innerHTML=
    `S/${subtotal}`

}

function sendWhatsApp(){

  const name=
    document.getElementById("customerName").value

  let subtotal=0

  let message=
    "🍗 *ANTOJAZO FOOD* %0A%0A"

  message+=`👤 ${name}%0A%0A`

  message+="🛒 *PEDIDO* %0A"

  cart.forEach(item=>{

    subtotal+=item.total

    message+=
      `• ${item.name} x${item.qty} - S/${item.total}%0A`

    if(item.observation){

      message+=
        `📝 ${item.observation}%0A`

    }

  })

  message+=`%0A💵 *TOTAL: S/${subtotal}*`

  window.open(
    `https://wa.me/${WHATSAPP}?text=${message}`,
    "_blank"
  )

}
