import { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Card({ path, title, description, createdAt, user, id}) {

    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/images/${id}`, { state : { id } })
    }

    const postDate = useMemo(() => {
        const timestamp = createdAt?.seconds * 1000;

        if (typeof timestamp === 'number' && !isNaN(timestamp)) {
          const date = new Date(timestamp);
          const options = { year: 'numeric', month: 'short', day: 'numeric' };
          const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
          return formattedDate;
        } else {
          return "Invalid Date"; // or any other suitable fallback
        }

    }, [])
  return(
      <div className="col-md-4 mb-5 d-flex justify-content-center" onClick={handleClick}>
          <div className="card p-1" style={{width: "290px"}}>
            <div className="" style={{
                height: "250px",
                backgroundImage: `url(${path})`,
                backgroundPosition: 'bottom',
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat"
            }}></div>
            <h2 className="text-center">{title}</h2>
            <p>{description}</p>
            <div className="d-flex justify-content-between">
            <span>{postDate}</span> 
            <span>{user}</span> 
            </div>
          </div>
      </div>
  )
}
export default Card;