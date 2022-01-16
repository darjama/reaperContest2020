export default function vstParser(vsts) {
  try {
    const vstFiles = [];
    const impulses = [];
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
          encoded += line.toString('base64');
          lineIndex++;
          line = vst[lineIndex].trim();
        }
        const file = vstLine1[2].split('.')[0];
        if (encoded && file === 'reaverb') {
          const impulseSplit = encoded.split('\0');
          while (impulseSplit.length) {
            const possible = impulseSplit
              .pop()
              .replace(/\\/g, '/')
              .split(`/`)
              .slice(-1)[0];
            if (possible.length > 4 && possible.includes('.')) {
              impulses.push(possible);
            }
          }
        }
        vstFiles.push({
          track: trackNum || 'master',
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
  } catch (err) {
    alert(err);
    return [];
  }
}
