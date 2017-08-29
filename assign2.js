var MongoClient = require('mongodb').MongoClient;
var average = 0;
MongoClient.connect('mongodb://localhost/last', function(err, db, callback) {
    if (err) {
        console.log(err);
    }
    var present_date = new Date();
    var sum = 0,
        count = 0;
    db.collection('UsersProfile').find().each(function(err, data) {
        if (err) {
            console.log(err);
        }
        if (data) {
            var date_of_birth = new Date(data.dob);
            var age = present_date.getFullYear() - date_of_birth.getFullYear();
            sum = sum + age;
            count++;
            if (age >= 25) {
                console.log("above age is more than 25 years")
                db.collection('UsersProfile').remove({ "_id": data._id }, function(err, result) {
                    if (result === 1) {
                        console.log('error: ' + err)
                    } else {
                        console.log('data with the age over 25 is Deleted')
                    };
                });
            }
            average = sum / count;
        } else {
            console.log("Average age: " + average);
        }
    });
    if (callback)
        callback();
});