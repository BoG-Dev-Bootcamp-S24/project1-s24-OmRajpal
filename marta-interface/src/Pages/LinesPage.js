import {useState, useEffect} from 'react';
import TrainList from '../Components/TrainList';


export default function LinesPage(color) {
    const validatedColor = String(color);
    let [currColor, setCurrColor] = useState('gold');
    let [currStations, setCurrStations] = useState([]);
    let [trainData, setTrainData] = useState([]);
    let [availableStations, setAvailableStations] = useState([]);
    let [filteredTrainData, setFilteredTrainData] = useState([]);
    let [directions, setDirections] = useState([]);
    let [conditions, setConditions] = useState(['Arriving', 'Scheduled', 'Northbound', 'Southbound']);
    let [loading, setLoading] = useState(true);

    const allColors = ['gold', 'blue', 'red', 'green'];

    const URL = 'https://midsem-bootcamp-api.onrender.com/arrivals/' + currColor;

    const stationsURL = 'https://midsem-bootcamp-api.onrender.com/stations/' + currColor;
  
    useEffect(() => {
        console.log(validatedColor);
        setCurrColor(validatedColor);
        console.log(currColor);
    }, [validatedColor]);

    useEffect(() => {
      const fetchData = async () => {
          setLoading(true);
          try {
              const response = await fetch(URL);
              const data = await response.json();
              setTrainData(data);
            //   if (trainData[0].DIRECTION === 'S' || trainData[0].DIRECTION === 'N') {
            //     setDirections(['Northbound', 'Southbound'])
            //   } else {
            //     setDirections(['Eastbound', 'Westbound'])
            //   }

              const response2 = await fetch(stationsURL);
              const dataStations = await response2.json();
              setAvailableStations(dataStations);
              if(currStations == null) {
                setCurrStations(dataStations);
              }
          } catch (error) {
              console.error("Error fetching train data:", error);
          } finally {
              setLoading(false);
          }
      };

      fetchData();

      const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);

  }, [currColor]);

  useEffect(() => {
    setLoading(true);
    const filteredData = trainData.filter((train) => {
        const formattedTrainStation = train.STATION.toLowerCase();
        const arriving = train.WAITING_TIME === 'Arriving' ? true : false;
        // const direction = train.DIRECTION === directions[0] ? true : false;
        return ((formattedTrainStation && currStations.some(
            station => formattedTrainStation.includes(station.toLowerCase()))) && (arriving && conditions.includes('Arriving'))
        );
    });
    setFilteredTrainData(filteredData);
    setLoading(false);
}, [currStations, conditions, trainData]);


const handleStationToggle = (station) => {
  if (currStations.includes(station)) {
      setCurrStations(currStations.filter((selectedStation) => selectedStation !== station));
  } else {
      setCurrStations([...currStations, station]);
  }
};

const allConditions = ['Arriving', 'Scheduled', 'Northbound', 'Southbound'];

const handleConditionsToggle = (condition) => {
    if(conditions.includes(condition)) {
        setConditions(conditions.filter((selectedCondition) => selectedCondition !== condition));
    } else {
        setConditions([...conditions, condition]);
    }
};

const handleColorsToggle = (color) => {
    if(!currColor.includes(color)) {
        setCurrColor(color);
    }
};

const getFilterButtons = () => {
    const defaultFilters = ['Arriving', 'Scheduled'];

    // Add line-specific filters
    const lineSpecificFilters = (currColor === 'green' || currColor === 'blue') ? ['Eastbound', 'Westbound'] : ['Northbound', 'Southbound'];

    const allFilters = [...defaultFilters, ...lineSpecificFilters];

    const filterButtons = allFilters.map(filter => (
        <button
            key={filter}
            onClick={() => handleConditionsToggle(filter)}
            className={`flex flex-row rounded-md border px-3 py-1 border-black ${conditions.includes(filter) ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
        >
            {filter}
        </button>
    ));

    return filterButtons;
};

useEffect(() => {
    setLoading(true);

    const filteredData = trainData.filter((train) => {
        const formattedTrainStation = train.STATION.toLowerCase();
        const arriving = train.WAITING_TIME === 'Arriving';
        const scheduled = !arriving; 
        const northbound = train.DIRECTION === 'N';
        const southbound = train.DIRECTION === 'S';
        const eastbound = train.DIRECTION === 'E'; 
        const westbound = train.DIRECTION === 'W'; 

        return (
            formattedTrainStation &&
            currStations.some(station => formattedTrainStation.includes(station.toLowerCase())) &&
            (
                (arriving && conditions.includes('Arriving')) ||
                (scheduled && conditions.includes('Scheduled')) ||
                (northbound && conditions.includes('Northbound')) ||
                (southbound && conditions.includes('Southbound')) ||
                (eastbound && conditions.includes('Eastbound')) || 
                (westbound && conditions.includes('Westbound'))    
            )
        );
    });

    setFilteredTrainData(filteredData);
    setLoading(false);
}, [currStations, conditions, trainData]);

    return (
        <div className='flex flex-col'>
            <div className="flex flex-row justify-evenly border-grey border-t py-3">
                {allColors.map((color) => (
                <button
                    key={color}
                    onClick={() => handleColorsToggle(color)}
                    className={`flex flex-row border px-10 py-1 border-black`}
                    style={{ backgroundColor: color, color: 'white'}}
                >
                    {color}
                </button>
                ))}
            </div>
        <div className="flex justify-center font-bold text-4xl border border-t-gray-300 py-2">{currColor.toUpperCase()}</div>
        <div className="flex">
            <div className="flex-col p-4 w-1/5 bg-gray-200">
                <h3 className="text-lg font-semibold mb-4">Select Stations:</h3>
                <div className='flex flex-row justify-between'>
                    <button className='flex py-1 px-2 mb-2 rounded text-sm bg-gray-300 text-gray-700' onClick={() => setCurrStations(availableStations)}>
                        All Stations
                    </button>
                    <button className='flex py-1 px-2 mb-2 rounded text-sm bg-gray-300 text-gray-700' onClick={() => setCurrStations([])}>
                        Clear
                    </button>
                </div>
                {availableStations.map((station) => (
                    <button
                        key={station}
                        onClick={() => handleStationToggle(station)}
                        className={`flex w-48 py-2 px-4 mb-2 rounded ${currStations.includes(station) ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                    >
                        {station}
                    </button>
                ))}
            </div>
            {
                (loading && trainData.length === 0) ? <p>Give us some time to load your answers!</p> : 
            <div className="flex flex-col w-4/5">
                {console.log(filteredTrainData)}
                <div className="flex flex-row justify-evenly border-grey border-t py-3">
                    {getFilterButtons()}
                </div>
                {filteredTrainData != null ? (<TrainList data={filteredTrainData} />) : 'Please select a station'}
            </div>
            }
        </div>
        </div>
    );
}