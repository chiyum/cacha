/* https://www.kancloud.cn/yunye/axios/234845 */
import axios from "axios";

const instance = axios.create();

instance.defaults.baseURL = "https://drawing.wolves.com.tw:53599";

export default instance;
