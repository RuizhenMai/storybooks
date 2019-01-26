import axios from "axios";
const IS_SERVER = !process.browser;
import { loginUser } from "../store/actions/authActions";

const ssrLogin = async context => {
  if (IS_SERVER) {
    // console.log(context.req.user);
    context.store.dispatch(loginUser(context.req.user));
    // return { user: context.query.user || null };
    // return {}; //state change is handle by redux
  } else {
    try {
      const res = await axios.get("http://localhost:3000/auth/getuser");
      //   console.log(res.data.user);
      //   console.log(context.store);
      context.store.dispatch(loginUser(res.data.user));
      // return { user: res.data.user || null };
      //   return {};
    } catch (err) {
      console.log(err);
    }
  }
};

export default ssrLogin;
