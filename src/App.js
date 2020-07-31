import React from 'react';
import './App.css';
import List from './List';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
function App() {
  return (
    <main className="App">
        <Container>
            <Row>
                <Col>
                     <h1>Items List</h1>
                </Col>
            </Row>
      <List />
        </Container>
    </main>
  );
}

export default App;
