var mongoose = require('mongoose');
var encrypt = require('md5');
var async = require('async');
mongoose.Promise = global.Promise;
var conn = mongoose.createConnection('mongodb://localhost/last');
var user_schema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String
}, {
    strict: true,
    collection: 'Users'
});
var userprofile_schema = mongoose.Schema({
    User_id: String,
    dob: String,
    ph_no: Number
}, {
    strict: true,
    collection: 'UsersProfile'
});
var user = conn.model('user', user_schema);
var userprofile = conn.model('userprofile', userprofile_schema);
var detail = [
    { firstname: 'ashutosh', lastname: 'mudgal', email: 'ashu@gmail.com', password: 'dgjlflks', dob: '02/02/1993', ph_no: 9842382328 },
    { firstname: 'abhi', lastname: 'sri', email: 'abhi@gmail.com', password: 'djfkskd', dob: '03/03/2000', ph_no: 9292392392 },
    { firstname: 'manish', lastname: 'joy', email: 'manish@gmail.com', password: 'irtufdfgf', dob: '04/04/1993', ph_no: 9242029322 },
    { firstname: 'vikas', lastname: 'bisht', email: 'bisht@gmail.com', password: 'sdfglsdsfd', dob: '05/05/1991', ph_no: 8393493040 },
    { firstname: 'sumit', lastname: 'sri', email: 'ashu@gmail.com', password: 'rlskgrgsd', dob: '06/06/1998', ph_no: 9223828399 },
    { firstname: 'saurbh', lastname: 'k', email: 'saurabh@gmail.com', password: 'saurhdhsh', dob: '07/07/2001', ph_no: 8032723727 },
];
async.forEachOf(detail, function(user_collection_data, key, callback) {
        var user_data = new user({
            firstname: user_collection_data.firstname,
            lastname: user_collection_data.lastname,
            email: user_collection_data.email,
            password: encrypt(user_collection_data.password)
        });
        user_data.save(function(err, userprofile_collection_data) {
            if (err) {
                console.log(err);
            } else if (userprofile_collection_data) {
                var userprofile_data = new userprofile({
                    User_id: userprofile_collection_data._id,
                    dob: user_collection_data.dob,
                    ph_no: user_collection_data.ph_no
                });
                userprofile_data.save(function(err, user_collection_data) {
                    if (err) {
                        console.log(err);
                    }
                });
            }
            callback();
        });
    },
    function(err) {
        if (err) {
            console.log(err);
            process.exit();
        }
    });