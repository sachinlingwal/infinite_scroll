import axios from "axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios(
        `https://api.instantwebtools.net/v1/passenger?page=${pageNumber}&size=10`
      );
      setPosts(res.data.data);
      setTotalPosts(res.data.totalPassengers);
    };
    fetchData();
  }, []);

  console.log("posts", posts);

  const fetchData = () => {
    setPageNumber(pageNumber + 1);
    const fetchData = async () => {
      const res = await axios(
        `https://api.instantwebtools.net/v1/passenger?page=${pageNumber}&size=10`
      );
      setPosts(posts.concat(res.data.data));
      setTotalPosts(res.data.totalPassengers);
    };
    fetchData();
  };
  // useEffect(() => {

  // }, [pageNumber]);
  return (
    <div className="App">
      <h1>Infinte Scroll Bar in React Js</h1>
      <h1>Total Passengers : {totalPosts}</h1>

      <ol>
        {posts.map((post, i) => {
          return (
            <li key={i}>
              airline Name :{post.airline[0].name}
              <h1>
                <b> _id :{post._id}</b>
              </h1>
              Country Name :{post.airline[0].country}
              <img src={post.airline[0].logo} alt="logo" />
            </li>
          );
        })}

        <InfiniteScroll
          dataLength={posts.length}
          next={fetchData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        ></InfiniteScroll>
      </ol>
    </div>
  );
}

export default App;
