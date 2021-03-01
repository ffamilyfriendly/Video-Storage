# Video-Storage
Video-Storage aims to allow storage of big files in indexedDB without issues on IOS devices. I am developing this due to said crashes happening for my streaming website, [Armadillo](https://github.com/ffamilyfriendly/armadillo/). It works with both audio and video files

## compatibility
| Browser      | Compatibility | Notes                             |
|--------------|---------------|-----------------------------------|
| Chrome (PC)  | ✅             | Manjaro, 89.0.4385.0 dev (64-bit) |
| Firefox (PC) | [✅*](#Firefox-playback)             | Manjaro, 84.0.2 (64-bit) - check note          |
| Safari (PC) | ✅             | 14.0.3 (16610.4.3.1.4)            |
| Safari (IOS) | ✅             | iOS 14.4            |

*A browser missing from compat list? Make a pull request!*

## how to import

### Preferably 
download the file to your project then import it via
```html 
<script src="https://unpkg.com/video-storage@latest/Video-Storage.js">
```
### Or if you are lazy
import it as such
```html
<script src="https://familyfriendly.xyz/lib/Video-Storage.js">
```

## docs
### VS
base class. Takes config object in constructor parameter. You can get the default config object with **VS**.getDefaultConfig()
### VS.save(name,path,?callback)
**name:** string
**path:** string
**callback (optional):** function

retrieves the file from path in partials and saves it as **name**. Callback is ran when all data is saved

### VS.get(name)
**name:** string

returns object:

	chunksize: number, total: number, segments: number, getBlobs(): promise, getBlob(n): promise, getUrl(): promise
	n in getBlob defines what segment to get

### VS.delete(name)
**name:** string

removes file with **name**

## example
```js
// get default config object
let config = VS.getDefaultConfig()
// activate debug mode
config.debug = true
// initiate the file manager
const FileManager = new VS(config);

// Download file
FileManager.save("Video-name","https://example.com/video.mp4")

// Get file url
FileManager.get("Video-name")
.then(f => f.getUrl().then(u => {
	// Congrats! If everything worked as intented "u" will have the full file
	functionThatDoesSomething(u)
}))
```

## Issues
### Firefox-playback
Currently firefox files that are comprised of more then one chunk are unseekable when used as a source. I have no clue why this is, it works when the object url is directly placed in adress bar. However this can be "solved" via a lazy workaround which I include in this code
```js
	vid = document.querySelector("video")
	if(VS.isFirefox()) VS.lazyLoad(vid, () => {done()})
```
what this does is it constantly seeks the video until it is fully buffered. This might take a few minutes depending on media length