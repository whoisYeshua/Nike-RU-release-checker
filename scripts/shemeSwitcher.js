const lightStyles = document.querySelectorAll(
  'link[rel=stylesheet][media*=prefers-color-scheme][media*=light]'
)
const darkStyles = document.querySelectorAll(
  'link[rel=stylesheet][media*=prefers-color-scheme][media*=dark]'
)
const darkSchemeMedia = matchMedia('(prefers-color-scheme: dark)')
const switcherRadios = document.querySelectorAll('.switcher__radio')
const switcher = document.querySelector('.switcher')

const setupSwitcher = () => {
  const savedScheme = getSavedScheme()

  if (savedScheme) {
    const currentRadio = document.querySelector(
      `.switcher__radio[value=${savedScheme}]`
    )
    currentRadio.checked = true
  }

  switcher.addEventListener('change', event => {
    setScheme(event.target.value)
  })
}

const setupScheme = () => {
  const savedScheme = getSavedScheme()
  const systemScheme = getSystemScheme()

  if (!savedScheme) return

  if (savedScheme !== systemScheme) {
    setScheme(savedScheme)
  }
}

const setScheme = scheme => {
  switchMedia(scheme)

  if (scheme === 'auto') {
    clearScheme()
  } else {
    saveScheme(scheme)
  }
}

function switchMedia(scheme) {
  let lightMedia
  let darkMedia

  if (scheme === 'auto') {
    lightMedia = '(prefers-color-scheme: light)'
    darkMedia = '(prefers-color-scheme: dark)'
  } else {
    lightMedia = scheme === 'light' ? 'all' : 'not all'
    darkMedia = scheme === 'dark' ? 'all' : 'not all'
  }

  for (const link of lightStyles) {
    link.media = lightMedia
  }

  for (const link of darkStyles) {
    link.media = darkMedia
  }
}

const getSystemScheme = () => {
  const darkScheme = darkSchemeMedia.matches

  return darkScheme ? 'dark' : 'light'
}

const getSavedScheme = () => {
  return localStorage.getItem('color-scheme')
}

const saveScheme = scheme => {
  localStorage.setItem('color-scheme', scheme)
}

const clearScheme = () => {
  localStorage.removeItem('color-scheme')
}

setupSwitcher()
setupScheme()
