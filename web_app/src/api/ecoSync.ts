import axios from "axios";

import { api } from "@assets/data/api/endpoints";

export default axios.create({
  baseURL: api,
});
