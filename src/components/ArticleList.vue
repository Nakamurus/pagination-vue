<template>
    <div>
        <ArticleItem
          v-for="article in articles"
          :key="article.publishedAt"
          :article="article"
        />
        <BasePagination
          :current-page="currentPage"
          :page-count="pageCount"
          class="articles-list__pagination"
          @nextPage="pageChangeHandle('next');"
          @previousPage="pageChangeHandle('previous');"
          @loadPage="pageChangeHandle"
        />
    </div>
</template>

<script>
import axios from 'axios';
import ArticleItem from './ArticleItem';
import BasePagination from './BasePagination';

export default {
    name: "ArticleList",
    static: {
        visibleItemsPerPageCount: 2 // what's static
    },

    data() {
        return {
            articles: [],
            currentPage: 1,
            pageCount: 0
        };
    },

    components: {
        ArticleItem,
        BasePagination
    },

    async mounted() {
        // eslint-disable-next-line no-useless-catch
        try {
            const { data } = await axios.get(
                `?country=us&page=1&pageSize=${
                    this.$options.static.visibleItemsPerPageCount
                }&category=business&apiKey=065703927c66462286554ada16a686a1`
            );
            this.articles = data.articles;
            this.pageCount = Math.ceil(
                data.totalResults / this.$options.static.visibleItemsPerPageCount
            );
        } catch (error) {
            throw error;
        }
    },

    methods: {
        async pageChangeHandle(value) {
            switch(value) {
                case "next":
                    this.currentPage += 1;
                    break;
                case "previous":
                    this.currentPage -= 1;
                    break;
                default:
                    this.currentPage = value;
                    break;
            }

            const  { data } = await axios.get(
                `?country=us&page=${this.currentPage}&pageSize=${
                    this.$options.static.visibleItemsPerPageCount
                }&category=business&apiKey=065703927c66462286554ada16a686a1`
            );

            this.articles = data.articles;
        }
    }
};
</script>

<style lang="scss" module>
.articles-list {
    &__pagination {
        position: fixed;
        bottom: 50px;
        left: 50%;
        transform: translateX(-50%);
    }
}
</style>