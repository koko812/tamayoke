const width = 300
const height = 300

const size = 30
let heroX = width/2 -size /2
let heroY = height/7*5
let heroElement = null

const init = () => {
    const container = document.createElement('div')
    container.style.position = 'absolute'
    container.style.width = `${width}px`
    container.style.height = `${height}px`
    container.style.backgroundColor = '#000'
    document.body.appendChild(container)

    heroElement = document.createElement('div')
    heroElement.style.position = 'absolute'
    heroElement.style.top = `${heroY}px`
    heroElement.style.left = `${heroX}px`
    heroElement.style.width = `${width}px`
    heroElement.style.height = `${height}px`
    heroElement.textContent = '🐥'
    heroElement.style.color = '#f00'
    heroElement.style.fontSize = '30px'
    container.appendChild(heroElement)
    
    
}

window.onload = () =>{
    init()
}