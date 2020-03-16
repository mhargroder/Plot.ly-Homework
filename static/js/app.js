
//initial load
function init() {
    d3.json("data/samples.json").then(function(data) {
        var dropdownFirst = d3.select("#selDataset");
        data.names.forEach((name)=>{
            dropdownFirst.append("option").text(name).property("value", name);
        })

        //initilize data on load
        graphs(data.names[0]);
        infobox(data.names[0])
    });
}
init();

// Demograhic Info box
function infobox(name) {
    d3.json("data/samples.json").then(function(data) {

        console.log(data);

            var filteredInfoData = data.metadata.filter(metadatum => metadatum.id == name)[0]


                    document.getElementById("idValue").innerHTML  = filteredInfoData.id;

                    document.getElementById("ethValue").innerHTML = filteredInfoData.ethnicity;

                    document.getElementById("genValue").innerHTML = filteredInfoData.gender;

                    document.getElementById("ageValue").innerHTML = filteredInfoData.age;

                    document.getElementById("locValue").innerHTML = filteredInfoData.location;

                    document.getElementById("bbtValue").innerHTML = filteredInfoData.bbtype;

                    document.getElementById("wfqValue").innerHTML = filteredInfoData.wfreq;    
    });
}


function graphs(name) {
    d3.json("data/samples.json").then(function(data) {
        console.log(data);
    
        var filteredData = data.samples.filter(sample => sample.id == name)[0]
        var totalValues = filteredData.sample_values;
        var TotalotuIDs = filteredData.otu_ids;
        var otuLabels = filteredData.otu_labels;
    
        var values = totalValues.slice(0, 10).reverse();
        var otuIDs = TotalotuIDs.slice(0, 10).map(id => `OTU ${id}`).reverse();
    
        var traceBar = {
            x: values,
            y: otuIDs,
            text: otuLabels.slice(0, 10).reverse(),
            type: 'bar',
            orientation: 'h',
            width: 0.75
        };
    
        var traceBubble = {
            x: TotalotuIDs,
            y: totalValues,
            text: otuLabels,
            mode: 'markers',
            marker: {
                size: totalValues,
                color: TotalotuIDs
            }
        };
    
        var samplesBar = [traceBar];
        var samplesBubble = [traceBubble];
    
        var layoutbar = {
            title: "Most Common OTUs",
            margin: {t:30, l:100}
        };

        var layoutBubble = {
            xaxis: {title: "OTU ID"}
        }
    
        Plotly.newPlot("bar", samplesBar, layoutbar);
        Plotly.newPlot("bubble", samplesBubble, layoutBubble)
    });
    
}

function optionChanged(name) {
  graphs(name)
  infobox(name)
};
