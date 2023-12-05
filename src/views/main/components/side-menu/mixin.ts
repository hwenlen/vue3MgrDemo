export const showTitle = (item: any) => {
  // return this.$config.useI18n ? this.$t(item.name) : ((item.meta && item.meta.title) || item.name)
  return item.meta.title || item.name || '中间页'
}