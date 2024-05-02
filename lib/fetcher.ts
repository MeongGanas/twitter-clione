import axios from "axios";

export default function fetcher(url: string) {
  axios.get(url).then((res) => res.data);
}
