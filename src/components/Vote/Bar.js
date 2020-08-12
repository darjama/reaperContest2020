import React from "react";

export default function Bar(props) {
  const { duration, curTime, onTimeUpdate } = props;

  const curPercentage = (curTime / duration) * 100;

  function formatDuration(duration) {
    const minutes = Math.trunc(duration / 60).toString();
    const seconds = '0' + Math.floor(duration - minutes * 60).toString();
    return  minutes + ':' + seconds.substring(seconds.length - 2);
  }

  function calcClickedTime(e) {
    const clickPositionInPage = e.pageX;
    const bar = document.querySelector(".bar__progress");
    const barStart = bar.getBoundingClientRect().left + window.scrollX;
    const barWidth = bar.offsetWidth;
    const clickPositionInBar = clickPositionInPage - barStart;
    const timePerPixel = duration / barWidth;
    return timePerPixel * clickPositionInBar;
  }

  function handleTimeDrag(e) {
    onTimeUpdate(calcClickedTime(e));

    const updateTimeOnMove = eMove => {
      onTimeUpdate(calcClickedTime(eMove));
    };

    document.addEventListener("mousemove", updateTimeOnMove);

    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", updateTimeOnMove);
    });
  }

  return (
    <div className="bar">
      <span className="bar__time">{formatDuration(curTime)}</span>
      <div
        className="bar__progress"
        style={{
          background: `linear-gradient(to right, orange ${curPercentage}%, white 0)`
        }}
        onMouseDown={e => handleTimeDrag(e)}
      >
        <span
          className="bar__progress__knob"
          style={{ left: `${curPercentage - 2}%` }}
        />
      </div>
      <span className="bar__time">{formatDuration(duration)}</span>
    </div>
  );
}
