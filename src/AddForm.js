import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default class AddForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        if(this.state.value.length > 0) {
            let val = this.state.value;
            this.props.onAdd(val);
            this.setState({value: ''});
        }
    }
    render() {
        return(
        <Form onSubmit={this.handleSubmit} className='form'>
                    <Form.Control placeholder="Enter item name" type="text" value={this.state.value} onChange={this.handleChange}/>
                    <Button variant="primary" type="submit">Submit</Button>
        </Form>
        )
}
}