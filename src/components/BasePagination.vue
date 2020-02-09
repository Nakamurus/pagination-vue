<template>
    <div class="base-pagination">
        <BaseButton
          :disabled="isPreviousButtonDisabled"
          @click.native="previousPage"
        >
        <!-- @click.native コンポーネントのルート要素上のネイティブイベントをハンドルする -->
          ←
        </BaseButton>

        <BasePaginationTrigger
          v-for="paginationTrigger in paginationTriggers"
          :class="{
              'base-pagination__description--current':
              paginationTrigger === currentPage
          }"
          :key="paginationTrigger"
          :pageNumber="paginationTrigger"
          class="base-pagination__descriptiion"
          @loadPage="onLoadPage"
        />

        <BaseButton
          :disabled="isNextButtonDisabled"
          @click.native="nextPage"
        >
          →
        </BaseButton>
    </div>
</template>

<script>
import BaseButton from './BaseButton';
import BasePaginationTrigger from './BasePaginationTrigger';

export default {
    components: {
        BaseButton,
        BasePaginationTrigger
    },

    // プロパティは親からコンポーネントにパラメータを渡す
    props: {
        currentPage: {
            type: Number,
            required: true
        },

        pageCount: {
            type: Number,
            required: true
        },

        visiblePagesCount: {
            type: Number,
            default: 5
        }
    },

    computed: {
        isPreviousButtonDisabled() {
            return this.currentPage === 1;
        },

        isNextButtonDisabled() {
            return this.currentPage === this.pageCount;
        },

        paginationTriggers() {
            const currentPage = this.currentPage;

            // pageCount is the total number of pages(ex. if there is 5 pages, pageCount is 5)
            const pageCount = this.pageCount;

            const visiblePagesCount = this.visiblePagesCount;

            // 現在のページに1、左右に均等にページを分ける
            const visiblePagesThreshold = (visiblePagesCount -1) / 2;

            // Array(int) returns an array with its length set to that integer number
            // => Array(5 - 1).fill(0) returns [0, 0, 0, 0]
            const paginationTriggersArray = Array(this.visiblePagesCount - 1).fill(0);

            // Scenario No.1 when currentPage is off to the left
            // that is, currentPage is 1 or 2
            if (currentPage <= visiblePagesThreshold + 1) {
                paginationTriggersArray[0] = 1;
                // paginationTriggers are page numbers which function as buttons
                const paginationTriggers = paginationTriggersArray.map(
                    // BasePaginationTrigger is arbitrary element of paginationTriggersArray
                    (BasePaginationTrigger, index) => {
                        return paginationTriggersArray[0] + index;
                    }
                );

                // set the last page number to the last element
                paginationTriggers.push(pageCount);

                return paginationTriggers
            }

            // Scenario 2: current page is bigger than half of the list width counting from the end of the list
            if (currentPage >= pageCount - visiblePagesThreshold + 1) {
                const paginationTriggers = paginationTriggersArray.map(
                    (BasePaginationTrigger, index) => {
                        // ex. pageCount = 5, paginationTriggersArray = 4
                        // returns array[5, 4, 3, 2] because index increments
                        return pageCount - index;
                    }
                );

                // have to reverse paginationTrigger, because it decrements
                // unshift(1) set 1 to the first element of the array
                paginationTriggers.reverse().unshift(1);

                return paginationTriggers;
            }

            // Scenario 3: All other cases

            // given currentPage = 3, given visiblePagesThreshold = 2,
            // then paginationTriggersArray[0] = 2
            paginationTriggersArray[0] = currentPage - visiblePagesThreshold + 1;
            const paginationTriggers = paginationTriggersArray.map(
                (paginationTrigger, index) => {
                    return paginationTriggersArray[0] + index;
                 }
            );

            // the first button is 1
            paginationTriggers.unshift(1);
            // the last button is the last page number
            paginationTriggers[paginationTriggers.length - 1] = pageCount;

            return paginationTriggers;
        }
    },
    methods: {
        nextPage() {
            this.$emit('nextPage');
        },

        onLoadPage(value) {
            this.$emit('loadPage', value);
        },

        previousPage() {
            this.$emit('previousPage');
        }
    }
};
</script>

<style lang="scss" module>
$c-primary-accent: #ff9a57;

.base-pagination {
    display: flex;
    justify-content: center;
    align-items: center;

    &__description {
        display: flex;
        margin: 0 17px;
        font-size: 16px;
        font-weight: 600;

        &--current {
            color: $c-primary-accent;
        }
    }

    .arrow-left {
        transform: rotateZ(180deg);
    }
}
</style>