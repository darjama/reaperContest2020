import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { playLink, createPlaylist, moveTrack, deleteTrack, shareLink, shareLink2, rerenderNow} from '../../redux/playlist/playlistActions';
import {Container, ListGroup, Button} from 'react-bootstrap'

function Playlist({entries}) {

  const details = useSelector(state => state.contestDetailReducer);
  const playlist = useSelector(state => state.playlistReducer);
  const mover = useSelector(state => state.shareNodeReducer);
  const newpos = useSelector(state => state.shareNodeReducer2);
  const rerender = useSelector(state => state.rerenderReducer);
  const dispatch = useDispatch();
  const [renderedList, setRenderedList] = useState();


  useEffect(()=> {
    dispatch(createPlaylist(randomize(entries)));
    dispatch(rerenderNow());
  },[entries])

  const randomize = function(array) {
    const randnums = [];
    array.forEach(a => randnums.push([Math.random(), a]))
    randnums.sort((a,b) => (a[0] - b[0]));
    return randnums.map(a => a[1])
  }

  const renderList = function(playlist) {
    let result = [];
    let node = playlist.head;
    let count = 1
    while (node) {
      const currentNode = node;
      result.push(
      <ListGroup.Item key={'a' + currentNode.mixnum+'-'+ count}
      onDragStart={() => dispatch(shareLink(currentNode))}
      onDragOver={(event) => event.preventDefault()}
      onDrop={() => dispatch(shareLink2(currentNode))}
      variant='dark'
      draggable>
        <div className='playlist-holder'>
          <div className='playlist-name'>
            &#x2630; {currentNode.name}
          </div>

          <div className='playlist-buttons'>
            <Button className='player-button' onClick={() => dispatch(playLink(currentNode))}>Play</Button>
            <Button className='player-button' onClick={() => {dispatch(deleteTrack(currentNode)); dispatch(rerenderNow())}}>Remove</Button>
          </div>

        </div>

        </ListGroup.Item>
        );
      node = node.next;
      count++
    }
    return <ListGroup>{result}</ListGroup>
  }

  useEffect(() => {
    if (newpos){
      dispatch(moveTrack(mover, newpos));
      setRenderedList(renderList(playlist))
      dispatch(shareLink2(null));
    }
  },[newpos])

  useEffect(() => {
    setRenderedList(renderList(playlist))
    //console.log(playlist)
  }, [rerender])


  return (
  <div className="playlistgroup">
    <h1 style={{color: 'lightgrey', textAlign:'center'}}>PLAYLIST</h1>
    <div className='player-button-holder'>
      <Button className='player-button' onClick={() => dispatch(playLink(playlist.head))}>Play</Button>
      <Button className='player-button' onClick={() => {dispatch(createPlaylist([])); dispatch(rerenderNow())}}>Clear</Button>
      <Button className='player-button' onClick={() => {dispatch(createPlaylist(entries)); dispatch(rerenderNow())}}>Reset</Button>
    </div>

    <br/>
    {renderedList}
  </div>
  )
}

export default Playlist;
