const UserController = require('./controllers/UserController')
const UserAuthenController = require('./controllers/UserAuthenController')
const isAuthenController = require('./authen/isAuthenController')
const BlogController = require('./controllers/BlogController')
const CommentController = require('./controllers/CommentController')
const TableController = require('./controllers/TableController')
const blog = require('./models/Blog.js')


let multer = require("multer")

//upload section
let storage = multer.diskStorage({
  destination: function (req, file, callblack) {
    callblack(null, "./public/uploads");
  },
  filename: function(req, file, callblack) {
    // callback(null, file.fieldname + '-' + Data.now());
    console.log(file);
    callblack(null, file.originalname);
  }
})
let upload = multer({ storage: storage }).array("userPhoto",10)





module.exports = (app) => {
  app.post('/user',UserController.create)
  app.put('/user/:userId',UserController.put)
  app.delete('/user/:userId',UserController.remove)
  app.get('/user/:userId',UserController.show)
  app.get('/users', isAuthenController, UserController.index)
  app.post('/login',UserAuthenController.login)



  //blog route
  //create blog
  app.post('/blog',BlogController.create)
  //edit blog, suspend, active
  app.put('/blog/:blogId',BlogController.put)
  //delete blog
  app.delete('/blog/:blogId',BlogController.remove)
  //get blog by id 
  app.get('/blog/:blogId',BlogController.show)
  //get all blog
  app.get('/blogs',BlogController.index)


  //table route

  app.post('/table',TableController.create)
  
  app.put('/table/:tableId',TableController.put)
  
  app.delete('/table/:tableId',TableController.remove)

  app.get('/table/:tableId',TableController.show)

  app.get('/tables',TableController.index)

  //Comment route
    //create comment
  app.post('/comment', CommentController.create)
  //edit comment, suspend, active
  app.put('/comment/:commentId',CommentController.put)
  //delete comment
  app.delete('/comment/:commentId',CommentController.remove)
  //get comment by id 
  app.get('/comment/:commentId',CommentController.show)
  //get all comment
  app.get('/comments',CommentController.index)



// upload 
  app.post("/upload", function(req, res) {
  // isUserAuthenticated
      upload(req, res, function(err) {
        if(err){
        return res.end("Error uploading file");
        }
        res.end("File is uploaded");
      })
    })

  //delete flie uploaded function
  app.post('/upload/delete', async function (req, res) {
    try {
      const fs = require('fs');

      console.log(req.body.filename)
      fs.unlink(process.cwd() + '/public/uploads/' + req.body.filename,
      (err) => {
        if (err) throw err;
        res.send("Delete sucessful")
        // conlose.log('successfully deleted material file');
      });
    } catch (err) {
        res.status(500).send({
          error: 'An error has occured trying to delete file the material'
        })
    }
  })


}

