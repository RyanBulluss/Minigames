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
        "#a44" :
        brick.hitsRemaining === 2 ?
        "#44a" :
        brick.hitsRemaining === 1 ?
        "#4a4" : "",
      }}
    ></div>
  );
}
