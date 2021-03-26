import axios from "axios";
async function userDetails() {
  var user = [] as any;
  await axios
    .get("http://localhost:8000/profile")
    .then((response) => {
      user = response.data;
      console.log(user.length);
    })
    .catch((error) => {
      console.log(error);
    });
  return user;
};
export default userDetails;
