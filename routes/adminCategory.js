const router=require('express').Router();
const { send } = require('express/lib/response');
const Category=require('../models/category')

// router.get('/',(req,res)=>{
// res.send('ADmin Page')
// })


router.get("/",  async (req, res) => {
    try {
      const category = await Category.find().sort();
      
      res.status(200).render('admin/categories',{category});
    } catch (err) {
      res.status(500).json(err);
    }
  });


//ADMIN ADD PAGES 
router.get ('/add-category', function (req, res){
    res.render ('admin/add-category',);
});

router.post ('/add-category', function (req, res){
    
    let newCACategory=new Category(req.body)
    try{

        newCACategory.save()
        req.flash('danger',"Page ADded")
        res.redirect('/admin/categories')
    }catch{
        res.status(500).send('Error')
    }

    
});
router.get ('/edit-category/:id',async function (req, res){
    let cat=await Category.findById(req.params.id)
    res.render ('admin/edit-category',{cat});
});
router.post ('/edit-category/:id',async function (req, res){
    
    try {
        const updateCategory = await Category.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).redirect('/admin/categories');
      } catch (err) {
        res.status(500).json(err);
      }

    
});

router.get("/delete-category/:id", async (req, res) => {
    try {
      await Category.findByIdAndDelete(req.params.id);
      req.flash ('success', 'Page deleted!'); 
      res.status(200).redirect('/admin/categories')
    } catch (err) {
      res.status(500).json(err);
    }
  });







module.exports=router
