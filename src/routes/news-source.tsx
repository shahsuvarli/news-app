import { useParams } from "react-router-dom";
import SearchForm from "../components/search-form";
import useSourceId from "../hooks/useSourceId";

const NewsSource = () => {
  const { sourceId } = useParams();
  const source = useSourceId(sourceId);
  return (
    <div>
      NewsSource - {source?.name}
      <SearchForm />
    </div>
  );
};

export default NewsSource;
