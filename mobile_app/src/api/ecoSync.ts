import axios from "axios";

import { api } from "@data/endpoints";

export default axios.create({
  baseURL: api,
});