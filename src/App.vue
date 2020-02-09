<template>
  <div id="app">
    <ArticleList />
    <a href="NewsAPI.org" class="news-api-link">powered by NewsAPI.org</a>
  </div>
</template>

<script>
import ArticleList from './components/ArticleList';

export default {
  name: 'App',
  components: {
    ArticleList
  }
};
</script>

<style lang="scss" module>
#app {
  font-family: 'Robot', sans-serif;

  .news-api-link {
    display: flex;
    justify-content: center;
    position: fixed;
    bottom: 0;
    right: 0;
    width: 100%;
    background-color: #fff;
  }
}
</style>