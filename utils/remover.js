const removeFields = function (val) {
    if (val) {
        delete val._id;
        delete val.__v;
    }

    if (val instanceof Array) {
        Array.prototype.forEach.call(val, (post) => {
            delete post._id;
            delete post.__v;
        });
    }

    return val;
};

module.exports = {
    removeFields
};
