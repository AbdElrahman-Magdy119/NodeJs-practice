



const fs = require('fs');
function add (data) {
    if(!fs.existsSync('./db.json')){
        fs.writeFileSync('./db.json',JSON.stringify([]))
    }
     const todostring = fs.readFileSync('./db.json','utf-8')
     const todolist =  JSON.parse(todostring);
         let len;
       if( todolist.length == 0)
       {
          len = 1;
       }
       else
       {
          len= todolist[todolist.length-1].id +1 ;
       }
      
    const todo = {
    id: len, 
    title : data.title,
    body : data.body,
    checked:false
     }

     todolist.push(todo)

     fs.writeFileSync('./db.json', JSON.stringify(todolist))

}

function eidt (data) {

    const todostring = fs.readFileSync('./db.json','utf-8')
    const todolist =  JSON.parse(todostring);
     
    

      if(todolist.length == 0 )  
      {
         console.log(" \n\n\n   cant update becouse this file is empty \n\n\n\ ")  
      }              
     else
     {
             let flag = 0;
            const result = todolist.map((elm,index,arr)=>
            {
               if(data.id == elm.id)
               {
                     elm.title=data.title;
                     elm.body=data.body;
                     flag = 1;
               }
            })
            if( flag == 0)
            {
               console.log(" \n\n\n   this id not found in file \n\n\n\ ")
            }

            fs.writeFileSync('./db.json', JSON.stringify(todolist))
     }
}

function list () {
    const todostring = fs.readFileSync('./db.json','utf-8')
    const todolist =  JSON.parse(todostring);
    console.log(todostring);
//     if(data[0] == "all")
//     {
//        console.log(todostring);
//     }
//    else if(data[0] == "checked")
//     {
//        const filterarray = todolist.filter(elm => elm.checked)
//        console.log(filterarray);
//     }
//     else if(data[0] == "unchecked")
//     {
//        const filterarray = todolist.filter(elm => !elm.checked)
//        console.log(filterarray);
//     }
//     else
//     {
//       console.log( "\n\n\n   please select from this list[all,checked,unchecked] \n\n\n ")
//     }
}
function remove (data)
 {
    const todostring = fs.readFileSync('./db.json','utf-8')
    const todolist =  JSON.parse(todostring);

    if(todolist.length == 0 )  
      {
         console.log(" \n\n\n   this file is empty already  \n\n\n\ ")  
      }   
    else
    {
          let flag=0
         todolist.filter((elm,index,arr)=>{
            if(data.id == elm.id)
            {
                  todolist.splice(index,1)
                  flag = 1
            }
         })

          if( flag == 0)
          {
            console.log(" \n\n\n   this id not found in file  \n\n\n\ ")  
          }
         fs.writeFileSync('./db.json', JSON.stringify(todolist))
    }
}

function check (data)
 {
    const todostring = fs.readFileSync('./db.json','utf-8')
    const todolist =  JSON.parse(todostring);
    if(todolist.length == 0 )  
      {
         console.log(" \n\n\n   this file is empty   \n\n\n\ ")  
      }  
    else
    {
      let flag = 0;
      const result = todolist.map((elm,index,arr)=>
      {
         if(data.id == elm.id)
         {
             elm.checked=true
             flag = 1;
         }
      })
       if( flag == 0)
       {
         console.log(" \n\n\n     id not found in file  \n\n\n ")
       }
  
       fs.writeFileSync('./db.json', JSON.stringify(todolist))
    } 
    
     
}

function uncheck (data)
 {
    const todostring = fs.readFileSync('./db.json','utf-8')
    const todolist =  JSON.parse(todostring);
    if(todolist.length == 0 )  
    {
       console.log(" \n\n\n   this file is empty   \n\n\n\ ")  
    }
    else
    {
      let flag = 0;
      const result = todolist.map((elm,index,arr)=>
      {
         if(data.id == elm.id)
         {
             elm.checked=false
             flag = 1
         }
      })
      if( flag == 0)
       {
         console.log(" \n\n\n     id not found in file  \n\n\n ")
       }
  
       fs.writeFileSync('./db.json', JSON.stringify(todolist))
    }  

    
}

module.exports = {
   add,eidt,list,remove,check,uncheck
}
   


