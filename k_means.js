var canvas = document.getElementById('canvas');
var canvCont = canvas.getContext("2d");

var x = canvas.height;
var max = x;
var list = new Array();
var center = new Array();
var colors = ['#f90000','#f100f9','#2100f9','#00edf9','#00f932'];


const calculate = () => {
    let dist = 5000;
    let temp = 5000;
    let tempCoords;

    canvCont.clearRect(0,0,400,400);

    console.log(list);
    console.log(center);

    list.forEach((coords)=>{
        canvCont.fillStyle = coords[2];
        canvCont.fillRect(coords[0],coords[1],4, 4);
    });

    center.forEach(c => {
        canvCont.fillStyle = c[1];
        canvCont.fillRect(c[0][0],c[0][1],4, 4);
    })

    list.forEach((coordsD/*dots*/)=>{
        temp = 5000;
        center.forEach((coordsC/*centers*/)=>{
           dist = Math.sqrt(Math.pow((coordsD[0]-coordsC[0][0]),2)+Math.pow((coordsD[1]-coordsC[0][1]),2));


           if(temp > dist){
               let clusterColor = coordsC[1];
               temp = dist;
               tempCoords = coordsC;
               canvCont.fillStyle = clusterColor;
               canvCont.fillRect(coordsD[0],coordsD[1],4,4);

               console.log(coordsD[2] = clusterColor);
           }

        });

    });

    list.forEach(dotsColor => {
        let iterColor = dotsColor[2];
        let tempAverageX = 0;
        let tempAverageY = 0;
        let iter = 0;
                list.forEach( dots => {
                    iter++;
                    if(dots[2] === iterColor){
                        tempAverageX += dots[0];
                        tempAverageY += dots[1];
                    }
                });
        tempAverageX = tempAverageX/iter;
        tempAverageY = tempAverageY/iter;

        center.forEach(center => {
            if(center[1] === iterColor && center[0][0] !== tempAverageX
                                        && center[0][1] !== tempAverageY){

                center[0][0] = tempAverageX;
                center[0][1] = tempAverageY;
                canvCont.fillStyle = iterColor;
                canvCont.fillRect(tempAverageX,tempAverageY,4,4);
            }
        })

    });
}

//Пометить центр тяжести
const checkDot = (e) => {

    if (colors.length === 0){
        return;
    }

    let canvX = e.layerX;
    let canvY = e.layerY;

    let color;
    //В условии - точность пометки
    list.forEach((coords)=>{
        if((coords[0] - 5 < canvX && coords[0] + 5 > canvX) &&
            (coords[1] - 5 < canvY && coords[1] + 5 > canvY)){

            color = colors[Math.floor(Math.random()*colors.length)];
            colors.splice(colors.indexOf(color),1);

            list.splice(list.indexOf(coords),1);

            canvCont.fillStyle = color;
            canvCont.fillRect(coords[0],coords[1],4,4);
            center.push([coords,color]);//занесение в список координат точки и её цвета

        }
    });
}

const clean = () => {
    location.reload();
}

const arrangeDot = () => {
    canvCont.fillStyle = '#000000'
    canvCont.clearRect(0, 0, x, x);

    var count = document.getElementById('inp').value;

    for (let i = 0; i < count; i++){
        list.push([Math.random()*max,Math.random()*max,'#000000']);
    }

    document.getElementById('btn').setAttribute("disabled", "true");
}

document.getElementById('btn').onclick = arrangeDot;
document.getElementById('start').onclick = calculate;
document.getElementById('clean').onclick = clean;


canvas.onmousedown = checkDot;