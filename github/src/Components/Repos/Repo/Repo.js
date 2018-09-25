import React from 'react'

const Repo = (props) => {
    return(
     <tr>
     <td>{ props.full_name } </td>
     <td>{props.language}</td> 
     <td>{props.tag_name}</td> 
     {props.favourite?
     <td id = "Add"> {<a href="remove" onClick={props.click}>remove</a>}</td>:
     <td id = "Add"> {<a href="add" onClick={props.changed}>Add</a>}</td>}
     </tr>
 )    
 
};



export default Repo;