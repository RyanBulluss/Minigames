export default function Brick({ brick }) {
  return (
    <div
      style={{
        position: "absolute",
        height: brick.height,
        width: brick.width,
        top: brick.y,
        left: brick.x,
        border: brick.hitsRemaining > 0 ? "solid black 1px" : "",
        background:
          brick.hitsRemaining === 3
            ? "linear-gradient(to top, #fe465c, #ce465c)"
            : brick.hitsRemaining === 2
            ? "linear-gradient(to top, #feca37, #ceaa37)"
            : brick.hitsRemaining === 1
            ? "linear-gradient(to top, #93e440, #93b440)"
            : "",
      }}
    ></div>
  );
}
