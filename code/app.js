const width = 800;
const height = 450;
const barWidth = 500;
const barHeight = 300;
const margin = { top: 30, right: 10, bottom: 50, left: 50 };

const choroplethDiv = d3.select("#choropleth");
const barChartDiv = d3.select("#bar-chart");
const yearSlider = d3.select("#year-slider");

// Load data and create the visualizations
Promise.all([
    d3.csv("temperal.csv"), // Replace with the URL of your CSV file
    d3.json("https://vega.github.io/vega-datasets/data/world-110m.json"),
]).then(([data, world]) => {
    const projection = d3.geoEquirectangular();
    const path = d3.geoPath().projection(projection);
    const color = d3.scaleSequential(d3.interpolateGreens);

    const svgChoropleth = choroplethDiv.append("svg").attr("width", width).attr("height", height);
    const svgBarChart = barChartDiv.append("svg").attr("width", barWidth).attr("height", barHeight);

    const countries = topojson.feature(world, world.objects.countries);

    // Choropleth
    function updateChoropleth(year) {
        const yearData = data.filter((d) => +d.Year === year);

        color.domain(d3.extent(yearData, (d) => +d.Production));

        const countryPaths = svgChoropleth.selectAll("path").data(countries.features);

        countryPaths
            .enter()
            .append("path")
            .attr("d", path)
            .attr("stroke", "white")
            .attr("stroke-width", 1)
            .on("mouseover", highlightBar)
            .on("mouseout", unhighlightBar)
            .merge(countryPaths)
            .attr("fill", (d) => {
                const country = yearData.find((c) => +c.Code === +d.id);
                return country ? color(country.Production) : "#ccc";
            });
    }

    // Bar chart
    function updateBarChart(year) {
        const yearData = data.filter((d) => +d.Year === year);

        const x = d3.scaleBand()
            .domain(yearData.map((d) => d.Entity))
            .range([margin.left, barWidth - margin.right])
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, d3.max(yearData, (d) => +d.Production)])
            .nice()
            .range([barHeight - margin.bottom, margin.top]);

        const xAxis = d3.axisBottom(x);
        const yAxis = d3.axisLeft(y);

        svgBarChart.append("g").attr("transform", `translate(0,${barHeight - margin.bottom})`).call(xAxis).attr("font-size", "10px").selectAll("text").attr("transform", "rotate(-45)").style("text-anchor", "end").attr("dx", "-0.5em").attr("dy", "-0.5em");

        svgBarChart.append("g").attr("transform", `translate(${margin.left},0)`).call(yAxis).attr("font-size", "10px");

        const bars = svgBarChart.selectAll(".bar").data(yearData);

        bars
            .enter()
            .append("rect")
            .classed("bar", true)
            .attr("x", (d) => x(d.Entity))
            .attr("y", (d) => y(+d.Production))
            .attr("width", x.bandwidth())
            .attr("height", (d) => barHeight - margin.bottom - y(+d.Production))
            .attr("fill", "#69b3a2")
            .on("mouseover", highlightCountry)
            .on("mouseout", unhighlightCountry)
            .merge(bars)
            .attr("x", (d) => x(d.Entity))
            .attr("y", (d) => y(+d.Production))
            .attr("width", x.bandwidth())
            .attr("height", (d) => barHeight - margin.bottom - y(+d.Production));

        bars.exit().remove();
    }

    function highlightBar(d) {
        const entity = d.properties.name;
        svgBarChart.selectAll(".bar").filter((d) => d.Entity === entity).attr("fill", "red");
    }

    function unhighlightBar(d) {
        const entity = d.properties.name;
        svgBarChart.selectAll(".bar").filter((d) => d.Entity === entity).attr("fill", "#69b3a2");
    }

    function highlightCountry(d) {
        const code = +d.Code;
        svgChoropleth.selectAll("path").filter((d) => +d.id === code).attr("stroke", "red").attr("stroke-width", 2);
    }

    function unhighlightCountry(d) {
        const code = +d.Code;
        svgChoropleth.selectAll("path").filter((d) => +d.id === code).attr("stroke", "white").attr("stroke-width", 1);
    }

    // Initialize the visualizations
    const initialYear = +yearSlider.property("value");
    updateChoropleth(initialYear);
    updateBarChart(initialYear);

    // Update the visualizations when the slider is changed
    yearSlider.on("input", function () {
        const year = +this.value;
        updateChoropleth(year);
        updateBarChart(year);
    });
});

