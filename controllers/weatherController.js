const axios = require("axios");
const {XMLParser} = require("fast-xml-parser");
const dbInfo = require("../../vp2024config");
const mysql = require("mysql2");
const conn = mysql.createConnection({
	host: dbInfo.configData.host,
	user: dbInfo.configData.user,
	password: dbInfo.configData.passWord,
	database: dbInfo.configData.dataBase
});

/* const bodyparser = require("body-parser"); */
//@description homepage weather
//@route GET /api/weather
//@access public
const weatherHome = (req, res)=>{
	axios.get("https://www.ilmateenistus.ee/ilma_andmed/xml/forecast.php")
	.then(response => {
		//console.log("Alustuseks: " + response);
		const parser = new XMLParser();
		let weatherData = parser.parse(response.data);
		//console.log(weatherData);
		//console.log(weatherData.forecasts);
		/* console.log(weatherData.forecasts.forecast[0]);
		//let thing = weatherData.forecasts.forecast[0];
		console.log(weatherData.forecasts.forecast[0].day.text); */
		let notice = weatherData.forecasts.forecast[0].day.text;
		res.render("weather",{notice: notice});
	})
	.catch(error => {
		console.log(error);
		res.render("weather");
	});
};

//@description homepage addnews
//@route GET /api/addnews
//@access public
const weatherAddingHome = (req, res)=>{
	let notice = "";
	let title = req.body.titleInput;
	let description = req.body.contentInput;
	let expireDate = req.body.expireInput;
	res.render("addnews");
};

//@description posting addnews
//@route GET /api/addnews
//@access public
const weatherAdding = (req, res)=>{
	let sqlReq = "INSERT INTO vp2news news_title,news_text,news_date,expire_date, user_id";
	let notice = "";
	let title = req.body.titleInput;
	let description = req.body.contentInput;
	let expireDate = req.body.expireInput;
	conn.pull(sqlReq[title,desciption,expireDate],(err,sqlRes) =>{
	if (err){
		notice = "Tehnilistel pohjustel andmeid ei saanud";
		res.render("addnews", {notice: notice});
	} else {
		res.redirect("/weather", {title:title, description:description,expirationDate:expirationDate});
	}
	})	
};

//@description homepage weather with button post addingNews
//@route GET /api/addnews
//@access public
const changeAdding = (req, res)=>{
	let sqlReq = "SELECT news_title,news_text,news_date,expire_date, user_id from vp2news where id=?";
	let notice = "";
	conn.execute(sqlReq[id]),(err,sqlRes) =>{
		if(err){
			notice = "Tehnilistel pohjustel andmeid ei saanud";
			res.render("weather", {notice: notice});
		} else {
			let title = news_title[0].sqlRes;
			let description = news_text[0].sqlRes;
			let newsDate = news_date[0].sqlRes;
			let expirationDate = expire_date[0].sqlRes;
			const obj = JSON.parse('{"Title":title, "Description":description, "News date":newsDate,"Expiration date":expirationDate }');
			document.getElementsByName("changeNewsSubmit").innerHTML=obj;
			res.render("addnews", {title:title, description:description,newsDate:newsDate,expirationDate:expirationDate});
		}
		let sqlReq = "UPDATE vp2news SET news_title = ?,news_text = ?,news_date = ?,expire_date= ?, user_id = ? WHERE id = ?";
		conn.pull(sqlReq, [title,description,newsDate,expirationDate],(err,sqlRes) =>{
		if (err){
				notice = "Tehnilistel pohjustel andmeid ei salvestanud";
				res.render("addnews", {notice: notice});
		} else {
				console.log("Andmed on salvestatud");
				res.render("weather");
			}
		});
	}
};


module.exports = {
		weatherHome,
		weatherAddingHome,
		changeAdding,
		weatherAdding,
};