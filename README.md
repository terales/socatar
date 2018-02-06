### [Socatar.com](https://socatar.com/)

Web service for easily use profile photos on your web page.

You don't need to maintain same implementations for getting user pictures in your projects, just generate URL and you will get a CDN-powered credential management free user profile picture.

Use in HTML:
```html
<img src="https://socatar.com/twitter/yegor256/50-50" />
```

or via API:
```shell
// cURL save image to your current folder
curl https://socatar.com/github/terales -o terales.jpg

// Windows via PowerShell, save image to your Desktop
Invoke-WebRequest https://socatar.com/github/terales -OutFile "$([Environment]::GetFolderPath("Desktop"))\terales.jpg"
```

### Content

* [Currently supported sources](#currently-supported-sources)
* [Getting help](#getting-help)
* [How you can help](#how-you-can-help)
* [Project details](#project-details)

Uptime: [![Uptime](http://www.sixnines.io/b/28f4)](http://www.sixnines.io/h/28f4)
[![Build Status](https://travis-ci.org/terales/socatar.svg?branch=master)](https://travis-ci.org/terales/socatar)
[![Coverage Status](https://coveralls.io/repos/github/terales/socatar/badge.svg?branch=master)](https://coveralls.io/github/terales/socatar?branch=master)
[![Greenkeeper badge](https://david-dm.org/terales/socatar.svg)](https://greenkeeper.io/)

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/711f81f048434d198fda6118922048ce)](https://www.codacy.com/app/terehov-alexander-serg/socatar?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=terales/socatar&amp;utm_campaign=Badge_Grade)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


### Currently supported sources

* Facebook with id, like `100001584476227` OR profile slug, like `yegor256`
* GitHub with login, like `terales`
* Google with Google+ id, like `+SriramSaroop` OR gmail address
* Gravatar with email
* Twitter with username, like `robwormald`

### Resize images with Cloudinary

Thanks to the Cloudinary generous limits we are able to resize images from any source.
Just prepend required width and height to the image url:

```
https://socatar.com/twitter/yegor256/50-50
                             width - ^^ ^^ - height
```

If you omit size (ex. `https://socatar.com/twitter/yegor256`) than 100×100 image would be served. For you custom deployment you can modify it via environment variables, see [`.env-template`](.env-template).

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
