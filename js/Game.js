function Game(ctx, bird, pipe, land, mountain, gold) {
    this.ctx = ctx;
    this.bird = bird;
    // 管子
    this.pipeArr = [pipe];
    this.land = land;
    this.goldArr = [gold];

    // this.fen=fen;
    this.mountain = mountain;
    // 初始化定时器
    this.timer = null;
    this.timerover = null;

    // 定义帧
    this.fno = 0;
    this.goldfno = 0;
    // this.idx = 0;

    this.init();

}
// 定义初始化方法
Game.prototype.init = function () {
    this.fno++;
    this.star();
    this.bindEvent();
    // this.view();
    // 渲染山
    this.rederMountain();
    // 渲染鸟
    this.rederbird();
    // 渲染地面
    this.rederland();

    this.Num();
    // 创建金币
    // this.redergold();


}
// 匹配手机端视口



Game.prototype.view = function () {
    //     // 读取视口宽度和高度

    var windowW = document.documentElement.clientWidth;
    var windowH = document.documentElement.clientHeight;
    this.ctx.canvas.width = windowW;
    this.ctx.canvas.height = windowH;
}


// }
// 定义开始游戏

Game.prototype.star = function () {
    // 游戏程序执行时开始渲染背景
    // 受到闭包的影响
    var me = this;
    var image = new Image();
    image.src = "images/ready.png"
    image.onload = function () {
        me.ctx.drawImage(image, canvas.width / 4, canvas.height / 2 - 15);
        var he = me;
        me.ctx.canvas.onclick = function () {

            he.timer = setInterval(function () {
                // 帧每次改变
                he.fno++;
                he.goldfno++;
                // 清屏
                he.clear();

                // 渲染山
                he.rederMountain();
                // 渲染鸟
                he.rederbird();
                // 渲染地面
                he.rederland();
                // // 创建金币
                he.redergold();
                // 绘制管子
                he.rederpipe();
                // 鸟的自然下降
                he.bird.flyDown();
                if (!(he.fno % 5)) {
                    // 渲染鸟的飞行状态
                    he.bird.fly();
                }

                // 管子移动
                he.pipemove();
                // 金币移动
                he.goldmove();


                if (!(he.fno % 65)) {

                    // 创建多个管子
                    he.createPipe();

                }
                if (!(he.fno % 125)) {


                    // 创建多个金币
                    he.createGold();
                }


                // 清除数组多余的管子
                he.clearpipe();
                // 清除数组多余的金币              
                // he.cleargold();

                // 碰撞检测
                he.boom();
            }, 20)
        }
    }
}


Game.prototype.bindEvent = function () {
    // 缓冲this
    var me = this;
    // this.ctx.canvas.onclick = function () {
    document.onkeydown = function (e) {
        var key = e.keyCode;
        if (key === 87) {
            me.bird.flyUp();
        }
        // if (key === 74) {
        //  me.bird.fhu();
        // }
    }
}
// 游戏结束
Game.prototype.gameover = function () {
    var me = this;
    var image = new Image();
    image.src = "images/game_over.png"
    image.onload = function () {
        me.ctx.drawImage(image, canvas.width / 4, canvas.height / 2 - 15);
        clearInterval(me.timer);

    }
}


// 定义一个清屏的方法*
Game.prototype.clear = function () {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
}
// 渲染文字
Game.prototype.Num = function () {
    this.ctx.font = "18px 宋体";
    this.ctx.fillText("游戏规则：W为上升，作者降低了游戏难度，可以从管子中间进行穿过", canvas.width / 2 - 170, 200);
    this.ctx.fillText("可以从管子中间进行穿过  ", canvas.width / 2 - 120, 220);
    this.ctx.fillText(" 奖牌效果目前正在完善中  ", canvas.width / 2 - 120, 240);



}

// 渲染山
Game.prototype.rederMountain = function () {
    var img = this.mountain.img;
    this.mountain.x -= this.mountain.step;

    if (this.mountain.x < -img.width) {
        this.mountain.x = 0;
    }
    this.ctx.drawImage(img, this.mountain.x, this.mountain.y);
    this.ctx.drawImage(img, this.mountain.x + img.width, this.mountain.y);
    this.ctx.drawImage(img, this.mountain.x + img.width * 2, this.mountain.y);

}
// 渲染鸟
Game.prototype.rederbird = function () {
    var img = this.bird.img;

    // 鸟每次都是不一样的，需要保存状态
    this.ctx.save();
    // 鸟的初始位置为坐标，平移坐标轴
    this.ctx.translate(this.bird.x, this.bird.y);
    //判断鸟的状态
    var deg = this.bird.state === "D" ? Math.PI / 180 * this.bird.speed : -Math.PI / 180 * this.bird.speed;
    // 旋转坐标系
    this.ctx.rotate(deg);
    // 绘制鸟
    this.ctx.drawImage(img, -img.width / 2, -img.height / 2);

    // 恢复状态

    this.ctx.restore();
}
// 渲染地面
Game.prototype.rederland = function () {
    var img = this.land.img;
    // 地面会动
    this.land.x -= this.land.step;
    // 判断边界
    if (this.land.x < -img.width) {
        this.land.x = 0;
    }

    // 绘制图片等同于背景
    this.ctx.drawImage(img, this.land.x, this.land.y);
    this.ctx.drawImage(img, this.land.x + img.width, this.land.y);
    this.ctx.drawImage(img, this.land.x + img.width * 2, this.land.y);


}
// 渲染管子
Game.prototype.rederpipe = function () {
    // 缓冲this
    var me = this;

    this.pipeArr.forEach(function (value, index) {
        // 先获取上部分图片
        var img_up = value.pipe_up;
        // console.log(img_up)
        // 图片上部分
        var img_x = 0;
        var img_y = img_up.height - value.up_height;
        var img_w = img_up.width;
        var img_h = value.up_height;

        var canvas_x = me.ctx.canvas.width - value.step * value.count;
        var canvas_y = 0;
        var canvas_w = img_up.width;
        var canvas_h = value.up_height;

        me.ctx.drawImage(img_up, img_x, img_y, img_w, img_h, canvas_x, canvas_y, canvas_w, canvas_h);

        // 绘制下面管子
        var img_down = value.pipe_down;
        // console.log(img_down)

        var pipe_x = 0;
        var pipe_y = 0;
        var pipe_w = img_down.width;
        var pipe_h = 250 - value.up_height;

        var canva_x = me.ctx.canvas.width - value.step * value.count;
        var canva_y = 150 + value.up_height;
        var canva_w = img_down.width;
        var canva_h = 250 - value.up_height;


        me.ctx.drawImage(img_down, pipe_x, pipe_y, pipe_w, pipe_h, canva_x, canva_y, canva_w, canva_h);


    })

}
// 创建多跟管子
Game.prototype.createPipe = function () {
    var pipe = this.pipeArr[0].create();
    this.pipeArr.push(pipe);
}

// 渲染管子移动
Game.prototype.pipemove = function () {

    this.pipeArr.forEach(function (value) {
        // value.count+=5;
        value.count++;

    })

}

// 清理数组中的管子
Game.prototype.clearpipe = function () {

    for (var i = 0; i < this.pipeArr.length; i++) {
        var pipe = this.pipeArr[i];

        if (pipe.x - pipe.step * pipe.count < -pipe.pipe_up.width) {
            this.pipeArr.splice(i, 1);
            return;
        }
    }
}
// 渲染金币
Game.prototype.redergold = function () {
    this.goldfno++;
    if (this.goldfno > 400) {
        this.goldfno = 0;
    }
    var me = this;
    this.goldArr.forEach(function (value, index) {
        // 绘制gold1--------------------------------
        var gold1 = value.gold1;
        var gold1_x = 0;
        var gold1_y = 0;
        var gold1_w = gold1.width;
        var gold1_h = gold1.height;

        var canvas1_x = me.ctx.canvas.width - value.step * value.count;
        var canvas1_y = me.goldfno;
        var canvas1_w = gold1.width;
        var canvas1_h = gold1.height;

        me.ctx.drawImage(gold1, gold1_x, gold1_y, gold1_w, gold1_h, canvas1_x, canvas1_y, canvas1_w, canvas1_h);

        // 绘制gold2--------------------------------
        var gold2 = value.gold2;
        var gold2_x = 0;
        var gold2_y = 0;
        var gold2_w = gold2.width;
        var gold2_h = gold2.height;

        var canvas2_x = me.ctx.canvas.width - value.step * value.count + 60;
        var canvas2_y = me.goldfno - 50;
        var canvas2_w = gold2.width;
        var canvas2_h = gold2.height;

        me.ctx.drawImage(gold2, gold2_x, gold2_y, gold2_w, gold2_h, canvas2_x, canvas2_y, canvas2_w, canvas2_h);
        // 绘制gold3--------------------------------
        var gold3 = value.gold3;
        //  console.log(gold)
        var gold3_x = 0;
        var gold3_y = 0;
        var gold3_w = gold3.width;
        var gold3_h = gold3.height;

        var canvas3_x = me.ctx.canvas.width - value.step * value.count + 140;
        var canvas3_y = me.goldfno - 40;
        var canvas3_w = gold3.width;
        var canvas3_h = gold3.height;

        me.ctx.drawImage(gold3, gold3_x, gold3_y, gold3_w, gold3_h, canvas3_x, canvas3_y, canvas3_w, canvas3_h);

    })
    // 进行判断
    // if (this.gold1_x == this.pipe_up_C.x) {
    //     this.redergold();
    // }


}

// 渲染多个金币
Game.prototype.createGold = function () {
    var gold = this.goldArr[0].create();
    this.goldArr.push(gold);
}


// // 渲染金币移动
Game.prototype.goldmove = function () {

    this.goldArr.forEach(function (value) {
        // value.count+=5;
        value.count++;
    })

}

// 清理数组中的金币
Game.prototype.cleargold = function () {

    for (var i = 0; i < this.goldArr.length; i++) {
        var gold = this.goldArr[i];
        if (gold.x - gold.step * gold.count < 50) {
            this.goldArr.splice(i, 1);
            return;
        }
    }
}

 





// 判断是否碰撞
Game.prototype.boom = function () {
    var bird_A = {
        x: -this.bird.img.width / 2 + this.bird.x + 5,
        y: -this.bird.img.height / 2 + this.bird.y + 8
    }
    var bird_B = {
        x: -this.bird.img.width / 2 + this.bird.x + this.bird.img.width - 5,
        y: -this.bird.img.height / 2 + this.bird.y + 8
    }
    var bird_C = {
        x: -this.bird.img.width / 2 + this.bird.x + 5,
        y: -this.bird.img.height / 2 + this.bird.y + this.bird.img.height - 8
    }
    var bird_D = {
        x: -this.bird.img.width / 2 + this.bird.x + this.bird.img.width - 5,
        y: -this.bird.img.height / 2 + this.bird.y + this.bird.img.height - 8
    }



    // // 开启路径
    // this.ctx.beginPath();
    // // 绘制矩形
    // this.ctx.moveTo(bird_A.x, bird_A.y);
    // this.ctx.lineTo(bird_B.x, bird_B.y);
    // this.ctx.lineTo(bird_D.x, bird_D.y);
    // this.ctx.lineTo(bird_C.x, bird_C.y);
    // // 关闭路径
    // this.ctx.closePath();
    // // 描边
    // // 改变描边色
    // this.ctx.strokeStyle = "aqua";
    // this.ctx.stroke();

    for (var i = 0; i < this.pipeArr.length; i++) {

        var pipe = this.pipeArr[i];

        var pipe_up_A={
            x:pipe.x - pipe.step * pipe.count,
            y:0
        }
        var pipe_up_B={
            x:pipe_up_A.x + pipe.pipe_up.width,
            y:0
        }
        var pipe_up_C = {
            x: pipe.x - pipe.step * pipe.count,
            y: pipe.up_height
        }
        var pipe_up_D = {
            x: pipe_up_C.x + pipe.pipe_up.width,
            y: pipe_up_C.y
        }

         // 开启路径
    // this.ctx.beginPath();
    // // 绘制矩形
    // this.ctx.moveTo(pipe_up_A.x, pipe_up_A.y);
    // this.ctx.lineTo(pipe_up_B.x, pipe_up_B.y);
    // this.ctx.lineTo(pipe_up_D.x, pipe_up_D.y);
    // this.ctx.lineTo(pipe_up_C.x, pipe_up_C.y);
    // // 关闭路径
    // this.ctx.closePath();
    // // 描边
    // // 改变描边色
    // this.ctx.strokeStyle = "aqua";
    // this.ctx.stroke();
        // 得到下管子的坐标--------------------------
        var pipe_down_A = {
            x: pipe.x - pipe.step * pipe.count,
            y: pipe.up_height + 150
        }
        var pipe_down_B = {
            x: pipe_down_A.x + pipe.pipe_up.width,
            y: pipe_down_A.y
        }
        var pipe_down_C = {
            x: pipe.x - pipe.step * pipe.count,
            y: 400
        }
        var pipe_down_D = {
            x:pipe_down_A.x + pipe.pipe_up.width,
            y: 400
        }
        // this.ctx.beginPath();
        // // 绘制矩形
        // this.ctx.moveTo(pipe_down_A.x, pipe_down_A.y);
        // this.ctx.lineTo(pipe_down_B.x, pipe_down_B.y);
        // this.ctx.lineTo(pipe_down_D.x, pipe_down_D.y);
        // this.ctx.lineTo(pipe_down_C.x, pipe_down_C.y);
        // // 关闭路径
        // this.ctx.closePath();
        // // 描边
        // // 改变描边色
        // this.ctx.strokeStyle = "aqua";
        // this.ctx.stroke();

    }
    // 判断是否触碰到上管子

    if (bird_B.x >= pipe_up_C.x && bird_B.y <= pipe_up_C.y && bird_A.x <= pipe_up_D.x) {
        this.gameover();
    }
    // 判断是否触碰到下管子

    if (bird_D.x >= pipe_down_A.x && bird_D.y >= pipe_down_A.y && bird_A.x <= pipe_down_B.x) {
        this.gameover();
    }
    // 判断是否触碰到地面
    var land_y = this.land.y;
    if (bird_D.y >= land_y) {
        this.gameover();
    }
}