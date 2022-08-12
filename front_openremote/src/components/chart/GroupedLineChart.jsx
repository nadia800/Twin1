import ReactApexChart from 'react-apexcharts';
import React, {
    useState,
    useEffect
} from 'react';
import { useDispatch } from "react-redux";

//API Innovatwin
import { deleteChart } from '../../actions/delete/delete';

//Icons
import { MdOutlineAutoDelete } from "react-icons/md";
import { IconContext } from "react-icons";

function GroupedLineChart(props) {
    const data = props.chart.data
    const series = []
    var dataListX = [];
    for (var i in data.data) {
        var dataListY = [];
        for (var j in data.data[i].values) {
            if (data.data[i].values[j].y) {
                dataListY.push(Math.round(data.data[i].values[j].y * 100) / 100);
                const dateObject = props.chart.timeFrame ? (new Date(data.data[0].values[j].x).toDateString()).substring(0, 15) : (new Date(data.data[0].values[j].x).toTimeString()).substring(0, 5)
                dataListX.push(dateObject)
            }
        }
        series.push({ name: data.data[i].attributeName, data: dataListY })
    }


    const [options, useOptions] = useState({
        chart: {
            height: 400,
            type: 'line',
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        title: {
            text: data.data[0].attributeName,
            align: 'left'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        xaxis: {
            categories: dataListX
        }
    })
    const dispatch = useDispatch();
    const handleRemoveChart = async () => {
        await dispatch(deleteChart(props.chart.chartId))
            .then(data => {
                //Delete Insight where id = chartId
                console.log(data.message)
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div className="chart">
            <div style={{
                marginLeft: "20px"
            }}>
                <div style={{
                    display: "flex"
                }}>
                    <div style={{
                        fontSize: "20px",
                        fontFamily: 'Rubik',
                        marginTop: "5px",
                        flex: "1"
                    }}>{props.chart.chartName}</div>
                    <IconContext.Provider value={{ color: "#4ABED9", size: 25 }}>
                        <div>
                            <MdOutlineAutoDelete style={{
                                flex: "2",
                                marginTop: "5px"
                            }} onClick={() => handleRemoveChart()} />
                        </div>
                    </IconContext.Provider>
                </div>
                <div style={{
                    fontSize: "15px",
                    fontFamily: 'Rubik',
                }}>{props.categorie}</div>
                <div style={{
                    fontSize: "15px",
                    fontFamily: 'Rubik',
                    color: "#855CF8"
                }}>Time Frame : {props.chart.timeFrame}</div>
            </div>
            <div id="chart">
                <ReactApexChart options={options} series={series} type="line" height={280} />
            </div>
        </div>
    );
}

export default GroupedLineChart;