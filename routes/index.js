module.exports = function(app){
  app.get('/', function(req, res){

    res.render('index');
  });

  app.use('/speechtotext', require('./speechtotext'));

  app.use(function(req, res){
    if(res.headersSent){
      res.render('404');
    }
  })
}
