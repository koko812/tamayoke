const width = 300
const height = 450
let container = null

const heroSize = 30
let heroX = width / 2
let heroY = height / 2
let heroElement = null

// 弾丸の生成，描写
// 弾丸のリストを先に作っておく
// 後からぐるぐる更新していくと思う
const bulletSize = 10
let bulletFromX = width / 2
let bulletFromY = 10
let bulletList = []

// なんか関数型言語っぽくてくさ
// なぜかこれを中括弧で括るのはダメらしい（duration の後ろの new Promise を括るのがダメ
// 多分理由は深遠すぎて今の僕には理解できない
const sleep = (duration) =>  new Promise(r => setTimeout(r, duration)) 

// 後からどんどん作っていくものは，こんな感じに関数かしておく
// Hero とか container は作るのは最初だけなので必要ない
// もし残機などの概念が存在するならば，hero とかも create したほうがいいかも？
// (というか，charactor クラスを作って毎回そこから生成するようにしたらいいんじゃないかと思うが)
// (で，その方式でやってるのが reactor ゲーム，ただ，脳死で毎回 charactor クラスを作るべきなのかはよくわからん)
const createBullet = (dx, dy) => {
    element = document.createElement('div')
    container.appendChild(element)
    element.style.position = 'absolute'
    element.style.width = `${bulletSize}px`
    element.style.height = `${bulletSize}px`
    // この radius の指定方法がよくわからん，50% ならば半円？って感じもしなくもない
    // top left はどうせ後から update するので書く必要はないとのこと
    element.style.backgroundColor = '#fff'
    element.style.borderRadius = '50%'
    bulletList.push({ x: bulletFromX, y: bulletFromY, dx, dy, element })
    // borderRadius 以外は自分でかいた, appendChild も忘れていた
    // ここからは，Bullet を生成すればいいんだけど，何をすればいいのか
    // 普通に sleep すればいいのか？？
    // sleep はとりあえず簡単だが，while 文とか書いてたっけな？？
    // update とかいう当たり前の処理を書いていた
}

// 画面中で絶えず生成されて動くオブジェクト群には，create と update が必要だということを覚えておこう
// オブジェクトかしておくと，この辺りを物体の種類ごとに更新関数などを書く必要がないのかもしれない
// 継承なりして，それぞれの動きを変えるなんてことはあると思うんだけど，オブジェクト指向じゃ限界があるなんて話もあるのか？？
// ゲームならば，オブジェクト指向が一番マッチしているような気もしなくもないんだけど
const updateBullet = () => {
    for (const bullet of bulletList) {
        console.log(bullet, bullet.element);
        // これは最初に出してしまうのがいいのか，ただそれをすると元のオブジェクトが書き変わらないんじゃないかという心配がある
        // これは atcoder をやってる時にも不安になる，だからポインタや参照の仕組みをもうちょっとかっちり理解した方がいい気がする
        // linux のしくみの本で，ある程度 os の動きを探るようなプログラムを書けば勉強になると思うのでやってみよう
        // ここの top, left が謎に反映されなくてなぞ，マジでなんで？
        // style が抜けててアホ，というか，辞書は普通に展開して取り出していた
        // 辞書の展開取り出しは，中括弧でやれば良い模様
        bullet.element.style.top = `${bullet.y}px`
        bullet.element.style.left = `${bullet.x}px`
        bullet.x += bullet.dx
        bullet.y += bullet.dy
        // bullet を消す処理は後でいいだろうか？そんな難しくもないか
        // remove メソッドを書く必要があるよな
        // 前回はオブジェクト指向だったので簡単だったけど，今回は多少めんどくさいかもしれない
    }
}



const updateHero = () => {
    heroElement.style.top = `${heroY}px`
    heroElement.style.left = `${heroX}px`
}

const init = () => {
    console.log(heroX, heroY);
    container = document.createElement('div')
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

window.onload = async () => {
    init()
    createBullet(0, 5)
    for (let i = 0; i < 1000; i++) {
        updateBullet()
        await sleep(16)
    }
}