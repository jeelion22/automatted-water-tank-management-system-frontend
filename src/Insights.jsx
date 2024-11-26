import React from "react";

const Insights = () => {
  return (
    <div style={{ width: "100%", height: "100vh", overflow: "hidden" }}>
      <iframe
        src="https://automatted-watertankmanagementsystem-innotrat-hackathon.streamlit.app/?embed=true"
        title="Streamlit App"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
      ></iframe>
    </div>
  );
};

export default Insights;
