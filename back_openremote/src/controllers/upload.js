const db = require("../models");
const realm = db.realm;
const master_realm = db.master_realm;
const path = require('path');
const file = import('move-file');
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir1 = `../front_openremote/public/${req.body.title}`;
        //Create new directory by name project
        fs.mkdir(dir1, (err) => {
            if (err) {
                console.log(err)
            }
            console.log("Directory is created.");
        })
        const dir = `../front_openremote/public/${req.body.title}/Build`;
        //Create new directory for project 
        fs.mkdir(dir, (err) => {
            if (err) {
                console.log(err)
            }
            console.log("Directory is created.");
        })
        cb(null, dir)
    },
    filename: (req, file, cb) => {
        const { originalname } = file;
        // or 
        // uuid, or fieldname
        cb(null, originalname);
    }
})

exports.upload = multer({
    storage: storage
}).any('file');

//Upload d'un realm(Project) 
exports.realmUpload = (req, res) => {
    //Move file from currentpath to public
    // directory path
    /*const destination = `../front_openremote/public/${req.body.nameProject}`;
    var source = `../../${req.body.currentPath}`

   copy source folder to destination
    fs.copy(source, destination, function (err) {
        if (err) {
            console.log('An error occured while copying the folder.')
            return res.status(400).send({ message: err })
        }
        return res.status(200).send({ message: "copied" })
    });*/

    let info = {
        file: req.files.path,
        title: req.body.title,
    }
    console.log('2')
    return res.json({ status: 'OK', uploaded: req.files});


}

//Import d'un realm(project)
exports.realmImport = (req, res) => {
    realm.findOne({
        where: {
            id: req.body.realm_id
        }
    }).then(realm => {
        if (!realm) {
            return res.status(404).send({ message: "realm not found!" })
        } else {
            res.status(200).send({ pathWebGL: realm.pathWebGL })
        }
    }).catch(err => {
        console.log(err)
        res.status(500).send({ message: err.message })
    })
}