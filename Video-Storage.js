const defaultSettings = {
	chunkSize: 52428800, //50mb
	debug: false
}

class VS {
	/**
	 * 
	 * @param {Object} settings configuration
	 */
	constructor(settings = defaultSettings) {
		const createObjectStore = (t) => {
			this.db = t
			t.onerror = (err) => console.error("[Video-Js] ", err)

			this.db.createObjectStore("Video-Storage")
			console.log("[Video-Storage] Database initiated!")
		}
		this.req = window.indexedDB.open("Video-Storage", 4)
		this.req.onupgradeneeded = (e) => createObjectStore(e.target.result) 
		this.req.onsuccess = (e) => {
			this.db = this.req.result
			this.db.onerror = (err) => { console.error("[Video-Js] ", err) }
			if(this.db.setVersion) {
				if(this.db.version != dbVersion) {
					const setVersion = this.db.setVersion(dbVersion)
					setVersion.onsuccess = () => { createObjectStore(this.db) }
				}
			}
		}

		this.conf = settings

		this.onprogress = null

		this.c = {
			total:null,
			loaded:0,
			segments:null,
			totalSegments:null,
			isFirst:true
		}
	}

	/**
	 * @description FOR INTERNAL USE!
	 * @param {String} name 
	 * @param {*} data 
	 */
	_save(name,data,callback) {
		let transaction = this.db.transaction(["Video-Storage"],"readwrite")
		transaction.objectStore("Video-Storage").put(data,name)
		transaction.oncomplete = callback ? callback : null
	}

	/**
	 * @description deletes all data - be carefull!
	 */
	deleteAll(callback) {
		this.db.close()
		const reqq = window.indexedDB.deleteDatabase("Video-Storage")

		if(callback) {
			reqq.onsuccess = callback
			reqq.onerror = callback
			reqq.onblocked = callback
		}
	}

	_doReq(url,callback) {
		const xhr = new XMLHttpRequest;
		xhr.responseType = "blob"
		xhr.open("GET", url, true)
		xhr.setRequestHeader("Range",`bytes=${this.c.loaded}-${this.c.loaded+this.conf.chunkSize}`)
		
		xhr.onreadystatechange = () => {
			if(xhr.readyState != 4) return
		}

		xhr.onload = (event) => {
			this.c.loaded += this.conf.chunkSize
			if(this.c.isFirst) {
				this.c.total = Number(xhr.getResponseHeader("Content-Range").split("/")[1])
				console.log(this.c.total)
				this.c.isFirst = false
			}

			if(this.onprogress) this.onprogress()
			if(this.conf.debug) console.log(`% loaded ${(t.c.loaded / t.c.total * 100).toFixed(2)}`)
			
			if(this.c.loaded < this.c.total) this._doReq(url)
		}

		xhr.send(null)
	}

	/**
	 * 
	 * @param {String} name the name of the file
	 * @param {String} path the path of the origin file
	 */
	save(name,path) {
		let ongoing = true
		let failsafe = 0;

		this._doReq(path)
	}

}

VS.getDefaultConfig = () => { return Object.assign({}, defaultSettings) }