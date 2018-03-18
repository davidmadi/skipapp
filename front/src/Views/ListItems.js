import React, { Component } from 'react';
import Item from './Item';
import EditItem from './EditItem';
import {createStore} from 'redux';
import ReducerFunction from '../Reducer/ItemsReducer';

class ListItems extends Component {

  store = createStore(ReducerFunction);

  constructor(){
    super();
    this.state = {itemsList:[], editItem:{id:-1}};
  }

  componentWillMount(){
    this.store.subscribe(() => {
      this.setState({itemsList:this.store.getState()});
    });
  }

  componentDidMount(){

    fetch('http://localhost:8080/item/loadlist',
    {
        method: "POST",
        headers:{
          'content-type': 'application/json;charset=UTF-8'
        },
        body: {}
    })
    .then(response => {
      if(response.ok){
        return response.json();
      } else {
        throw new Error("not possible to fetch list");
      }
    })
    .then((response) => {
      this.store.dispatch({
        type:"FIRSTLISTITEMS",
        itemsList:response
      });
    });
  }

  showEdit(itemToEdit, e){
    this.editItemComponent.setState(itemToEdit);
  }

  showNew(e){
    this.editItemComponent.setState({id:0, name:"", description:""});
  }

  gotoSubItems(itemToGo, e){
    e.preventDefault();
  }

  render() {
    return (
      <div id="listofitems">
        <EditItem ref={(edititem) => this.editItemComponent = edititem} store={this.store} />
        <table className="pure-table">
          <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Description</th>
                <th></th>
                <th></th>
              </tr>
          </thead>
          <tbody>
          {
            this.state.itemsList.map(item => {
              return <Item key={item.id} item={item} showEdit={this.showEdit.bind(this, item)} />
/*                <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td><input type="button" value="Edit" onClick={this.showEdit.bind(this, item)} /></td>
                    <td><Link to={`/SubItems/${item.id}`} >Go</Link></td>
                </tr>*/
              }
            )
          }
          </tbody>
          <tfoot>
          <tr>
              <td colSpan="3"></td>
              <td colSpan="2"><input type="button" value="New" onClick={this.showNew.bind(this)} /></td>
            </tr>
          </tfoot>
        </table>
      </div>
    )
  }
}

export default ListItems;
