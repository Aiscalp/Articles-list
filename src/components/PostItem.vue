<template>
    <div class="post">
        <div>
            <div>№{{ post.id }}<!-- , likes = {{ $store.state.likes }} --></div>
            <div>
                <strong>Name:</strong> {{ post.title }}
            </div>
            <div>
                <strong>Description:</strong> {{ post.body }}
            </div>
        </div>
        <div class="post__btns">
            <my-button @click="$router.push(`/posts/${post.id}`)">
                Open post
            </my-button>
            <my-button @click="$emit('remove', post)">
                Delete
            </my-button>
        </div>
    </div>

</template>

<script>
import router from '@/router/router';

export default {
    props: {
        post: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>
.post {
    padding: 15px;
    border: 2px solid teal;
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.post__btns {
    display: flex;
}
</style>