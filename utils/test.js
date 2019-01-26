let count = 1;
import axios from "axios";
const IS_SERVER = !process.browser;

const someFunc = async context => {
  console.log(`this is execute ${count}`);
  console.log(!!context);
  count += 1;
};

export default someFunc;
