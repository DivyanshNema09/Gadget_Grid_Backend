const testing = (req,res)=>{
    return res.status(201).json({
        success : true,
        message : "testing done"
    })
}

module.exports = {testing}