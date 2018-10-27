// 管子类
function Pipe(pipe_up, pipe_down, step, x) {
    this.pipe_up = pipe_up;
    this.pipe_down = pipe_down;
    this.step = step;
    this.x = x;

    // 定义上管子的高
    this.up_height= parseInt(Math.random() * 249) + 1;
    // 定义下管子的高
    this.down_height=250-this.up_height;
    // 定义一个管子用的计时器

    this.count=0;
}
// 创建管子
Pipe.prototype.create=function(){
    return new Pipe(this.pipe_up,this.pipe_down,this.step,this.x);

}

