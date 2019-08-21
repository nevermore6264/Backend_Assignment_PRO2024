
const Staff = require("../model/staff.model.js");
exports.login = (req, res) => {

    const user = new Staff({
        username: req.body.username,
        password: req.body.password
    });
    Staff.findOne({ username: req.params.username },  function(err, user) {
        if(user ===null){
            res.end("Login invalid");
         }else if (user.username === req.body.name && user.password === req.body.pass){
         res.render(user);
         
       } else {
         console.log("wrong");
       }
    });
}