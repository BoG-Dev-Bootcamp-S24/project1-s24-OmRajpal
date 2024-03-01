import Train from "./Train";

export default function TrainList({data}) {
    let trainArray = data.map((data) => (
        <Train data={data} />
    ));
    console.log(trainArray);

    return (
        <div>
            {trainArray}
        </div>
    );
}