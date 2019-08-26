import React from 'react';

const Fade = ({zIndex = 6, clearFade}) => {
  return (<div style={{zIndex: zIndex}} onClick={clearFade} className="faded-bg"/>);
};
export default Fade;
