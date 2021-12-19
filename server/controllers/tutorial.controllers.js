const db = require("../models");
const Tutorial = db.tutorials;

exports.create = (req, res)=>{
  if(!req.body.title){
    res.status(400).send({message : "Content can not be empty!"});
    return;
  }
}
const tutorial = new Tutorial({
  title: req.body.title,
  description : req.body.description,
  published : req.body.published ? req.body.published : false
})

tutorial.save(tutorial).then(data =>res.send(data)).catch(err =>{
  res.status(500).send({message: err.message || "Some error occurred while creating the Tutorial."})
})

exports.findAll = (req, res)=>{
  const title = req.body.title;
  var condition = title ? {title: {$regex: new RegExp(title), $option: "i"}} : {};


  Tutorial.find(condition).then(data =>{res.send(data);}).catch(err=>{
    res.status(500).send({
      message : err.message || "Some error occurred while creating the Tutorial."
    })
  })
}

exports.findOne = (req, res)=>{
  const id = req.params.id;

  Tutorial.findById(id).then(data =>{
    if(!data)
    res.status(404).send({message : "not found tutorial with id" +id});
    else res.send(data);
  }).catch(err =>{
    res.status(500).send({
      message : err.message || "Some error occurred while creating the Tutorial."
    })
  })
}
exports.update = (req, res)=>{
  if(!req.body){
    res.status(400).send({message : "Content can not be empty!"});
  }
  const id = req.params.id;
  Tutorial.findByIdAndUpdate(id, req.body, {useFindAndModify: false}).then(data =>{
    if(!data){
      res.status(404).send({message:`Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`})
    } else res.send({message: "Tutorial was updated succeful"})
  }).catch(err =>{
    res.status(500).send({message: "Error updating Tutorial with id=" +id})
  });
};

exports.delete = (req, res)=>{
  const id= req.params.id

  Tutorial.findByIdAndRemove(id, {useFindAndRemove: false}).then(data=>{
    if(!data){
      res.status(404).send({message:`Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`})
    } else res.send({message: "Tutorial was deleted succeful"})
  }).catch(err =>{
    res.status(500).send({message: err.message || "Error updating Tutorial with id=" +id})
  })
}



