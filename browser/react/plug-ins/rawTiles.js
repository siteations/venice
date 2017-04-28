export const scaleOps = {
    '2': [3 , 1], //max in each set
    '3': [7 , 3],
    '4': [15 , 7],
    '5': [31 , 15],
    '6': [63 , 31],
  };

export const tilepreload = function (){

  let tileArr=[];

  for (let key in scaleOps){
    let limits = scaleOps[key];
    let x=0, y=0, xMax=limits[0], yMax=limits[1];

    const tiles=[];
    let tile1, tile2;

    for (let i=0; i<=xMax; i++){
      for (let j=0; j<=yMax; j++){
        tile1= `../../../layouts/color/${key}/map_${i}_${j}.jpg`;
        tile2= `'../../../layouts/grey/${key}/map_${i}_${j}.jpg`;
        tiles.push(tile1, tile2);
      }
    }

    tileArr.push(...tiles);

  }

  return tileArr;

}


const tiling = function(scale, tileSize, boundArr, xOff, yOff) {

  let wide = boundArr[0];
  let high = boundArr[1];

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

export default tiling;
