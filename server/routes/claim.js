var express = require('express');
var router = express.Router();
const claimModel = require('../models/claim')
const validate = require('../controllers/validate.js')

router.get('/', function(req, res, next) {
  res.send('Claim Router works very well.');
});

router.get('/list', function (req, res, next) {
  claimModel.find()
  .then(response=> {
    if (response) {
      res.status(200).send(response)
    } else {
      res.status(404).send("No claims available")
    }
  })
  .catch(err=>{
    res.status(500).send("Server error: "+err)
  })
});

router.post('/new', (req, res, next) => {
  req.body.creationDate = new Date().toDateString();
  console.log(req.body);
  next()
}
,(req, res, next)=>{
    const {errors} = validate(req.body);
    if(errors)
      return res.status(400).send({message: errors.details[0].message})
    else
      claimModel.create(req.body)
      .then(response=>{
      if (response) {
        res.status(201).send(response)
      } else {
        res.status(409).send("Failed to create a claim")
      }
      })
      .catch(err=>{
        res.status(500).send('Internal Server Error'+err)
      })
})

router.get('/findByRegNumber', function (req, res, next){
  const regNumberOfStudent= req.query.regNumber;
  claimModel.find({regNumber:regNumberOfStudent})
  .then(response=> {
    if (response) {
      res.status(200).send(response)
    } else {
      res.status(404).send("You don't have any claim yet!")
    }
  })
  .catch(err=>{
    res.status(500).send("Server error: "+err)
  })
})

router.get('/findById', function (req, res, next){
  const claimId = req.query.id;
  claimModel.findById(claimId)
  .then(response=> {
    if (response) {
      res.status(200).send(response)
    } else {
      res.status(404).send("No such claim available!")
    }
  })
  .catch(err=>{
    res.status(500).send("Server error: "+err)
  })
})

router.put('/update', function(req, res, next){
    const {errors} = validate(req.body);
    if(errors)
        return res.status(400).send({message: errors.details[0].message})
        
    const claimId = req.query.id;
    claimModel.findByIdAndUpdate(claimId, req.body)
    .then(response=>{
        if (response) {
        res.status(201).send("Claim Updated")
        } else {
        res.status(409).send("Failed to update claim")
        }
    })
    .catch(err=>{
        res.status(500).send('Internal Server Error'+err)
    })
})

module.exports = router;
