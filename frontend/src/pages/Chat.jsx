import { useLocation, useParams } from 'react-router-dom';

const Chat = () => {
  const { chatId } = useParams();
  const location = useLocation();
  const receiverName = location.state?.receiverName || "User";

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Chat with {receiverName}</h2>
      <p>Chat ID: {chatId}</p>
      {/* Render messages here */}
    </div>
  );
};

export default Chat;
