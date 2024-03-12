import { useParams } from "react-router-dom";

const NewsSource = () => {
  const { sourceId } = useParams();
  return <div>NewsSource - {sourceId}</div>;
};

export default NewsSource;
