# Nike RU stock checker

## About:
Script that accesses the Nike API to get product information from the main feed and stores it at localstorage. 
Then information outputs to the console, and can also be displayed if you paste correct product-URL.

This code can be adapted to other regions and to a larger storage capacity.
## Example:
```
let url = new URL ('https://api.nike.com/product_feed/threads/v2/')
       url.searchParams.append('count','14')
       url.searchParams.append('filter','marketplace(RU)')
       url.searchParams.append('filter','language(ru)')
```
If you need to increase the number of cached products simply increase `count` param, also, if you need to change 
the region, select the appropriate one at `marketplace()` & `language()`
## Console preview:
![Imgur](https://i.imgur.com/PUr6gIS.jpg)

## UI preview:
[**Demo**](https://nike-ru-release-checker-by-whoisyeshua.netlify.app/)

[![Netlify Status](https://api.netlify.com/api/v1/badges/d7892ce3-2f26-46e4-ae7d-f7e5cadb15a6/deploy-status)](https://app.netlify.com/sites/nike-ru-release-checker-by-whoisyeshua/deploys)

![Imgur](https://i.imgur.com/nRH2Ipo.jpg)

### Stock description:

| Color                                     | Description           |
| :---------------------------------------: | :-------------------: |
| ![Imgur](https://i.imgur.com/5LKBB7p.png) | Low Stock             |
| ![Imgur](https://i.imgur.com/sIEiTTj.png) | Medium Stock          |  
| ![Imgur](https://i.imgur.com/v7V9REI.png) | High Stock            |
| ![Imgur](https://imgur.com/MdCKT4u.png)   | Not announce          |
| ![Imgur](https://i.imgur.com/CcWn5d7.png) | OOS                   |
