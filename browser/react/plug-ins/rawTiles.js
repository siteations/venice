export const scaleOps = {
    '2': [3 , 1], //max in each set
    '3': [7 , 3],
    '4': [15 , 7],
    '5': [31 , 15],
    '6': [63 , 31],
  };


export const tiling = function(scale, tileSize, boundArr, off) {

  let wide = boundArr[0];
  let high = boundArr[1];
  let xOff = off[0];
  let yOff = off[1];

  let tileArr=[];


  if (scaleOps[scale]) {
    let limits = scaleOps[scale];
    let x=0, y=0, xMax=limits[0], yMax=limits[1], width=limits[0]*tileSize, height=width/2;

    const tiles=[];
    let tile;

    for (let i=0; i<=xMax; i++){
      for (let j=0; j<=yMax; j++){
        tile={
          z:scale,
          percent:(xMax+1)*tileSize/(64*256),
          xpos:i*tileSize - xOff,
          x: i,
          //yO: yOff,
          ypos:j*tileSize - yOff,
          y: j,
        };

        tiles.push(tile);

      }
    }

    tileArr=tiles;

  } else {
    return [];
  }

  return tileArr;
};


export const sitesFiltered = (off, sites, currLayers, percent) => {

      let cirNew = sites.map(circle=>{
        let newCir = Object.assign({},circle);
          newCir.cx = circle.cx*percent - off[0];
          newCir.cy = circle.cy*percent - off[1];
          newCir.r = circle.r*percent;
                return newCir;
            })
        .filter(circle => (currLayers.indexOf(circle.type)>-1 || currLayers.indexOf(circle.type2)>-1));

      return cirNew;

}

export const centerRescaled = (zoom, newCenter, winSize,tilesize) => {

  let limits = scaleOps[zoom];

    let xPerc = newCenter[0]/(256*64);
    let yPerc = newCenter[1]/(256*32);

    let xFull = tilesize*(limits[0]+1), yFull = tilesize*(limits[1]+1);
    let x = xPerc*xFull, y = yPerc*yFull;



    let centerX = winSize[0]/2 - x, centerY = winSize[1]/2 - y;

    //console.log(xPerc, yPerc, xFull, yFull, x, y, winSize[0]/2, winSize[1]/2);

    return {
      x: -1*centerX,
      y: -1*centerY,
    };

}

export const reverseCenter = (zoom, existingCenter, tilesize) => {
  let limits=scaleOps[zoom];
  let larger = scaleOps[6];
  // let diffY = Math.pow(2,7-zoom)*105;
  // let diffX = Math.pow(2,7-zoom)*5;

  let widthCurr = tilesize*(limits[0]+1), heightCurr = tilesize*(limits[1]+1);
  let xPerc = existingCenter[0]/widthCurr, yPerc = existingCenter[1]/heightCurr;

  let widthFull = 256 * (larger[0]+1), heightFull = 256 * (larger[1]+1);

  let centerX = xPerc*widthFull, centerY = yPerc*heightFull;

  return {
    x: centerX,
    y: centerY,
  }


}
