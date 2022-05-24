import React, { useRef, useEffect } from "react";
import * as d3 from 'd3'
const BarDiag = ({ width, height, data, onClick }) => {
    // initilizing the reference hook for svg tag
    const ref = useRef();
    // rendering the barDiag container/svg with width and height when loads for first time
    useEffect(() => {
        const svg = d3.select(ref.current)
            .attr("width", width)
            .attr("height", height)
            .style("border", "2px solid #0009")
    }, []);
    // calling draw function when data changes or updates
    useEffect(() => {
        draw();
    }, [data]);

    const draw = () => {
        const svg = d3.select(ref.current);
        var selection = svg.selectAll("rect").data(data);
        // calculating the bar height or yaxis
        var yScale = d3.scaleLinear()
            .domain([0, d3.max(data)])
            .range([0, height - 100]);
        // setting the 300ms transition,y and height to all rects
        selection
            .transition().duration(300)
            .attr("height", (d) => yScale(d))
            .attr("y", (d) => height - yScale(d))

        selection
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * 45)
            .attr("y", (d) => height)
            .attr("width", 40)
            .attr("height", 0)
            .attr("fill", "cyan")
            .transition().duration(300)
            .attr("height", (d) => yScale(d))
            .attr("y", (d) => height - yScale(d))

        selection
            .exit()
            .transition().duration(300)
            .attr("y", (d) => height)
            .attr("height", 0)
            .remove()
    }


    return (
        <div className="chart" onClick={ onClick }>
            <svg ref={ ref }>
            </svg>
        </div>

    )

}

export default BarDiag;
