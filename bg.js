(function (window) {

    let ctx, canvasHeight, canvasWidth, maxBubble, bubbles = [],
        lastTime

    /**
     * 重置气泡
     * @param {[type]} bubble [气泡对象]
     */
    function resetBubble(bubble) {
        bubble.color = '255, 255, 255'
        bubble.size = random(3, 5)
        bubble.alpha = 0.2 + Math.random() * 0.5
        bubble.posX = random(0, canvasWidth)
        bubble.posY = canvasHeight
        bubble.speed = random(1, 5)
        bubble.dimiss = random(0.5, 2)
        return bubble
    }

    /**
     * 绘制气泡
     * @param  {[type]} bubble [气泡对象]
     * @return {[type]}        [description]
     */
    function drawBubble(bubble) {
        ctx.fillStyle = `rgba(${bubble.color}, ${bubble.alpha})`
        ctx.beginPath()
        ctx.arc(bubble.posX, bubble.posY, bubble.size, Math.PI * 2, false)
        ctx.closePath()
        ctx.fill()
    }

    function mainLoop() {
        const nowTime = Date.now()
        const times = nowTime - lastTime
        lastTime = nowTime

        ctx.clearRect(0, 0, canvasWidth, canvasHeight)
        bubbles.forEach(bubble => {
            bubble.posY -= bubble.speed * times / 100
            bubble.alpha -= bubble.dimiss * times / 10000
            if (bubble.alpha <= 0) resetBubble(bubble)
            drawBubble(bubble)
        })

        window.requestAnimationFrame(mainLoop)
    }

    /**
     * 初始化气泡对象
     * @return {[type]} [description]
     */
    function initBubble() {
        bubbles = []
        lastTime = Date.now()
        for (let i = 0; i < maxBubble; i++) {
            bubbles.push(resetBubble({}))
        }
    }

    window.drawBackground = (id, bubble) => {
        maxBubble = bubble
        const canvas = document.getElementById(id)
        if (canvas.getContext) {
            canvasHeight = window.innerHeight
            canvasWidth = window.innerWidth

            canvas.width = canvasWidth
            canvas.height = canvasHeight

            ctx = canvas.getContext('2d')

            initBubble()
            mainLoop()
        } else {
            alert("HTML5 Canvas isn't supported by your browser!");
        }
    }

})(window)

drawBackground('bg', 200)
