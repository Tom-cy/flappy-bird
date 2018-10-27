function Gold(gold1, gold2, gold3, step, x) {
    this.gold1 = gold1;
    this.gold2 = gold2;
    this.gold3 = gold3;

    this.step = step;
    // this.gold_height = parseInt(Math.random() * 399) + 1;
    this.x = x;
    this.up_height= parseInt(Math.random() * 249) + 1;
    // 定义下管子的高
    this.down_height=250-this.up_height;
    // 计数器
    this.count = 0;


}
Gold.prototype.create = function () {
    return new Gold(this.gold1, this.gold2, this.gold3, this.step, this.x );
}