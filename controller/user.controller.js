const userModel = require("../models/user.model");
var bcrypt = require("bcryptjs");
const ObjectId = require('mongodb').ObjectId;
path = require('path');

const addUser = (req, res) => {
    const user = new userModel({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    });

    userModel.create(user).then((newUser) => {
        return res.status(200).json({
            message: 'Successfully registerd!',
            data: [newUser]
        });
    }).catch((err) => {
        console.log(err);
        return res.status(400).json({
            message: 'Something went wrong, please try again.'
        });
    });

}

const getUserByID = (req, res) => {

    try {
        let id = req.params.id
       userModel.findById({_id: ObjectId(id)}).then((getData)=>{
        console.log('getData==', getData);
        let info={};
        console.log(req.url);
        info.id = req.params.id
        info.username = req.query.username
        return res.status(200).json({
            data: info
        });
       }).catch(()=>{
            console.log('No data found of this id===');
            return res.status(400).json({
                message: 'No data found of this id.'
            });
       })
     
    } catch (error) {
        console.log('Error in getUserByID', error);
    }
}

module.exports = {addUser, getUserByID};