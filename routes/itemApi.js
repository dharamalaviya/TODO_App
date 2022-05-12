const express = require("express")
const { route } = require("express/lib/application")
const router = express.Router()
router.use(express.json())


const itemModel = require('../models/item')
// Display all item
router.get('/getItem', async(req,res) =>{
    try{
        const getItem = await itemModel.find({});
        res.status(200).json(getItem)
    }catch(err){
        res.json(err)
    }
})

// Display item by id
router.get('/getItem/:id', async(req,res) =>{
    try{
        const itemId = req.params.id;
        const getItem = await itemModel.findById({_id :itemId});

        if(getItem === 0){
            return res.json({data:"Item not found"})
        }
        return res.json({data:getItem})
    }catch(err) {
        res.json(err);
    }
})

// Add Item 
router.post('/addItem',async(req, res) => {
    try {
        const addItem = new itemModel({
            item : req.body.item
        })
        const saveItem = await addItem.save()
        res.status(200).json(saveItem)
    } catch(err) {
        res.json(err);
    }
})

// Update item by id

router.put('/updateItem/:id',async(req, res)=>{
    try{
        const itemId = req.params.id;
        const updateItem = await itemModel.findByIdAndUpdate(req.params.id,req.body);

        if(updateItem === 0){
            return res.json({data:"Item not found"})
        }
        return res.json({data:updateItem})
    }catch(err) {
        res.json(err);
    }

})


// Delete Item by id
router.delete('/deleteItem/:id', async(req,res) =>{
    try{
        const itemId = req.params.id;
        const deleteItem = await itemModel.findOneAndRemove(itemId);

        if(deleteItem === 0){
            return res.json({data:"Item not found"})
        }
        return res.json({data:"Delete Successully"})
    }catch(err) {
        res.json(err);
    }
})

module.exports = router