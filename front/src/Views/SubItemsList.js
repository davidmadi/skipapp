import React, { Component } from 'react';
import EditSubItem from './EditSubItem';
import {createStore} from 'redux';
import ReducerFunction from '../Reducer/SubItemsReducer';

class SubItemsList extends Component {

  store = createStore(ReducerFunction);

  constructor(props){
    super(props);
    this.state = {itemid : props.match.params.itemid, listsubitems : []};
  }

  componentWillMount(){
    this.store.subscribe(() => {
      this.setState({listsubitems:this.store.getState()});
    });
  }

  componentDidMount(){

    const bod = JSON.stringify({id : this.state.itemid});
    fetch('http://localhost:8080/subitem/loadlist',
    {
        method: "POST",
        headers:{
          'content-type': 'application/json;charset=UTF-8'
        },
        body: bod
    })
    .then(response => {
      if(response.ok){
        return response.json();
      } else {
        throw new Error("não foi possível obter a lista");
      }
    })
    .then((response) => {
      this.store.dispatch({
        type:"FIRSTLISTITEMS",
        listsubitems:response
      });
      //this.setState({listsubitems:response});
    });

  }

  showEdit(itemToEdit, e){
    e.preventDefault();
    this.editItemComponent.setState(itemToEdit);
  }

  newItem(e){
    e.preventDefault();
    this.editItemComponent.setState({id:0, name:"", description:"", itemid:this.state.itemid});
  }

  gotoSubItems(itemToGo, e){
    e.preventDefault();
  }

  render() {
    return (
      <div id="listofitems">
        <EditSubItem ref={(edititem) => this.editItemComponent = edititem} store={this.store} />
        <table className="pure-table">
          <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Description</th>
                <th></th>
              </tr>
          </thead>
          <tbody>
            {
              this.state.listsubitems.map(item => {
                return <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td><input type="button" value="Edit" onClick={this.showEdit.bind(this, item)} /></td>
                </tr>
                }
              )
            }
            <tr>
              <td colSpan="3"></td>
              <td><input type="button" value="New" onClick={this.newItem.bind(this)} /></td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default SubItemsList;
