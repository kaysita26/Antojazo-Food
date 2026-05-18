const settings={
  }

  const type=document.querySelector('input[name="deliveryType"]:checked').value

  const name=document.getElementById('customerName').value

  let message='🍗 *ANTOJAZO FOOD* %0A%0A'

  message+=`👤 ${name}%0A`

  if(type==='delivery'){

    const phone=document.getElementById('customerPhone').value
    const address=document.getElementById('customerAddress').value
    const reference=document.getElementById('customerReference').value

    message+='🛵 Delivery%0A'
    message+=`📱 ${phone}%0A`
    message+=`📍 ${address}%0A`
    message+=`📝 ${reference}%0A`

  }else{

    message+='🚶 Recojo en local%0A'

  }

  message+='%0A🛒 *PEDIDO* %0A'

  let subtotal=0

  cart.forEach(item=>{

    subtotal+=item.total

    message+=`• ${item.name} x${item.qty} - S/${item.total}%0A`

  })

  let delivery=0

  if(type==='delivery'){
    delivery=settings.deliveryPrice
  }

  const total=subtotal+delivery

  message+=`%0A💰 Subtotal: S/${subtotal}`
  message+=`%0A🛵 Delivery: S/${delivery}`
  message+=`%0A💵 *TOTAL: S/${total}*`

  window.open(
    `https://wa.me/${settings.whatsapp}?text=${message}`,
    '_blank'
  )

