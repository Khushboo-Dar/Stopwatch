import { useState, useEffect, useRef } from "react";

const Stopwatch = () => {

    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(0);
    const [laps, setLaps] = useState([]);
    const intervalRef = useRef(null);

    const formatTime = (ms) => {
        const date = new Date(ms);
        return date.toISOString().substring(11, 22);
    };


    const toggleRunning = () => {

        setIsRunning(!isRunning);

    };


    const reset = () => {
        clearInterval(intervalRef.current);
        setIsRunning(false);
        setTime(0);
        setLaps([]);
    };

    const recordLap = () => {

        setLaps([...laps, time]);


    };
    useEffect(() => {
        if (isRunning) {
            const startTime = Date.now() - time;
            intervalRef.current = setInterval(() => {
                setTime(Date.now() - startTime);
            }, 10);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [isRunning]);



    return(
        <div className='max-w-md mx-auto p-6 bg-gray-800 rounded-xl shadow-lg'>
            <h1 className="text-3xl font-bold text-center text-white mb-6">Stopwatch</h1>

            <div className="text-5xl font-mono text-center text-green-400 mb-8">
                {formatTime(time)}
            </div>

            <div className="flex justify-center space-x-4 mb-8">
                <button
                onClick={toggleRunning}
                className={`px-6 py-2 rounded-full text-white font-semibold ${isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                >
                    {isRunning ? 'Stop' : 'Start'} 


                </button>

                <button
                 onClick={reset}
                 className="px-6 py-2 b-gray-600 hover:bg-gray-700 text-white font-semibold rounded-full"
                >
                    Reset
                </button>
                
                <button
                onClick={recordLap}
                disabled={!isRunning}
                className={`px-6 py-2 rounded-full text-white font-semibold ${isRunning? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}`}

                >
                    Lap
                </button>
            </div> 
 {laps.length > 0 && (
        <div className="bg-gray-700 rounded-lg p-4">
          <h2 className="text-xl font-semibold text-white mb-2">Laps</h2>
          <ul className="divide-y divide-gray-600">
            {laps.map((lap, index) => (
              <li key={index} className="py-2 flex justify-between">
                <span className="text-gray-300">Lap {index + 1}</span>
                <span className="font-mono text-green-400">{formatTime(lap)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Stopwatch;


