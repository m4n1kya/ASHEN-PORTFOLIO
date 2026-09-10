import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          position: "fixed", inset: 0,
          backgroundColor: "#0c0c0e",
          color: "rgba(255,255,255,0.7)",
          padding: "4rem 2rem",
          zIndex: 9999999,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: '"Mona Sans", sans-serif',
          textAlign: "center",
          gap: "1.5rem",
        }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 900, color: "#fff", letterSpacing: "-0.02em" }}>
            Something went wrong.
          </h1>
          <p style={{ fontSize: "1rem", opacity: 0.5, maxWidth: "480px" }}>
            An unexpected error occurred. Please try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: "1rem",
              padding: "0.75rem 2rem",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "8px",
              color: "#fff",
              fontSize: "0.9rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

