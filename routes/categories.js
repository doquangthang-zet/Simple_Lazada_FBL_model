const router = require("express").Router();

//Our cate model
const categories = require("./../models/category");


//API to get all the cate in database
router.get("/getAll", async (req, res) => {
    // const option = {
    //     sort: {
    //         createdAt: 1,
    //     },
    // };

    const data = await categories.find().populate('parent');

    if (data) {
        return res.status(200).send({success: true, cate: data});
    } else {
        return res.status(400).send({success: false, message: "Error when finding all cates (not found)"});
    }
});

//API to save the cate in database
router.post("/save", async (req, res) => {
    const newCate = categories({
        name: req.body.name,
        parent: req.body.parent_cate,
        properties: req.body.properties,
    })
 
    try {
        const savedCate = await newCate.save();
        return res.status(200).send({success: true, cate: savedCate});
    } catch (error) {
        return res.status(400).send({success: false, message: "Error when saving new category"});
    }
});

//API to get one cate in database
router.get("/getOne/:id", async (req, res) => {
    const filter = {_id: req.params.id};

    const data = await categories.findOne(filter).populate('parent');

    if (data) {
        return res.status(200).send({success: true, cate: data});
    } else {
        return res.status(400).send({success: false, message: "Error when finding a album (not found)"});
    }
}); 

//API to save the cate in database
router.put("/update/:id", async (req, res) => {
    const newCate = {
        name: req.body.name,
        parent: req.body.parent_cate,
        properties: req.body.properties,
    }
 
    try {
        const savedCate = await categories.findOneAndUpdate({_id: req.params.id}, newCate);
        return res.status(200).send({success: true, cate: savedCate});
    } catch (error) {
        return res.status(400).send({success: false, message: "Error when saving new category"});
    }
});

//API to delete the cate in database
router.delete("/delete/:id", async (req, res) => {
    const filter = {_id: req.params.id};

    const result = await categories.deleteOne(filter);

    if (result) {
        return res.status(200).send({success: true, message: "Data deleted succesfully"});
    } else {
        return res.status(400).send({success: false, message: "Error when deleting a cate (not found)"});
    }
})

module.exports = router