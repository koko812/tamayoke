const width = 300
const height = 300

const heroSize = 30
let heroX = width/2 -heroSize /2
let heroY = height/7*5
let heroElement = null

const updateHero = () => {
    heroElement.style.top = `${heroY}px`
    heroElement.style.left = `${heroX}px`
}

const init = () => {
    const container = document.createElement('div')
    container.style.position = 'absolute'
    container.style.width = `${width}px`
    container.style.height = `${height}px`
    container.style.backgroundColor = '#000'
    document.body.appendChild(container)

    heroElement = document.createElement('div')
    heroElement.style.position = 'absolute'
    updateHero()
    heroElement.style.width = `${width}px`
    heroElement.style.height = `${height}px`
    heroElement.textContent = '🐥'
    heroElement.style.color = '#f00'
    //heroElement.style.fontSize = '30px'
    // size に準じた方が良さげ
    heroElement.style.fontSize = `${heroSize*0.8}px`
    container.appendChild(heroElement)
    
    // 基本的に，html 要素に対して，onhogehoge はつけるもんだと覚えておこう
    // ちゃんと予測変換も出てくる
    container.ondblclick = (e) =>{
        e.preventDefault()
    }
    // なるほどこれを流用すれば，マウスカーソルのアイコンを変えられるというわけだ
    // マウスカーソルを消すみたいなやつもきっとどこかにあろう
    // マウスカーソルにキラキラをつけるみたいなのもきっと実装できるはずだな
    // デスクトップに可愛い秘書を作るというのもきっとできるはずなのでやってみたい
    // (pc は重くなってしまいそうなもんだが;)

    // 別にこれでも問題はなさそうなもんだけど，画面外から入ってきたときに瞬間移動するのが気に入らんので
    // original とかはとっておくことにしよう
    container.onpointermove = (e) => {
        heroX = e.pageX
        heroY = e.pageY
        console.log('hero');
        updateHero()
    }
    
}

window.onload = () =>{
    init()
}