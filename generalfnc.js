function checkLogin(req,res,next) {
	if(req.session != null){
		if(req.session.userId){
			next();
		} else {
			notice = "Sellist kasutajat pole";
			res.redirect("/");
		}
	}
	else {
		res.redirect("/");
	}
} 