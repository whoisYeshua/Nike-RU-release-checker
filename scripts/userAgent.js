let outputBlock = document.querySelector('.main__output')

const SHOURTCUT_TAUPLES = {
  Win32: {
    Chrome:
      '<p>or check console <kbd class="kbd-default">Ctrl</kbd> + <kbd class="kbd-large">Shift</kbd> + <kbd class="kbd-default">j</kbd></p>',
    Firefox:
      '<p>or check console <kbd class="kbd-default>Ctrl</kbd> + <kbd class="kbd-large">Shift</kbd> + <kbd class="kbd-default">j</kbd></p>',
  },
  MacIntel: {
    Chrome:
      '<p>or check console <kbd class="kbd-default>⌘</kbd> + <kbd class="kbd-default>⌥</kbd> + <kbd class="kbd-default">j</kbd></p>',
    Firefox:
      '<p>or check console <kbd class="kbd-default>⌘</kbd> + <kbd class="kbd-large">⇧ Shift</kbd> + <kbd class="kbd-default">j</kbd></p>',
    Safari:
      '<p>or check console <kbd class="kbd-default>⌘</kbd> + <kbd class="kbd-default>⌥</kbd> + <kbd class="kbd-default">c</kbd></p>',
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
