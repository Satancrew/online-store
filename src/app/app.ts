import { Loader } from './loader/loader'
import { Product, ProductResponse } from './types'
import { ContentGenerator } from './htmlGenerator/contentGenerator'
import { Router } from './router/router'
import { ClickChangeView } from './htmlGenerator/changeView'
import { Validation } from './htmlGenerator/validator'

export class App {
  private readonly loader: Loader
  private readonly generator: ContentGenerator
  private readonly brandsBlock: HTMLElement
  private readonly categoriesBlock: HTMLElement
  private readonly productsBlock: HTMLElement // create by me
  private readonly clickChangeView: ClickChangeView // by me
  readonly router: Router
  private readonly validator: Validation // add 25.12
  products: Product[]

  constructor (
    loader: Loader,
    generator: ContentGenerator,
    changeview: ClickChangeView,
    validator: Validation // add 25.12
  ) {
    this.loader = loader
    this.router = new Router()
    this.generator = generator
    this.products = []
    this.brandsBlock = document.querySelector(
      '.main__brand-list'
    ) as HTMLElement
    this.categoriesBlock = document.querySelector(
      '.main__category-list'
    ) as HTMLElement
    this.productsBlock = document.querySelector(
      '.main__product-items'
    ) as HTMLElement // by me
    this.clickChangeView = changeview
    this.validator = validator // add 25.12
  }

  async start (): Promise<void> {
    const categories: string[] = (await this.loader.getCategorise()).sort()
    const products: ProductResponse = await this.loader.getProducts()
    this.products = products.products
    this.router.start()
    this.generator.generateBrandItems(products.products, this.brandsBlock)
    this.generator.generateCategoryItems(categories, this.categoriesBlock)
  }
}
