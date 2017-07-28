/*
so question becomes whether to cluster in a particular way
	all on left in column to avoid panel space
	shown as either 200% of circle (small to medium) or 75% of window height... whichever is less
	3-6 thumbnails in the column, 20px spacing between, center vertical at center pf original site
	20px offset from circle left (connectivelines for all?)
	titles of each thumbnail to the right of each
	each thumbnail, onClick should load a new panel of info, hover pulls up its short
*/

export const spacingFrame = (windowSize, dataCircle, allDetails) => {
	var clipDetails=[];
	var details=[];

	if (dataCircle && dataCircle.clusterId){
	details = allDetails.filter(detail => {
		return detail.clusterId === dataCircle.clusterId;
	})

	var height;
	(windowSize[1]*.75>dataCircle.r*6)? height=dataCircle.r*6 : height=windowSize[1]*.75 ; //
	//if (details.length<2) { height=dataCircle.r*1.5 };

	var offset;  // this will need adjustment
	(dataCircle.r/2>20)? offset=20 : offset =  dataCircle.r/2;
	let size = (height-((3)*offset))/3; //to width, height, radius... constant here: (details.length-1)*offset)/details.length
	let x= dataCircle.cx-dataCircle.r-offset-size;
	let cx = dataCircle.cx-dataCircle.r-offset-size/2;
	let xText = dataCircle.cx-dataCircle.r-offset-size-5;

	let top = dataCircle.cy-(size*details.length)/2;

	details.forEach((detail,i) =>{
		let clip={};

		detail.x=x, clip.x=x;
		detail.height=size, clip.height=size;
		detail.width=size, clip.width=size;
		detail.textX=xText;
		detail.y=top+i*(size+offset), clip.y=top+i*(size+offset);
		detail.clip=`url(#detail${detail.id})`;

		clip.cx=cx;
		clip.r = size/2;
		clip.cy=top+size/2+i*(size+offset);
		clip.id='detail'+detail.id;

		clip.rx = size/4, clip.ry =size/4;

		clipDetails.push(clip);

	})
	}

	return {clipDetails, details};
}
