checkStorage()
function checkStorage() {
  let store = localStorage.getItem('store')
    ? JSON.parse(localStorage.getItem('store'))
    : null

  let now = new Date()
  now = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  if (store === null || Date.parse(store.lastFetch) !== now.getTime()) {
    updateStorage()
  } else {
    output(store)
  }
}

function updateStorage() {
  let now = new Date()
  now = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  getProductId()
    .then(function (data) {
      let store = {
        lastFetch: now.toISOString(),
        products: [],
      }
      data.objects.forEach(release => {
        if (release.productInfo) {
          let slug = {
            slug: release.publishedContent.properties.seo.slug,
            title:
              release.publishedContent.properties.coverCard.properties.title,
            models: [],
          }

          release.productInfo.forEach(product => {
            let model = {
              modelName: product.merchProduct.labelName,
              id: product.merchProduct.id,
              imageURL: product.imageUrls.productImageUrl,
              sizes: [],
              stock: [],
            }

            product.skus.forEach(sizeId => {
              let size = {}
              size[sizeId.nikeSize] = sizeId.id
              model.sizes.push(size)
            })

            product.availableSkus.forEach(skuStock => {
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
    })
    .catch(e => {
      console.error(e)
      if (e.message === 'Failed to fetch') {
        const span = `<p>Due to new Nike CORS policy this method doesn\`t work. Check new solution at link below</p>`
        const modalBtn = `<a class="btn modal__btn" data-micromodal-close aria-label="Open Repo" href="https://github.com/whoisYeshua/nike-release-checker">Check</a>`
        document
          .querySelector('main.modal__content')
          .insertAdjacentHTML('afterbegin', span)
        document
          .querySelector('main.modal__content')
          .insertAdjacentHTML('beforeend', modalBtn)
        MicroModal.show('modal-1', {
          onClose: () =>
            (document.querySelector('main.modal__content').innerHTML = ''),
        })
      }
    })
}

async function getProductId() {
  let url = new URL('https://api.nike.com/product_feed/threads/v2/')
  url.searchParams.append('count', '14')
  url.searchParams.append('filter', 'marketplace(RU)')
  url.searchParams.append('filter', 'language(ru)')
  url.searchParams.append(
    'filter',
    'channelId(010794e5-35fe-4e32-aaff-cd2c74f89d61)'
  )

  try {
    const resp = await fetch(url.href)
    const text = await resp.text()
    const json = await JSON.parse(text)

    if (resp.status === 200) {
      console.log(
        '%c%s',
        'color: white; background: green; font: 16px sans-serif; padding: 5px;',
        resp.status
      )
      return json
    } else {
      console.log(
        '%c%s',
        'color: white; background: red; font: 16px sans-serif; padding: 5px;',
        resp.status
      )
      throw new Error(`Error in fetch - ${resp.status}`)
    }
  } catch (error) {
    throw error
  }
}

function output(store) {
  store.products.forEach(product => {
    console.group(
      '%c%s',
      'font: 16px sans-serif; color: orangered;',
      product.slug
    )

    console.log('%c%s', 'font: 12px sans-serif;', product.title)

    product.models.forEach(model => {
      console.groupCollapsed(
        '%c%s',
        'font: bold 14px sans-serif;',
        model.modelName
      )

      console.log('%c%s', 'font: 12px sans-serif;', model.imageURL)
      console.log('%c%s', 'font: 12px sans-serif;', model.id)

      console.groupCollapsed(
        '%c%s',
        'font: bold 13px sans-serif;',
        'size - stock'
      )

      for (let i in model.sizes) {
        let key = Object.keys(model.sizes[i])[0]
        let value = model.sizes[i][key]
        let stock = model.stock[i][value]

        if (stock === 'HIGH') {
          console.log(
            '%c%s %c- %s',
            'font: bold 12px sans-serif;',
            key,
            'font: 12px sans-serif; color: green',
            stock
          )
        } else if (stock === 'MEDIUM') {
          console.log(
            '%c%s %c- %s',
            'font: bold 12px sans-serif;',
            key,
            'font: 12px sans-serif; color: #FFC500',
            stock
          )
        } else if (stock === 'LOW') {
          console.log(
            '%c%s %c- %s',
            'font: bold 12px sans-serif;',
            key,
            'font: 12px sans-serif; color: red',
            stock
          )
        } else {
          console.log(
            '%c%s %c- %s',
            'font: bold 12px sans-serif;',
            key,
            'font: 12px sans-serif;',
            stock
          )
        }
      }
      console.groupEnd()
      console.groupEnd()
    })
    console.groupEnd()
  })
}

document.getElementById('check').addEventListener(
  'click',
  function (event) {
    let url = document.getElementById('url').value

    if (url) {
      let productSlug = url.slice(33)
      showProduct(productSlug)
    } else {
      errorMsg('Past correct URL')
    }
  },
  { passive: true }
)

function showProduct(productSlug) {
  let store = localStorage.getItem('store')
    ? JSON.parse(localStorage.getItem('store'))
    : null
  let existing

  if (store) {
    store.products.forEach(product => {
      if (product.slug === productSlug) {
        let title = product.title
        existing = true

        if (product.models.length > 1) {
          product.models.forEach(model => {
            let modalBtn

            if (model.modelName.includes('GS')) {
              modalBtn = `<button class="modal__btn" data-model="${model.modelName}" data-micromodal-close aria-label="Choose size chart">GS</button>`
            } else if (model.modelName.includes('PS')) {
              modalBtn = `<button class="modal__btn" data-model="${model.modelName}" data-micromodal-close aria-label="Choose size chart">PS</button>`
            } else if (model.modelName.includes('TD')) {
              modalBtn = `<button class="modal__btn" data-model="${model.modelName}" data-micromodal-close aria-label="Choose size chart">TD</button>`
            } else {
              modalBtn = `<button class="modal__btn" data-model="${model.modelName}" data-micromodal-close aria-label="Choose size chart">ADULT</button>`
            }
            console.log(modalBtn)
            document
              .querySelector('main.modal__content')
              .insertAdjacentHTML('afterbegin', modalBtn)
          })

          MicroModal.show('modal-1', {
            onClose: () =>
              (document.querySelector('main.modal__content').innerHTML = ''),
          })

          document.querySelectorAll('.modal__btn').forEach(btn => {
            btn.addEventListener(
              'click',
              () => {
                product.models.forEach(model => {
                  if (model.modelName === btn.dataset.model) {
                    createProductInfo(model)
                  }
                })
              },
              { passive: true }
            )
          })
        } else {
          createProductInfo(product.models[0])
        }

        function createProductInfo(model) {
          let modelName = model.modelName
          let productId = model.id
          let image = model.imageURL

          let productInfo = `<div class="product-info">`
          productInfo += `<h1 class="subtitle">${modelName}</h1>`
          productInfo += `<h5 class="title">${title}</h5>`
          productInfo += `<div class="product-id">${productId}</div>`
          productInfo += `<div class="product-image"><img src="${image}" alt="product image"></div>`
          productInfo += `<div class="sizes">`

          for (let i in model.sizes) {
            let size = Object.keys(model.sizes[i])[0]
            let value = model.sizes[i][size]
            let stock = model.stock[i][value]

            if (stock === 'HIGH') {
              stock = 'high'
            } else if (stock === 'MEDIUM') {
              stock = 'medium'
            } else if (stock === 'LOW') {
              stock = 'low'
            } else if (stock === 'OOS') {
              stock = 'oos'
            } else {
              stock = 'na'
            }

            productInfo += `<div class="block">`
            productInfo += `<span>US ${size}</span>`
            productInfo += `<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">`
            productInfo += `<circle class="${stock}" cx="5" cy="5" r="5"/>`
            productInfo += `</svg></div>`
          }
          productInfo += `</div></div>`
          if (document.querySelector('.main__output p') !== null) {
            document.querySelector('.main__output p').remove()
            document
              .querySelector('.main__output')
              .insertAdjacentHTML('beforeend', productInfo)
            show(document.querySelector('.product-info'))
          } else {
            hideBlock('.product-info')
            setTimeout(() => {
              document
                .querySelector('.main__output')
                .insertAdjacentHTML('beforeend', productInfo)
              show(document.querySelector('.product-info'))
            }, 400)
          }
        }
      }
    })
    if (!existing) {
      updateStorage()
      errorMsg('Couldn`t find this product, try again')
    }
  } else {
    errorMsg('Something wrong with data, check localStorage')
  }
}

function errorMsg(msg) {
  let error = document.createElement('p')
  error.innerHTML = msg
  error.classList.add('error', 'show')
  document.querySelector('.main__output').prepend(error)
  setTimeout(() => {
    hideErr(error)
  }, 2500)
}

function hideErr(error) {
  error.classList.add('hide')
  setTimeout(() => {
    error.remove()
  }, 400)
}

function hideBlock(block) {
  document.querySelector(`${block}`).classList.add('hide')
  setTimeout(() => {
    document.querySelector(`${block}`).remove()
  }, 400)
}

function show(block) {
  block.classList.add('show')
}
