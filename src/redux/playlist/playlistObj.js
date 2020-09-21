var PlaylistMaker = function(array = []) {
  this.head = null;
  let last;
  array.forEach(item => {
    if (!this.head) {
      this.head = new PlaylistNode(item);
      last = this.head;
    } else {
      last.next = new PlaylistNode(item, last);
      last = last.next;
    }
  })
}

const PlaylistNode = function(obj, prev = null, next = null) {
  this.uri = `https://flac.reamixed.com/${obj.contestid}/${obj.audiouri}`,
  this.name = 'Mix #' + obj.mixnum,
  this.mixnum = obj.mixnum,
  this.next = next,
  this.prev = prev
}

PlaylistMaker.prototype.moveNode = function(mover, newspot) {
  if (mover === newspot || mover.next === newspot) return;
  //take mover out
  if (mover.prev) {
    mover.prev.next = mover.next
  } else {
    this.head = mover.next
  }
  if (mover.next) mover.next.prev = mover.prev
  //place in front of newspot
  if (newspot.prev) {
    newspot.prev.next = mover
  } else {
    this.head = mover;
    mover.prev = null
  }
  mover.prev = newspot.prev
  newspot.prev = mover;
  mover.next = newspot;
}

PlaylistMaker.prototype.deleteNode = function(node) {
  if (this.head === node) {
    this.head = this.head.next;
    this.head.prev = null;
  } else {
    node.prev.next = node.next;
    if(node.next) node.next.prev = node.prev;
  }
}

PlaylistMaker.prototype.addNode = function(obj) {
  let node = this.head;
  if (!this.head) {
    this.head = new PlaylistNode(obj);
    return;
  }
  while (node && node.next) {
    node = node.next;
  }
  node.next = new PlaylistNode(obj, node);
}

// var test1=[{audiouri: 'a.flac', contestid: 202008, mixnum: 1 }, {audiouri: 'b.flac', contestid: 202008, mixnum: 2 }, {audiouri: 'C.flac', contestid: 202008, mixnum: 3 }]
// var newPL = new PlaylistMaker(test1);
// newPL.addNode({audiouri: 'd.flac', contestid: 202008, mixnum: 4 })
// newPL.moveNode(newPL.head.next.next, newPL.head)
// newPL.deleteNode(newPL.head)
// console.log(newPL.head.next.prev);

// var test1=[{audiouri: 'a.flac', contestid: 202008, mixnum: 1 }, {audiouri: 'b.flac', contestid: 202008, mixnum: 2 }]
// var newPL = new PlaylistMaker(test1);
// newPL.moveNode(newPL.head.next, newPL.head)
// console.log(newPL);

module.exports =  {PlaylistMaker, PlaylistNode} ;