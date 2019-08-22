
const Staff = require("../model/staff.model.js");
exports.loginUser = (req, res) => {

    const user = new Staff({
        username: req.body.username,
        password: req.body.password
    });
    Staff.findOne({ username: req.body.username }, (err, user) => {
        // if (user == null) {
        //     res.end("Login invalid");
        if (err) return res.status(500).send('Server error!');
        if (!user) {
        // email does not exist
            res.status(409).send({ message: 'Something is wrong' });
            } else if (user.username === req.body.username && user.password === req.body.password) {
                res.send({user});
                console.log("login success!");

            
        } else {
            console.log("login fail !");
        }
    });
}