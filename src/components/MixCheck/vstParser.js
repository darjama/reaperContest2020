export default function vstParser(vsts) {
  const vstFiles = [];
  vsts.forEach((track, trackNum) => {
    let vstLine1 = [''];
    let quoteStarted = false;

    track.forEach((vst) => {
      //get file names
      for (let i = 0; i < vst[0].length; i++) {
        let lastIndex = vstLine1.length - 1;
        if (vst[0][i] === '"') {
          quoteStarted = !quoteStarted;
          if (vstLine1[lastIndex]) {
            vstLine1.push('');
          }
        } else if (!quoteStarted && vst[0][i] === ' ') {
          vstLine1.push('');
        } else {
          vstLine1[lastIndex] = vstLine1[lastIndex] + vst[0][i];
        }
      }

      // get binary data
      let lineIndex = 1;
      let line = vst[lineIndex].trim();
      let encoded = '';

      while (line[0] !== '>') {
        encoded += Buffer.from(line, 'base64') + '\n';
        lineIndex++;
        line = vst[lineIndex].trim();
      }
      const file = vstLine1[2].split('.')[0];
      const impulses = [];
      if (encoded && file === 'reaverb') {
        const impulseSplit = encoded.split('FILELDR');
        impulseSplit.shift();
        while (impulseSplit.length) {
          impulses.push(impulseSplit.shift().split(`/`).slice(-1)[0].trim());
        }
      }
      vstFiles.push({
        track: trackNum + 1,
        name: vstLine1[0],
        file,
        line1: vstLine1,
        data: encoded,
        full: vst,
        impulses,
      });
      vstLine1 = [''];
    });
  });
  return vstFiles;
}
