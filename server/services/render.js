const axios = require('axios');


exports.homeRoutes = (req, res) => {
    res.render('index');
}


exports.register = (req, res) => {
    // Make a get request to /api/complaints
    axios.get('http://localhost:3000/api/complaints')
        .then(function(response){
            res.render('register', { complaints : response.data });
        })
        .catch(err =>{
            res.send(err);
        })

    
}

exports.add_complaint = (req, res) =>{
    res.render('add_complaint');
}

exports.update_complaint = (req, res) =>{
    axios.get('http://localhost:3000/api/complaints', { params : { id : req.query.id }})
        .then(function(complaintdata){
            res.render("update_complaint", { complaint : complaintdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}