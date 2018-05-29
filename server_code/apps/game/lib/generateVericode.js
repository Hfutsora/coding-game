const generateVericode = function() {
    let code = '';
    for (let i = 0; i < 6; i ++) {
        const randomNum = Math.floor(Math.random() * 10);
        code = code + randomNum;
    }

    return code;
};

module.exports = {
    generateVericode
};
