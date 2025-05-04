const width = 300
const height = 450
let container = null

const heroSize = 30
let heroX = width / 2
let heroY = height / 5 * 4
let heroElement = null

// 弾丸の生成，描写
// 弾丸のリストを先に作っておく
// 後からぐるぐる更新していくと思う
const bulletSize = 10
let bulletFromX = width / 2
let bulletFromY = 10
let bulletList = []
let bulletSpeed = 5

let gameStart = false
let gameOver = false

const bulletManager = async () => {
    //await danmaku2()
    //await sleep(1000)
    //await danmaku1()
    //await sleep(1000)
    await danmaku3()
    await sleep(1000)
    danmaku1()
    await danmaku2()
    await sleep(1000)
    danmaku1()
    danmaku2()
    await danmaku3()
}

const danmaku1 = async () => {
    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 16; j++) {
            const angle = Math.atan2(heroY - bulletFromY, heroX - bulletFromX)
            // ここの dx, dy の計算式が普通にわからなかった
            const dx = Math.cos(angle + j * Math.PI / 8) * bulletSpeed
            const dy = Math.sin(angle + j * Math.PI / 8) * bulletSpeed
            createBullet(dx, dy)
        }
        await sleep(250)
    }
}


const danmaku2 = async () => {
    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 16; j++) {
            const angle = i * Math.PI / 10
            // ここの dx, dy の計算式が普通にわからなかった
            const dx = Math.cos(angle + j * Math.PI / 8) * bulletSpeed
            const dy = Math.sin(angle + j * Math.PI / 8) * bulletSpeed
            createBullet(dx, dy)
        }
        await sleep(250)
    }
}

const danmaku3 = async () => {
    for (let k = 0; k < 3; k++) {
        const angle = k * Math.PI /3 
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 16; j++) {
                const dx = Math.cos(angle + j * Math.PI / 8) * bulletSpeed
                const dy = Math.sin(angle + j * Math.PI / 8) * bulletSpeed
                createBullet(dx, dy)
            }
            await sleep(50)
        }
        await sleep(100)
    }
}
// なんか関数型言語っぽくてくさ
// なぜかこれを中括弧で括るのはダメらしい（duration の後ろの new Promise を括るのがダメ
// 多分理由は深遠すぎて今の僕には理解できない
const sleep = (duration) => new Promise(r => setTimeout(r, duration))

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
    element.style.display = 'flex'
    element.style.justifyContent = 'center'
    element.style.alignItems = 'center'
    // この radius の指定方法がよくわからん，50% ならば半円？って感じもしなくもない
    // top left はどうせ後から update するので書く必要はないとのこと
    element.style.backgroundColor = '#fff'
    element.style.borderRadius = '50%'
    bulletList.push({ x: bulletFromX, y: bulletFromY, dx, dy, element, availlable: true })
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
        console.log((bullet.x - heroX) ** 2 + (bullet.y - heroY) ** 2);
        //console.log(bullet, bullet.element);
        // これは最初に出してしまうのがいいのか，ただそれをすると元のオブジェクトが書き変わらないんじゃないかという心配がある
        // これは atcoder をやってる時にも不安になる，だからポインタや参照の仕組みをもうちょっとかっちり理解した方がいい気がする
        // linux のしくみの本で，ある程度 os の動きを探るようなプログラムを書けば勉強になると思うのでやってみよう
        // ここの top, left が謎に反映されなくてなぞ，マジでなんで？
        // style が抜けててアホ，というか，辞書は普通に展開して取り出していた
        // 辞書の展開取り出しは，中括弧でやれば良い模様
        bullet.element.style.top = `${bullet.y - bulletSize / 2}px`
        bullet.element.style.left = `${bullet.x - bulletSize / 2}px`
        // ここの，表示の bulletSize/2 で引くのは，入れておかないと当たり判定がゴミカスになるので注意
        // Hero の方も同様（1敗)
        bullet.x += bullet.dx
        bullet.y += bullet.dy
        // bullet を消す処理は後でいいだろうか？そんな難しくもないか
        // remove メソッドを書く必要があるよな
        // 前回はオブジェクト指向だったので簡単だったけど，今回は多少めんどくさいかもしれない
        // 当たり判定をどこに書いているかを忘れてしまった
        // とりあえず，画面から消えてるか消えていないかのしょりだな
        if (bullet.x < 0 || bullet.x > width || bullet.y < 0 || bullet.y > height) {
            bullet.availlable = false
            bullet.element.remove()
        }

        if ((bullet.x - heroX) ** 2 + (bullet.y - heroY) ** 2 < (bulletSize) ** 2) {
            gameOver = true
        }
    }
    // これだけでは，element が消えない？？
    // そらそうか，element 自体は消してないもんな
    // ただそれも入れると，ループの回数が倍増するような気がするんだが？？
    bulletList = bulletList.filter((v) => v.availlable);
}


// これはループ数が無駄に増えるので却下ということで
// ループの途中で球を消すとややこしいことになるので，マークをつけておくということにしている
// あとはゲームオーバーのしょりだな
/*
const removeBullet = () => {
    for (const bullet of bulletList) {
        if(!bullet.availlable){
            bullet.element.remove()
        }
    }
}
*/


const updateHero = () => {
    heroElement.style.top = `${heroY - heroSize / 2}px`
    heroElement.style.left = `${heroX - heroSize / 2}px`
}

const init = () => {
    //console.log(heroX, heroY);
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
    heroElement.style.alignItems = 'center'
    heroElement.style.justifyContent = 'center'
    heroElement.textContent = '🐥'
    heroElement.style.color = '#f00'
    updateHero()
    //console.log(heroX, heroY);
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
        gameStart = true
        //console.log(heroX, heroY);
    }
    // 別にこれでも問題はなさそうなもんだけど，画面外から入ってきたときに瞬間移動するのが気に入らんので
    // original とかはとっておくことにしよう
    // いつか，コントローラーで操作できるようになどしてみたい気分
    document.onpointermove = (e) => {
        e.preventDefault()
        // ここの gameover の処理がこれでいいのかよくないのかよくわからない
        // t-kihira は最初からこれを想定していたのか
        // 普通に考えて，ひよこが変な位置に移動してしまいそうなもんなんだけど，
        // その頃には updateBullet を抜け出しているから問題がないのかな
        // updateBullet に当たり判定やら，gameover の処理やらが全て包まってしまっているので，
        // 後でリファクタリングしづらいクソコードになってる気がする
        // その辺は，本に載っているような，きちんと設計されたコードの真似をすることによ理，
        // リファクタリングしやすいコードの手本はわかるんじゃないかと思ってる
        // とゆーことで，あとは弾幕を作る処理を書くだけ，なんだが，
        // あんまり作りすぎると激オモになるので，その辺にどうやって対処するのかが結構気になる
        if (gameOver) {
            originalX = -1
        }
        if (originalX !== -1) {
            heroX = originalHeroX + (e.pageX - originalX) * 1.5
            heroY = originalHeroY + (e.pageY - originalY) * 1.5
            //console.log('hero', e.pageX, e.pageY, originalX, originalY, originalHeroX, originalHeroY, heroX, heroY);

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
    // この関数をわけわからん async で扱ってるんだが，訳がわからなすぎて発狂しそう
    // 下の while 文に入っても勝手に回り続けてるのが普通にやばい
    bulletManager()
    while (!gameOver) {
        updateBullet()
        await sleep(16)
    }
    console.log('gameover');
}