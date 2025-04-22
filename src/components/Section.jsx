import { useEffect, useState } from "react";
import { useTheme } from "./useTheme";
import useFetch from "./useFetch";
import Card from "./Card";

function Section() {
  const isLight = useTheme();
  const { data, isPending, error } = useFetch(
    "/browser-extensions-manager-ui-main/assets/data.json",
  );
  const [list, setList] = useState(null);
  const [current, setCurrent] = useState("all"); // ["all" , "active" , "inactive"]
  let filteredList = [];

  useEffect(() => {
    if (data) {
      setList(data);
    }
  }, [data]);

  switch (current) {
    case "active":
      filteredList = list.filter((input) => input.isActive == true);
      break;
    case "inactive":
      filteredList = list.filter((input) => input.isActive != true);
      break;
    default:
      filteredList = list;
  }

  function handleToggle(e) {
    filteredList = list.map((item) =>
      item.name == e.target.id ? { ...item, isActive: e.target.checked } : item,
    );
    setList(filteredList);
  }

  function handleRemove(name) {
    setList(list.filter((item) => item.name != name));
  }

  return (
    <section
      className={` ${isLight ? "text-dark-card-bg" : "text-white"} my-8`}
    >
      <div className="space-y-3 text-center md:flex md:items-center md:justify-between md:space-y-0">
        <h1 className="text-4xl font-bold tracking-tight">Extensions List</h1>
        <ul
          className="flex items-center justify-center gap-4"
          aria-label="Extensions filters"
        >
          <li>
            <button
              className={
                "cursor-pointer rounded-4xl px-4 py-2 " +
                (current == "all"
                  ? isLight
                    ? "bg-light-red font-medium text-white"
                    : "bg-dark-red-toggle-bg text-light-titles font-medium"
                  : isLight
                    ? "bg-white"
                    : "bg-light-tabs")
              }
              onClick={() => setCurrent("all")}
              aria-controls="list"
              aria-pressed={current == "all"}
            >
              All
            </button>
          </li>
          <li>
            <button
              className={
                "cursor-pointer rounded-4xl px-4 py-2 " +
                (current == "active"
                  ? isLight
                    ? "bg-light-red font-medium text-white"
                    : "bg-dark-red-toggle-bg text-light-titles font-medium"
                  : isLight
                    ? "bg-white"
                    : "bg-light-tabs")
              }
              onClick={() => setCurrent("active")}
              aria-controls="list"
              aria-pressed={current == "active"}
            >
              Active
            </button>
          </li>
          <li>
            <button
              className={
                "cursor-pointer rounded-4xl px-4 py-2 " +
                (current == "inactive"
                  ? isLight
                    ? "bg-light-red font-medium text-white"
                    : "bg-dark-red-toggle-bg text-light-titles font-medium"
                  : isLight
                    ? "bg-white"
                    : "bg-light-tabs")
              }
              onClick={() => setCurrent("inactive")}
              aria-controls="list"
              aria-pressed={current == "inactive"}
            >
              Inactive
            </button>
          </li>
        </ul>
      </div>
      <div className="mt-6">
        {isPending && <span className="text-2xl">Loading..</span>}
        {error && (
          <span className="text-2xl">Sorry! something went wrong!</span>
        )}
        <ul
          className="space-y-3 md:grid md:grid-cols-2 md:gap-4 md:space-y-0 lg:grid-cols-3"
          aria-live="polite"
          id="list"
        >
          {list &&
            filteredList.map((input) => (
              <Card
                key={input.name}
                {...input}
                handleToggle={handleToggle}
                handleRemove={handleRemove}
              />
            ))}
        </ul>
      </div>
    </section>
  );
}

export default Section;
