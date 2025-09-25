import './App.css';
import Header from './Header';
import SessionsList from './SessionsList';
import ChatWindow from './ChatWindow';
import { useState } from 'react';

const Playground = () => {
  const [modelName, setModelName] = useState('Gemini');
  const [sessionID, setSessionID] = useState(0);

//   return (
//     <div className="flex h-screen">
//       {/* Left column */}
//       <div className="w-1/4 overflow-y-auto border-r">
//         <SessionsList modelName={modelName} setSessionID={setSessionID} />
//       </div>

//       {/* Right column */}
//       <div className="w-3/4 flex flex-col">
//         {/* Header fixed height */}
//         <div className="h-16 border-b">
//           <Header setModelName={setModelName} modelName={modelName} />
//         </div>

//         {/* Chat window fills remaining height */}
//         <div className="flex-1 overflow-y-auto">
//           <ChatWindow modelName={modelName} sessionIDFromList={sessionID} />
//         </div>
//       </div>
//     </div>
//   );
// };


  return (
    <div className="flex h-screen w-full justify-content-center bg-gray-50 dark:bg-gray-600">
      {/* Left column */}
      <div className="w-1/4 overflow-y-auto border-r">
        <SessionsList modelName={modelName} setSessionID={setSessionID} />
      </div>

      {/* Right column */}
      <div className="w-3/4 flex flex-col">
        {/* Header fixed height */}
        <div className="h-16 mb-2">
          <Header setModelName={setModelName} modelName={modelName} />
        </div>

        {/* Chat window fills remaining height */}
        <div className="flex-1 overflow-y-auto">
          <ChatWindow modelName={modelName} sessionIDFromList={sessionID} />
        </div>
      </div>
    </div>
  );
};

export default Playground;
