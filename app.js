"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var app = (0, express_1.default)();
var bday_js_1 = require("./models/bday.js");
var morgan_1 = __importDefault(require("morgan"));
//connection to database
var dbURI =
	"mongodb+srv://me23b238:ZfFotUdyfWUfp2CA@bdaydata.dpwbku8.mongodb.net/bday-data?retryWrites=true&w=majority&appName=bdayData";
mongoose_1.default
	.connect(dbURI)
	.then(function (result) {
		app.listen(3000);
	})
	.catch(function (err) {
		console.log(err);
	});
//register view engine
app.set("view-engine", "ejs");
//middleware and static files
app.use(express_1.default.static("public"));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)("dev"));
app.get("/Home", function (req, res) {
	var today = new Date();
	var date = today.getDate();
	var month = today.getMonth() + 1;
	var year = today.getFullYear();
	bday_js_1.default
		.find()
		.sort({ diff: 1 })
		.then(function (result) {
			res.render("index.ejs", {
				title: "Home",
				bdays: result,
				date: date,
				month: month,
				year: year,
			});
		});
});
app.get("/addBday", function (req, res) {
	res.render("create.ejs", { title: "Add a Bday" });
});
app.post("/add-bday", function (req, res) {
	console.log(req.body.name);
	bday_js_1.default
		.exists({ name: req.body.name })
		.then(function (result) {
			res.redirect("/".concat(result._id));
		})
		.catch(function (err) {
			var bday = new bday_js_1.default({
				name: req.body.name,
				bdayDate: Number(req.body.bday.slice(8, 10)),
				bdayMonth: Number(req.body.bday.slice(5, 7)),
				bdayYear: Number(req.body.bday.slice(0, 4)),
				diff: Number(req.body.bday.slice(8, 10)) + 30 * Number(req.body.bday.slice(5, 7)),
			});
			bday.save()
				.then(function (result) {
					res.redirect("/Home");
				})
				.catch(function (err) {
					console.log(err);
				});
		});
});
app.get("/bday/:name", function (req, res) {
	var name = req.params.name;
	bday_js_1.default
		.findOne({ name: name })
		.then(function (result) {
			res.redirect("/".concat(result._id));
		})
		.catch(function (err) {
			res.redirect("/Home");
		});
});
app.get("/:id", function (req, res) {
	var today = new Date();
	var date = today.getDate();
	var month = today.getMonth() + 1;
	var year = today.getFullYear();
	var id = req.params.id;
	console.log(id);
	bday_js_1.default
		.findById(id)
		.then(function (result) {
			res.render("details.ejs", {
				title: "Birthday Details",
				bdays: result,
				date: date,
				month: month,
				year: year,
			});
		})
		.catch(function (err) {
			console.log(err);
		});
});
app.put("/bdays/:id/:birthday/:name", function (req, res) {
	var id = req.params.id;
	var birthday = req.params.birthday;
	var name = req.params.name;
	bday_js_1.default
		.replaceOne(
			{ _id: id },
			{
				_id: id,
				name: name,
				bdayDate: Number(birthday.slice(8, 10)),
				bdayMonth: Number(birthday.slice(5, 7)),
				bdayYear: Number(birthday.slice(0, 4)),
				diff: Number(birthday.slice(8, 10)) + 30 * Number(birthday.slice(5, 7)),
			}
		)
		.then(function (result) {
			res.json({ redirect: "/".concat(id) });
		})
		.catch(function (err) {
			console.log(err);
		});
});
app.delete("/bdays/:id", function (req, res) {
	var id = req.params.id;
	console.log(id);
	bday_js_1.default
		.findByIdAndDelete(id)
		.then(function (result) {
			res.json({ redirect: "/Home" });
		})
		.catch(function (err) {
			console.log(err);
		});
});
