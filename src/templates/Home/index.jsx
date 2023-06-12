import { Component } from "react";

import "./styles.css";

import { loadPosts } from "../../utils/load-posts";
import { Posts } from "../../components/Posts";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";

class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 10,
    searchValue: "",
  };

  async componentDidMount() {
    await this.loadPosts();
  }
  //-------------------------------------------------//
  loadPosts = async () => {
    const { page, postsPerPage } = this.state;

    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  };
  //---------------------carrega mais posts----------------------------//

  loadMorePosts = () => {
    const { page, postsPerPage, allPosts, posts } = this.state;
    const nextPage = page + postsPerPage;
    const nextPost = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPost);

    this.setState({ posts, page: nextPage });
  };

  //---------------------pega o valor do input----------------------------//
  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  };

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue
      ? posts.filter((post) => {
          return post.title.toLowerCase().includes(searchValue.toLowerCase());
        })
      : posts;

    return (
      <section className="container">
        <div className="search-container">
          {!!searchValue && (
            <>
              <h1>Search value: {searchValue}</h1>
            </>
          )}
          <TextInput value={searchValue} event={this.handleChange}></TextInput>
        </div>

        {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}
        {filteredPosts.length === 0 && <p>Não existem posts</p>}
        <div className="button-container">
          {!searchValue && (
            <Button
              disabled={noMorePosts}
              text="Load more posts"
              event={this.loadMorePosts}
            />
          )}
        </div>
      </section>
    );
  }
}

export default Home;