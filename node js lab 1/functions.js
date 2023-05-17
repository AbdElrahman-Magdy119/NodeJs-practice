
const fs = require('fs');

async function readfileasync (path,coding)
{
    return new Promise((resolve, reject) => {
        fs.readFile(path,coding, (err, data) => {
            if (err) {
                reject(err);
            } else {
              return resolve(data);
            }
        });
})
}

async function writefileasync (path,data)
{
    return new Promise((resolve, reject) => {
        fs.writeFile(path,data, (err) => {
            if (err) {
                reject(err);
            } else {
               return resolve();
            }
        });
})
}

async function existfileasync(path)
{
    return new Promise((resolve,reject) => {
        fs.exists(path,(exist) => {
          resolve(exist);
        });
})
}
  
async function add (data) {
 
       const check = await existfileasync('./db.json')
      if(!check)
      {
        await writefileasync('./db.json',JSON.stringify([]))
      }
    try
    {
         const todostring = await readfileasync('./db.json','utf-8')
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
   
         writefileasync('./db.json', JSON.stringify(todolist))
    }
    catch(err)
    {
       console.log(err)
    }
    

}

async function eidt (data) {

    try
    {
      const todostring = await readfileasync('./db.json','utf-8')
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
  
              writefileasync('./db.json', JSON.stringify(todolist))
       }
    }
    catch(err)
    {
       console.log(err);
    }
    
}

async function list (data) {
   try
   {
      const todostring = await readfileasync('./db.json','utf-8')
      const todolist =  JSON.parse(todostring);
      if(data[0] == "all")
      {
         console.log(todostring);
      }
     else if(data[0] == "checked")
      {
         const filterarray = todolist.filter(elm => elm.checked)
         console.log(filterarray);
      }
      else if(data[0] == "unchecked")
      {
         const filterarray = todolist.filter(elm => !elm.checked)
         console.log(filterarray);
      }
      else
      {
        console.log( "\n\n\n   please select from this list[all,checked,unchecked] \n\n\n ")
      }
   }
   catch(err)
   {
      console.log(err)
   }
   
}

async function remove (data)
 {
    try
    {
      const todostring = await readfileasync('./db.json','utf-8')
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
           writefileasync('./db.json', JSON.stringify(todolist))
      }
    }
    catch(err)
    {
      console.log(err);
    }
    
}

async function check (data)
 {
    try
    {
      
         const todostring = await readfileasync('./db.json','utf-8')
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
      
            writefileasync('./db.json', JSON.stringify(todolist))
         } 
    
    }
    catch(err)
    {
      console.log(err);
    }

     
}

async function uncheck (data)
 {
    try
    {
         const todostring = await readfileasync('./db.json','utf-8')
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
      
            writefileasync('./db.json', JSON.stringify(todolist))
         }  
    }
    catch(err)
    {
      console.log(err);
    }
   
    
}

module.exports = {
   add,eidt,list,remove,check,uncheck
}
   


