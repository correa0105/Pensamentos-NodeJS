exports.middlewareGlobal = (req, res, next) => {
    res.locals.session = req.session.userid;
    next();
};

exports.middlewareAuth = (req, res, next) => {
    const logged = req.session.userid;
    if(!logged) {
        req.flash("message", "Você precisa estar logado para acessar essa aba.");
        req.session.save(() => {
            res.redirect("/login")
        });
        return;
    }

    next()
};