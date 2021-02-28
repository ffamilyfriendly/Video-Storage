const conf = VS.getDefaultConfig()
conf.debug = true
const t = new VS(conf)

t.onprogress = () => {
	const prog = Math.floor(t.c.loaded / t.c.total * 100)
	document.getElementById("percent").innerText = prog
	document.getElementById("progInner").style.width = `${prog}%`
}

const doDownload = () => {
	t.save("test","/movie")
}