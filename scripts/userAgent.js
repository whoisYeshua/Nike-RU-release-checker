let outputBlock = document.querySelector('.main__output')

const SHOURTCUT_TAUPLES = {
  Win32: {
    Chrome:
      '<p>or check console <kbd>Ctrl</kbd> + <kbd style="padding: 6px 16px">Shift</kbd> + <kbd style="padding: 6px 12px">j</kbd></p>',
    Firefox:
      '<p>or check console <kbd>Ctrl</kbd> + <kbd style="padding: 6px 16px">Shift</kbd> + <kbd style="padding: 6px 12px">j</kbd></p>',
  },
  MacIntel: {
    Chrome:
      '<p>or check console <kbd>⌥</kbd> + <kbd>⌘</kbd> + <kbd style="padding: 6px 12px">j</kbd></p>',
    Firefox:
      '<p>or check console <kbd>⌘</kbd> + <kbd style="padding: 6px 16px">⇧ Shift</kbd> + <kbd style="padding: 6px 12px">j</kbd></p>',
    Safari:
      '<p>or check console <kbd>⌥</kbd> + <kbd>⌘</kbd> + <kbd style="padding: 6px 12px">c</kbd></p>',
  },
}

const mobileRegexp =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|SamsungBrowser/i

const browserRegexp = /(?<browser>Chrome|Safari|Firefox)\/?\s*(\d+)/

const isMobile = mobileRegexp.test(navigator.userAgent)
const knownBrowser = navigator.userAgent.match(browserRegexp)?.groups?.browser

if (!isMobile && knownBrowser) {
  outputBlock.innerHTML = SHOURTCUT_TAUPLES[navigator.platform][knownBrowser]
}
