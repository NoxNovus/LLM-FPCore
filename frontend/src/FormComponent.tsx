import React, { useState, ChangeEvent } from 'react';

const ParagraphSender: React.FC = () => {
  const [paragraph, setParagraph] = useState<string>('');

  const sendParagraphToBackend = async () => {
    try {
      const response = await fetch('http://localhost:5000/ping', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ paragraph })
      });
      if (response.ok) {
        console.log('Paragraph sent successfully');
      } else {
        console.error('Failed to send paragraph');
      }
    } catch (error) {
      console.error('Error sending paragraph:', error);
    }
  };

  const handleParagraphChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setParagraph(event.target.value);
  };

  return (
    <div>
      <textarea 
        placeholder="Input your expression here..." 
        value={paragraph} 
        onChange={handleParagraphChange} 
        rows={5} 
        cols={50} 
      />
      <button onClick={sendParagraphToBackend}>Send Paragraph</button>
    </div>
  );
};

export default ParagraphSender;
