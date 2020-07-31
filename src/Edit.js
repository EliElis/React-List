import React from 'react';

export default class Editable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: props.name,
            value: props.value||'',
            editClassName: props.editClassName,
            edit: false,
            id: props.dataId
        }
    }
    edit() {
        this.setState({edit:this.edit!==false})
    }
    handleEdit(){
        let val = this.state.value, id = this.props.dataId;
        this.props.onEdit({title: val, id: id});
    }
    render() {
        let output;
        if(this.state.edit===true){
            output = (
                <input
                    name={this.state.name}
                    type='text'
                    value={this.state.value}
                    className={this.state.editClassName}
                    autoFocus
                    onFocus={event=>{
                        const value = event.target.value;
                        event.target.value = '';
                        event.target.value = value;
                        this.setState({backup:this.state.value})
                    }}
                    onChange={event=>{
                        this.setState({value:event.target.value})
                    }}
                    onBlur={()=>{
                        this.setState({edit:false}, ()=>{
                            this.handleEdit()
                        });

                    }}
                />
            )
        }else{
            output = (<span onDoubleClick={()=>{
                this.setState({edit:this.state.edit!==true})
            }}>
        {this.state.value}
      </span>)
        }
        return output;
    }
}