//if the db layer throws an error, parse and propagate up the error, this helper achieves that

const getErrorMessage = (err) => {
    let message = ''
    let { code } = err
    if (code && code != 11000) {
        if (code === 11001){
            message = getUniqueErrorMessage(err)
        }else {
            message = "Something went wrong"
        }
    } else {
        for (let errName in err.errors) {
            if (err.errors[errName].message)
                message = err.errors[errName].message
        }
    }
    return message
}
//some errors are non unique index values, deal with those here
const getUniqueErrorMessage = (err) => {
    let output
    try {
        let fieldName = err.message.substring(err.message.lastIndexOf('.$') + 2,
        err.message.lastIndexOf('_1'))
        output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + 'already exists'
    }catch (ex) {
        output = 'Unique field already exists'
    }
    return output
}

export default {getErrorMessage} 