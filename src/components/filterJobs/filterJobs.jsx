import { useParams } from "react-router-dom"

const FilterJobs = () => {
  const params = useParams();
  return(
    <div>
      {
        <p>{params.filter}</p>
      }
    </div>
  )
}

export default FilterJobs;