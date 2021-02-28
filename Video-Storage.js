const defaultSettings = {
	chunkSize: 52428800 //50mb
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

		this.c = {
			total:null,
			loaded:0,
			segments:null,
			totalSegments:null
		}
	}

	/**
	 * 
	 * @param {String} name the name of the file
	 * @param {String} path the path of the origin file
	 */
	save(name,path) {
		const xhr = new XMLHttpRequest;
		xhr.onreadystatechange = () => {
			if(xhr.readyState != 4) return
			alert(xhr.status)
		}

		xhr.open("GET", path, true)
		xhr.setRequestHeader("Range",`bytes=${this.c.loaded}-${this.c.loaded+this.conf.chunkSize}`)
		xhr.send(null)
	}

}