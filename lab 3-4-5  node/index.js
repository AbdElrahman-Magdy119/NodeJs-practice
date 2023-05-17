const express = require('express')
const moment = require('moment')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('./middlewares/auth')
const PORT = process.env.PORT || 5000 ;
const TOKEN_KEY =process.env.TOKEN_KEY || "abdomagdy"
const app = express();
app.use(express.json())

const User = require("./models/user");
const post = require("./models/post")


// Register                    //           ده الي هوه لسه هيعمل يوزر جديد

//   async :   وانه يستني لحد ما ينفذ الكود بعدها يدخل علي الي  بعده await دي علشان ال     
app.post("/register",async (req, res) => {
    try {
        // دي اخدت الداتا من اليوزر من البادي وحطت كل قيمه في اسمها 
        const { firstname, lastname, email, password } = req.body;
    
        //   دي انا لازم اتاكد انه اخد كل البيانات ودخلها تبقا للاسكيما لو تمام يكمل لو مش تمام يقوله لا كل الداتا مطلوبه  
        if (!(email && password && firstname && lastname)) {
             res.status(400).send("All input is required");
             //console.log("error")
        }
    
         // السطر ده بقوله هات اليوزر الي الايميل بتاعه نفس الايميل الي دخله اليوزر لو لقيته هتبقي قيمه
         // المتغير ده بترو وفي الحاله دي كدا غلط لان الايميل يونيك ومش بيتكرر وكدا
         // اتكرر فيطلعله ان دخل تاني لان انا هنا بعمل كريت ليوزر جديد مينفعش يدخل ايميل دخل قبل كدا 
        // findOne({email:email})  دي هي هي الي تحتها 
        //awit دي هنا علشان يستني لحد ما يجبله الداتا
        const oldUser = await User.findOne({ email });
         // هنا ذي ما قولنا لو دي بترو يقوله دخل تاني لو غلط يكمل الخطوات
        if (oldUser) {
          return res.status(409).send("User Already Exist. Please Login");
        }
          
        //دي الي بحول فيها الباسورد للتشفير بحيث لما اليوزر يدخل الباسورد تتشفر بعد كدا ومحدش يشوف الباسورد غيره هوه 
        // هنا هوه عمل تشفير للباسورد الي دخله اليوزر في البادي
        encryptedPassword = await bcrypt.hash(password, 10);
    
        // انا هنا بعد ما اتاكد ان كل حاجه صح والدنيا تمام يروح يضيف اليوزر ببيناته كلها 
        const user = await User.create({
            firstname,
            lastname,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            // هنا هوه بيحط الباسورد بعد ما عمله تشفير 
            password: encryptedPassword,
        });
    
        //     environment variable الي بتشفر بيه وطبعا ده قيمته مش باخدها انا بعرفها للسيرفر بتاعي من ضمن ال  key  وبعد كدا اديتها ال  id ,email هنا انا عملت توكن والداتا بتاعته هي ال 
        const token = jwt.sign(
          { user_id: user._id, email },
          TOKEN_KEY
        );
        // هنا بقوله سيف التوكن الي اتكريت بالتوكن الي متسجل مع اليوزر نفسه لان فيه توكن انا عامله متغير مع اليوزر في الاسكيما 
        user.token = token;
    
        // هنا بقوله رد عليا باليوزر الي عملتله كريت 
        res.status(201).json(user);  


      } catch (err) {         //     catch  هيدخل ينفذ الي في ال   try ده طبعا لو فيه حاجه غلط في ال 
        console.log(err);
      }
});


 // Login          //  ده عندي يوزر وهعمل لوجن 

app.post("/login", async (req, res) => {
    try {
        //                الي دخلهم اليوزر في البادي   email,pass  ده بقوله هات 
        const { email, password } = req.body;
    
        // هنا بتاكد انه دخل الباسورد والايميل لان لو مدخلش حاجه فيهم بقوله كلهم مطلوبين
        if (!(email && password)) {
          res.status(400).send("All input is required");
        }

        // هنا بقي بعمل بحث بالايميل الي دخل هل هوه هوه الي عندي وده موجود ولا لا لانه لو موجود يكمل لو مش موجود يبقي غلط
        const user = await User.findOne({ email });
          // في الاول بتاكد ان المتغير الي فوق بترو وانه لقي الايميل موجود وبعدها بعمل مقارنه بانه الباسورد نفس الباسورد الي دخل 
        if (user && (await bcrypt.compare(password, user.password))) {
          // انا هنا بعمل كريت للتوكن مره تانيه وهوه مش شرط انا ممكن اعملها مره
          // واحده بس سواء ريجستر او لوجن حسب اللوجيك بتاعي وقتها انا هنا كريت توكن وحطيت قيمته في التوكن الي موجود اليوزر نفسه 
          const token = jwt.sign(
            { user_id: user._id, email },
            TOKEN_KEY
          );
            
          // هنا عملت سيف للتوكن
          user.token = token;
    
          // هنا برجع اليوزر الي عمل لوجن
          res.status(200).json(user);
        } 
        res.status(400).send("Invalid Credentials");   // هنا بقوله لو حاجه من الي فوق غلط قوله ان كدا غلط ومش مطابق للشروط 
      } 
      catch (err) {         // catch  هيدخل ينفذ الي في ال   try ده طبعا لو فيه حاجه غلط في ال 
        console.log(err);
      }
});
                //  هنا بقي لو كله تمام عمل الايمل وكله صح وعمل لوجن وكله
                // صح ادخل هنا ده الي هوه يعمل فرفكاشن لكل ريكويست مبعوت من اليوزر يتاكد فيها انه اليوزر ده عامل لوجن
                // يعني لازم اعمل دي والي هوه بعدها اعمل نيكست علي التنفيذ بعد الفانكشن الي جايه لسه 



   //  علي التوكن الي مبعوت من  viryfy  هنا بنفذ الميديل وير الي هيعمل 
   //     الريكويست بحيث انه يتاكد ان التوكن ده السيرفر بتاعي عمله قبل كدا ولا لا لو عمله تمام ولو لا يقوله غلط ده مش موجود عندي 
  
   //  دي اسم الفانكشن الي بينفذها جوه صفحه الميديل وير   auth ال 
   //  ولو نفذ فيها كل حاجه صح هيجي ينفذ السطر بتاع ويلكم لو غلط من هناك بيقوله فيه مشكله 
   app.use("/Welcome",auth , (req,res) => {
      
    //res.send(req.user.iduser_id)
    //res.send(req.user.user_id)
    post.find({auther:req.user.user_id},(err,userr) => {
         if(!err) return res.json(userr)
          res.send("error")
      }).populate("auther")
   // res.status(200).send(req.user)
    console.log(" ♥♥♥♥♥♥♥   Welcome 🙌 ♥♥♥♥♥♥♥♥ ")
});









// app.use((req,res,next) => {
//     console.log(moment().format('MMMM Do YYYY, h:mm:ss a'))
//     next()
// })

const userroutes = require ('./routes/user')
const postroutes = require ('./routes/post')
app.use('/user',userroutes)
app.use('/post',postroutes)



const mongoose = require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/userAndposts",(err)=>
{
    if(!err) return console.log("databases connect successfuly");
    console.log(err)
})

app.listen(PORT,(err)=>{
    if(!err) return console.log("server connect successfuly");
    console.log(err) 
})


