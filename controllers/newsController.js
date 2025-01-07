const dbInfo = require('../../../vp2024config');
const mysql = require('mysql2');
//database connection
const conn = mysql.createConnection({
	host: dbInfo.configData.host,
	user: dbInfo.configData.user,
	password: dbInfo.configData.passWord,
	database: dbInfo.configData.dataBase
});

//@description homepage for news section
//@route GET /api/news
//@access private
const newsHome = (req,res)=>{
	res.render("news");
};

//@description homepage for addnews section
//@route GET /api/addnews
//@access private
const addNews = (req,res)=>{
	res.render("addnews");
};

//@description adding news
//@route GET /api/news
//@access private
const addingNews = (req, res)=>{
	if(!req.body.titleInput || !req.body.contentInput || !req.body.expireInput){
		console.log('Uudisega jama');
		notice = 'Andmeid puudu!';
		res.render('addnews', {notice: notice});
	} 
	else { 
		let sql = 'INSERT INTO vp2news (news_title, news_text, expire_date, user_id) VALUES(?,?,?,?)';
		//t userid = 1;
		//andmebaasi ühendus pool'i kaudu
				//andmebaasi osa
			conn.execute(sql, [req.body.titleInput, req.body.contentInput, req.body.expireInput, req.session.userId], (err, result)=>{
				if(err) {
					throw err;
					notice = 'Uudise salvestamine ebaõnnestus!';
					res.render('addnews', {notice: notice});
				} else {
					notice = 'Uudis edukalt salvestatud!';
					res.render('addnews', {notice: notice});
				}
			});
			//andmebaasi osa lõppeb
		}
};
 

//@description homepage for readnews section/headings
//@route GET /api/readnews
//@access private
const newsList = (req,res)=>{
	res.render("readnews");
};

//@description homepage for readnews section/headings
//@route GET /api/readnews
//@access private
const readingNewsList = (req,res)=>{
	let notice = "";
	let sqlReq = 'SELECT FROM vp2news (news_title, news_text, expire_date, user_id) VALUES(?,?,?,?)';
	const executeDb = conn.execute(sqlReq, [req.body.titleInput, req.body.contentInput, req.body.expireInput, req.session.userId], (err, result)=>{
	if(err){
		notice = 'Kahjuks, uudised on puudu'
		res.render('read', {notice: notice});
		console.log(err);
	} else { 
	//let appendLink = link();
		res.render('read', {newsTitle: news_title, newsText: news_text, expireDate: expire_date})
	}
});





module.exports = {
		newsHome,
		addNews,
		addingNews,
		newsList,
		readingNewsList
};