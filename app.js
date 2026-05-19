const WHATSAPP = "51992044102";

/* ========================= */
/* PRODUCTOS */
/* ========================= */

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

/* ========================= */
/* SOLO 6 CREMAS */
/* ========================= */

const sauces = [
"Mayonesa",
"Ají",
"Ketchup",
"Mostaza",
"Tártara",
"Aceituna"
];

/* ========================= */

let cart = [];
let selectedProduct = null;
let qty = 1;

const sauceQuantities =
new Array(sauces.length).fill(0);

/* ========================= */

renderProducts(products);

/* ========================= */
/* MOSTRAR PRODUCTOS */
/* ========================= */

function renderProducts(list){

const container =
document.getElementById("products");

container.innerHTML =
list.map(product => `

<div class="card">

<img src="${product.image}">

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
/* FILTRAR */
/* ========================= */

function filterProducts(category){

if(category === "all"){

renderProducts(products);
return;

}

renderProducts(

products.filter(
p => p.category === category
)

);

}

/* ========================= */
/* ABRIR PRODUCTO */
/* ========================= */

function openProduct(id){

selectedProduct =
products.find(p => p.id === id);

qty = 1;

/* reset cremas */

for(let i=0;i<sauceQuantities.length;i++){

sauceQuantities[i] = 0;

}

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

<div class="option-group">

<h4>Tamaño</h4>

<div class="option-row compact">

<label class="option small">

<input
type="radio"
name="size"
value="10"
checked
onclick="changeChickenOptions('1/8')"
/>

<div>

<div class="option-title">
1/8 BROASTER
</div>

<div class="option-price">
S/10
</div>

</div>

</label>

<label class="option small">

<input
type="radio"
name="size"
value="16"
onclick="changeChickenOptions('1/4')"
/>

<div>

<div class="option-title">
1/4 BROASTER
</div>

<div class="option-price">
S/16
</div>

</div>

</label>

</div>

</div>

<div class="option-group">

<h4>Presa</h4>

<div
class="option-row compact"
id="presaOptions"
>

</div>

</div>

<div class="option-group">

<h4>Guarniciones</h4>

<div class="option-row compact">

<label class="option small">

<input type="checkbox" checked>

<div class="option-title">
Papas
</div>

</label>

<label class="option small">

<input
type="checkbox"
checked
id="riceCheck"
>

<div class="option-title">
Arroz
</div>

</label>

<label class="option small">

<input type="checkbox" checked>

<div class="option-title">
Ensalada
</div>

</label>

<label class="option small">

<input
type="checkbox"
id="chaufa"
onclick="toggleChaufa()"
>

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

<div class="option-group">

<h4>
Cremas (6 gratis)
</h4>

<div
class="sauces-grid"
id="saucesContainer"
>

</div>

<div
style="
margin-top:12px;
font-weight:700;
color:#ffb800;
"
id="sauceInfo"
>
0 envases
</div>

</div>

`;

}

/* ========================= */
/* CANTIDAD */
/* ========================= */

html += `

<div class="option-group">

<h4>Cantidad</h4>

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

</div>

<div class="form-group">

<textarea
id="productObservation"
placeholder="Observaciones (opcional)"
></textarea>

</div>

<button
class="main-btn"
onclick="addToCart()"
>

Agregar al carrito

</button>

`;

document.getElementById("modalOptions").innerHTML =
html;

renderSauces();

changeChickenOptions("1/8");

}

/* ========================= */
/* CAMBIAR OPCIONES POLLO */
/* ========================= */

function changeChickenOptions(type){

const container =
document.getElementById("presaOptions");

if(!container) return;

if(type === "1/8"){

container.innerHTML = `

<label class="option small">

<input
type="radio"
name="presa"
checked
>

<div class="option-title">
Pecho
</div>

</label>

<label class="option small">

<input
type="radio"
name="presa"
>

<div class="option-title">
Ala
</div>

</label>

<label class="option small">

<input
type="radio"
name="presa"
>

<div class="option-title">
Pierna
</div>

</label>

<label class="option small">

<input
type="radio"
name="presa"
>

<div class="option-title">
Encuentro
</div>

</label>

`;

}else{

container.innerHTML = `

<label class="option small">

<input
type="radio"
name="presa"
checked
>

<div class="option-title">
Pecho + Ala
</div>

</label>

<label class="option small">

<input
type="radio"
name="presa"
>

<div class="option-title">
Pierna + Encuentro
</div>

</label>

`;

}

}

/* ========================= */
/* CHAUFA */
/* ========================= */

function toggleChaufa(){

const chaufa =
document.getElementById("chaufa");

const rice =
document.getElementById("riceCheck");

if(chaufa.checked){

rice.checked = false;

}else{

rice.checked = true;

}

}

/* ========================= */
/* CREMAS */
/* ========================= */

function renderSauces(){

const container =
document.getElementById("saucesContainer");

if(!container) return;

container.innerHTML =

sauces.map((sauce,index)=>`

<div class="sauce-card">

<div class="sauce-name">
${sauce}
</div>

<div class="sauce-controls">

<button onclick="changeSauce(${index},-1)">
-
</button>

<span id="sauceQty${index}">
0
</span>

<button onclick="changeSauce(${index},1)">
+
</button>

</div>

</div>

`).join("");

}

/* ========================= */
/* CAMBIAR CREMAS */
/* ========================= */

function changeSauce(index,value){

sauceQuantities[index] += value;

if(sauceQuantities[index] < 0){

sauceQuantities[index] = 0;

}

document.getElementById(
`sauceQty${index}`
).innerHTML =
sauceQuantities[index];

updateSauceInfo();

}

/* ========================= */
/* INFO CREMAS */
/* ========================= */

function updateSauceInfo(){

const total =
sauceQuantities.reduce(
(a,b)=>a+b,
0
);

let extra = 0;

if(total > 6){

extra = total - 6;

}

document.getElementById("sauceInfo").innerHTML =

extra > 0

?

`${total} envases • +S/${extra}`

:

`${total} envases`;

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
/* CERRAR MODAL */
/* ========================= */

function closeModal(id){

document.getElementById(id).style.display =
"none";

}

/* ========================= */
/* AGREGAR AL CARRITO */
/* ========================= */

function addToCart(){

let total =
selectedProduct.basePrice * qty;

if(selectedProduct.category === "pollo"){

const size =
document.querySelector(
'input[name="size"]:checked'
).value;

total =
parseFloat(size) * qty;

/* chaufa */

const chaufa =
document.getElementById("chaufa");

if(chaufa.checked){

total += 3 * qty;

}

/* extra cremas */

const sauceTotal =
sauceQuantities.reduce(
(a,b)=>a+b,
0
);

if(sauceTotal > 6){

total +=
(sauceTotal - 6);

}

}

const observation =
document.getElementById(
"productObservation"
).value;

cart.push({

id:Date.now(),

name:selectedProduct.name,

qty,

total,

observation

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

cart.forEach(item=>{

total += item.total;
quantity += item.qty;

});

document.getElementById("cartFloat").style.display =
"block";

document.getElementById("cartFloat").innerHTML =

`
🛒 ${quantity}
• S/${total}
`;

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
/* ELIMINAR ITEM */
/* ========================= */

function removeCartItem(id){

cart =
cart.filter(
item => item.id !== id
);

renderCart();

updateCart();

}

/* ========================= */
/* MOSTRAR CARRITO */
/* ========================= */

function renderCart(){

let subtotal = 0;

document.getElementById("cartItems").innerHTML =

cart.map(item=>{

subtotal += item.total;

return `

<div class="cart-item">

<div
style="
display:flex;
justify-content:space-between;
align-items:center;
gap:10px;
"
>

<div>

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

<button
onclick="removeCartItem(${item.id})"
style="
background:red;
border:none;
color:white;
padding:8px 12px;
border-radius:10px;
cursor:pointer;
"
>

X

</button>

</div>

</div>

`;

}).join("");

document.getElementById("subtotal").innerHTML =
`S/${subtotal}`;

document.getElementById("total").innerHTML =
`S/${subtotal}`;

}

/* ========================= */
/* ENVIAR WHATSAPP */
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

cart.forEach(item=>{

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
