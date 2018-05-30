var map, centerPos = {lat: 40.7291, lng: -73.9965},coordLat, coordLng, myLatLng, marker;
const NeighNames = "https://data.cityofnewyork.us/api/views/xyye-rtrs/rows.json?accessType=DOWNLOAD";
const Geoshapes = "https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson";
const NYhousing = "https://data.cityofnewyork.us/api/views/hg8x-zxpr/rows.json?accessType=DOWNLOAD";
const CrimesNY = "https://data.cityofnewyork.us/api/views/wuv9-uv8d/rows.json?accessType=DOWNLOAD";
const Air_quality = "https://data.cityofnewyork.us/api/views/c3uy-2p5r/rows.json?accessType=DOWNLOAD";
const NY_museums = "https://data.cityofnewyork.us/api/views/fn6f-htvy/rows.json?accessType=DOWNLOAD";
const NY_art_galleries = "https://data.cityofnewyork.us/api/views/43hw-uvdj/rows.json?accessType=DOWNLOAD";
//infoNYhousing[Boro,lat,lng,type,distric,lowUnits] infoCrimes[[Borough],[District],[Description],[Lat lng],[Time]]
//infoNeig[lng,lat,name,boro]
var infoNeighborhood= [], infoNYhousing = [[],[],[],[],[]], infoCrimes = [], infoAir = [];
var allMarkers = [], allMarkersHous = [],allMarkersHousP = [], allMarkersCri = [], allMarkersMus = [], allMarkersArt = [];
var newR, info, tableReference, table = [];
var namesBoro = ["Manhattan","Bronx","Brooklyn","Queens","Staten Island"], acronymBoro = ["MN-","BX-","BK-","QN-","SI-"];
var districH = [[],[],[],[],[]],distanceDistric = [[],[],[],[],[]];
var ft= [],polyBoro = [[],[],[],[],[]];
var districtAllInfo=[[[],[],[]]
                    ,[[],[],[]]
                    ,[[],[],[]]
                    ,[[],[],[]]
                    ,[[],[],[]]];
var heatmap;

(function () {
    // getDataURL();
    $('#buttonCrim').hide();
    $('#buttonHous').hide();
    $('#buttonAir').hide();
    $('#scrolltableAffor').hide();
    $('#scrolltableDis').hide();
    $('#scrolltableSec').hide();
    $('chart').hide();
    $('#Tables').hide();
    $('#navRank').hide();
    $('#navExport').hide();
    $('#navChart').hide();
    var bool = true;    
    document.getElementById("Home").addEventListener("click", function () {
        console.log(polyBoro[0].length);
        // getDataURL();
        $('#googleMapConteiner').show();
        $('#buttonboro').show();
        $('#scrolltableAffor').hide();
        $('#scrolltableDis').hide();
        $('#scrolltableSec').hide();
        $('#Tables').hide();
        $('chart').hide();
        $('#buttonCrim').show();
        $('#buttonHous').show();        
        
    });
    
    document.getElementById("Data").addEventListener("click", function () {
    
        if(bool){
            styleMapByDis();
            getDataNeigh();
            getDataHous();
            getDataC();
            calculateDis();
            $('#navRank').show();
            $('#navExport').show();
            $('#navChart').show();
            heatmap = new google.maps.visualization.HeatmapLayer({
                data: allMarkersCri,
                map:map
            });
        }
        if(table.length == 0){
            // initTable();
        }else{
            // fillTable();
        }
        console.log(dataHous.length);
        
        $('#Tables').show();
        // $('#buttonboro').hide();        
        $('chart').show();
        $('#buttonCrim').show();
        $('#buttonHous').show();
        
        document.getElementById("buttonCrim").addEventListener("click",function(){
            drawHeatMap();
        });
        bool = false;
    });

    document.getElementById("top3").addEventListener("click", function (){
        if(bool){
            styleMapByDis();
            getDataNeigh();
            getDataHous();
            getDataC();
            calculateDis();
        }   
        clearTable();
        console.log( document.getElementById("clasificationTable"));
        fillTableTop();
        console.log( document.getElementById("clasificationTable"));
        $('#Tables').show();
        bool = false;
    });

    document.getElementById("Safety").addEventListener("click", function (){
        if(bool){
            styleMapByDis();
            getDataNeigh();
            getDataHous();
            getDataC();
            calculateDis();
        }        
        table.sort(function(a,b){
            return a[4] - b[4];
        })
        console.log(table);
        clearTable();
        console.log( document.getElementById("clasificationTable"));
        fillTable();
        console.log( document.getElementById("clasificationTable"));
        $('#Tables').show();
        bool = false;
    });

    document.getElementById("Distance").addEventListener("click", function (){
        if(bool){
            styleMapByDis();
            getDataNeigh();
            getDataHous();
            getDataC();
            calculateDis();
        }
        clearTable();
        table.sort(function(a,b){
            return a[3] - b[3];
        })
        fillTable();
        $('#Tables').show();
        bool = false;
    });

    document.getElementById("Affordability").addEventListener("click", function (){
        if(bool){
            styleMapByDis();
            getDataNeigh();
            getDataHous();
            getDataC();
            calculateDis();
            initTable();
        }
        clearTable();
        table.sort(function(a,b){
            return  b[2]-a[2];
        })
        fillTable();
        $('#Tables').show();
        bool = false;
    });

    document.getElementById("Bronx").addEventListener("click", function () {
        styleMapByBoro(2);
        for (var i = 0; i < infoNeighborhood.length; i++){
            if(infoNeighborhood[i][3] == "Bronx"){
                allMarkers[i].setVisible(true);
            }else{
                allMarkers[i].setVisible(false);
            }            
        }  
        
    });

    document.getElementById("Brooklyn").addEventListener("click", function () {
        styleMapByBoro(3);
        for (var i = 0; i < infoNeighborhood.length; i++){
            if(infoNeighborhood[i][3] == "Brooklyn"){
                allMarkers[i].setVisible(true);
            }else{
                allMarkers[i].setVisible(false);
            }            
        }
    });

    document.getElementById("Manhattan").addEventListener("click", function () {
        styleMapByBoro(1);
        for (var i = 0; i < infoNeighborhood.length; i++){
            if(infoNeighborhood[i][3] == "Manhattan"){
                allMarkers[i].setVisible(true);
            }else{
                allMarkers[i].setVisible(false);
            }            
        }
        
    });

    document.getElementById("Queens").addEventListener("click", function () {
        styleMapByBoro(4);
        for (var i = 0; i < infoNeighborhood.length; i++){
            if(infoNeighborhood[i][3] == "Queens"){
                allMarkers[i].setVisible(true);
            }else{
                allMarkers[i].setVisible(false);
            }            
        }
    });

    document.getElementById("Staten Island").addEventListener("click", function () {
        styleMapByBoro(5);
        for (var i = 0; i < infoNeighborhood.length; i++){
            if(infoNeighborhood[i][3] == "Staten Island"){
                allMarkers[i].setVisible(true);
            }else{
                allMarkers[i].setVisible(false);
            }            
        }
    });

    document.getElementById("buttonboro").addEventListener("click",function(){
        for (var i = 0; i < infoNeighborhood.length; i++){
            allMarkers[i].setVisible(false);
        }
    });
    

    document.getElementById("buttonHous").addEventListener("click",function(){
        for (var i = 0; i < allMarkersHousP.length; i++){
            allMarkersHousP[i].setVisible(false);
        }
        for (var i = 0; i < allMarkersHous.length; i++){
            allMarkersHous[i].setVisible(false);
        }
    });

    document.getElementById("Preservation").addEventListener("click",function(){
        for (var i = 0; i < allMarkersHousP.length; i++){
            allMarkersHousP[i].setVisible(true);
        }
    });

    document.getElementById("Construction").addEventListener("click",function(){
        for (var i = 0; i < allMarkersHous.length; i++){
            allMarkersHous[i].setVisible(true);
        }
    });
    var boolM = true,alter = true;
    document.getElementById("buttonMus").addEventListener("click",function(){
        if(boolM){
            getDataMus();
            boolM = false;
        }
        if(alter){
            for(var i = 0; i< allMarkersMus.length; i++){
                // console.log(allMarkersMus[i]);
                allMarkersMus[i].setVisible(true);
            }
            alter = false;
        }else{
            for(var i = 0; i< allMarkersMus.length; i++){
                allMarkersMus[i].setVisible(false);
            }
            alter = true;
        }

    })
    var boolA = true,alterA = true;
    document.getElementById("buttonArt").addEventListener("click",function(){
        if(boolA){
            getDataArt();
            boolA = false;
        }
        if(alterA){
            for(var i = 0; i< allMarkersArt.length; i++){
                allMarkersArt[i].setVisible(true);
            }
            alterA = false;
        }else{
            for(var i = 0; i< allMarkersArt.length; i++){
                allMarkersArt[i].setVisible(false);
            }
            alterA = true;
        }

    })
})();

//Get Data Links
function getDataNeigh(){
    var dataN = $.get(NeighNames,function(){})    
    .done(function(){
        var dataR = dataN.responseJSON.data,dis;
        for (var i = 0; i < dataR.length; i++) {
            coordLng = dataR[i][9].split(" ")[1].split("(")[1];
            coordLat = dataR[i][9].split(" ")[2].split(")")[0];
            infoNeighborhood.push([coordLat, coordLng, dataR[i][10], dataR[i][16]]);  
            for(var j = 0; j < namesBoro.length;j++){
                if(dataR[i][16]==namesBoro[j]){
                    for(var k = 0;k<polyBoro[j].length;k++){
                        myLatLng = new google.maps.LatLng(parseFloat(coordLat),parseFloat(coordLng));
                        if(google.maps.geometry.poly.containsLocation(myLatLng, polyBoro[j][k][0])){
                            dis = k;
                            districtAllInfo[j][0].push({district: dis,borough:dataR[i][16],Position:myLatLng,name:dataR[i][10]});
                            break;
                        }
                    }                    
                }
            }                         
        }        
        fillArray();

    })
    .fail(function(error){
        console.log(error);
    })
}
var boroCD= [];
function getDataHous(){
    var indx,max = 0,temp = [];
    var dataH = $.get(NYhousing,function(){})
        .done(function(){            
            var dataHR = dataH.responseJSON.data;            
            for(var i = 0; i < dataHR.length; i++){
                coordLat = parseFloat(dataHR[i][23]);
                coordLng = parseFloat(dataHR[i][24]);
                myLatLng = new google.maps.LatLng(coordLat,coordLng);
                if(dataHR[i][19]!="BK-304"){
                    indx = boroCD.indexOf(dataHR[i][19]);
                    if(indx == -1){
                        boroCD.push(dataHR[i][19]);
                        dataHous.push(parseInt(dataHR[i][33]));
                    }else{
                        max = Math.max(dataHous[indx],parseInt(dataHR[i][33]));
                        dataHous[indx] = max;	
                    }
                }else{
                
                }
                for(var j = 0; j < namesBoro.length;j++){
                    if(dataHR[i][15]==namesBoro[j] && parseInt(dataHR[i][33])>0){
                        infoNYhousing[j].push([dataHR[i][15],coordLat,coordLng,dataHR[i][28],parseInt(dataHR[i][19].split("-")[1]),parseInt(dataHR[i][33])]);
                        districtAllInfo[j][1].push([dataHR[i][20],dataHR[i][15],myLatLng,dataHR[i][28]]);
                        break;
                    }
                }
                
                
            }
            fillArrayHous();
            initTable();
            fillTable();
        })
        .fail(function(error){
            console.log(error);
        })

}

function getDataC(){
    var dataC = $.get(CrimesNY,function(){})   
        .done(function(data){            
            var dataCR = dataC.responseJSON.data;
            for(var i = 0; i < dataCR.length;i++){
                coordLat = parseFloat(dataCR[i][29]);
                coordLng = parseFloat(dataCR[i][30]);
                if(isNaN(coordLat)){
                    // console.log(dataCR[i]);
                }else{
                    allMarkersCri.push(new google.maps.LatLng(coordLat,coordLng));
                }
                
                myLatLng = {lat: coordLat, lng: coordLng};  
            var j,dis;
            switch(dataCR[i][21]){
                case "MANHATTAN":
                    j = 0;
                    break;
                case "BRONX":
                    j = 1;
                    break;
                case "BROOKLYN":
                    j = 2;
                    break;
                case "QUEENS":
                    j = 3;
                    break;
                case "STATEN ISLAND":
                    j = 4;
                    break;
            }
            for(var k = 0;k<polyBoro[j].length;k++){
                myLatLng = new google.maps.LatLng(coordLat,coordLng);
                if(google.maps.geometry.poly.containsLocation(myLatLng,polyBoro[j][k][0])){
                    dis = polyBoro[j][k][1];
                    districtAllInfo[j][2].push([dis,dataCR[i][21],myLatLng,dataCR[i][15]]);
                    break;
                }        
            } 
            infoCrimes.push([dataCR[i][21],dis,dataCR[i][15],myLatLng,dataCR[i][10]]); 
                
        }
        fillTableCrimes();
        })
        .fail(function(error){
            console.log(error);
        })
        
}

function getDataMus(){
    var dataM =  $.get(NY_museums,function(){})
        .done(function(){
            var dataMR = dataM.responseJSON.data;
            for(var i = 0; i< dataMR.length; i++){
                coordLng = parseFloat(dataMR[i][8].split("(")[1].split(" ")[0]);
                coordLat = parseFloat(dataMR[i][8].split("(")[1].split(" ")[1].split(")")[0]);
                myLatLng = new google.maps.LatLng(coordLat,coordLng);
                marker = new google.maps.Marker({
                    position: myLatLng,
                    map: map,
                    icon: 'https://photos-4.dropbox.com/t/2/AAAGhJG6G4DL5raoJuTVZy7odC8SWLh_hDGoOucPYP5eLQ/12/590111548/png/32x32/1/_/1/2/museum.png/ENbrs-AEGEMgAigC/iBx3qej2BrGizsKSmW15rFp-n-SeUo1K2yba9KIOz4U?preserve_transparency=1&size=1280x960&size_mode=3',
                    title: dataMR[i][9]
                })
                allMarkersMus.push(marker);
            }
        })
        .fail(function(error){
            console.log(error);
        })
}

function getDataArt(){
    var dataA =  $.get(NY_art_galleries,function(){})
        .done(function(){
            var dataAR = dataA.responseJSON.data;
            for(var i = 0; i< dataAR.length; i++){
                coordLng = parseFloat(dataAR[i][9].split("(")[1].split(" ")[0]);
                coordLat = parseFloat(dataAR[i][9].split("(")[1].split(" ")[1].split(")")[0]);
                myLatLng = new google.maps.LatLng(coordLat,coordLng);
                marker = new google.maps.Marker({
                    position: myLatLng,
                    map: map,
                    icon: 'https://photos-1.dropbox.com/t/2/AADDz_wrNOP2tsKp_xGDnMXOKq0Lg9osmtuMAl2KCaFc_Q/12/590111548/png/32x32/1/_/1/2/painting.png/ENbrs-AEGEMgAigC/zprwhQ8bWkl3eiPZHnwJZyOYO4e_Ka0nFsFfmUQ-S_A?preserve_transparency=1&size=1280x960&size_mode=3',
                    title: dataAR[i][8]
                })
                allMarkersArt.push(marker);
            }
        })
        .fail(function(error){
            console.log(error);
        })
}

function getDataAir(){
    var dataAir =  $.get(Air_quality,function(){})
        .done(function(){
            var dataAirR = dataAir.responseJSON.data,already = false,boro,dis,num;
            console.log(dataAirR);
            for(var i = 0; i < dataAirR.length; i++){
                num = parseInt(dataAirR[i][13]);
                if(num>10){
                    boro = parseInt(num/100);
                    dis = num%100;
                }else{
                    boro = num;
                    dis = 0;                    
                }
                for(var j = 0; j < infoAir.length; j++){
                    if(dataAirR[i][10]==infoAir[j][0]){
                        already = true;
                        infoAir[j][1].push([boro,dis,dataAirR[i][16]]);
                        break;
                    }else{
                        already = false;
                    }
                    
                }
                if(!already){
                    infoAir.push([dataAirR[i][10],[]]);
                    infoAir[infoAir.length-1][1].push([boro,dis,dataAirR[i][16]]);
                }
            }
            console.log(infoAir);
        })
        .fail(function(error){
            console.log(error);
        })
}
//----------------------------
function getColor(number) {
    var color;
    switch(number){
        case 1:
            color = '#7FFF00';
            break;
        case 2:
            color = '#A52A2A';
            break;
        case 3:
            color = '#FF8C00';
            break;
        case 4:
            color = '#FFD700';
            break;
        case 5:
            color = '#6495ED';
            break;
        default:
            color += number;
            color += number; 
    }   
    return color;
}

function onGoogleMapResponse(){
    map = new google.maps.Map(document.getElementById('googleMapConteiner'),{
        center: centerPos,
        zoom: 10
    });

    map.data.loadGeoJson('https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson');    
    var t = 0;
    map.data.setStyle(function(feature) {
        ft[t++] = feature; 
        boro = Math.floor(feature.f.BoroCD/100);
        dis = feature.f.BoroCD - (100*boro);         
        var temp = feature.b.b;
        if(dis>19){
            var coordDisNH;
            if(temp.length==1){
                for(var i = 0; i<temp.length;i++){
                    coordDisNH = temp[0].b;
                }                
            }else{
                for(var i = 0; i<temp.length;i++){    
                    coordDisNH = temp[i].b[0].b;
                }
            }
            var disPolygon = new google.maps.Polygon({
                paths: coordDisNH,
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 3,
                fillColor: '#008000',
                fillOpacity: 2
              });
              disPolygon.setMap(map);
        }
        var color = '#FFFFF0';
        return{
            fillColor: color,
            strokeWeight: 1
        }
    })
    marker = new google.maps.Marker({
        position: centerPos,
        map: map,
        title: "University"
    })
};

function styleMapByBoro(number){
    var boro,color;  
    map.data.setStyle(function(feature) {        
        boro = Math.floor(feature.f.BoroCD/100);           
        if(boro == number){
            color = getColor(number);
            return {
            fillColor: color,
            strokeWeight: 1
            };
        } else{
            color = '#FFFFF0';
        return{
            fillColor: color,
            strokeWeight: 1
        }
        }            
    }); 

}

function styleMapByDis(){
    var boro,dis,color;
    for(var k = 0; k<ft.length;k++){
        boro = Math.floor(ft[k].f.BoroCD/100);
        dis = ft[k].f.BoroCD - (100*boro); 
        if(dis>19){
        }else{
            var temp = ft[k].b.b;
            var coordDisH = [];
            if(temp.length==1){
                for(var i = 0; i<temp.length;i++){
                    coordDisH[i] = temp[0].b;
                }                
            }else{
                for(var i = 0; i<temp.length;i++){    
                    coordDisH[i] = temp[i].b[0].b;
                }
            }
            switch(boro){
                case 1:
                    districH[0][dis-1] = polygonCenter(coordDisH);
                    //addMarker(polygonCenter(coordDisH),"Manhatan " + dis.toString());
                    polyBoro[0].push([addPolygon(coordDisH),dis]);
                    break;
                case 2:
                    districH[1][dis-1] = polygonCenter(coordDisH);
                    //addMarker(polygonCenter(coordDisH),"Bronx " + dis.toString());
                    polyBoro[1].push([addPolygon(coordDisH),dis]);
                    break;
                case 3:
                    districH[2][dis-1] = polygonCenter(coordDisH);
                    //addMarker(polygonCenter(coordDisH),"Brooklyn " + dis.toString());
                    polyBoro[2].push([addPolygon(coordDisH),dis]);
                    break;
                case 4:
                    districH[3][dis-1] = polygonCenter(coordDisH);
                    //addMarker(polygonCenter(coordDisH),"Queens " + dis.toString());
                    polyBoro[3].push([addPolygon(coordDisH),dis]);
                    break;
                case 5:
                    districH[4][dis-1] = polygonCenter(coordDisH);
                    //addMarker(polygonCenter(coordDisH),"State Island " + dis.toString());
                    polyBoro[4].push([addPolygon(coordDisH),dis]);
                    break;
            }
        }        
    }
}

function addMarker(pos,tit){
    marker=new google.maps.Marker({
        position: pos,
        map: map,
        title: tit
    })
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function addPolygon(posPath){
    var color = getRandomColor();
    var disPolygon = new google.maps.Polygon({
        paths: posPath,
        strokeColor: color,
        strokeOpacity: 0.8,
        strokeWeight: 0.5,
        fillColor: color,
        fillOpacity: 0.5
    });
    disPolygon.setMap(map); 
    return disPolygon;
}

function polygonCenter(Path) {
    var lowx,highx,lowy,highy,
        lats = [],lngs = [],
        vertices = Path;
    var temp;
    for(var i=0; i<vertices.length; i++) {
        for(var j=0;j<vertices[i].length;j++){
            temp = vertices[i][j].toString().split("(")[1];
            coordLat = parseFloat(temp.split(",")[0]);
            coordLng = parseFloat(temp.split(",")[1].split(")")[0]);           
            lats.push(coordLat);
            lngs.push(coordLng);
        }
      
    }
    lats.sort();
    lngs.sort();
    lowx = lats[0];
    highx = lats[lngs.length - 1];
    lowy = lngs[0];
    highy = lngs[lngs.length - 1];
    center_x = lowx + ((highx-lowx) / 2);
    center_y = lowy + ((highy - lowy) / 2);
    myLatLng = {lat: center_x, lng:center_y};
    return (new google.maps.LatLng(center_x, center_y));
}
//Fill array of Markers
function fillArray(){
    for (var i = 0; i < infoNeighborhood.length; i++){
        myLatLng = {lat: parseFloat(infoNeighborhood[i][0]), lng: parseFloat(infoNeighborhood[i][1])};
        marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: infoNeighborhood[i][2]
        });
        allMarkers.push(marker);
        allMarkers[i].setVisible(false);        
    }
}
var dataHous = [];
function fillArrayHous(){
    var max=0,m=0,k=0;
    for (var i = 0; i < infoNYhousing.length; i++){
        for (var j = 0; j < infoNYhousing[i].length; j++){
            if(isNaN(infoNYhousing[i][j][1])){
            }else{
                myLatLng = {lat: infoNYhousing[i][j][1], lng: infoNYhousing[i][j][2]}; 
                marker = new google.maps.Marker({
                    position: myLatLng,
                    map: map,
                    icon:'https://photos-6.dropbox.com/t/2/AADD_29vdokUuOpgjLBPuQJkGt10ocTv6jv1QJgBv4nU5Q/12/590111548/png/32x32/1/_/1/2/skyline.png/ENbrs-AEGEMgAigC/S5AillnR2CfYCFxUigoKKjR5usyaemJR9cmIF3Sj73E?preserve_transparency=1&size=1280x960&size_mode=3',
                    title: infoNYhousing[i][j][3]
                });  
                if(infoNYhousing[i][j][3] == "New Construction"){
                    allMarkersHous.push(marker);
                    allMarkersHous[m++].setVisible(false);  
                }else if(infoNYhousing[i][j][3] == "Preservation"){
                    allMarkersHousP.push(marker);
                    allMarkersHousP[k++].setVisible(false); 
                }
            } 
        }
        
    }
}
//------------------------------
//Fill Tables
var topThree = [];
function initTable(){
    var c = 0, indxS = "", indx,k,temp = [],t,key = [],pos = [];
    for(var i = 0; i < distanceDistric.length;i++){        
        for(var j=0;j<districH[i].length;j++){
            k = j;k++;
            if(k>9){
               indxS +=  acronymBoro[i];               
               indxS +=  k.toString();
            }else{
                indxS +=  acronymBoro[i];
                indxS += "0" + k.toString();
            }
            indx = boroCD.indexOf(indxS);
            t = j;t++;
            temp.push([namesBoro[i] + t.toString(),
                dataHous[indx],
                distanceDistric[i][j],
                data[c]]);
            table.push([namesBoro[i],
                (j+1),
                dataHous[indx],
                distanceDistric[i][j],
                data[c++]]);
            indxS = "";
        }        
    }
    
    // console.log("------ safety ---");
    temp.sort(function(a,b){
        return a[3] - b[3];
    });
    for(var i = 0; i< temp.length; i++){
        key.push(temp[i][0]);
        pos.push(i);
    }
    // console.log("------ distance ---");
    temp.sort(function(a,b){
        return a[2] - b[2];
    });
    for(var i = 0; i< temp.length; i++){
        indx = key.indexOf((temp[i][0]));
        pos[indx]+=i;
    }    
    // console.log("------ affordability ---");
    temp.sort(function(a,b){
        return b[1] - a[1];
    });
    for(var i = 0; i< temp.length; i++){
        indx = key.indexOf((temp[i][0]));
        pos[indx]+=i;
        topThree.push([temp[i][0].substring(0, temp[i][0].length-1)
                    ,temp[i][0].substring(temp[i][0].length-1, temp[i][0].length),
                    temp[i][1],
                    temp[i][2],
                    temp[i][3],
                    pos[indx]]); 
    } 
    topThree.sort(function(a,b){
        return a[5] - b[5];
    });

    
}

function clearTable(){
    $("#clasificationTableBody").empty();
}

function fillTable(){
    tableReference = document.getElementById("clasificationTableBody");
    var c = 0;    console.log(table);
    for(var i = 0; i < distanceDistric.length;i++){
        for(var j=0;j<districH[i].length;j++){
                info = tableReference.insertRow();
                info.insertCell().innerHTML = table[c][0];   
                info.insertCell().innerHTML = table[c][1]; 
                info.insertCell().innerHTML = table[c][2];
                info.insertCell().innerHTML = table[c][3] 
                info.insertCell().innerHTML = table[c++][4];
        }        
    }  
}

function fillTableTop(){
    tableReference = document.getElementById("clasificationTableBody");
    console.log(topThree);
    for(var i = 0; i < topThree.length;i++){
        info = tableReference.insertRow();
        info.insertCell().innerHTML = topThree[i][0];   
        info.insertCell().innerHTML = topThree[i][1]; 
        info.insertCell().innerHTML = topThree[i][2];
        info.insertCell().innerHTML = topThree[i][3] 
        info.insertCell().innerHTML = topThree[i][4];
              
    }  
}

var data = [];
function fillTableCrimes(){    
    for(var i = 0; i < districtAllInfo.length;i++){
        districtAllInfo[i][2].sort(function(a, b){return a[0] - b[0]});
    }
    var count = 0;
    for(var i = 0; i < districtAllInfo.length;i++){
        for(var j = 1; j< districtAllInfo[i][2].length;j++){            
            if(districtAllInfo[i][2][j][0]==districtAllInfo[i][2][j-1][0]){
                count++;
            }else{
                data.push(count+1);
                count = 0;
            }            
        }
        data.push(count+1);
    }    
}
//-------------------------------
//Function of Geometry without Google Maps API
function rad(x) {
    return x * Math.PI / 180;
};
  
function getDistance(p1, p2) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = rad(p2.lat - p1.lat);
    var dLong = rad(p2.lng - p1.lng);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d; // returns the distance in meter
};

function calculateDis(){
    var distance,temp;
    for(var i = 0;i<districH.length;i++){
        for(var j = 0;j<districH[i].length;j++){            
            temp = districH[i][j].toString().split("(")[1];
            coordLat = parseFloat(temp.split(",")[0]);
            coordLng = parseFloat(temp.split(",")[1].split(")")[0]);    
            myLatLng = {lat:coordLat,lng:coordLng};
            distance  = getDistance(centerPos,myLatLng);
            distanceDistric[i][j]=distance;
        }        
    }    
}
//--------------------------------------------
//Edit the Markers
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
}

function clearMarkers() {
    setMapOnAll(null);
}
var crimeBol = false;
function drawHeatMap(){    
    heatmap.setMap(heatmap.getMap() ? null : map);
    // if(crimeBol){
    //     for(var i = 0; i< polyBoro.length; i++){
    //         for(var j = 0; j<polyBoro[i].length;j++){
    //             polyBoro[i][j][0].fillOpacity = 0.1;
    //             console.log(polyBoro[i][j]);
    //         }
    //     }
    //     crimeBol = false;
    // }else{
    //     crimeBol = true;
    // }
}

function exportT(){
    console.log("aqui descargo la tabla actual");
    console.log(table);
    var tableCSV = $('#tableOfAllInfo').clone();
    tableCSV.find('[style*="display: none"]').remove();
    tableCSV.tableToCSV();
}
//--------------------------------------------

//D3
function algo(){
    d3.select(".chart")
        .selectAll("div")
        .data(data)
            .enter()
            .append("div")
            .style("width", function(d) { return d * 2 + "px"; })
            .text(function(d) { return d; });
}
//---------------------------------