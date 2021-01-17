import slugify from 'slugify'

export function getSlug(_title: string): string {
  return slugify(_title, {
    replacement: '-', // replace spaces with replacement character, defaults to `-`
    remove: undefined, // remove characters that match regex, defaults to `undefined`
    lower: false, // convert to lower case, defaults to `false`
    strict: false, // strip special characters except replacement, defaults to `false`
    locale: 'de', // language code of the locale to use
  })
}

export function serializeContainedObjects(thing: any[]): any[] {
  if (Array.isArray(thing)) {
    const newArr = [...thing]
    newArr?.forEach((record) => {
      Object.keys(record).forEach((key) => {
        if (typeof record[key] === 'object') {
          record[key] = JSON.stringify(record[key])
        }
      })
    })
    return newArr
  }
  return thing
}

/**
 * translate html Attributes into react attributes
 * e.g. "colspan" ==> "colSpan"
 * @param {*} htmlAttributes
 */
export function translate(htmlAttributes) {
  if (!htmlAttributes) return null
  const keys = Object.keys(htmlAttributes)
  const reactAttr = {}

  keys.map((key) => {
    switch (key) {
      case 'colspan':
        reactAttr['colSpan'] = htmlAttributes[key]
        break

      // original attributes, maybe unknown so far, should be added above?
      default:
        console.warn(
          '(/lib/helpers.js fn: translate): maybe not a React attribute?',
          key
        )
        reactAttr[key] = htmlAttributes[key]
        break
    }
  })
  return reactAttr
}

export function convertRemToPixels(rem) {
  if (typeof window === 'undefined' || typeof document === 'undefined') return 1
  return (
    rem * parseFloat(window.getComputedStyle(document.documentElement).fontSize)
  )
}

export function getViewPortDimensions() {
  const vw =
    typeof document !== 'undefined'
      ? Math.max(
          document.documentElement.clientWidth || 0,
          window.innerWidth || 0
        )
      : 0

  const vh =
    typeof document !== 'undefined'
      ? Math.max(
          document.documentElement.clientHeight || 0,
          window.innerHeight || 0
        )
      : 0
  return { vw, vh }
}

export function pad(pad, str, padLeft) {
  if (typeof str === 'undefined') return pad
  if (padLeft) {
    return (pad + str).slice(-pad.length)
  } else {
    return (str + pad).substring(0, pad.length)
  }
}

export function getMenuEntries(menu_name, menu) {
  const entries = []

  if (menu_name && menu && menu.length > 0) {
    const found_menu = menu.filter(({ slug }) => slug === menu_name)
    if (found_menu && found_menu.length > 0) {
      const { menu_entries } = found_menu.pop()
      return menu_entries
    }
  }

  return entries
}
