const mongoose = require('mongoose');

const ZipcodeSchema = mongoose.Schema({
    zipcode: {
        type: String,
        required: true
    },
})

// const ZipCodeSchema = mongoose.Schema({
//     zipcode: {
//         type: String,
//         required: true
//     }
// })

module.exports = mongoose.model('Zipcodes', ZipcodeSchema);
// module.exports = mongoose.model('ZipCode', ZipCodeSchema);
