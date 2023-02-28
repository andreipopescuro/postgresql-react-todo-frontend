import { customRequest } from "./requestMethods";

async function checkForUser() {
  let user = localStorage.getItem("currentUser");
  if (!user) {
    const { data } = await customRequest.post("/users");
    localStorage.setItem("currentUser", JSON.stringify(data.id));
    user = data.id;
    return user;
  }
  return JSON.parse(user);
}
export default checkForUser;
