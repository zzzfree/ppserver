
var  fs=  require('fs');

var gm = require('gm');

const crypto = require('crypto');

function md5(s){
  const hash = crypto.createHash('md5');
  hash.update(s);
  return hash.digest('hex');
}

var _p = 'Y:/manwei.zeng/Accenture/Huang, Frimen Weiming - Photography/Photography/FY19_accenture_GZ_SZ_Annual_Party/';

var file_path_sm = './public/images/AP2019-0005_sm.jpg';

function toResizePath(path, width){ 
    var p = md5(path) + '_' + width + '_sm.jpg'; 
    console.log( 'resized path: ' + p );
    return p;
}

function resizeImage(path, res, width){

    var file_path =  path.replace(/\-{3}/ig,'/'); // _p + path; 

    var file_path_sm = './public/images/' + toResizePath(path, width);

    console.log('start resize ' + file_path);
    console.log('to  ' + file_path_sm);

    gm(file_path)
    .resize(width, width)
    .write(file_path_sm , 
    function(err){
        console.log("err: " + err);

        var p = file_path_sm.replace('./public/','../');

        console.log('Resized, redirecting to ' + p);

        setTimeout(function() {
            
            res.redirect( p );
            res.end();

          }, 100);
    });
}

function readImage(path,res){
    fs.readFile(path,'binary',function(err,  file)  {
        if  (err)  {
            console.log(err);
            return;
        }else{
            console.log("输出文件 try to resize ");
            res.writeHead(200,  {'Content-Type':'image/jpeg'});
            res.write(file,'binary');
            res.end();
        }
    });
}


var express = require('express');
var router = express.Router();  

/* GET users listing. */
router.get('/:name', function(req, res, next) {

    var w = req.query.width || 200; 
    var p = './public/images/' + toResizePath( req.params.name, w );

    if(w=='full'){
        console.log('loading full size image');
        var fp = req.params.name.replace(/\-{3}/ig,'/');
        readImage(fp, res); 
        return;      
    }else if ( w>1200 ){
        w = 1200;
    }

    //p = req.params.name.replace('.jpg', '_sm.jpg').replace(/\-{3}/ig,'/');

    console.log( fs.existsSync(p) + ' ' + p);

    if(fs.existsSync(p)){
        p = p.replace('./public/','../');
        console.log('Redirecting to ' + p);
        res.redirect( p );
        res.end();
        return;
    }

    //res.writeHead(200, {"Content-Type":"image/jpeg"});
    if (res.url!=="/favicon.ico") {
        console.log('>>>' + req.params.name);
        //res.write('hello,world');//不能向客户端输出任何字节,否则会影响图片的输出
        resizeImage(req.params.name, res, w);
        // readImage(file_path_sm, res); //如果文件路径存在则添加数据，如果不存在则新建文件并且添加数据
        console.log("继续执行");
        //res.end('end'); 在 readImage.readImage方法中已经写过了
    }

});

module.exports = router;