(function game() {
    const {
        width,
        height
    } = window.screen
    const game = new GameInstant()

    function GameInstant() {
        this.canvas = document.createElement('canvas')
        this.canvas.style.background = '#eee'
        this.canvas.tabIndex = 1000

        this.context = this.canvas.getContext('2d');

        document.body.appendChild(this.canvas)

        let lastSpeedX
        let lastSpeedY

        const handleMouseOver = (e) => {
            const {
                offsetX,
                offsetY
            } = e
            const {
                x,
                y,
                width,
                height,
                speedX,
                speedY,
            } = this.shape

            if (speedX !== 0 && speedY !== 0) {
                lastSpeedX = speedX
                lastSpeedY = speedY
            }

            if (offsetX >= x && offsetX <= x + width && offsetY >= y && offsetY < y + height) {
                this.shape.speedX = 0
                this.shape.speedY = 0
            } else {
                if (lastSpeedX !== 0 && lastSpeedY !== 0) {
                    this.shape.speedX = lastSpeedX
                    this.shape.speedY = lastSpeedY
                }
            }
        }

        const handleKeyDown = (e) => {
            const {
                code
            } = e

            if (code == 'ArrowRight') {
                this.shape.modelState = 'run'
            }
        }

        const handleKeyUp = (e) => {
            this.shape.modelState = 'idle'
        }


        this.canvas.addEventListener('mousemove', handleMouseOver) // add event hover
        this.canvas.addEventListener('keydown', handleKeyDown) // add event hover
        this.canvas.addEventListener('keyup', handleKeyUp) // add event hover

        this.init = function () {
            this.canvas.width = width - 200
            this.canvas.height = height - 200
            this.shape = new GameShape()
            this.shape.init(200, 20, 40, 40)
            this.start();
        }


        this.start = function () {
            window.requestAnimationFrame(() => {
                this.start();
                this.clear();
                this.shape.draw()
                console.log('Game is running');

            })
        }

        this.clear = function () {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        }
    }

    function GameShape() {
        this.x = 0
        this.y = 0
        this.width = 0
        this.height = 0
        this.speedX = 5
        this.speedY = 5
        this.context = game.context
        this.imgIdx = 0
        this.time = 0
        this.sourceImage = []
        this.modelState = 'idle'

        this.init = (x, y, width, height) => {
            this.x = x
            this.y = y
            this.width = width
            this.height = height

            this.sourceImage = [...Array(12).keys()].map((item) => {
                const img = new Image();
                img.src = `../character/houser_${item + 1}.png`
                return img
            })
        }

        this.draw = () => {
            this.handleMove()
        }

        this.handleMove = () => {
            if (this.modelState == 'idle') {
                return this.onIdle()
            } else if (this.modelState == 'run') {
                return this.onRun()
            } else if (this.modelState == 'jump') {
                return this.onJump()
            }
        }

        this.onIdle = async () => {
            const {
                x,
                y,
                width,
                height
            } = this
            this.imgIdx = 0

            const ctx = this.context
            ctx.drawImage(this.sourceImage[this.imgIdx], x, 0)
        }

        this.onRun = async () => {
            const {
                x,
                y,
                width,
                height
            } = this

            this.context.drawImage(this.sourceImage[this.imgIdx], x, 0)
            this.time++
            if (this.time == 50 / 2) {
                this.imgIdx = 11
                this.time = 0
            } else if (this.time == 45 / 2) {
                this.imgIdx = 10
            } else if (this.time == 40 / 2) {
                this.imgIdx = 9
            } else if (this.time == 35 / 2) {
                this.imgIdx = 8
            } else if (this.time == 30 / 2) {
                this.imgIdx = 7
            } else if (this.time == 25 / 2) {
                this.imgIdx = 6
            } else if (this.time == 20 / 2) {
                this.imgIdx = 5
            } else if (this.time == 15 / 2) {
                this.imgIdx = 4
            } else if (this.time == 10 / 2) {
                this.imgIdx = 3
            } else if (this.time == 5 / 2) {
                this.imgIdx = 2
            } else if (this.time == 0) {
                this.imgIdx = 1
            }

            this.x = this.x + this.speedX
            if (x + width > game.canvas.width) {
                this.x = 0
            }
        }

        this.onJump = async () => {

        }
    }

    return game.init()
})()