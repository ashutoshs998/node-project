var mongoose = require('mongoose');
var encrypt = require('md5');
var async = require('async');
mongoose.Promise = global.Promise;
var connect = mongoose.createConnection('mongodb://localhost/mydb');
var user_schema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String
}, 
{
    strict: true,
    collection: 'Users'
});
var proschema = mongoose.Schema({
    User_id: String,
    dob: String,
    ph_no: Number
}, 
{
    strict: true,
    collection: 'UsersProfile'
});
var user = connect.model('user', user_schema);
var userprofile = connect.model('userprofile', proschema);
var detail = [
    { firstname: 'ashutosh', lastname: 'mudgal', email: 'ashu@gmail.com', password: 'dgjlflks', dob: '02/02/1993', ph_no: 9842382328 },
    { firstname: 'abhi', lastname: 'sri', email: 'abhi@gmail.com', password: 'djfkskd', dob: '03/03/2000', ph_no: 9292392392 },
    { firstname: 'manish', lastname: 'joy', email: 'manish@gmail.com', password: 'irtufdfgf', dob: '04/04/1993', ph_no: 9242029322 },
    { firstname: 'vikas', lastname: 'bisht', email: 'bisht@gmail.com', password: 'sdfglsdsfd', dob: '05/05/1991', ph_no: 8393493040 },
    { firstname: 'sumit', lastname: 'sri', email: 'ashu@gmail.com', password: 'rlskgrgsd', dob: '06/06/1998', ph_no: 9223828399 },
    { firstname: 'saurbh', lastname: 'k', email: 'saurabh@gmail.com', password: 'saurhdhsh', dob: '07/07/2001', ph_no: 8032723727 },
];
async.forEachOf(detail, function(udata, key, callback) {
        var userdata = new user({
            firstname: udata.firstname,
            lastname: udata.lastname,
            email: udata.email,
            password: encrypt(udata.password)
        });
        userdata.save(function(err, pdata) {
            if (err) {
                console.log(err);
            } 
            else if (pdata) {
                var prodata = new userprofile
	                ({
	                    User_id: pdata._id,
	                    dob: udata.dob,
	                    ph_no: udata.ph_no
	                });
                prodata.save(function(err, udata) {
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
