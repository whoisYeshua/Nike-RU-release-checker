function getProductId(url) {
    return new Promise(function(resolve, reject)  {
        let xhr = new XMLHttpRequest();


        xhr.open("GET", url);
        xhr.send();
        xhr.onload = function () {
            console.log(`Загружено: ${xhr.status}`);
            if (xhr.status === 200) {
                resolve(xhr.response)
            } else {
                reject(xhr.status)
            }
        };
    })
}


let url = new URL ('https://api.nike.com/product_feed/threads/v2/')
url.searchParams.append('count','12')
url.searchParams.append('filter','marketplace(RU)')
url.searchParams.append('filter','language(ru)')
url.searchParams.append('filter','channelId(010794e5-35fe-4e32-aaff-cd2c74f89d61)')



let now  = new Date()
console.log(now.toISOString());

getProductId(url.href).then(function(result) {
    let data = JSON.parse(result)
    
    for (let release of data.objects) {
        console.group(`${release.publishedContent.properties.seo.slug}`)
        console.log(release.publishedContent.properties.coverCard.properties.title)
        
        if (release.productInfo) {
            for (let product of release.productInfo) {
                
                console.groupCollapsed(product.merchProduct.labelName)
                
                console.log(product.imageUrls.productImageUrl)
                console.log(product.merchProduct.id)
    
                console.groupCollapsed('sku - size')
    
                for (let item of  product.skus) {
                    console.log(item.nikeSize, ' - ',item.id)
                }
                console.groupEnd()
    
                console.groupCollapsed('sku - stock')
    
                for (let stock of product.availableSkus) {
                    console.log(stock.skuId, ' - ', stock.level); 
                }
                console.groupEnd()
                console.groupEnd()
            }
        }
        console.groupEnd()
    }

    }
)


