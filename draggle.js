const item = document.getElementById('dragItem')

let offsetX = 0,
    offsetY = 0

let dragged = false

item.addEventListener('dragstart', e => {
    // e.preventDefault()
    offestX = e.offsetX
    offsetY = e.offsetY
}, false)

item.addEventListener('drag', e => {
    e.preventDefault()
    // console.log(e)
    item.style.left = `${e.x - offestX}px`
    item.style.top = `${e.y - offsetY}px`
}, false)

item.addEventListener('dragend', e => {
    e.preventDefault()
    item.style.left = `${e.x - offestX}px`
    item.style.top = `${e.y - offsetY}px`
}, false)
