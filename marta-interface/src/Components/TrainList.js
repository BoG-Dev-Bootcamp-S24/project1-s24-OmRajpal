import Train from "./Train";

export default function TrainList({ currColor, data}) {
    let trainArray = data.map((data) => (
        <Train currColor={currColor} data={data} />
    ));
    console.log(trainArray);

    return (
        <div>
            {trainArray}
        </div>
    );
}