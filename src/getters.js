export default {
  byId(...keyPath) {
    return ['@@mayor/model-cache'].concat(keyPath)
  }
}
