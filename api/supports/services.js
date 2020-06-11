
export const titleConstruct=(string)=>{
    string=string.split(' ')

    var newstring = string.map((val,index)=>{
        var newcase=val.charAt(0).toUpperCase()+val.slice(1)
        // console.log(newcase)

        return newcase
    })

    newstring=newstring.join(' ')
    console.log(newstring)
    return newstring
}

// titleConstruct('hello kitty')