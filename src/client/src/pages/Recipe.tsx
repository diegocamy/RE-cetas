import { useGetPostQuery } from "../generated/graphql";
import { useParams } from "react-router-dom";
interface Params {
  slug: string;
}

function Recipe() {
  const { slug } = useParams<Params>();
  const { data, loading } = useGetPostQuery({
    fetchPolicy: "network-only",
    variables: { slug },
  });
  if (loading) {
    return <div>Loading</div>;
  }

  if (!data) {
    return <div>Recipe not found</div>;
  }

  console.log(data);
  return (
    <div>
      {data.getPost?.title}
      <img src={data.getPost?.picture} alt="receta" />
    </div>
  );
}

export default Recipe;
