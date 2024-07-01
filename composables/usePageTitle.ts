export const usePageTitle = () => {
  useHead({
    titleTemplate: (productCategory) => {
      let title = 'SportsPass 運動售票'
      if (productCategory) title = `${productCategory} - ${title}`
      return title
    }
  })
}
