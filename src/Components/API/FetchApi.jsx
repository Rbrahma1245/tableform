import axios from "axios";
import useSWR from "swr";

function FetchApi() {
  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const { data, error, isLoading } = useSWR(
    "https://fakestoreapi.com/products",
    fetcher
  );

  if (isLoading) return "Loading ....";
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      {data.map((e, i) => {
        return (
          <div key={i}>
            <ul>
              <li>{e.title}</li>
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export default FetchApi;
