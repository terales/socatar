### SOCial avATAR

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

#### CDN

This service will always ask for a photo from source which could be . Use image hosting like mentioned above for image manipulation and serving.

If you don't mind serving large pictures you can use [Jare.io](http://www.jare.io/) right in your HTML:
```
https://cf.jare.io/?u=https://socatar.com/twitter/yegor256
```
