function Bird(imgArr, x, y) {
    this.imgArr = imgArr;
    this.x = x;
    this.y = y;
    this.index = parseInt(Math.random() * this.imgArr.length);
    this.img = this.imgArr[this.index];

    // 定义鸟的状态
    this.state = "D";
    this.speed = 0;

}

// 鸟的飞行状态的改变
Bird.prototype.fly = function () {
    // 改变图片的索引值
    this.index++;

    if (this.index >= this.imgArr.length) {
        this.index = 0;

    }
    this.img = this.imgArr[this.index];

}
// 鸟下降的方法
Bird.prototype.flyDown = function () {
    // 改变图片的索引值
    if (this.state === "D") {
        this.speed++;
        this.y += Math.sqrt(this.speed);
    } else {
        this.speed--;
        if (this.speed === 0) {
            this.state = "D";

            return;
        }
        this.y -= Math.sqrt(this.speed);
    }


}

// 鸟上升的方法
Bird.prototype.flyUp = function () {
    // 改变图片的索引值
    this.state = "U";
    this.speed = 20;
}
Bird.prototype.fhu=function(){
    var bird_A = {
        x: -this.img.width / 2 + this.x + 8,
        y: -this.img.height / 2 + this.y + 14
    }
    var bird_B = {
        x: -this.img.width / 2 + this.x + this.img.width - 8,
        y: -this.img.height / 2 + this.y + 14
    }
    var bird_C = {
        x: -this.img.width / 2 + this.x + 8,
        y: -this.img.height / 2 + this.y + this.img.height - 8
    }
    var bird_D = {
        x: -this.img.width / 2 + this.x + this.img.width - 8,
        y: -this.img.height / 2 + this.y + this.img.height - 8
    }

    // 开启路径
    this.ctx.beginPath();
    // 绘制矩形
    this.ctx.moveTo(bird_A.x, bird_A.y);
    this.ctx.lineTo(bird_B.x, bird_B.y);
    this.ctx.lineTo(bird_D.x, bird_D.y);
    this.ctx.lineTo(bird_C.x, bird_C.y);
    // 关闭路径
    this.ctx.closePath();
    // 描边
    // 改变描边色
    this.ctx.strokeStyle = "aqua";
    this.ctx.stroke();
}