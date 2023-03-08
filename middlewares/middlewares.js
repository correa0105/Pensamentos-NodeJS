exports.middlewareGlobal = (req, res, next) => {
    res.locals.session = req.session.userid;
    next();
};