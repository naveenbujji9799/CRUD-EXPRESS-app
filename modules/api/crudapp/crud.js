var mongoose = require('mongoose');

var crud ={
    title: "crudapp",
    statusCode: 200
}

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://naveen:naveen12345@ds237337.mlab.com:37337/naveen-test',{useNewUrlParser:true});

//schema-child
var addschema = mongoose.Schema({
    streetAddress: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    postalCode: {
        type: Number,
        required: true
    }
})
//schema-parent
var mydata = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    address: {
        type: [addschema],
        required: true
    }
}, {Collection: 'cruddata'});


var model = mongoose.model('cruddata',mydata);//model

// POST
crud.adddata = function(req,res){
    var postbody = req.body;
    var data = {
        firstName: postbody.firstName,
        lastName: postbody.lastName,
        phoneNumber: postbody.phoneNumber,
        address: postbody.address
    }
    var savedata = new model(data);
    savedata.save(function(err,data1){
        if (err){
            res.send({
                statusCode: 500,
                message: "data did not save"
            })
        }
        else{
            res.send({
                statusCode: 200,
                message: "data saved",
                data: data1
            })
        }
    })
}

// GET
crud.getdata = function(req,res){
    model.find({},function(err,data1){
        if (err){
            res.send({
                statusCode: 500,
                message: "data did not get"
            })
        }
        else{
            res.send({
                statusCode: 200,
                message: "data get",
                data: data1
            })
        }
    })
}

// DELETE
crud.deletedata = function(req,res){
    var postbody = req.params.id;
    model.findByIdAndRemove(postbody,function(err,data1){
        if (err){
            res.send({
                statusCode: 400,
                message: "data did not deleted"
            })
        }
        else{
            res.send({
                statusCode: 200,
                message: "data deleted",
                data: data1
            })
        }
    })
}
// UPDATE
crud.updatedata = function(req,res){
    var postbody = req.body;
    var data = {
        firstName: postbody.firstName,
        lastName: postbody.lastName,
        phoneNumber: postbody.phoneNumber,
        address: postbody.address
    }
    var updateId = req.params.id;

    model.findByIdAndUpdate(updateId,data,function(err,data1){
        if (err){
            res.send({
                statusCode: 500,
                message: "data did not update"
            })
        }
        else{
            res.send({
                statusCode: 200,
                message: "data updated",
                data: data1
            })
        }
    })
}


module.exports = crud;