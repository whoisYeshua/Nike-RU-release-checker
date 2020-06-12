function getProductId(url) {
    return new Promise(function(resolve)  {
        let xhr = new XMLHttpRequest();


        xhr.open("GET", url);
        xhr.send();
        xhr.onload = function () {
            if (xhr.status === 200) {
                console.log('%c%s','color: white; background: green; font: 16px sans-serif; padding: 5px;',xhr.status);
                resolve(xhr.response)
            } else {
                console.log('%c%s','color: white; background: red; font: 16px sans-serif; padding: 5px;',xhr.status)
            }
        };
        xhr.onerror = function() {
            console.log('Error in request`s creation')
        }
    })
}


let url = new URL ('https://api.nike.com/product_feed/threads/v2/')
url.searchParams.append('count','14')
url.searchParams.append('filter','marketplace(RU)')
url.searchParams.append('filter','language(ru)')
url.searchParams.append('filter','channelId(010794e5-35fe-4e32-aaff-cd2c74f89d61)')





getProductId(url.href).then(function(result) {
    let data = JSON.parse(result)
    let now  = new Date()


    let store = {
        lastFetch: new Date().toISOString(),
        slug: []
    }
    data.objects.forEach((release)=> {
        if (release.productInfo) {
            console.group('%c%s','font: 16px sans-serif; color: orangered;',release.publishedContent.properties.seo.slug)

            let slug = {
                slug: release.publishedContent.properties.seo.slug,
                title: release.publishedContent.properties.coverCard.properties.title,
                model: []
            } 
            console.log('%c%s','font: 12px sans-serif;',release.publishedContent.properties.coverCard.properties.title)

            
                release.productInfo.forEach((product)=> {
                    
                    console.groupCollapsed('%c%s','font: bold 14px sans-serif;',product.merchProduct.labelName)
                    
                    let model = {
                        modelName: product.merchProduct.labelName,
                        id: product.merchProduct.id,
                        imageURL: product.imageUrls.productImageUrl,
                        size: [],
                        stock: []
                    }

                    console.log('%c%s','font: 12px sans-serif;',product.imageUrls.productImageUrl)
                    console.log('%c%s','font: 12px sans-serif;',product.merchProduct.id)
        
                    console.groupCollapsed('%c%s','font: bold 13px sans-serif;','sku - size')
        
                    product.skus.forEach((sizeId)=> {
                        let size = {}
                        size[sizeId.nikeSize] = sizeId.id
                        model.size.push(size)

                        console.log('%c%s %c- %s', 'font: bold 12px sans-serif; color: #FFC500;', sizeId.nikeSize, 'font: 12px sans-serif;', sizeId.id)
                    })
                    console.groupEnd()
        
                    console.groupCollapsed('%c%s','font: bold 13px sans-serif;','sku - stock')
        
                    product.availableSkus.forEach((skuStock)=> {
                        let stock = {}
                        stock[skuStock.skuId] = skuStock.level
                        model.stock.push(stock)
                        
                        console.log('%c%s %c- %s', 'font: bold 12px sans-serif; color: #FFC500;', skuStock.skuId, 'font: 12px sans-serif;', skuStock.level); 
                    })

                    slug.model.push(model)
                    console.groupEnd()
                    console.groupEnd()
                })
            console.groupEnd()
            store.slug.push(slug)
        }
    })    
    localStorage.setItem('store', JSON.stringify(store))
})
