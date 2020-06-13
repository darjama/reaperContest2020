import React, {useState, useEffect} from 'react';
import {ListGroup} from 'react-bootstrap';


function Vote() {
  useEffect(() => {
    setTop3([...top3])
  }, [top3]);
  const [top3, setTop3] = useState([null,null,null]);
  const [count, setCount] = useState(0);
  const newVote = (event, index) => {
    let newVal = event.dataTransfer.getData("mix");
    let oldIndex = top3.indexOf(newVal);
    console.log(newVal, oldIndex)
    if (oldIndex === index) return;
    let newTop3 = [...top3];
    if (oldIndex > -1) newTop3.splice(oldIndex, 1);
    if (newTop3[index] === null) {
      newTop3[index] = event.dataTransfer.getData("mix");
    } else {
      newTop3.splice(index, 0, newVal);
    }
    newTop3.splice(3, 1);
    setTop3(top3 => ([...newTop3]));
    console.log(top3);
  }
  const dragStart = (event, mixName) => {
    event.dataTransfer.setData("mix", mixName)
  }
  const dragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  }
   return (
    <div>
      <ListGroup defaultActiveKey="#link2">
        <ListGroup.Item onDragOver={(event) => event.preventDefault()} onDrop={(event) => newVote(event, 0)}>
          Gold: {top3[0]}
        </ListGroup.Item>
        <ListGroup.Item onDragOver={(event) => event.preventDefault()} onDrop={(event) => newVote(event, 1)}>
          Silver:  {top3[1]}
        </ListGroup.Item>
        <ListGroup.Item onDragOver={(event) => event.preventDefault()} onDrop={(event) => newVote(event, 2)}>
          Bronze: {top3[2]}
        </ListGroup.Item>
      </ListGroup>

      <ListGroup defaultActiveKey="#link1">
        <ListGroup.Item onDragStart={(event) => dragStart(event, 'Mix 1')} draggable>
          Mix 1
        </ListGroup.Item>
        <ListGroup.Item onDragStart={(event) => dragStart(event, 'Mix 2')}draggable>
          Mix 2
        </ListGroup.Item>
        <ListGroup.Item onDragStart={(event) => dragStart(event, 'Mix 3')}draggable>
          Mix 3
        </ListGroup.Item>
      </ListGroup>
      <div onClick={() => setCount(count + 1)}>{count}</div>
    </div>
  );
}
export default Vote;