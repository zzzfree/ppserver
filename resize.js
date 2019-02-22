    const resizeImg = require('resize-img'); 
   	const fs = require('fs');

    var file_path = './public/images/AP2019-0005.jpg';
    var file_path_sm = './public/images/AP2019-0005_sm.jpg';
    
    // resizeImg(fs.readFileSync(file_path), {width: 800}).then(buf => {
    //     fs.writeFileSync(file_path_sm, buf);
    // });


var gm = require('gm');

gm(file_path)
    .resize(200,200)     //设置压缩后的w/h
    //.setFormat('JPEG')
    //.quality(70)       //设置压缩质量: 0-100
    //.strip()
    //.autoOrient()
    .write(file_path_sm , 
    function(err){console.log("err: " + err);})
//2, 获取图片尺寸
//gm("图片路径").size(function(err,value){});
//3, 获取图片大小
//gm("图片路径").filesize(function(err,value){});```   