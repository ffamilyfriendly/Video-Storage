let vid = document.createElement("video")
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
	vid.setAttribute("controls","true")
	vid.setAttribute("preload","")
	const resp = await getObjectUrl()
	vid.src = resp.url
	console.log(resp)
	vid.setAttribute("type",resp.type)
	document.querySelector("body").prepend(vid)

	if(VS.isFirefox()) VS.lazyLoad(vid)

	const btn = document.getElementById("buttonThing")
	btn.innerText = "remove file"
	btn.classList = "remove-btn"
	btn.onclick = removeFile
}

const TEST = () => {
	console.log(vid.duration)
	vid.currentTime = vid.duration/2
}

const removeFile = () => {
	t.delete("test")
}

const getObjectUrl = async () => {
	const item = await t.get("test");
	return await item.getUrl();
}