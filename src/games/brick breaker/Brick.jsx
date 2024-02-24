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
        background: brick.hitsRemaining === 3 ? 
        "blue" :
        brick.hitsRemaining === 2 ?
        "red" :
        brick.hitsRemaining === 1 ?
        "green" : "",
      }}
    ></div>
  );
}
