export default function jsfxParser(jsfxs) {
  const jsfxNames = [];
  jsfxs.forEach((track, trackNum) => {
    track.forEach((jsfx) => {
      jsfxNames.push({
        track: trackNum + 1,
        name: jsfx,
      });
    });
  });
  return jsfxNames;
}
