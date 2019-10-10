module.exports = function(app) {
    const port = 3500
    app.listen(port, () => {
        console.log(`App listening on port ${port}!`);
    });
}