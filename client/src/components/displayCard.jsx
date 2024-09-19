import { useNavigate } from "react-router-dom";


const DisplayCard = (props) => {

    const navigate = useNavigate();

    return (
        <div className="DisplayCard" onClick={() => {navigate('/blog', {state : {data : props.data}})}}>    
        <img src="" alt="" />
        <h1>{props.data.Title}</h1>
        <h3>{props.data.Date}</h3>
        <h2>{props.data.Description}</h2>
        <h4> by {props.data.Author} </h4>
        
        </div>
    );

}

export default DisplayCard