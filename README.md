# Video-Storage
Video-Storage aims to allow storage of big files in indexedDB without issues on IOS devices. I am developing this due to said crashes happening for my streaming website, [Armadillo](https://github.com/ffamilyfriendly/armadillo/). It works with both audio and video files

## compatibility
| Browser      | Compatibility | Notes                             |
|--------------|---------------|-----------------------------------|
| Chrome (PC)  | ✅             | Manjaro, 89.0.4385.0 dev (64-bit) |
| Firefox (PC) | ✅             | Manjaro, 84.0.2 (64-bit)          |
| Safari (IOS) | ❌             | working on fixing this            |

*A browser missing from compat list? Make a pull request!*

## how to import

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