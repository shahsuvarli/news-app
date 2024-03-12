import { useParams } from "react-router-dom";
import useSourceId from "../hooks/useSourceId";

const NewsSource = () => {
  const { sourceId } = useParams();
  const source = useSourceId(sourceId);
  return (
    <div>
      NewsSource - {source?.name}
    </div>
  );

export default NewsSource;
