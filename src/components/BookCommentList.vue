<template>
  <div>
    <h3>{{ message }}</h3>
    <BookCommentListItem 
      v-for="comment in comments" 
      :item="comment" 
      :key="comment.id"/>
  </div>
</template>

<script>
  import BookCommentListItem from './BookCommentListItem.vue'
  export default {
    name: 'BookCommentList',
    data () {
      return {
        comments: [],
        message: '',
      };
    },
    components: {
      BookCommentListItem,
    },
    created(){
      this.message = ''; 
      //因为后台接口是 /book/:id/comment获取所有的评论
      let url = this.$route.path + "/comment";
      console.log(url);
      this.axios.get(url)
          .then(response => {
            if(response.status == 200){
              console.log("comment:"+response);
              this.comments = response.data;
              if(this.comments.length === 0){
                this.message = "当前没有任何评论！"
              }
            }
          })
          .catch(error => alert(error));
    }
  }
</script>
<style scoped>

</style>