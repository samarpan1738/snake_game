// Snakes Game

//Game Loop - Init, Draw, Update

function init() {
  canvas = document.getElementById("mycanvas");
  pen = canvas.getContext("2d");
  W = canvas.width;
  H = canvas.height;
  game_over = false;

  food = getRandomFood();
  score = 5;
  //Snake Object
  snake = {
    init_length: 5,
    color: "yellow",
    cells: [],
    direction: "right",

    createSnake: function () {
      for (var i = this.init_length - 1; i >= 0; i--) {
        this.cells.push({
          x: i,
          y: 0
        });
      }
    },
    drawSnake: function () {
      for (var i = 0; i < this.cells.length; i++) {
        pen.fillStyle = this.color;

        pen.strokeStyle = "black";
        pen.lineWidth = 5;

        pen.strokeRect(this.cells[i].x * 10, this.cells[i].y * 10, 10, 10);
        pen.fillRect(this.cells[i].x * 10, this.cells[i].y * 10, 10, 10);
      }
    },
    updateSnake: function () {
      var headX = this.cells[0].x;
      var headY = this.cells[0].y;

      //Assuming Snake is moving right
      //Insertion at head;
      // nextHeadX = headX+1;

      //this.cells.unshift({x:nextHeadX,y:headY});

      if (headX == food.x && headY == food.y) {
        //If food is eaten then don't pop last cell
        food = getRandomFood(); //returns a food object having coordinates and color for next food spawn
        score++; //Updating score
      } else {
        //Pop last cell if food not eaten
        this.cells.pop();
      }
      //Updating snake's posi for each direction
      if (this.direction == "right") {
        nextX = headX + 1;
        nextY = headY;
      } else if (this.direction == "left") {
        nextX = headX - 1;
        nextY = headY;
      } else if (this.direction == "down") {
        nextX = headX;
        nextY = headY + 1;
      } else {
        nextX = headX;
        nextY = headY - 1;
      }
      //Insert the new cell at head/front of array
      this.cells.unshift({
        x: nextX,
        y: nextY
      });

      //BOUNDARY Conditions
      var last_x = Math.round(W / 10);
      var last_y = Math.round(H / 10);
      console.log(last_x + "," + last_y)
      if (
        this.cells[0].y < 0 ||
        this.cells[0].x < 0 ||
        this.cells[0].x > last_x ||
        this.cells[0].y > last_y
      ) {
        alert("GameOver");
        game_over = true;
      }
    }
  }; //End of SNAKE object

  snake.createSnake();

  //Adding Event listeners for keyboard events.

  function KeyPressed(e) {
    console.log("You pressed a key");
    console.log(e);

    if (e.key == "ArrowRight" || e.key == "D" || e.key == "d") {
      snake.direction = "right";
    } else if (e.key == "ArrowLeft" || e.key == "a") {
      snake.direction = "left";
    } else if (e.key == "ArrowDown" || e.key == "s") {
      snake.direction = "down";
    } else {
      snake.direction = "up";
    }
  } //End of keypressed

  document.addEventListener("keydown", KeyPressed);
}; //End of init()

function draw() {
  pen.clearRect(0, 0, W, H);
  snake.drawSnake();
  console.log("In draw");

  //Lets us draw the food

  pen.fillStyle = food.color;

  pen.fillRect(food.x * 10, food.y * 10, 10, 10);

  pen.fillStyle = "white";
  pen.font = "14px Roboto";
  pen.fillText("Score : " + score, 10, 10);
}

function update() {
  snake.updateSnake();
}

function gameLoop() {
  draw();
  update();

  if (game_over == true) {
    clearInterval(f);
  }
}

function getRandomFood() {
  var foodX = Math.round((Math.random() * (W - 10)) / 10);
  var foodY = Math.round((Math.random() * (H - 10)) / 10);

  foodColors = ["red", "green", "aqua", "coral", "orchid"];
  var i = Math.round(Math.random() * foodColors.length);

  var food = {
    x: foodX,
    y: foodY,
    color: foodColors[i]
  };

  return food;
}

init();
//Call Game Looper after each 100 seconds
var f = setInterval(gameLoop, 100);