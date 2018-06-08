# vue2-jituxueba

> es6 + vue + vue-router + vuex + axios + vue-awesome-swiper + better-scroll + sass + webpack

> you may use eventBus instead of vuex.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# if npm run dev error
npm install node-sass sass-loader -D

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

``` cc
# better-scroll
<div class="wrapper" ref="wrapper">
  <div class="content"></div>
</div>

this.scroll = new BScroll(this.$refs.wrapper, {})
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
