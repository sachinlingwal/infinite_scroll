import axios from "axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./App.css";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [totalPassengers, setTotalPassengers] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    const fetchApiPosts = async () => {
      const res = await axios(
        `https://api.instantwebtools.net/v1/passenger?page=${pageNumber}&size=10`
      );
      setTotalPassengers(res.data.totalPassengers);
      setPosts(res.data.data);
    };
    fetchApiPosts();
  }, []);

  const fetchData = () => {
    setPageNumber(pageNumber + 1);
    const fetchApiPosts = async () => {
      const res = await axios(
        `https://api.instantwebtools.net/v1/passenger?page=${pageNumber}&size=10`
      );
      setTotalPassengers(res.data.totalPassengers);
      setPosts(posts.concat(res.data.data));
    };
    fetchApiPosts();
  };
  return (
    <div className="App">
      <h1>Infinte Scroll Bar in React Js</h1>
      <h3>totalPassengers - {totalPassengers}</h3>
      <ol>
        {posts.map((post) => {
          return (
            <li>
              {" "}
              Name-{post.name} <br />
              Id = {post._id} <br />
              country - {post.airline[0].country} <br />
              name - {post.airline[0].name} <br />
              <img src={post.airline[0].logo} alt="logo" />
            </li>
          );
        })}
      </ol>

      <InfiniteScroll
        dataLength={posts.length} //This is important field to render the next data
        next={fetchData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        // endMessage={
        //   <p style={{ textAlign: "center" }}>
        //     <b>Yay! You have seen it all</b>
        //   </p>
        // }
        // below props only if you need pull down functionality
        // refreshFunction={this.refresh}
        // pullDownToRefresh
        // pullDownToRefreshThreshold={50}
        // pullDownToRefreshContent={
        //   <h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
        // }
        // releaseToRefreshContent={
        //   <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
        // }
      >
        {/* {items} */}
      </InfiniteScroll>
    </div>
  );
};

export default App;
