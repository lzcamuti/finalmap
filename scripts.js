// Part one - bar chart

	// Select SVG from HTML and specify margins, width and height
	var barchart = d3.select("#part-one").selectAll("#bar-chart");
	
	var bcMargin = {top: 20, right: 100, bottom: 30, left: 100};
	
	var bcWidth = +barchart.attr("width") - bcMargin.left - bcMargin.right;
	
	console.log(bcWidth);

	var bcHeight = +barchart.attr("height") - bcMargin.top - bcMargin.bottom;

	// Set up a d3 scale for the X-values. Scales in d3 help map data to a visual representation. They don't create anything visual, they just help to sort and convert data. Read more about d3 scales at https://github.com/d3/d3-scale
	
	var x = d3.scaleBand()
	.rangeRound([0, bcWidth])
	.padding(.8);

		// scaleBand() creates a Band scale which is used in a bar chart. Discrete output values are automatically computed by the scale by dividing the continuous range into uniform bands. Read more at https://github.com/d3/d3-scale/blob/master/README.md#scaleBand.

		// rangeRound(min, max) translates the values in the data set to values within a set range, in this case a range from 0 (min) to the width of the SVG (max). Read more at https://github.com/d3/d3-scale/blob/master/README.md#band_rangeRound
		
		// padding(value) sets the inner and outer padding of each band to a percentage of the band width (a value between 0 and 1). Read more at https://github.com/d3/d3-scale/blob/master/README.md#band_padding

	// Set up a d3 scale for the Y-values
	var y = d3.scaleLinear().rangeRound([bcHeight, 0]);

	var barchartG = barchart.append("g")
	.attr("transform", "translate(" + bcMargin.left + "," + bcMargin.top + ")");


	d3.json("data/barchart.json", function(error, data) {	// Change this file location to use a different file
		
		// Standard error reporting function, just in case
		if (error) throw error;

		// Returning the data from the json. Change d.Letter and d.Freq below to use the key names in the json you are using
		data.forEach(function(d) {
			d.Year = d.Year;
			d.Freq = +d.Freq; // The + sign here converts data to a number. This is a fail-safe to make sure the data is consistent, since the data needs to be numeric for the scaleLinear() function to work. 
		});

		// Scale the range of the data
		x.domain(data.map(function(d) { return d.Year; }));
		y.domain([0, d3.max(data, function(d) { return d.Freq; })]);

		var barClass = function(d) { return "bar y" + d.Year;};


		// Set up and append an x-axis
		barchartG.append("g")
		.attr("class", "axis axis-x")
		.attr("transform", "translate(0," + bcHeight + ")")
		.call(d3.axisBottom(x));	// d3.axisBottom(scale) constructs an bottom-facing axis in the SVG, read more at https://github.com/d3/d3-axis/blob/master/README.md#axisBottom

		// Set up and append a y-axis
		barchartG.append("g")	// "g" here is an SVG group (like an Illustrator layer)
		.attr("class", "axis axis-y")
		.call(d3.axisLeft(y).ticks(5)) // d3.axisLeft(scale) constructs an axis at the left of the SVG. Read more at https://github.com/d3/d3-axis/blob/master/README.md#axisLeft. d3.axis.ticks() determines the number of ticks on the axis. Read more at https://github.com/d3/d3-axis/blob/master/README.md#axis_ticks
		
		// append a label to the y-axis
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", "0.7em")	// We are modifying the y-coordinates because the text has been rotated 90 degrees
		.attr("text-anchor", "end")
		.text("Number of Structures");


		// Append the bars to the bar chart
		// Note that the following code is standard d3 for adding data-driven elements to the DOM. It may seem confusing that we are selecting elements before adding them, but that's just the way d3 works! As a standard, d3 will always add data-driven elements to the DOM using the following code:
		
		//		elementToAddTo
		//			.selectAll(elementsToAdd)
		//			.data(data)
		//			.enter()
		//			.append(elementType)
		
		barchartG.selectAll(".bar")
		.data(data)
		.enter().append("rect")
		.attr("class", barClass)
		.attr("x", function(d) { return x(d.Year); })
		.attr("y", function(d) { return y(d.Freq); })
		.attr("width", x.bandwidth())
		.attr("height", function(d) { return bcHeight - y(d.Freq); });
	});


