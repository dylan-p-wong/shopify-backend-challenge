# shopify-backend-challenge

**Installation**

1. Get the repo
``` git clone https://github.com/dylan-p-wong/shopify-backend-challenge.git ```

2. Install packages
``` npm install ```

3. Run
``` npm run start ```

Routes

**Signup**

``` localhost:1812/user/signup/ ```

req.body
```
{
  username: "",
  password: ""
}
```
res
```
{
  msg: "",
  jwt: ""
}
```

**Login**

``` localhost:1812/user/login/ ```
req.body
```
{
  username: "",
  password: ""
}
```
res
```
{
  msg: "",
  jwt: ""
}
```

**Get User Images**

``` localhost:1812/user/ ```
```
headers
authorization = Bearer "jwt"
```
res
```
{
  images: []
}
```
**Upload an image**

``` localhost:1812/image/upload ```
req
```
headers
authorization = Bearer "jwt"


form-data

image : imagefile
text : ""
title : ""

```
res
```
{
  msg: ""
}
```

**Get Image by ID**

``` localhost:1812/image/<image id> ```
req.body
```
{
}
```
res
```
image
```

**Delete Image by ID**

``` localhost:1812/image/<image id> ```
req
```
headers
authorization = Bearer "jwt"
```
res
```
{
  msg: ""
}
```




