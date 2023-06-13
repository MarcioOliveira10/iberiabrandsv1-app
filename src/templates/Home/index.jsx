import { useCallback, useEffect, useState } from "react";

import "./styles.css";

import { loadPosts } from "../../utils/load-posts";
import { Posts } from "../../components/Posts";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState("");

  const noMorePosts = page + postsPerPage >= allPosts.length;

  const filteredPosts = !!searchValue
    ? posts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : posts;

  const handleLoadposts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  useEffect(() => {
    handleLoadposts(0, postsPerPage);
  }, [handleLoadposts, postsPerPage]);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPost = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPost);

    setPosts(posts);
    setPage(nextPage);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  return (
    <section className="container">
      <div className="search-container">
        {!!searchValue && (
          <>
            <h1>Search value: {searchValue}</h1>
          </>
        )}
        <TextInput value={searchValue} event={handleChange}></TextInput>
      </div>

      {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}
      {filteredPosts.length === 0 && <p>Não existem posts</p>}
      <div className="button-container">
        {!searchValue && (
          <Button
            disabled={noMorePosts}
            text="Load more posts"
            event={loadMorePosts}
          />
        )}
      </div>
    </section>
  );
};

export default Home;

/*

class Home2 extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 10,
    searchValue: "",
  };


  //-------------------------------------------------//
  
  //---------------------carrega mais posts----------------------------//

 

  //---------------------pega o valor do input----------------------------//
  

 
  }
}

*/
