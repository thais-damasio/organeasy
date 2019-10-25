module.exports = function(req, res, next) {
    if(process.env.NODE_ENV === "development")
        res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    else
        res.header("Access-Control-Allow-Origin", process.env.APP_URL); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
}