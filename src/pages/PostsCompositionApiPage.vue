<template>
    <div>
        <h1>Posts</h1>
        <my-input v-model="searchQuery" placeholder="Search..." />
        <div class="app__btns">
            <my-button>
                Create Post
            </my-button>
            <my-select v-model="selectedSort" :options="sortOptions" />
        </div>
        <my-dialog v-model:show="dialogVisible">
            <post-form />
        </my-dialog>
        <post-list :posts="sortedAndSearchedPosts" v-if="!isPostLoading" />
        <div v-else>Loading...</div>
    </div>
</template>

<script>
import PostForm from "@/components/PostForm"
import PostList from "@/components/PostList"
import {usePosts} from "@/hooks/usePosts"
import useSortedPosts from "@/hooks/useSortedPosts"
import useSortedAndSearchedPosts from "@/hooks/useSortedAndSearchedPosts"

export default {
    components: {
        PostForm,
        PostList
    },
    data() {
        return {
            dialogVisible: false,
            sortOptions: [
                { value: 'title', name: 'by name' },
                { value: 'body', name: 'by content' },
            ]
        }
    },
    setup(props) {
    const {posts, totalPages, isPostLoading} = usePosts(10);
    const {sortedPosts, selectedSort} = useSortedPosts(posts);
    const {searchQuery, sortedAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts)
    return {
      posts,
      totalPages,
      isPostLoading,
      sortedPosts,
      selectedSort,
      searchQuery,
      sortedAndSearchedPosts,
    }
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