export function buildTree(indexData, value): Record<string, any> {
  const retval = {}

  Object.keys(indexData).forEach((indice) => {
    if (indexData && indexData[indice] === 1) {
      if (typeof retval['found'] === 'undefined') retval['found'] = []
      retval['found'].push(indice)
    } else {
      const iteration = buildTree(indexData[indice], value)
      retval[indice] = {
        _open: value,
        ...iteration,
      }
    }
  })

  return retval
}

export function toggleStatusTree(indexData, key): Record<string, any> {
  const retval = {}

  Object.keys(indexData).forEach((indice) => {
    if (indice === '_open') {
    } else if (indice === 'found') {
      retval['found'] = indexData.found
    } else if (indice === key) {
      retval[indice] = {
        ...indexData[indice],
        _open: !indexData[indice]._open,
      }
    } else {
      const iteration = toggleStatusTree(indexData[indice], key)
      retval[indice] = {
        _open: indexData[indice]._open,
        ...iteration,
      }
    }
  })

  return retval
}
