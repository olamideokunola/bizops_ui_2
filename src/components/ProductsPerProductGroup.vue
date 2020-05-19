<template>
  <div>
    <div
      v-for="productGroupProducts in productGroupProductsList"
      v-bind:key = productGroupProducts.groupTitle
      class="pt-8"
      >
      <h3 class="pb-0 pl-0">{{ productGroupProducts.groupTitle }}</h3>
      <v-row>
        <v-col
            cols="12"
            sm="4"
            v-for="product in productGroupProducts.products"
            v-bind:key="product.name"
            >

            <!-- Product Card -->
            <v-card
              width="100%"
              >
              <v-card-title class="headline mb-0">{{ product.name }}</v-card-title>
              <!--v-card-subtitle>Price: &#8358;{{product.price}}</v-card-subtitle-->

              <!-- Prices -->
              <v-card-text class="pl-4 pt-0 pb-0 pr-2">
                <div class="pr-2">
                  <v-chip
                    class="mr-2"
                    v-for="price in product.activePrices"
                    v-bind:key="price.price"
                    >
                    &#8358;{{price.price}}
                  </v-chip>
                </div>
              </v-card-text>

              <v-img
                :src='product.imgsrc'
                height="100%"
              ></v-img>

              <v-card-subtitle>Prices</v-card-subtitle>

              <v-divider class="mx-4 mt-2"></v-divider>

              <v-card-actions class="pl-4 pr-4">
                  <v-btn
                    color="#53CFCB"
                    small
                    fab
                    outlined
                    :to="'/product/'+product.name+'/details'"
                    >
                    <v-icon
                      dark
                      >
                      mdi-eye
                    </v-icon>
                  </v-btn>
                  <v-btn
                    color="#53CFCB"
                    small
                    fab
                    outlined
                    :to="'/product/'+product.name+'/edit'"
                    >
                    <v-icon
                      dark
                      >
                      mdi-pencil
                    </v-icon>
                  </v-btn>

                  <v-spacer></v-spacer>

                  <v-btn
                    color="#53CFCB"
                    fab
                    small
                    dark
                    :to="'/product/'+product.name+'/prices'"
                    >
                    <v-icon
                      dark
                      >
                      mdi-tag-multiple
                    </v-icon>

                  </v-btn>
              </v-card-actions>

            </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { reactive, watch } from '@vue/composition-api'

export default {
  components: {

  },
  props: {
    productGroupProductsList: {
      type: Array,
      default: function () {
        return {}
      }
    }
  },
  setup (props, { emit, root: { $store, $router, $route } }) {
    const state = reactive({
      store: $store,
      productGroupProductsList: []
    })

    // state.productGroupProductsList = props.productGroupProductsList

    watch(
      state.productGroupProductsList,
      (productGroupProductsList) => {
        state.productGroupProductsList = props.productGroupProductsList
      })

    return {
      state
    }
  }

}
</script>

<style scoped>

</style>
