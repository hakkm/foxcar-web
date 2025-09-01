import { Input } from "@/components/ui/input";
import { useProducts } from "@/services/products.service";
import React from "react";

export default function App() {
  const [keepPreviousData, setKeepPreviousData] = React.useState(false);
  const [search, setSearch] = React.useState("Laptop");

  const { data, isLoading } = useProducts(search, keepPreviousData);

  return (
    <div>
      <h1>SWR Search Example</h1>
      <div className="search-container">
        <Input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Products..."
          autoFocus
        />
        <label>
          <input
            type="checkbox"
            checked={keepPreviousData}
            onChange={(e) => setKeepPreviousData(e.target.checked)}
          />{" "}
          Keep Previous Data
        </label>
      </div>

      <div className={isLoading ? "loading" : ""}>
        {data
          ? data.products.map((item) => {
              return (
                <div className="item" key={item.id}>
                  <img src={item.thumbnail} alt={item.title} />
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}
