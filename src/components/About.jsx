import React from 'react'

function About() {
  const [isOpen,setState]=React.useState(false)
  const handleClick=()=>{
    setState(!isOpen)
  }
  const selectContainerStyle = {
    position: 'relative',
    display: 'inline-block',
  };

  const selectStyle = {
    appearance: 'none', // Removes the default dropdown arrow
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
    width: '150px',
    position: 'relative',
    zIndex: 1, // To make sure it stays above the arrow
  };

  const headlineStyle = {
    position: 'absolute',
    top: '50%',
    left: '10px',
    transform: 'translateY(-50%)',
    fontSize: '16px',
    color: '#888',
    pointerEvents: 'none', // Make it non-clickable
    zIndex: 2, // Ensures the headline is visible above the select
  };

  const arrowStyle = {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
    fontSize: '12px',
    color: '#888',
    zIndex: 1,
  };

  return (
    <div style={{margin:"100px"}}>
<button onClick={handleClick}>click</button>
<div
        style={{
          width: isOpen ? "300px" : "0px",
          height: isOpen ? "300px" : "0px",
          opacity: isOpen ? 1 : 0,
          overflow: "hidden",
          backgroundColor: "lightblue",
          transition: "all 0.5s ease"
        }}
      >
      <div style={selectContainerStyle}>
      {/* The headline ("Category") */}
      <div style={headlineStyle}>Category</div>

      {/* The select dropdown */}
      <select style={selectStyle}>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
      </select>

      {/* Custom dropdown arrow */}
      <div style={arrowStyle}></div>
    </div>
      </div>
      <div style={{}}></div>
    </div>
  )
}

export default About