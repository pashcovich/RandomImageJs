function getRandomFloat(min = 0, max = 1) {
  return Math.random() * (max - min) + min;
}

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRange(start, end, step = 1) {
  var arr = [];
  for (var j = start; j <= end; j += step) {
    arr.push(j);
  }
  return arr;
}

function getRandomColors() {
        var r = getRandomInteger(0,255);
        var g = getRandomInteger(0,255);
        var b = getRandomInteger(0,255);

        var dr, dg, db = 0

        if(r > 200) {dr = -50; } else {dr = 50;}
        if(g > 200) {dg = -50; } else {dg = 50;}
        if(b > 200) {db = -50; } else {db = 50;}

        c1 = "rgba(" + (r + dr) + ", " + (g + dg) + ", " + b + ", " + getRandomFloat(0.8) + ")";
        c2 = "rgba(" + (r + dr) + ", " + g + ", " + (b + db) + ", " + getRandomFloat(0.8) + ")";
        c3 = "rgba(" + r + ", " + (g + dg) + ", " + (b + db) + ", " + getRandomFloat(0.8) + ")";

		// console.log([c1,c2,c3])
        return [c1,c2,c3];
}


function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function sinx(value) {
  return 2 * Math.sin(value / 2);
}

function cosx(value) {

  return 2 * Math.cos(value / 2);
}

function sin3x(value) {
  return 2 * Math.sin(3 * value / 4);
}

function cos3x(value) {
  return 2 * Math.cos(3 * value / 4);
}

function genImage() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d'),
        img_w = canvas.width,
        img_h = canvas.height,
        clrs = getRandomColors(),
        sc_n = 6,
        rnd_min_size = 50,
        rnd_max_size = 90,
        figure_size = getRandomInteger(rnd_min_size, rnd_max_size);

    ctx.fillStyle = clrs[1];
    ctx.fillRect(0, 0, img_w, img_h);

    // 0 - square
    // 1 - triangle
    // 2 - circle 
    // 3 - rectangle
    var figureType = getRandomInteger(0, 4);

    var points = [];

    for (var xa = 0; xa <= img_w + rnd_min_size; xa += 0.6 * rnd_min_size) {
      for (var ya = 0; ya <= img_h; ya += 0.6 * rnd_min_size) {
        var rnd_x_shift = getRandomInteger(-5, 5);
        var rnd_y_shift = getRandomInteger(-5, 5);
        var y = 0;
        xa += rnd_x_shift;
        for (var cnt in getRange(0, 4)) {
          rnd = getRandomInteger(0, 4);
          if (rnd == 0)
            y += sinx(xa);
          else if (rnd == 1)
            y += cosx(xa);
          else if (rnd == 2)
            y += sin3x(xa);
          else if (rnd == 3)
            y += cos3x(xa);
        }
        y += ya;
        y += rnd_y_shift;
        points.push([xa, y])
      }
    }

    for (var p in shuffle(points)) {
      var x0 = points[p][0]
      var y0 = points[p][1];

      for (var sc = sc_n; sc > 0; sc--) {

        if (sc % 2 == 1) {
          figureColor= clrs[2];
        } else {
          figureColor = clrs[1];
        }

        var currentFigureSize = figure_size / (sc_n - 1) * sc;
        switch(figureType) {
          case 1: 
            drawTriangle(x0, y0, currentFigureSize, figureColor, ctx);
            break;
          case 2: 
            drawCircle(x0, y0, currentFigureSize / 2, figureColor, ctx);
            break;
          case 3: 
            drawRectangle(x0, y0, currentFigureSize, figureColor, ctx);
            break;
          default:
            drawSquare(x0, y0, currentFigureSize, figureColor, ctx)
            break;
        }
      }
    }
  }
}

function drawSquare(x_center, y_center, width, color, context) {
  context.fillStyle = color;
  context.fillRect(x_center - (width / 2) , y_center - (width / 2), width, width);

}

function drawTriangle(x_center, y_center, width, color, context) {
  var triangleHieght = width * Math.sqrt(3) / 2;
  context.fillStyle = color;
  context.beginPath();
  context.moveTo(x_center + triangleHieght * 2 / 3, y_center);
  context.lineTo(x_center - (triangleHieght * 1 / 3), y_center - (width / 2));
  context.lineTo(x_center - (triangleHieght * 1 / 3),  y_center + (width / 2));
  context.fill();
}

function drawCircle(x_center, y_center, radius, color, context) {
  context.fillStyle = color;
  context.beginPath();
  context.arc(x_center, y_center, radius, 0, Math.PI * 2, true); 
  context.fill();
}

// adds rectangle
function drawRectangle(x_center, y_center, width, color, context) {
  context.fillStyle = color;
  var length = width + 8;
  var breadth = width - 8;
  context.fillRect(x_center - (width / 2) , y_center - (width / 2), length, breadth);

}
