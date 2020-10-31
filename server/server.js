const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const db = require('monk')('localhost:27017/dbreservation');
const accountSid = "AC545fdaac14d6ffe55f915355347a09a7";
const authToken = "c32bd1895a9cc6fc75b41a3a8720a732";
const client = require('twilio')(accountSid, authToken);
var rand = require("random-key");


const app = express();

app.use(morgan('common'));

app.use(helmet());

app.use(cors());

app.use(express.json());

app.get('/',(req,res) =>{
    res.json({
        message:"random"
    })
})

const reservs = db.get('dbreservation');

app.get('/db',async (req,res)=>{
  const a = await reservs.find({});
  res.json(a);
})



app.post('/reservation',(req,res)=>{
  var a = rand.generate();
  reservs.insert(req.body);
  client.messages
  .create({
     body: `${req.body.name}A sua reserva para ${req.body.number} ás ${req.body.visitDate} está confirmada, mostre este chave para confirmar ${a} `,
     from: '+14159850934',
     to: `+351${req.body.datatime}`
   })
  .then(message => console.log(message));
  res.json(req.body)
})

const PORT = 1337;

app.listen(PORT);