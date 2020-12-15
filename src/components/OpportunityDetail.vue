<template>
  
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
// import { ProductModel, formatter } from "../models/productModel";
// import ProductLabel from "../components/ProductLabel.vue";

@Options({

})

export default class OpportunityDetail extends Vue {
  
}
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
