<template>
    <div class="app">
        <h1>Posts</h1>
        <my-input :model-value="searchQuery" @update:model-value="setSearchQuery" placeholder="Search..." />
        <div class="app__btns">
            <my-button @click="showDialog">
                Create Post
            </my-button>
            <my-select :model-value="selectedSort" @update:model-value="setSelectedSort" :options="sortOptions " />
        </div>
        <my-dialog v-model:show="dialogVisible">
            <post-form @create="createPost" />
        </my-dialog>
        <post-list :posts="sortedAndSearchedPosts" @remove="removePost" v-if="!isPostLoading" />
        <div v-else>Loading...</div>
        <div v-intersection="loadMorePosts" class="observer"></div>
        <!--         <div class="page__wrapper">
            <div v-for="pageNumber in totalPages" key="pageNumber" class="page"
                :class="{'current-page': page === pageNumber}" @click="changePage(pageNumber)">
                {{ pageNumber }}
            </div>
        </div> -->
    </div>
</template>

<script>
import PostForm from "@/components/PostForm"
import PostList from "@/components/PostList"
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
    components: {
        PostForm,
        PostList
    },
    data() {
        return {
            dialogVisible: false,

        }
    },
    methods: {
        ...mapMutations({
            setPage: 'post/setPage',
            setSearchQuery: 'post/setSearchQuery',
            setSelectedSort: 'post/setSelectedSort'
            
        }),
        ...mapActions({
            loadMorePosts: 'post/loadMorePosts',
            fetchPosts: 'post/fetchPosts'
        }),
        createPost(post) {
            this.posts.push(post)
            this.dialogVisible = false;
        },
        removePost(post) {
            this.posts = this.posts.filter(p => p.id !== post.id)
        },
        showDialog() {
            this.dialogVisible = true
        },
    },
    mounted() {
        this.fetchPosts()
    },
    computed: {
        ...mapState({
            posts: state => state.post.posts,
            isPostLoading: state => state.post.isPostLoading,
            selectedSort: state => state.post.selectedSort,
            searchQuery: state => state.post.searchQuery,
            page: state => state.post.page,
            limit: state => state.post.limit,
            totalPages: state => state.post.totalPages,
            sortOptions: state => state.post.sortOptions
        }),
        ...mapGetters({
            sortedPosts: 'post/sortedPosts',
            sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
        }),
        /*         sortedPosts() {
                    return [...this.posts].sort((post1, post2) =>
                        post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
                },
                sortedAndSearchedPosts() {
                    return this.sortedPosts.filter(post =>
                        post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
                } */
    },
    watch: {
        /*      page() {            
                  this.fetchPosts()
              } */
    }
}
</script>

<style>
.app__btns {
    margin: 15px 0;
    display: flex;
    justify-content: space-between;
}

.page__wrapper {
    display: flex;
    margin-top: 15px;
}

.page {
    border: 1px solid teal;
    padding: 10px;
}

.current-page {
    border: 2px solid darkolivegreen;
}

.observer {
    height: 30px;
}
</style>