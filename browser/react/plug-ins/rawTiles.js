//const tiling = function(scale, tilesize, boundArr, center, mouse, mouseTrig) {
const tiling = function(scale, tileSize, boundArr, xOff, yOff) {
  // const scaleOps = {
  //   '2': [3 , 1, 1024, 16], //max in each set
  //   '3': [7 , 3, 2048, 8],
  //   '4': [15 , 7, 4096, 4],
  //   '5': [31 , 15, 8192, 2],
  //   '6': [63 , 31, 16384, 1],
  // };

    const scaleOps = {
    '2': [3 , 1], //max in each set
    '3': [7 , 3],
    '4': [15 , 7],
    '5': [31 , 15],
    '6': [63 , 31],
  };

  let wide = boundArr[0];
  let high = boundArr[1];

  // console.log('centerDiv ', wide/2, high/2);
  // console.log('centerScaled ', center[0]/scaleOps[scale][3], center[1]/scaleOps[scale][3]);
  // console.log('mouseClicked', mouse[0], mouse[1]);

  // let xOrig = (wide/2 - mouse[0])*scaleOps[scale][3];
  // let yOrig = (high/2 - mouse[1])*scaleOps[scale][3];

  // let xOffsetC = wide/2 - center[0]/scaleOps[scale][3];
  // let yOffsetC = high/2 - center[1]/scaleOps[scale][3];

  // let xOffsetM = mouse[0] - xOrig/scaleOps[scale][3];
  // let yOffsetM = mouse[1] - yOrig/scaleOps[scale][3];

  // console.log(xOffsetC, yOffsetC, xOffsetM, yOffsetM);
  // let xOff, yOff;
  // (mouseTrig)? xOff = xOffsetM : xOff =  xOffsetC;
  // (mouseTrig)? yOff = yOffsetM : yOff =  yOffsetC;


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
          //xO:xOff,
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
