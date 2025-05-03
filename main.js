const width = 300
const height = 300

const heroSize = 30
let heroX = width / 2
let heroY = height / 2
let heroElement = null

const updateHero = () => {
    heroElement.style.top = `${heroY}px`
    heroElement.style.left = `${heroX}px`
}

const init = () => {
    console.log(heroX, heroY);
    const container = document.createElement('div')
    container.style.position = 'absolute'
    container.style.width = `${width}px`
    container.style.height = `${height}px`
    container.style.backgroundColor = '#000'
    document.body.appendChild(container)

    heroElement = document.createElement('div')
    heroElement.style.position = 'absolute'
    heroElement.style.width = `${heroSize}px`
    heroElement.style.height = `${heroSize}px`
    heroElement.style.display = 'flex'
    heroElement.style.justifyContent = 'center'
    heroElement.style.alignItems = 'center'
    heroElement.textContent = '🐥'
    heroElement.style.color = '#f00'
    updateHero()
    console.log(heroX, heroY);
    //heroElement.style.fontSize = '30px'
    // size に準じた方が良さげ
    heroElement.style.fontSize = `${heroSize * 0.8}px`
    // 今はやってないが，センタリングするときに，flex を指定するのはなぜなのだろうか
    // そもそも flex の効果もよくわかってないところはあるんだけど
    container.appendChild(heroElement)

    // 基本的に，html 要素に対して，onhogehoge はつけるもんだと覚えておこう
    // ちゃんと予測変換も出てくる
    container.ondblclick = (e) => {
        e.preventDefault()
    }
    // なるほどこれを流用すれば，マウスカーソルのアイコンを変えられるというわけだ
    // マウスカーソルを消すみたいなやつもきっとどこかにあろう
    // マウスカーソルにキラキラをつけるみたいなのもきっと実装できるはずだな
    // デスクトップに可愛い秘書を作るというのもきっとできるはずなのでやってみたい
    // (pc は重くなってしまいそうなもんだが;)

    // まさかの，ここの -1 を指定していなかったら，一周めで heroX に undifined が入って
    // それ以降の更新でそれに引っ張られて死ぬっぽい，そんな話ある！？クソむずいね
    let originalX = -1, originalY, originalHeroX, originalHeroY
    document.onpointerdown = (e) => {
        e.preventDefault()
        originalX = e.pageX
        originalY = e.pageY
        originalHeroX = heroX
        originalHeroY = heroY
        console.log(heroX, heroY);
    }
    // 別にこれでも問題はなさそうなもんだけど，画面外から入ってきたときに瞬間移動するのが気に入らんので
    // original とかはとっておくことにしよう
    // いつか，コントローラーで操作できるようになどしてみたい気分
    document.onpointermove = (e) => {
        e.preventDefault()
        if (originalX !== -1) {
            heroX = originalHeroX + (e.pageX - originalX) * 1.5
            heroY = originalHeroY + (e.pageY - originalY) * 1.5
            console.log('hero', e.pageX, e.pageY, originalX, originalY, originalHeroX, originalHeroY, heroX, heroY);

            // 画面外に出ない処理，いい感じだ
            // 他のプログラムでも，こういう門番的なのを綺麗に書いていきたいね
            // すまん，t-kihira はこれを二行で書いていてカッコ良すぎるので，余力があったら次はパクっておいてほしい
            // min と max を使ってて本当によくわからん処理を書いていてすごいぞ
            if (heroX < 0) {
                heroX = 0
            }
            if (heroY < 0) {
                heroY = 0
            }
            if (heroX > width - heroSize) {
                heroX = width - heroSize
            }
            if (heroY > height - heroSize) {
                heroY = height - heroSize
            }
        }
        updateHero()
    }
    // このままだと，一回クリックしたときに話せないのが面倒
    // とはいえ，pointer up とかをつけたら，ドラッグ操作になるので，それも面倒
}

window.onload = () => {
    init()
}