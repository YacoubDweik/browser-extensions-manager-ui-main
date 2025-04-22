import { useTheme } from "./useTheme";

function Card({
  name,
  logo,
  description,
  isActive,
  handleToggle,
  handleRemove,
}) {
  const isLight = useTheme();
  return (
    <li
      key={name}
      className={`${isLight ? "bg-white" : "bg-light-tabs"} flex flex-col justify-between gap-3 rounded-xl p-6`}
    >
      <div className="flex items-start justify-between gap-3">
        <img src={logo} alt="" />
        <div className="grow-[1]">
          <strong>{name}</strong>
          <p>{description}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <button
          className={`${isLight ? "bg-white" : "bg-light-tabs"} cursor-pointer rounded-4xl border-2 border-neutral-200 px-3 py-1`}
          onClick={() => handleRemove(name)}
        >
          Remove
        </button>
        <label className="relative block h-5 w-9 cursor-pointer">
          <input
            className="peer invisible relative z-2 block h-full w-full"
            checked={isActive}
            onChange={(e) => handleToggle(e)}
            type="checkbox"
            name="checkbox"
            id={name}
          />
          <span className="absolute top-0.5 left-0.5 z-1 block h-4 w-4 translate-x-0 rounded-2xl bg-white transition-all duration-200 peer-checked:translate-x-full"></span>
          <span
            className={` ${isLight ? "peer-checked:bg-light-red" : "peer-checked:bg-dark-red-toggle-bg"} absolute top-0 left-0 z-0 block h-full w-full rounded-2xl transition-all duration-200 ${isLight ? "bg-light-toggle-bg" : "bg-dark-toggle"}`}
          ></span>
        </label>
      </div>
    </li>
  );
}

export default Card;
