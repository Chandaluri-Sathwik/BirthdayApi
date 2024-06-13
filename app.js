const express=require('express');
const morgan=require('morgan');
const mongoose=require('mongoose');
const app=express();
const Bday=require('./models/bday');


//connection to database
const dbURI='mongodb+srv://me23b238:ZfFotUdyfWUfp2CA@bdaydata.dpwbku8.mongodb.net/bday-data?retryWrites=true&w=majority&appName=bdayData'
mongoose.connect(dbURI)
.then((result)=>{
    app.listen(3000);
}).catch((err)=>{
    console.log(err);
})

//register view engine
app.set('view-engine','ejs');

//middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));

app.get('/Home',(req,res)=>{
    const today=new Date();
    date=today.getDate();
    month=today.getMonth()+1;
    year=today.getFullYear();

    Bday.find().sort({diff:1})
    .then(result=>{
        res.render('index.ejs',{title:'Home',bdays:result ,date,month,year});
    })
});
app.get('/addBday',(req,res)=>{
    res.render('create.ejs',{title:'Add a Bday'});
})
app.post('/add-bday',(req,res)=>{
  console.log(req.body.name);
  Bday.exists({name:req.body.name})
  .then(result=>{
    res.redirect(`/${result._id}`);
  }).catch(err=>{const bday=new Bday({
    name:req.body.name,
    bdayDate:Number(req.body.bday.slice(8,10)),
    bdayMonth:Number(req.body.bday.slice(5,7)),
    bdayYear:Number(req.body.bday.slice(0,4)),
    diff:Number(req.body.bday.slice(8,10))+30*Number(req.body.bday.slice(5,7))
  })
  bday.save()
  .then(result=>{
    res.redirect('/Home');
  }).catch(err=>{
    console.log(err);
  })})
  
})
app.get('/bday/:name',(req,res)=>{
  const name=req.params.name;
  Bday.findOne({name:name})
  .then(result=>{
    res.redirect(`/${result._id}`);
  }).catch(err=>{
    res.redirect('/Home');
  })
})

app.get('/:id',(req,res)=>{
  const today=new Date();
    date=today.getDate();
    month=today.getMonth()+1;
    year=today.getFullYear();
  const id=req.params.id;
  console.log(id);
  Bday.findById(id)
  .then(result=>{
    res.render('details.ejs',{title:'Birthday Details',bdays:result ,date,month,year});
  }).catch(err=>{
    console.log(err);
  })
})

app.put('/bdays/:id/:birthday/:name',(req,res)=>{
  const id= req.params.id;
  const birthday=req.params.birthday;
  const name=req.params.name;
  Bday.replaceOne({_id:id},{
    _id:id,
    name,
    bdayDate:Number(birthday.slice(8,10)),
    bdayMonth:Number(birthday.slice(5,7)),
    bdayYear:Number(birthday.slice(0,4)),
    diff:Number(birthday.slice(8,10))+30*Number(birthday.slice(5,7))
  }).then((result=>{
    res.json({redirect:`/${id}`});
  })).catch((err)=>{
    console.log(err)
  })
})

app.delete('/bdays/:id',(req,res)=>{
   const id=req.params.id;
   console.log(id);
   Bday.findByIdAndDelete(id)
   .then((result=>{
    res.json({redirect:'/Home'})
   })).catch(err=>{
    console.log(err);
   })

})