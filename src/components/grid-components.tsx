export const Line = ({ word }: { word: string }) => {
  return (
    <div>
      {word.split("").map((char, idx) => (
        <Square key={idx} char={char} />
      ))}
      {Array(5 - word.length)
        .fill("_")
        .map((char, idx) => (
          <Square key={idx} char={char} />
        ))}
    </div>
  );
};

export const Square = ({ char }: { char: string }) => {
  return (
    <div
      style={{
        border: "2px solid black",
        width: "30px",
        height: "30px",
        fontSize: "18px",
        margin: "2px", // Add spacing between boxes
        display: "inline-flex", // Allow boxes to be in same line
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {char}
    </div>
  );
};
