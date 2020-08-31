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
![Imgur](https://i.imgur.com/nRH2Ipo.jpg)

#### Stock description:

| Color         | Description   |
| ------------- | ------------- |
| <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle style="fill: #FF2C7D" cx="5" cy="5" r="5"/></svg> | Low Stock  |
| <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle style="fill: #F8D84F" cx="5" cy="5" r="5"/></svg> | Medium Stock |  
| <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle style="fill: #3DE716" cx="5" cy="5" r="5"/></svg>  | Low Stock  |
| <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle style="fill: #151E11" cx="5" cy="5" r="5"/></svg>  | Not announce or OOS           |
