module.exports = function(app) {
    const port = process.env.PORT || 3500;
    app.listen(port, () => {
        console.log(`App listening on port ${port}!`);
    });
}