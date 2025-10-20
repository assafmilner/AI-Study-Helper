import UploadPage from "./pages/UploadPage";

function App() {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f7f7f7",
        minHeight: "100vh",
      }}
    >
      <header
        style={{
          backgroundColor: "#1d4ed8",
          color: "white",
          padding: "1rem",
          textAlign: "center",
        }}
      >
        <h1>AI Study Helper</h1>
      </header>

      <main style={{ padding: "2rem" }}>
        <UploadPage />
      </main>
    </div>
  );
}

export default App;
