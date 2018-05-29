const checkVericode = function(body, session, type) {
    if (session[type]) {
        const now = new Date().getTime();
        if (session[type].expired < now) {
            return 1;
        }
        if (body.tel !== session.tel || session[type].verifyCode !== body.vericode) {
            return 0;
        }

        return 2;
    }

    return 0;
};

module.exports = {
    checkVericode
};
