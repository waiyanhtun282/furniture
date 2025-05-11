import React from "react"
import Dompurify from "dompurify";
 interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
    content:string;
 }
function RichTextRender({content,className}:Props) {
    const santizeContent =Dompurify.sanitize(content);
  return (
    <div dangerouslySetInnerHTML={{__html:santizeContent}} className={className}/>
  )
}

export default RichTextRender