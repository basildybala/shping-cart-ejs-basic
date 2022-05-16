const router=require('express').Router();
const { exists } = require('../models/pages');
const Page=require('../models/pages')

// router.get('/',(req,res)=>{
// res.send('ADmin Page')
// })


router.get("/",  async (req, res) => {
    try {
      const page = await Page.find().sort();
      
      res.status(200).render('admin/pages',{page});
    } catch (err) {
      res.status(500).json(err);
    }
  });


//ADMIN ADD PAGES 
router.get ('/add-page', function (reg, res){
   var title="";
   var slug="";
   var content
    res.render ('admin/admin-add-page',{
        title: title,
        slug: slug,
        content: content
   });
});

router.post ('/add-page', function (req, res){
    
    let newPage=new Page(req.body)
    try{
        newPage.save()
        req.flash('danger',"Page ADded")
        res.redirect('/admin/pages/add-page')
    }catch{
        res.status(500).send('Error')
    }

  
    
});







module.exports=router
