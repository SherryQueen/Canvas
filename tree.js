(function () {

    let ctx, lastTime, drawOver, treeLines = [],
        lineColor = '#BE7F51',
        flowerColors = ['#F58F84', '#f0c0bb', '#ff877a', '#fbc7c1']

    /**
     * 添加一个树枝节点
     * @param  {[type]} parent    [父节点]
     * @param  {[type]} angle     [偏移角度]
     * @param  {[type]} thickness [粗细]
     * @param  {[type]} depth     [深度]
     * @return {[type]}           [description]
     */
    function newTreeLine(parent, angle, thickness, depth) {
        const growTime = random(800, 1250)
        const length = random(0, 20)
        const res = {
            childs: [],
            over: false,
            angle: angle,
            thickness: thickness,
            depth: depth,
            length: length,
            time: 0,
            growtime: growTime
        }
        if (!res.depth) res.flowerType = random(0, flowerColors.length - 1)
        treeLines.push(res)
        if (parent) parent.childs.push(res)
    }

    /**
     * 绘制树
     * @param  {[type]} node      [树枝节点]
     * @param  {[type]} fromX     [起始位置]
     * @param  {[type]} fromY     [起始位置]
     * @return {[type]}           [description]
     */
    function drawTree(node, fromX, fromY) {
        if (node.depth) {
            const factory = easeOut(node.time, 0, 1.0, node.growtime)
            let toX = fromX + cos(node.angle) * factory * node.length * node.depth,
                toY = fromY + sin(node.angle) * factory * node.length * node.depth
            if (!node.over) drawLine(fromX, fromY, toX, toY, node.thickness)
            node.childs.forEach(child => drawTree(child, toX, toY))
        } else {
            if (!node.over) drawFlowers(fromX, fromY, node.flowerType)
        }
    }

    /**
     * 绘制树枝
     * @param  {[type]} fromX     [起始位置]
     * @param  {[type]} fromY     [起始位置]
     * @param  {[type]} toX       [结束位置]
     * @param  {[type]} toY       [结束位置]
     * @param  {[type]} thickness [粗细]
     * @return {[type]}           [description]
     */
    function drawLine(fromX, fromY, toX, toY, thickness) {
        ctx.strokeStyle = lineColor
        ctx.lineWidth = thickness
        ctx.beginPath()
        ctx.moveTo(fromX, fromY)
        ctx.lineTo(toX, toY)
        ctx.closePath()
        ctx.stroke()
    }

    /**
     * 绘制花朵
     * @param  {[type]} x          [圆心]
     * @param  {[type]} y          [圆心]
     * @param  {[type]} flowerType [颜色类型]
     * @return {[type]}            [description]
     */
    function drawFlowers(x, y, flowerType) {
        ctx.fillStyle = flowerColors[flowerType]
        ctx.beginPath()
        ctx.arc(x, y, 5, Math.PI * 2, false)
        ctx.closePath()
        ctx.fill()
    }

    /**
     * 绘制主循环
     * @return {[type]} [description]
     */
    function mainLoop() {
        console.info('绘制')
        const nowTime = Date.now()
        const times = nowTime - lastTime
        lastTime = nowTime

        treeLines.forEach(node => {
            if (!node.over) {
                node.time += times
                if (node.time >= node.growtime) node.over = true
                if (node.depth > 0 && node.childs.length === 0 && node.time > node.growtime * 0.5) {
                    newTreeLine(node, node.angle + random(10, 20), node.thickness - 1, node.depth - 1)
                    newTreeLine(node, node.angle - random(10, 20), node.thickness - 1, node.depth - 1)
                }
            }
        })

        drawTree(treeLines[0], 800, 800)
        if (!drawOver) window.requestAnimationFrame(mainLoop)
        drawOver = treeLines.every(node => node.over)
    }

    window.drawTree = id => {
        const canvas = document.getElementById(id)
        if (canvas.getContext) {
            ctx = canvas.getContext('2d')

            lastTime = Date.now()
            drawOver = false
            treeLines = []

            newTreeLine(null, -90, 6, 8)
            mainLoop()
        } else {
            alert("HTML5 Canvas isn't supported by your browser!");
        }
    }
})(window)

drawTree('tree')
