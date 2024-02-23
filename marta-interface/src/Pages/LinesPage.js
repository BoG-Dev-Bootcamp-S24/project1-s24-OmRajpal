import {useState, useEffect} from 'react';
import TrainList from '../Components/TrainList';


export default function LinesPage() {
    let [currColor, setCurrColor] = useState('gold');
    let [currStations, setCurrStations] = useState([]);
    let [trainData, setTrainData] = useState([]);
    let [availableStations, setAvailableStations] = useState([]);
    let [filteredTrainData, setFilteredTrainData] = useState([]);
    let [loading, setLoading] = useState(true);

    const URL = 'https://midsem-bootcamp-api.onrender.com/arrivals/blue';

    const stationsURL = 'https://midsem-bootcamp-api.onrender.com/stations/blue';
  
    useEffect(() => {
      const fetchData = async () => {
          setLoading(true);
          try {
              const response = await fetch(URL);
              const data = await response.json();
              setTrainData(data);

              const response2 = await fetch(stationsURL);
              const dataStations = await response2.json();
              setAvailableStations(dataStations);
          } catch (error) {
              console.error("Error fetching train data:", error);
          } finally {
              setLoading(false);
          }
      };
      fetchData();
  }, [currColor]);

  useEffect(() => {
    setLoading(true);
    const filteredData = trainData.filter((train) => {
        const formattedTrainStation = train.STATION.toLowerCase();
        return formattedTrainStation && currStations.some(
            station => formattedTrainStation.includes(station.toLowerCase())
        );
    });
    setFilteredTrainData(filteredData);
    setLoading(false);
}, [currStations, trainData]);


const handleStationToggle = (station) => {
  if (currStations.includes(station)) {
      setCurrStations(currStations.filter((selectedStation) => selectedStation !== station));
  } else {
      setCurrStations([...currStations, station]);
  }
};
    return (
        <div className="flex">
            <div className="p-4 w-1/4 bg-gray-200">
                <h3 className="text-lg font-semibold mb-4">Select Stations:</h3>
                {availableStations.map((station) => (
                    <button
                        key={station}
                        onClick={() => handleStationToggle(station)}
                        className={`py-2 px-4 mb-2 rounded ${currStations.includes(station) ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                    >
                        {station}
                    </button>
                ))}
            </div>
            {
                loading ? <p>Give us some time to load your answers!</p> : 
                <div className="w-3/4">
                {/* <NavBar color={currColor} data={stationData} /> */}
                {console.log(filteredTrainData)}
                {filteredTrainData != null ? (<TrainList color={currColor} data={filteredTrainData} />) : 'Please select a station'}
            </div>
            }
        </div>
    );
}