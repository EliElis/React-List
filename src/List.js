import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Pagination from 'react-bootstrap/Pagination';
import Button from 'react-bootstrap/Button';
import { ReactSortable } from "react-sortablejs";
import AddForm from './AddForm';
import Editable from './Edit';

export default class myList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 1,
            offset: 0,
            data: [],
            perPage: 10,
            currentPage: 0,
            list2: [],
            edit: false,
            qwerty : '',
        };
        this.editMyElement = this.editMyElement.bind(this);
        this.addElement = this.addElement.bind(this);
    }
    rand(min = 1, max = 1000){
        let randomNum = Math.random() * (max - min) + min;
        return Math.round(randomNum);
    }

    getLocalStorageVal(key){
        let val = localStorage.getItem(key);
        return val === null? null : JSON.parse(val);
    }

    updateArray(arr){
        if(this.state.list) {
            this.state.list.splice(this.state.offset, this.state.perPage, ...arr);
            localStorage.setItem('list', JSON.stringify(this.state.list));
        }
    }

    deleteElement(index){
        this.state.list2.splice(index, 1) ;
        this.updateArray(this.state.list2);
        this.receivedData()
    }

    editMyElement(obj){
        if(this.state.list2) {
            let arr = this.state.list2;
            arr[obj.id].title = obj.title;
            arr[obj.id].id = this.state.list2[obj.id].id;

            this.state.list2.splice(obj.id, 1, arr[obj.id]) ;
            this.updateArray(this.state.list2);
            this.receivedData()

        }
    }

    maxElementId() {
        return this.state.list.reduce((max, el) => {
            return max < +el.id ? +el.id : max;
        }, 0);
    }

    addElement(title){
        let lastId = this.maxElementId(),
        newEl = {};
        newEl.id = +lastId + 1;
        console.log( newEl.id );
        newEl.title = title;
        this.state.list2.push(newEl);
        this.updateArray(this.state.list2);
        this.receivedData();
    }

    receivedData() {
        let list = this.getLocalStorageVal('list');
        if (list === null){
            list = [];
            for(let i = 0; i < 100; i++){
                list[i] = {};
                list[i].title = 'Random item: ' + this.rand();
                list[i].id = i;
            }
            localStorage.setItem('list', JSON.stringify(list));
        }

        const list2 = list.slice(this.state.offset, this.state.offset + this.state.perPage);
        this.setState({
            pageCount: Math.ceil(list.length / this.state.perPage),
            list2,
            list
        });
    }

    handlePageClick = (number) => {
        const selectedPage = +number - 1;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            active: selectedPage + 1,
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.receivedData()
        });
    };

    componentDidMount() {
        this.receivedData()
    }
    componentWillUpdate(nextProps, nextState){
        this.updateArray(nextState.list2);

    }
    render() {
        let active = this.state.active;
        let items = [], sortable;
        for (let number = 1; number <= this.state.pageCount; number++) {
            items.push(
                <Pagination.Item key={number} active={number === active} onClick={this.handlePageClick.bind(this, number)}>
                    {number}
                </Pagination.Item>,
            );
        }

        if(this.state.list2.length > 0){
            sortable = ( <ListGroup className="list" variant="flush"><ReactSortable
                list={this.state.list2}
                setList={ newState => this.setState({ list2: newState })}>
                {this.state.list2.map((item, i) => (
                    <ListGroup.Item key={'list2_' + item.id} className="list-item">
                        <Editable dataId={i} onEdit={this.editMyElement} value={item.title}></Editable>
                        <Button variant="danger" onClick={this.deleteElement.bind(this, i)}>Delete</Button>
                    </ListGroup.Item>
                ))}
            </ReactSortable></ListGroup>);
        }else{
            sortable = <p>Please wait...</p>;
        }

        return (
            <div>
                <AddForm onAdd={this.addElement}/>
                {sortable}
                <ListGroup>{this.state.postData}</ListGroup>
                    <Pagination>{items}</Pagination>
            </div>

        )
    }

}