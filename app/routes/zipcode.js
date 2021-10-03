const express = require('express');
const router = express.Router();
const Zipcode = require('../models/Zipcode');

const localDB = {

}

//get backs all the zipcodes
router.get('/display', (async (req, res) => {
    try{
        const keys = transformToList(localDB)
        // const zipcodes = await Zipcode.find();
        const rangesList = zipcodeRanges(keys)
        res.contentType = "text/plain";
        return res.send(JSON.stringify(rangesList.join(', ')))
    }catch (err){
        res.send({message: err});
    }
    // res.send('We Are on Zipcodes')
}));
//get a specific post
router.get('/has/:zipcode', (async (req, res) => {
    console.log(req.params.zipcode)
    try {
        // const zipcode = await Zipcode.find({"zipcode":req.params.zipcode})
        // const zipcode = await Zipcode.findById(req.params.zipcode)
        if (localDB[req.params.zipcode] !== undefined){
            res.send(true)
        }else{
            res.send(false)
        }
        // res.send(zipcode)
    }catch (err){
        res.send(err)
    }

}));

//delete a post
router.get('/delete/:zipcode',async (req, res) => {
    try{
        // const removedPost = await Post.deleteOne({ "_id" : ObjectId(req.params.postId) })
        if (localDB.hasOwnProperty(req.params.zipcode)){
            delete localDB[req.params.zipcode]

        }
        // const removedPost2 = await Zipcode.findByIdAndRemove(req.params.zipcode)
        res.send("Zip code " + req.params.zipcode + " deleted.")
        // const removedPost = await Post.findById(req.params.postId).remove().exec()

    }catch (err) {
        res.send({message: err})
    }
})


//insert a zipcode
router.get('/insert/:zipcode', (async (req, res) => {

    const zipcode = new Zipcode({
        zipcode: req.params.zipcode,
    });
    try{
        // const savedZipcode = await zipcode.save();
        localDB[req.params.zipcode] = req.params.zipcode
        res.send("Zip code " + req.params.zipcode + " inserted.");
    }catch (err){
        res.send({message : err});
    }


}))

function transformToList(dictionary){
    const keys = [];
    for (const key in dictionary) {
        if (dictionary.hasOwnProperty(key)) {
            keys.push(key);
        }
    }
    return keys
}


function zipcodeRanges(a)
{
    let length = 1;
    let list
        = [];

    // If the array is empty,
    // return the list
    if (a.length == 0) {
        return list;
    }

    // Traverse the array from first position
    for (let i = 1; i <= a.length; i++) {

        // Check the difference between the
        // current and the previous elements
        // If the difference doesn't equal to 1
        // just increment the length variable.
        if (i == a.length
            || a[i] - a[i - 1] != 1) {

            // If the range contains
            // only one element.
            // add it into the list.
            if (length == 1) {
                list.push(
                    (a[i - length]).toString());
            }
            else {

                // Build the range between the first
                // element of the range and the
                // current previous element as the
                // last range.
                list.push(a[i - length]
                    + "-" + a[i - 1]);
            }

            // After finding the first range
            // initialize the length by 1 to
            // build the next range.
            length = 1;
        }
        else {
            length++;
        }
    }

    return list;
}

module.exports = router;
