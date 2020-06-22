const util = {}

util.error = (error, res) => {
    console.log(error);
    return res.sendStatus(500);
}

module.exports = () => util;