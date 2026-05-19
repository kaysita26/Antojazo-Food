const WHATSAPP = "51992044102";

const products = [

  {
    id:1,
    name:"Pollo Broaster",
    category:"pollo",
    basePrice:10,
    image:"https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=1200"
  },

  {
    id:2,
    name:"Hamburguesa Clásica",
    category:"burger",
    basePrice:14,
    image:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200"
  },

  {
    id:3,
    name:"Salchipapa Especial",
    category:"salchi",
    basePrice:15,
    image:"https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=1200"
  },

  {
    id:4,
    name:"Chicha Morada",
    category:"drink",
    basePrice:5,
    image:"https://images.unsplash.com/photo-1547592180-85f173990554?w=1200"
  }

];

let cart = [];
let selectedProduct = null;
let qty = 1;

renderProducts(products);

/* ========================= */
/* RENDER PRODUCTOS */
/* ========================= */

function renderProducts(list){

  const container =
    document.getElementById("products");

  container.innerHTML =
    list.map(product => `

      <div class="card">

        <img src="${product.image}" />

        <div class="card-body">

          <h3>${product.name}</h3>

          <p>
            Delicioso y recién preparado
          </p>

          <div class="price">
            Desde S/${product.basePrice}
          </div>

          <button onclick="openProduct(${product.id})">
            Personalizar
          </button>

        </div>

      </div>

    `).join("");

}

/* ========================= */
/* FILTROS */
/* ========================= */

function filterProducts(category){

  if(category === "all"){
    renderProducts(products);
    return;
  }

  const filtered =
    products.filter(
      product => product.category === category
    );

  renderProducts(filtered);

}

/* ========================= */
/* ABRIR PRODUCTO */
/* ========================= */

function openProduct(id){

  selectedProduct =
    products.find(
      product => product.id === id
    );

  qty = 1;

  document.getElementById("productModal").style.display =
    "flex";

  document.getElementById("modalTitle").innerHTML =
    selectedProduct.name;

  document.getElementById("modalImage").src =
    selectedProduct.image;

  let html = "";

  /* ========================= */
  /* POLLO */
  /* ========================= */

  if(selectedProduct.category === "pollo"){

    html += `

      <!-- TAMAÑO -->

      <div class="option-group">

        <h4>Tamaño</h4>

        <div class="option-row">

          <label class="option">

            <input
              type="radio"
              name="size"
              value="10"
              checked
            />

            <div>

              <div class="option-title">
                1/8 BROASTER
              </div>

              <div class="option-price">
                +S/10
              </div>

            </div>

          </label>

          <label class="option">

            <input
              type="radio"
              name="size"
              value="16"
            />

            <div>

              <div class="option-title">
                1/4 BROASTER
              </div>

              <div class="option-price">
                +S/16
              </div>

            </div>

          </label>

        </div>

      </div>

      <!-- PRESAS -->

      <div class="option-group">

        <h4>Presa</h4>

        <div class="option-row">

          <label class="option">

            <input
              type="radio"
              name="presa"
              checked
            />

            <div class="option-title">
              Pecho + Ala
            </div>

          </label>

          <label class="option">

            <input
              type="radio"
              name="presa"
            />

            <div class="option-title">
              Pierna + Encuentro
            </div>

          </label>

        </div>

      </div>

      <!-- GUARNICIONES -->

      <div class="option-group">

        <h4>Guarniciones</h4>

        <div class="option-row">

          <label class="option">

            <input
              type="checkbox"
              checked
            />

            <div class="option-title">
              Papas
            </div>

          </label>

          <label class="option">

            <input
              type="checkbox"
              checked
            />

            <div class="option-title">
              Ensalada
            </div>

          </label>

          <label class="option">

            <input
              type="checkbox"
              checked
            />

            <div class="option-title">
              Arroz
            </div>

          </label>

          <label class="option">

            <input
              type="checkbox"
              id="chaufa"
            />

            <div>

              <div class="option-title">
                Chaufa
              </div>

              <div class="option-price">
                +S/3
              </div>

            </div>

          </label>

        </div>

      </div>

      <!-- CREMAS -->

      <div class="option-group">

        <h4>Cremas</h4>

        <div class="option-row">

          <label class="option">
            <input type="checkbox">
            <div class="option-title">Mayonesa</div>
          </label>

          <label class="option">
            <input type="checkbox">
            <div class="option-title">Ají</div>
          </label>

          <label class="option">
            <input type="checkbox">
            <div class="option-title">Ketchup</div>
          </label>

          <label class="option">
            <input type="checkbox">
            <div class="option-title">Mostaza</div>
          </label>

          <label class="option">
            <input type="checkbox">
            <div class="option-title">Golf</div>
          </label>

          <label class="option">
            <input type="checkbox">
            <div class="option-title">Tártara</div>
          </label>

        </div>

      </div>

    `;

  }

  /* ========================= */
  /* CANTIDAD */
  /* ========================= */

  html += `

    <div class="qty">

      <button onclick="changeQty(-1)">
        -
      </button>

      <span id="qtyText">
        1
      </span>

      <button onclick="changeQty(1)">
        +
      </button>

    </div>

  `;

  document.getElementById("modalOptions").innerHTML =
    html;

}

/* ========================= */
/* CERRAR MODAL */
/* ========================= */

function closeModal(id){

  document.getElementById(id).style.display =
    "none";

}

/* ========================= */
/* CANTIDAD */
/* ========================= */

function changeQty(value){

  qty += value;

  if(qty < 1){
    qty = 1;
  }

  document.getElementById("qtyText").innerHTML =
    qty;

}

/* ========================= */
/* AGREGAR AL CARRITO */
/* ========================= */

function addToCart(){

  let total =
    selectedProduct.basePrice * qty;

  /* POLLO */

  if(selectedProduct.category === "pollo"){

    const size =
      document.querySelector(
        'input[name="size"]:checked'
      ).value;

    total =
      parseFloat(size) * qty;

    const chaufa =
      document.getElementById("chaufa");

    if(chaufa && chaufa.checked){

      total += 3 * qty;

    }

  }

  const observation =
    document.getElementById("productObservation").value;

  cart.push({

    name:selectedProduct.name,
    qty:qty,
    total:total,
    observation:observation

  });

  updateCart();

  closeModal("productModal");

}

/* ========================= */
/* ACTUALIZAR CARRITO */
/* ========================= */

function updateCart(){

  if(cart.length === 0){

    document.getElementById("cartFloat").style.display =
      "none";

    return;

  }

  let total = 0;
  let quantity = 0;

  cart.forEach(item => {

    total += item.total;
    quantity += item.qty;

  });

  document.getElementById("cartFloat").style.display =
    "block";

  document.getElementById("cartFloat").innerHTML =
    `🛒 ${quantity} • S/${total}`;

}

/* ========================= */
/* ABRIR CARRITO */
/* ========================= */

function openCart(){

  document.getElementById("cartModal").style.display =
    "flex";

  renderCart();

}

/* ========================= */
/* RENDER CARRITO */
/* ========================= */

function renderCart(){

  let subtotal = 0;

  document.getElementById("cartItems").innerHTML =
    cart.map(item => {

      subtotal += item.total;

      return `

        <div class="cart-item">

          <strong>
            ${item.name}
          </strong>

          <div>
            x${item.qty}
          </div>

          <div>
            S/${item.total}
          </div>

          ${
            item.observation
            ?
            `<div>📝 ${item.observation}</div>`
            :
            ""
          }

        </div>

      `;

    }).join("");

  document.getElementById("subtotal").innerHTML =
    `S/${subtotal}`;

  document.getElementById("total").innerHTML =
    `S/${subtotal}`;

}

/* ========================= */
/* WHATSAPP */
/* ========================= */

function sendWhatsApp(){

  const customerName =
    document.getElementById("customerName").value;

  let subtotal = 0;

  let message =
    "🍗 *ANTOJAZO FOOD* %0A%0A";

  message +=
    `👤 ${customerName}%0A%0A`;

  message +=
    "🛒 *PEDIDO* %0A";

  cart.forEach(item => {

    subtotal += item.total;

    message +=
      `• ${item.name} x${item.qty} - S/${item.total}%0A`;

    if(item.observation){

      message +=
        `📝 ${item.observation}%0A`;

    }

  });

  message +=
    `%0A💵 *TOTAL: S/${subtotal}*`;

  window.open(
    `https://wa.me/${WHATSAPP}?text=${message}`,
    "_blank"
  );

}
