### Socatar.com [ARCHIVED]

Web service for easily use profile photos on your web page.

You don't need to maintain same implementations for getting user pictures in your projects, just generate URL and you will get a CDN-powered credential management free user profile picture.

Use in HTML:
```html
<img src="https://socatar.com/github/terales/50-50" />
```

or via API:
```shell
// cURL save image to your current folder
curl https://socatar.com/github/terales/50-50 -o terales.jpg

// Windows via PowerShell, save image to your Desktop
Invoke-WebRequest https://socatar.com/github/terales/50-50 -OutFile "$([Environment]::GetFolderPath("Desktop"))\terales.jpg"
```

### Content

* [Currently supported sources](#currently-supported-sources)
* [Getting help](#getting-help)
* [How you can help](#how-you-can-help)
* [Project details](#project-details)

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


### Currently supported sources

* GitHub with login, like `terales`
* Gravatar with email

#### Deprecated

* Facebook with id, like `100001584476227` OR profile slug, like `terales`
* Google with Google+ id, like `+SriramSaroop` OR gmail address
* Twitter with username, like `robwormald`

### Resize images with Cloudinary

Thanks to the Cloudinary generous limits we are able to resize images from any source.
Just prepend required width and height to the image url:

```
https://socatar.com/github/terales/50-50
                           width - ^^ ^^ - height
```

If you omit size (ex. `https://socatar.com/github/terales`) than 100×100 image would be served. For you custom deployment you can modify it via environment variables, see [`.env-template`](.env-template).

When Cloudinary integration is enabled Socatar.com will get the url of required image
and redirect it to Cloudinary fetch with transformations applied.

Get an original image with a special `original` size:
```
https://socatar.com/github/terales/original
```

### Getting help

Please, report anything via the GitHub issues: https://github.com/terales/socatar/issues.

Business opportunities, security issues and any violations should be emailed to socatar.com@gmail.com.

Technical questions about service usage or configuration should be asked on StackOverflow
and link to the question should be sent to socatar.com@gmail.com.

### How you can help

* use this project and [give a feedback](https://saythanks.io/to/terales),
* fix any misspellings or typos on the home page, readme and other files,
* make security or performance audit and create an issue or PR with improvement,
* [add new sources for images](CONTRIBUTING.md#add-a-new-source),
* dive into [help-wanted issues](https://github.com/terales/socatar/labels/help%20wanted).

This project runs on Node.js and has a good support for newcomers thanks to (JavaScript Standard Style)[https://standardjs.com/] automatic code style fixes and a decent test coverage.

Please, refer to [contributing guideline](CONTRIBUTING.md) for environment setup and recommended workflow.

### Project details

This project is licensed under the MIT License — [see the license file for details](LICENSE)

Created by [Oleksandr Terekhov](https://terales.info/). The original idea belongs to [Yegor Bugayenko](http://www.yegor256.com/).
