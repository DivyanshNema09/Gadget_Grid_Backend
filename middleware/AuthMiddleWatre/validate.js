function validate(schema){
    function checkData(req,res,next){
        const result = schema.validate(req.body)

        if(result.error){
            return res.status(400).json({
                success : false,
                message : result.error.details[0].message
            })
        }

        req.body = result.value;

        next()
    }
    return checkData
}
module.exports = validate
