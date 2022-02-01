import React, { useState } from "react";
import MDTypography from "components/MDTypography";

function Messages({ tickets, sendMessage }) {
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const send = async () => {
      setSending(true);
      const sendmsg = await sendMessage(message);
      //console.log(sendmsg);
      setMessage('');
      setSending(false);
  }
  return (
    <div className="messagebox">
      <div className="message-head">
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          Support Ticket
        </MDTypography>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize"></MDTypography>
      </div>
      <div className="message-body">
        {tickets.map((ticket,index) => {
          return (
            <div className={`message-row ${ticket?.sender==="user"?"user":"admin"}`} key={index}>
              <div className="message">{ticket.body}</div>
            </div>
          );
        })}
        </div>
      <div className="message-actions">
        <textarea placeholder="Enter your message here" onChange={(e)=>setMessage(e.target.value)} value={message}>{message}</textarea>
        <button onClick={send} disabled={message.length===0}>
          {sending?<i className="fa fa-spinner fa-spin"></i> : <i className="fa fa-send"></i> }
        </button>
      </div>
    </div>
  );
}
export default Messages;
