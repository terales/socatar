### SOCial avATAR

[![Build Status](https://travis-ci.org/terales/socatar.svg?branch=master)](https://travis-ci.org/terales/socatar)
[![Coverage Status](https://coveralls.io/repos/github/terales/socatar/badge.svg?branch=master)](https://coveralls.io/github/terales/socatar?branch=master)
[![codebeat badge](https://codebeat.co/badges/38654554-f04f-4a4a-9424-7d291399928c)](https://codebeat.co/projects/github-com-terales-socatar-master)
[![Greenkeeper badge](https://david-dm.org/terales/socatar.svg)](https://greenkeeper.io/)

Web service for easily requesting profile photos from several sources:
```
<img src="https://socatar.com/twitter/yegor256" />
```

Currently supported sources:
* Facebook with id, like `100001584476227`
* GitHub with login, like `terales`
* Google with Google+ id, like `+SriramSaroop`
* Gravatar with email
* Twitter with username, like `robwormald`

#### Image size, dimention and format

Retrieved profile photos are as close to original ones as possible ans it's up to you to modify them.

You can use external services like [Cloudinary to modify them on the fly](https://cloudinary.com/documentation/fetch_remote_images#fetch_url_with_on_the_fly_image_manipulation)
```
                                            ↓————————————————————————————————————↓ — pass your requirements
https://res.cloudinary.com/demo/image/fetch/w_300,h_300,c_fill,g_face,r_max,f_auto/https://socatar.com/twitter/yegor256
                                                          ask for required image — ↑—————————————————————————————————↑
```
With services like this all images will be cached, cropped with face recognition to dimentions and shape you need, etc.
