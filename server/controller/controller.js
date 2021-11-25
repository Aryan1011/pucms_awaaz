var Complaintdb = require('../model/model');

// create and save new complaint
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new complaint
    const complaint = new Complaintdb({
        roll : req.body.roll,
        name : req.body.name,
        email : req.body.email,
        department : req.body.department,
        gender: req.body.gender,
        status : req.body.status,
        post : req.body.post,
        subject : req.body.subject,
        detail : req.body.detail
    })

    // save complaint in the database
    complaint
        .save(complaint)
        .then(data => {
            //res.send(data)
            res.redirect('/add-complaint');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}

// retrieve and return all complaints/ retrive and return a single complaint
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        Complaintdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found complaint with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving complaint with id " + id})
            })

    }else{
        Complaintdb.find()
            .then(complaint => {
                res.send(complaint)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving complaint information" })
            })
    }

    
}

// Update a new idetified complaint by complaint id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Complaintdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update complaint with ${id}. Maybe complaint not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update complaint information"})
        })
}

// Delete a complaint with specified complaint id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    Complaintdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "complaint was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete complaint with id=" + id
            });
        });
}