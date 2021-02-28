const express = require("express"),
	server = express(),
	path = require("path"),
	filePath = "/home/jonathan/Downloads/testHP.mp3"

server.get("/", (req,res) => {
	console.log("got request for example.html")
	res.sendFile(path.join(__dirname,"./example.html"))
})

//this is very unsafe so obviusly dont run this dumb code outside of development
server.get("/file", (req,res) => {
	const { file, context } = req.query
	if(!file) return res.send("no file in query")
	console.log(`got request for ${file} with context ${context||"none"} from ${req.ip}`)

	if(context) {
		res.sendFile(path.join(__dirname,"../",file))
	} else res.sendFile(file)
})

server.get("/movie", (req,res) => {
	res.sendFile(filePath)
})

setInterval(() => {
	console.log("clearing...")
	setTimeout(() => {
		console.clear()
	},1000*2)
},1000 * 60)

//if you are using armadillo dont run at same port or caching will make this not work
server.listen(1984, () => {
	console.log("listening")
})