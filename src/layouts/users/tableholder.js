import React from "react"
import ContentLoader from "react-content-loader"

const Holder = (props) => (
  <ContentLoader 
    speed={.5}
    width={1200}
    height={260}
    viewBox="0 0 1200 260"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="22" y="53" rx="3" ry="3" width="214" height="20" /> 
    <rect x="22" y="116" rx="3" ry="3" width="214" height="20" /> 
    <rect x="22" y="22" rx="3" ry="3" width="214" height="20" /> 
    <rect x="22" y="180" rx="3" ry="3" width="214" height="20" /> 
    <rect x="299" y="269" rx="3" ry="3" width="214" height="20" /> 
    <rect x="22" y="84" rx="3" ry="3" width="214" height="20" /> 
    <rect x="22" y="147" rx="3" ry="3" width="214" height="20" /> 
    <rect x="22" y="213" rx="3" ry="3" width="214" height="20" /> 
    <rect x="287" y="265" rx="3" ry="3" width="214" height="20" /> 
    <rect x="10" y="263" rx="3" ry="3" width="214" height="20" /> 
    <rect x="256" y="51" rx="3" ry="3" width="214" height="20" /> 
    <rect x="256" y="114" rx="3" ry="3" width="214" height="20" /> 
    <rect x="256" y="20" rx="3" ry="3" width="214" height="20" /> 
    <rect x="256" y="178" rx="3" ry="3" width="214" height="20" /> 
    <rect x="256" y="82" rx="3" ry="3" width="214" height="20" /> 
    <rect x="256" y="145" rx="3" ry="3" width="214" height="20" /> 
    <rect x="256" y="211" rx="3" ry="3" width="214" height="20" /> 
    <rect x="490" y="49" rx="3" ry="3" width="214" height="20" /> 
    <rect x="490" y="112" rx="3" ry="3" width="214" height="20" /> 
    <rect x="490" y="18" rx="3" ry="3" width="214" height="20" /> 
    <rect x="490" y="176" rx="3" ry="3" width="214" height="20" /> 
    <rect x="490" y="80" rx="3" ry="3" width="214" height="20" /> 
    <rect x="490" y="143" rx="3" ry="3" width="214" height="20" /> 
    <rect x="490" y="209" rx="3" ry="3" width="214" height="20" />
  </ContentLoader>
)

export default Holder

