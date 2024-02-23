
export default function Train(data) {
    let currColor = '#0f0f0f';
    if (data.data.LINE === 'GOLD') {
        currColor = '#FFD700';
    }
    if (data.data.LINE === 'RED') {
        currColor = '#FF0000';
    }
    if (data.data.LINE === 'BLUE') {
        currColor = '#0000FF';
    }
    if (data.data.LINE === 'GREEN') {
        currColor = '#00FF00';
    }
    let stationData = data.data.STATION + ' -> ' + data.data.DESTINATION;
    let line = <div className='flex container rounded-md bg justify-center px-1' style={{ backgroundColor: currColor}}>{data.data.LINE}</div>
    let sColor = data.data.DELAY === "T0S" ? '#00ff00' : '#ff0000';

    return (
        <div className='flex flex-row p-4 border-t border-b border-black'>
            <h1 className='flex font-normal font-serif text-5xl'>
                M
            </h1>
            <div className='flex flex-col px-3 mx-6'>
                <h2 className='flex text-lg'>
                    {stationData}
                </h2>
                <div className='flex flex-row'>
                    <div className='flex'>
                        {line}
                    </div>
                    <div className='flex px-4' style={{ color: sColor }}>
                        {data.data.DELAY === "TOS" ? 'On Time' : 'Delayed'}
                    </div>
                </div>
            </div>
            <div className='flex mx-10 text-green-500 align-middle'>
                {data.data.WAITING_TIME}
            </div>
        </div>
    )
}