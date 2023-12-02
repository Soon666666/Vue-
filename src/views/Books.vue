<template>
  <div>
    <Loading v-if="loading" />
    <h3 v-else>{{ title }}</h3>
    <BookList :list="books" v-if="books.length" />
    <h1>{{ message }}</h1>

<!-- 分页控件 -->
    <el-pagination 
    :hide-on-single-page="false" 
    @size-change="handleSizeChange" :page-sizes="[2, 10, 20, 40]"
      @current-change="handleCurrentChange" :current-page="pageNum" :page-size="pageSize"
      layout="total,sizes,prev,pager,next,jumper" :total="total">
    </el-pagination>

  </div>
</template>

<script>
import BookList from "@/components/BookList.vue"
import Loading from '@/components/Loading.vue'
export default {
  name: 'Books',
  data() {
    return {
      title: '',
      books: [],
      message: '',
      loading: true,
      //控制分页的数据
      total: 5,
      pageNum: 1,
      pageSize: 2

    };
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.title = to.meta.title;
      //setRequestUrl() : 
      //更改 /category/:id => /book/category/:id
      //这里后台controller需要有/book/category/:id这个接口
      let url = vm.setRequestUrl(to.fullPath);
      // vm.getBooks(url);
      vm.getBooks(url, vm.pageNum, vm.pageSize);

    });
  },
  beforeRouteUpdate(to) {
    let url = this.setRequestUrl(to.fullPath);
    this.getBooks(url,this.pageNum,this.pageSize);
    return true;
  },

  components: {
    BookList,
    Loading
  },

  methods: {
    getBooks(url, pageNum, pageSize) {
      this.message = '';
      this.axios
        .get(url, { params: { pageNum, pageSize } })
        // 访问 /book/category/:id/page 或/search,返回books数组
        .then(response => {
          if (response.status == 200) {
            this.loading = false;
            this.books = response.data.data;
            //设置分页查询的数据的总数
            this.total=response.data.total;
            if (this.books.length === 0) {
              if (this.$route.name === "category")
                this.message = "当前分类下没有图书！"
              else
                this.message = "没有搜索到匹配的图书！"
            }
          }
        })
        .catch(error => alert(error));
    },
    //动态设置服务端数据接口的请求URL
    setRequestUrl(path) {
      let url = path;
      //url="/book/category/:cid/page?pageNum=XXX&pageSize=XXX"
      if (path.indexOf("/category") != -1) {
        // url = "/book" + url;
        url = "/book" + url + "/page"
      }
      //url="search/page?keyworld=XXX&pageNum=XXX&pageSize=XXX"
      else if(path.indexOf("/search") != -1){
        let start=path.indexOf("/search");
        let end=start+7;
        url=url.slice(0,end)+"/page"+url.slice(end,url.length);
      }
      return url;
    },

    //处理更改每页显示条数，重新请求数据
    handleSizeChange(selectedSize) {
      this.pageSize = selectedSize;
      let url = this.setRequestUrl(this.$route.fullPath);
      this.getBooks(url, this.pageNum, this.pageSize);
    },
    //处理更改当前选择页的时候，重新请求数据
    handleCurrentChange(currentPage) {
      this.pageNum = currentPage;
      let url = this.setRequestUrl(this.$route.fullPath);
      this.getBooks(url, this.pageNum, this.pageSize);
    }

  }
}
</script>

<style scoped></style>