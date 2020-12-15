<template>
  <section :class="$style.wrapper">
    <header :class="$style.header">
      <div :class="$style.left">
        <product-label :typeName="product.typeName" />
        <h1>{{ product.name }}</h1>
        <div :class="$style.imgBlock">
          <img :src="product.image01" width="100%">
        </div>
      </div>
      <div :class="$style.right">
        <div :class="$style.dataBlock">
          <h2>基本情報</h2>
          <dl :class="$style.basicData">
            <dt>メーカー</dt>
            <dd>{{ product.manufacturer }}</dd>
            <dt>型式／型番</dt>
            <dd>{{ product.modelType }}</dd>
            <dt>年式</dt>
            <dd>{{ product.modelYear }}</dd>
            <dt>機械所在地</dt>
            <dd>{{ product.area }}</dd>
          </dl>
          <h2>仕様</h2>
          <ul :class="$style.specifications">
            <li v-for="(value, index) in product.specifications" :key="index">
              {{ value }}
            </li>
          </ul>
          <div :class="$style.dataFooter">
            <div :class="$style.amount">
              <b>希望販売金額</b>
              <span>{{ product.amount | numberFormat }}</span>
            </div>
            <div :class="$style.btnGroup">
              <div v-if="this.$store.state.favorites.indexOf(product.id) > -1">
                <v-btn large width="160" v-on:click="remove_favorite(product.id)">
                  <v-icon color="orange" small>
                    mdi-star-check
                  </v-icon>
                  追加済み
                </v-btn>
              </div>
              <div v-else>
                <v-btn large width="160" v-on:click="add_favorite(product.id)">
                  <v-icon dark small>
                    mdi-star
                  </v-icon>
                  気になる
                </v-btn>
              </div>
              <v-btn dark large color="red" width="160">
                問い合せ
              </v-btn>
            </div>
          </div>
        </div>
      </div>
    </header>
  </section>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
// import { ProductModel, formatter } from "../models/productModel";
// import ProductLabel from "../components/ProductLabel.vue";

@Options({
  filters: {
    numberFormat: function(value: number) {
      return `¥${value.toLocaleString()}`;
    }
  }
})

export default class OpportunityDetail extends Vue {
  
  ,
  methods: {
    add_favorite:function(id:number) {
      this.$store.commit("addFavorites", id)
    },
    remove_favorite:function(id:number) {
      this.$store.commit("removeFavorites", id)
    }
  }
});
</script>

<style lang="scss" module>
.wrapper {
  padding: 2rem;
}
.header {
  display: flex;
}
.left {
  width: 568px;
  > h1 {
    color: #0b5890;
    line-height: 1.4;
    margin: 1rem 0;
  }
}
.imgBlock {
  height: 568px;
  width: 100%;
  background: #f0f2f5;
}
.right {
  flex: 1;
  padding-left: 2rem;
}
.dataBlock {
  border: 1px solid #e3e3e3;
  border-radius: 4px;
  padding: 1.5rem;
  height: 100%;
  position: relative;
  > h2 {
    color: #0b5890;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #e3e3e3;
    font-size: 1rem;
    margin-bottom: 1rem;
  }
}
.basicData {
  display: grid;
  grid-template-columns: 104px 1fr;
  row-gap: 0.5rem;
  font-size: 1rem;
  margin-bottom: 1rem;
  > dt {
    font-weight: 700;
    color: #505e64;
  }
}
.specifications {
  padding: 0 !important;
  > li {
    margin-bottom: 0.4rem;
    font-size: 0.9rem;
  }
}
.dataFooter {
  height: 144px;
  width: 100%;
  border-top: 1px solid #e3e3e3;
  position: absolute;
  bottom: 0;
  left: 0;
}
.amount {
  height: 72px;
  display: flex;
  justify-content: center;
  align-items: center;
  > span {
    color: #d4380d;
    font-weight: 700;
    font-size: 2rem;
    display: inline-block;
    margin-left: 1rem;
  }
}
.btnGroup {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f0f2f5;
  padding: 1rem;
  height: 72px;
  > button {
    font-weight: 700;
    margin: 0 1rem;
  }
}
</style>
