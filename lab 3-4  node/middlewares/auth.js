const jwt = require ('jsonwebtoken');
const { model } = require('mongoose');
const TOKEN_KEY =process.env.TOKEN_KEY || "abdomagdy"

//   علشان نميز انها ميديل وير next    الي موجود بره وانا بنادم علي الميديل وير  وطبعا هنا اخدت function  ده اسم ال 
const auth = function (req,res,next){
     const token = req.headers["x-token"]; //  فخنثى   هنا بقوله روح هات القيمه الي في الهيدر الي اسمه كذا وحطه في القيمه ال 

     if(!token) // لو كانت فاضيه ومفهاش قيمه يقولك مطلوب لكن لو مش فاضيه يكمل عادي 
     {
        return res.status(403).send("A token is required for authentication");
     }
     try{
        const decoded = jwt.verify(token,TOKEN_KEY) // هنا انا بعمل فريفاي للتوكن الي اخدت قيمته من الهيدر وبقول هل السيرفر عمل  
        req.user = decoded;                         // واحد ذيه قبل كدا ولا لا لو تمام خلاص لو مش تمام يبقي كدا غلط ويقولك انه التوكن ده غلط
                                                    // بعد كدا بقوله طالما التوكن تمام ضيفه مع الداتا بتاعت اليوزر
      }
     catch(err)
     {
         return res.status(401).send("invalid Token"); //  catch هينفذ الي في    try    هنا لو حصل مشكله في  
     }
     return next();  //  auth      هنا كدا بقوله الدنيا تمام وارجع تاني كمل الي جوه الفانكشن الي اسمها 
}

module.exports = auth;   //    اكسبورت علشان اعرف اقراها في ملف الاساسي الي بره auth   هنا بعمل  