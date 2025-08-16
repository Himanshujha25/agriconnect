export default function Animation({ height = 300 }) {
  return (
    <div
      style={{
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#e6f5e6",
        borderRadius: "10px",
        padding: "20px",
        fontSize: "1.2rem",
        color: "#2d6a4f",
        fontWeight: "bold"
      }}
    >
      🌱 Fresh from the Farm
    </div>
  );
}
