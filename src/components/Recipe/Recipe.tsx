import { useEffect } from "react";
import { useQuery } from "../../utils/hooks/useQuery";
import { useNavigate } from "react-router";

interface QueryParams {
  id: string
}

const Recipe = () => {
  const queryParams = useQuery<QueryParams>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!queryParams.id) {
      navigate("/");
    }
  }, [queryParams])
  return (
    <div>Recipe</div>
  )
}

export default Recipe