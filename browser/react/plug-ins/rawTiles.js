const tiling = function(scale, boundArr, center) {

  const scaleOps = {
    '2': [3 , 1, 1024, 16], //max in each set
    '3': [7 , 3, 2048, 8],
    '4': [15 , 7, 4096, 4],
    '5': [31 , 15, 8192, 2],
    '6': [63 , 31, 16384, 1],
  };

  const tileSize=256;

  let wide = boundArr[0];
  let high = boundArr[1];

  console.log('centerDiv ', wide/2, high/2);
  console.log('centerScaled ', center[0]/scaleOps[scale][3], center[1]/scaleOps[scale][3]);
  console.log('half width, height', scaleOps[scale][2]/2, scaleOps[scale][2]/4);

  let xOffset = wide/2 - center[0]/scaleOps[scale][3];
  let yOffset = high/2 - center[1]/scaleOps[scale][3];

  console.log(xOffset, yOffset);

  let tileArr=[];


  if (scaleOps[scale]) {
    let limits = scaleOps[scale];
    let x=0, y=0, xMax=limits[0], yMax=limits[1], width=limits[2], height=limits[2]/2;

    const tiles=[];
    let tile;

    for (let i=0; i<=xMax; i++){
      for (let j=0; j<=yMax; j++){
        tile={
          z:scale,
          xpos:i*tileSize + xOffset,
          x: i,
          ypos:j*tileSize + yOffset,
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
