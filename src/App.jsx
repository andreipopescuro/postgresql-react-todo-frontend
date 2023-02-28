import { useEffect, useState } from "react";
import checkForUser from "./utils/setLS";
import { customRequest } from "./utils/requestMethods";
import Posts from "./components/Posts";
import Todos from "./components/Todos";
function App() {
  const [data, setData] = useState([]);
  const [userId, setUser] = useState("");
  const [currentPostId, setCurrentPostId] = useState("");
  const [globalTrigger, setGlobalTrigger] = useState(false);

  useEffect(() => {
    // Handle the user connection : if first time create new user, else load user data
    async function fetchUser() {
      const currentUser = await checkForUser();
      setUser(currentUser);
    }
    fetchUser();
  }, [userId]);

  useEffect(() => {
    // If userId is not set, nothing happens
    if (userId) {
      const getData = async () => {
        try {
          const { data } = await customRequest.get(`/users/${userId}`);
          setData(data);
        } catch (error) {
          console.log(error.message);
        }
      };
      getData();
    }
  }, [userId, globalTrigger]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="App">
        <h1>Note app</h1>
        <div className="content">
          <Posts
            globalTrigger={globalTrigger}
            setCurrentPostId={setCurrentPostId}
            userId={userId}
          />
          <Todos
            globalTrigger={globalTrigger}
            setGlobalTrigger={setGlobalTrigger}
            currentPostId={currentPostId}
          />
        </div>
      </div>
    </>
  );
}

export default App;
