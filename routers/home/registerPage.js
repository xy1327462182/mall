module.exports = (req, res) => {
    if (req.query.errmsg) {
        return res.render('./home/register', {
            errmsg: req.query.errmsg
        });
    } else {
        res.render('./home/register')
    }
    
}