  import { Component, Signal, computed, signal } from "@angular/core";
  import { Product } from "../model/product.model";
  import { ProductRepository } from "../model/product.repository";

  @Component({
    selector: "shop",
    templateUrl: "shop.component.html"
  })
  export class ShopComponent {
    products: Signal<Product[]>;
    categories: Signal<string[]>;
    selectedCategory = signal<string | undefined>(undefined);
    productsPerPage = signal(4);
    selectedPage = signal(1);
    pagedProducts: Signal<Product[]>;
    //pageNumbers: Signal<number[]>;
    pageCounter: Signal<number>;

    constructor(private repository: ProductRepository) {
      this.products = computed(() => {
        if (this.selectedCategory() == undefined) {
          return this.repository.products();
        } else {
          return this.repository.products()
            .filter(product => product.category === this.selectedCategory());
        }
      })
      this.categories = repository.categories;
      let pageIndex = computed(() => {
        return (this.selectedPage() - 1) * this.productsPerPage()
      });
      this.pagedProducts = computed(() => {
        return this.products().slice(pageIndex(),
          pageIndex() + this.productsPerPage());
      });
      // this.pageNumbers = computed(() => {
      //   return Array(Math.ceil(this.products().length
      //     / this.productsPerPage()))
      //     .fill(0).map((x, i) => i + 1);
      // });
      this.pageCounter = computed(() => {
        return Math.ceil(this.products().length / this.productsPerPage());
      })
    }

    changeCategory(newCategory?: string): void {
      this.selectedCategory.set(newCategory);
      this.changePage(1);
    }

    changePage(newPage: number): void {
      this.selectedPage.set(newPage)
    }

    changePageSize(newSize: number) {
      this.productsPerPage.set(Number(newSize));
      this.changePage(1);
    }
  }
