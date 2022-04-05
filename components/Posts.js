import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import { query, orderBy, collection } from "firebase/firestore";
import Post from "./Post";
import { getStorage, ref } from "firebase/storage";

function Posts() {
  const docRef = collection(db, "posts");

  const [realtimePosts, loading, error] = useCollection(
    query(docRef, orderBy("timestamp", "desc"))
  );

  return (
    <div>
      {loading ? (
        <h1>Loading....</h1>
      ) : (
        realtimePosts?.docs.map((post) => {
          return (
            <Post
              key={post.id}
              name={post.data().name}
              message={post.data().message}
              email={post.data().email}
              timestamp={post.data().timestamp}
              image={post.data().image}
              postImage={post.data().postImage}
            />
          );
        })
      )}
    </div>
  );
}
export default Posts;
