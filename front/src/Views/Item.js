import React from 'react';
import { Link } from "react-router-dom";


const Item = (props) =>
{
  return (<tr key={props.item.id}>
    <td>{props.item.id}</td>
    <td>{props.item.name}</td>
    <td>{props.item.description}</td>
    <td><input type="button" value="Edit" onClick={props.showEdit} /></td>
    <td><Link to={`/SubItems/${props.item.id}`} >Go</Link></td>
  </tr>);
}

export default Item;
