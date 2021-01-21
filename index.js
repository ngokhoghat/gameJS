(function game() {
    const { width, height } = window.screen
    const game = new GameInstant()
    
    function GameInstant() {
        this.canvas = document.createElement('canvas')
        this.init = function () {
            this.canvas.width = width
            this.canvas.height = 200
            this.context = this.canvas.getContext('2d');
            document.body.appendChild(this.canvas)
            const shape = new GameShape()
            // shape.init(10, 20, 40, 40)

            this.start();
        }

        this.start = function () {
            window.requestAnimationFrame(() => {
                this.start();
                console.log('Game is running');
            })
        }
    }

    function GameShape() {
        this.x = 0
        this.y = 0
        this.width = 0
        this.height = 0
        this.context = game.canvas.getContext('2d')

        this.init = (x, y, width, height) => {
            this.x = x
            this.y = y
            this.width = width
            this.height = height
        }

        this.draw = () => {
            const { x, y, width, height } = this
            const ctx = this.context
            ctx.fillStyle = '#900'
            ctx.fillRect(x, y, width, height);

            this.x++
        }
    }

    return game.init()
})()