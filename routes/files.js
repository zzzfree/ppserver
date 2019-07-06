var express = require('express');
const { exec } = require('child_process');
var _ = require('lodash');
var router = express.Router();
var fs = require("fs");

var raws = ['CR2','ARW','NEF'];

function convertPath(path){
    return path.replace(/\-{3}/ig,'/');
}

/* GET users listing. */
router.get('/:path', function(req, res, next) {

  console.log('readdirSync start.');

  try{
    var data = fs.readdirSync( convertPath(req.params.path) ); //./public/images'); 
    res.send(data);  
  }catch(err){
      res.send([]);
  }

});

/* GET users listing. */
router.get('/time/:path', function(req, res, next) {

  console.log('time asc start.');

  try{
    var dir = convertPath(req.params.path);  

    exec('ls -t ' + dir, (err, stdout, stderr) => {
        if (err) {
          console.error(err);
          return;
        }
        res.send(stdout.split('\n'));
      });

  }catch(err){
      res.send([]);
  }

});

/* GET users listing. */
router.post('/remove', function(req, res, next) {

  console.log('remove start.'); 
  console.log( req.body.files );
  var success = false;
  var all = [];

  var file_path_sm = '';
  var file_path_raw = '';

  try{
    _.each(req.body.files, v=>{
        var d = {
            path: v,
            success: false,
            success_sm: false,
            success_raw: false
        }

        try{
            fs.unlinkSync(v);
            d.success = true;
        }catch(e){
            console.log( 'remove file error ' + v );
            console.log(e); 
        } 

        try { 
            file_path_sm = './public/images/' + v.replace(/\//ig,'---').replace('.jpg', '_sm.jpg'); 
            fs.unlinkSync(file_path_sm);
            d.success_sm = true;
        } catch (error) { 
            console.log( 'remove file sm error ' + file_path_sm );
            console.log(error);
        }

        /* remove raw files */
        _.each(raws,r=>{ 
            try { 
                file_path_raw = v.replace('.jpg', '.' + r); 
                fs.unlinkSync(file_path_raw);
                d.success_raw |= true; 
                console.log( 'remove file raw success ' + file_path_raw );
            } catch (error) { 
                console.log( 'remove file raw error ' + file_path_raw );
                console.log(error);
            } 
        });

        all.push( d )
        console.log( d );
    });
     
    res.send(  all );  

  }catch(err){
      console.log(err);
      res.send([]);
  }

});

module.exports = router;
