(() => {
    function setup() {
        const canvas = document.getElementById("falling-snow-canvas");
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;

        return {
            canvas,
        }
    }
    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function createSnowBall(numberOfSnowBall, canvas) {
        // Create the list of snowball
        const snowBallList = Array(numberOfSnowBall).fill(null).map(() => {
            return {
                x: random(0, canvas.width),
                y: random(0, canvas.height),
                radius: random(2, 4),
                opacity: random(0.5, 1),
                speedX: random(-5, 5),
                speedY: random(1, 3)
            }
        });
        return snowBallList;
    }
    function drawSnowBall(canvas, snowBallList) {
        const canvasContext = canvas.getContext('2d');
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        snowBallList.forEach(snowBall => {
            canvasContext.beginPath();
            canvasContext.arc(snowBall.x, snowBall.y, snowBall.radius, 0, 2 * Math.PI);
            canvasContext.fillStyle = `rgba(255, 255, 255, ${snowBall.opacity})`;
            canvasContext.fill();
        })
    }
    function moveSnowBall(canvas, snowBallList) {
        snowBallList.forEach(snowBall => {
            snowBall.x += snowBall.speedX;
            snowBall.y += snowBall.speedY;
            if (snowBall.x > canvas.width) {
                snowBall.x = 0;
            } else if (snowBall.x < 0) {
                snowBall.x = canvas.width;
            }
            if (snowBall.y > canvas.height) {
                snowBall.y = 0;
            }
        });
    }
    function run() {
        const { canvas } = setup();
        const snowBallList = createSnowBall(300, canvas);
        setInterval(() => {
            drawSnowBall(canvas, snowBallList);
            moveSnowBall(canvas, snowBallList);
        }, 50);

        // set control button
        const controlButton = document.getElementById("controlBtn");
        controlButton.addEventListener('click', function() {
            const status = document.getElementById("status");
            const song = document.getElementById("song");
            if (this.classList[1] == "fa-pause") {
                this.classList.remove("fa-pause");
                this.classList.add("fa-play");
                status.classList.remove("play");
                status.classList.add("pause");
                song.pause();
            } else {
                this.classList.remove("fa-play");
                this.classList.add("fa-pause");
                status.classList.remove("pause");
                status.classList.add("play");
                song.play();
            }
        })
    }
    run();
    
    
    
    

})();