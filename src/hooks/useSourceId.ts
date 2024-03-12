import sources from "../assets/sources.json";
import { Source } from "../constants/types";

function useSourceId(sourceId: string | undefined): Source | undefined {
  const { name, id, link, image } = sources.find(
    (source) => source.link === sourceId
  ) as Source;
  return { name, id, link, image };
}

export default useSourceId;
