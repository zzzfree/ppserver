var express = require('express');
var _ = require('lodash');
var router = express.Router();
var fs = require("fs");


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
router.post('/remove', function(req, res, next) {

  console.log('remove start.'); 
  console.log( req.body.files );
  var success = false;
  var all = [];
  try{
    _.each(req.body.files, v=>{
        try{
            fs.unlinkSync(v);
            success = true;
        }catch(e){
            console.log( 'remove file error ' + v );
            console.log(e);
            success = false;
        }finally{
            all.push({
                path: v,
                success: success
            })
        }
    });
     
    res.send(  all );  

  }catch(err){
      console.log(err);
      res.send([]);
  }

});

module.exports = router;
