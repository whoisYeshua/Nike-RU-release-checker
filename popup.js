checkStorage()
function checkStorage() {

    let store = localStorage.getItem('store') ? JSON.parse(localStorage.getItem('store')) : undefined;

    let now = new Date()
    now = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    if (store === undefined || Date.parse(store.lastFetch) !== now.getTime()) {

        let url = new URL ('https://api.nike.com/product_feed/threads/v2/')
        url.searchParams.append('count','14')
        url.searchParams.append('filter','marketplace(RU)')
        url.searchParams.append('filter','language(ru)')
        url.searchParams.append('filter','channelId(010794e5-35fe-4e32-aaff-cd2c74f89d61)')

        getProductId(url.href).then(function(data) {

            let store = {
                lastFetch: now.toISOString(),
                products: []
            }
            data.objects.forEach((release)=> {
                if (release.productInfo) {

                    let slug = {
                        slug: release.publishedContent.properties.seo.slug,
                        title: release.publishedContent.properties.coverCard.properties.title,
                        models: []
                    }

                    release.productInfo.forEach((product)=> {

                        let model = {
                            modelName: product.merchProduct.labelName,
                            id: product.merchProduct.id,
                            imageURL: product.imageUrls.productImageUrl,
                            sizes: [],
                            stock: []
                        }

                        product.skus.forEach((sizeId)=> {
                            let size = {}
                            size[sizeId.nikeSize] = sizeId.id
                            model.sizes.push(size)
                        })

                        product.availableSkus.forEach((skuStock)=> {
                            let stock = {}
                            stock[skuStock.skuId] = skuStock.level
                            model.stock.push(stock)
                        })
                        slug.models.push(model)
                    })
                    store.products.push(slug)
                }
            })
            localStorage.setItem('store', JSON.stringify(store))
            output(JSON.parse(localStorage.getItem('store')))
        }).catch(e => {
            console.error(e)
        })
    } else {
        output(store)
    }
}

async function getProductId(url) {
    const resp = await fetch(url);
    const text = await resp.text();
    const json = await JSON.parse(text)

    if (resp.status === 200) {
        console.log('%c%s','color: white; background: green; font: 16px sans-serif; padding: 5px;',resp.status);
        return json
    } else {
        console.log('%c%s','color: white; background: red; font: 16px sans-serif; padding: 5px;',resp.status)
        throw new Error(`Error in fetch - ${resp.status}`)
    }
}

function output(store) {
    store.products.forEach(product=> {
        console.group('%c%s','font: 16px sans-serif; color: orangered;',product.slug)

        console.log('%c%s','font: 12px sans-serif;',product.title)

        product.models.forEach(model=> {
            console.groupCollapsed('%c%s','font: bold 14px sans-serif;',model.modelName)

            console.log('%c%s','font: 12px sans-serif;',model.imageURL)
            console.log('%c%s','font: 12px sans-serif;',model.id)

            console.groupCollapsed('%c%s','font: bold 13px sans-serif;','size - stock')

            for (let i in model.sizes) {
                let key = Object.keys(model.sizes[i])[0]
                let value = model.sizes[i][key]
                let stock = model.stock[i][value]

                if (stock === 'HIGH') {
                    console.log('%c%s %c- %s', 'font: bold 12px sans-serif;', key, 'font: 12px sans-serif; color: green', stock)

                } else if (stock === 'MEDIUM') {
                    console.log('%c%s %c- %s', 'font: bold 12px sans-serif;', key, 'font: 12px sans-serif; color: #FFC500', stock)

                } else if (stock === 'LOW') {
                    console.log('%c%s %c- %s', 'font: bold 12px sans-serif;', key, 'font: 12px sans-serif; color: red', stock)

                } else {
                    console.log('%c%s %c- %s', 'font: bold 12px sans-serif;', key, 'font: 12px sans-serif;', stock)
                }
            }
            console.groupEnd()
            console.groupEnd()
        })
        console.groupEnd()
    })
}