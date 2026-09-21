/**
 * Install a default Trusted Types policy. Pair with the CSP meta tag.
 */
(function installDefaultTrustedTypes() {
  if (!window.trustedTypes || typeof window.trustedTypes.createPolicy !== 'function') return
  try {
    window.trustedTypes.createPolicy('default', {
      createHTML: function (input) {
        return String(input)
      },
      createScript: function (input) {
        return String(input)
      },
      createScriptURL: function (input) {
        var url = new URL(String(input), window.location.href)
        if (url.origin !== window.location.origin) {
          throw new TypeError('blocked untrusted script URL')
        }
        return url.href
      },
    })
  } catch (_err) {}
})()
