import sources from "../assets/sources.json";

const Sources = () => {
  return (
    <div className="flex justify-center flex-col items-center gap-4">
      <p>Sources</p>
      <div className="flex flex-row flex-wrap gap-4">
        {sources.map((item) => (
          <div
            key={item.id}
            className="border-slate-600 border-solid border-2 w-60 h-60 relative flex flex-col justify-evenly items-center hover:cursor-pointer"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-32 h-32 object-contain"
            />
            <p className="text-slate-600 text-xl">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sources;
