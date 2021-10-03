const homeIndex = (req, res) => {
    res.send("Home Page GET");
};


const homePostCode = (req, res) => {
    res.send("Home Page POST Code");
};


module.exports = {
    homeIndex,
    homePostCode
};
