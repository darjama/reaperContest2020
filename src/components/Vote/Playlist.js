import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { playLink, createPlaylist, moveTrack, deleteTrack, shareLink, shareLink2, rerenderNow} from '../../redux/playlist/playlistActions';
import { RiPlayFill, RiDeleteBin6Line } from 'react-icons/ri';
import {Container, ListGroup, Button} from 'react-bootstrap'
import { withRouter} from 'react-router-dom'

function Playlist({entries, prefix, random}) {

  const details = useSelector(state => state.contestDetailReducer);
  const playlist = useSelector(state => state.playlistReducer);
  const mover = useSelector(state => state.shareNodeReducer);
  const newpos = useSelector(state => state.shareNodeReducer2);
  const rerender = useSelector(state => state.rerenderReducer);
  const dispatch = useDispatch();
  const [renderedList, setRenderedList] = useState();


  useEffect(()=> {
    if (random) {
      dispatch(createPlaylist(randomize(entries), prefix));
    } else {
      dispatch(createPlaylist(entries, prefix));
    }

    dispatch(rerenderNow());
  },[entries, prefix])

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
      <ListGroup.Item as="div" key={'a' + currentNode.mixnum+'-'+ count}
      onDragStart={() => dispatch(shareLink(currentNode))}
      onDragOver={(event) => event.preventDefault()}
      onDrop={() => dispatch(shareLink2(currentNode))}
      draggable
      className='dark-list-item'>
        <div className='playlist-holder'>
          <div className='playlist-name'>
            &#x2630; {currentNode.name}
          </div>

          <div className='playlist-buttons'>
            <Button className='player-button' title="Play Now" alt="Play Now" onClick={() => dispatch(playLink(currentNode))} alt="play"><RiPlayFill /></Button>
            <Button className='player-button'  title="Remove" alt="Remove" onClick={() => {dispatch(deleteTrack(currentNode)); dispatch(rerenderNow())}} alt="delete"><RiDeleteBin6Line /></Button>
          </div>

        </div>

        </ListGroup.Item>
        );
      node = node.next;
      count++
    }
    return <>{result}</>
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
    <ListGroup className="playlistgroup">
      <div >
        <ListGroup.Item className='dark-list-item'>

          <h1 style={{textAlign:'center'}}>PLAYLIST</h1>
          <div className='player-button-holder'>
            <Button className='player-button' onClick={() => dispatch(playLink(playlist.head))}>Play</Button>
            <Button className='player-button' onClick={() => {dispatch(createPlaylist([])); dispatch(rerenderNow())}}>Clear</Button>
            <Button className='player-button' onClick={() => {dispatch(createPlaylist(entries)); dispatch(rerenderNow())}}>Reset</Button>
          </div>
        </ListGroup.Item>
        {renderedList}
      </div>
    </ListGroup>
  )
}

export default withRouter(Playlist);
