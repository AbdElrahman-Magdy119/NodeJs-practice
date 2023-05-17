const mainfile = require('./functions')


function prepareData (data)
{
    const preparedata = data.reduce((prev,elm,index,array)=>
    {
        const [key,value] = elm.split('=');
        prev[key]=value;
        return prev
    },{})
    return preparedata;
}


function main (cmdArgs)
{
    const [, , operation, ...data] = cmdArgs

    const preparedata = prepareData(data)
    switch (operation)
    {
        case "add":
            mainfile.add(preparedata)
            break;
        case "eidt":
            mainfile.eidt(preparedata)
            break;
        case "list":
             mainfile.list(data)
             break;
        case "remove":
                mainfile.remove(preparedata)
                break;
        case "check":
                mainfile.check(preparedata)
                break;
        case "uncheck":
                mainfile.uncheck(preparedata)
                break;
        default:
            console.log("\n\n\nplease select from this list [add,eid,list,remove,check,uncheck]\n\n\n")
    }
}
main(process.argv)