import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Card from "../UI/Card.js";
import { Container, Button } from "../UI/CommonStyle.js";
import Spinner from "../UI/Spinner.js";
import AuthContext from "../store/auth-context";
import FaceIcon from "@mui/icons-material/Face";

export default function UserInfo(props) {
  const [loading, setLoading] = useState(false);
  const [userState, setUserState] = useState([]);
  const [allUserState, setAllUserState] = useState([]);

  const auth = useContext(AuthContext);
  const currentUserId = auth.userId;

  const fetchData = async () => {
    try {
      const result = await fetch("/api/user").then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("not able to fetch data correctly");
        }
      });
      setAllUserState(result);
    } catch (e) {
      console.log(e.message);
    }
  };

  const fetchUserData = async (id) => {
    try {
      const result = await fetch("/api/user/" + id).then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("not able to fetch data correctly");
        }
      });
      setUserState(result);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    setLoading(true);
    let isMounted = true;
    const loadData = async () => {
      await fetchData();
      if (isMounted) {
        setLoading(false);
        isMounted = false;
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (currentUserId) {
      setLoading(true);
      let isMounted = true;
      const loadData = async () => {
        await fetchUserData(currentUserId);
        if (isMounted) {
          setLoading(false);
          isMounted = false;
        }
      };
      loadData();
    }
  }, [currentUserId]);

  const handleCreateUser = () => {
    window.location = "/signup";
  };

  const handleLogout = () => {
    auth.logout();
  };

  const goProfilePage = (id) => {
    window.location = "/user/" + id;
  };

  return (
    <React.Fragment>
      <Container>
        <p style={{ marginBottom: "20px" }}>
          <b>This is user info page meaning you have already signed in</b>
        </p>
        <h3>Below is your user info in the system</h3>
        {userState && (
          <Card>
            <ul>
              <li>
                First Name: <b>{userState.firstName}</b>
              </li>
              <li>
                Last Name: <b>{userState.lastName}</b>
              </li>
              <li>
                Email: <b>{userState.email}</b>
              </li>
            </ul>
          </Card>
        )}
        <div style={{ width: "30%" }}>
          <Button onClick={handleCreateUser}>Create User</Button>
          <Button onClick={handleLogout}>Log out</Button>
        </div>

        <h3 style={{ margin: "30px" }}>
          Below are all the user info in the system
        </h3>
        <p style={{ marginBottom: "30px" }}>
          <i>
            Click the face icon to check the user profile for processed orders!
          </i>
        </p>
        <div style={{ display: "inline" }}>
          {allUserState.length > 0 &&
            allUserState.map((each, index) => {
              return (
                <Card key={index}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div>
                      <FaceIcon
                        onClick={() => goProfilePage(each.id)}
                        style={{
                          marginRight: "20px",
                          fontSize: "50px",
                        }}
                      />
                    </div>
                    <div>
                      <ul>
                        <li>
                          First Name: <b>{each.firstName}</b>
                        </li>
                        <li>
                          Last Name: <b>{each.lastName}</b>
                        </li>
                        <li>
                          Email: <b>{each.email}</b>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Card>
              );
            })}
        </div>
        {loading && <Spinner />}
        <Link to="/" style={{ marginTop: "30px" }}>
          Go to Home Page
        </Link>
      </Container>
    </React.Fragment>
  );
}
