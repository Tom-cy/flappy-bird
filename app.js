var http=require('http');
var fs=require('fs');
//开启服务
var server=http.createServer(function(req,res){
    var url=req.url;
    var file = "."+url;
    fs.readFile(file,function(err,data){
        console.log(data)
        if(err){
            res.writeHeader(404,{
                'content-type' : 'text/html;charset="utf-8"'
            });
            res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
            res.end();
        }else{
            res.writeHeader(200,{
                'content-type' : 'text/html;charset="utf-8"'
            });
            console.log(data)
            res.write(data);//将index.html显示在客户端
            res.end();

        }
    })
}).listen(8888);
console.log('服务器开启成功');