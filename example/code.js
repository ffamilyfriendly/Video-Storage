const conf = VS.getDefaultConfig()
conf.debug = true
conf.onready = () => {
	t.get("test")
	.then(() => {
		document.getElementById("progOuter").remove()
		const btn = document.getElementById("buttonThing")
		btn.innerText = "watch file"
		btn.classList.add("watch-btn")
		btn.onclick = watch
	})
	.catch(e => console.log(e))
}
const t = new VS(conf)



t.onprogress = () => {
	const prog = Math.floor(t.c.loaded / t.c.total * 100)
	document.getElementById("percent").innerText = prog
	document.getElementById("progInner").style.width = `${prog}%`
}

const doDownload = () => {
	t.save("test","/movie")
}

const watch = async () => {
	const vid = document.createElement("video")
	vid.setAttribute("controls","controls")

	const vv = await getUrlThing()
	vid.innerHTML = `<source src="${vv}">`
	document.querySelector("body").prepend(vid)
}

const getUrlThing = async () => {
	const item = await t.get("test");
	const funUrl = await item.getUrl()
	return funUrl
}