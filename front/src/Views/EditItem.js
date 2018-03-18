import React, { Component } from 'react';

class EditItem extends Component {

  constructor(props){
    super(props);
    this.state = {...props};
  }

  save(e){
    e.preventDefault();

    if (this.state.id > -1)
    {
      const itemToSave = this.state;
      const url = (this.state.id > 0) ? 'http://localhost:8080/item/change ': 'http://localhost:8080/item/change';

      fetch(url,
      {
          method: "POST",
          headers:{
            'content-type': 'application/json;charset=UTF-8'
          },
          body: JSON.stringify(itemToSave)
      })
      .then(response => {
        if(response.ok){
          return response.json();
        } else {
          throw new Error("Item saved successfully");
        }
      })
      .then((response) => {
        this.props.store.dispatch({
          type: "ITEMCHANGE",
          item:response[0]
        });
        //this.setState(itemToSave);
      });
    }
  }

  changeName(e){
    this.setState({name:e.target.value});
  }
  changeDescription(e){
    this.setState({description:e.target.value});
  }

  render() {

    if (this.state.id >-1)
      return (
      <div id="edititem">
        <table className="pure-table">
        <tbody>
          <tr>
            <td>Name</td>
            <td><input type="text" value={this.state.name} onChange={this.changeName.bind(this)} /></td>
          </tr>
          <tr>
            <td>Description</td>
            <td><input type="text" value={this.state.description} onChange={this.changeDescription.bind(this)} /></td>
          </tr>
          <tr>
            <td></td>
            <td><input type="button" value="Save" onClick={this.save.bind(this)}/></td>
          </tr>
        </tbody>
        </table>
      </div>
      )
    else
      return("");
  }


}

export default EditItem;
