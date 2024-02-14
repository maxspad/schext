/*
Simple Image Trail script- By JavaScriptKit.com
Visit http://www.javascriptkit.com for this script and more
This notice must stay intact
*/

var offsetfrommouse=[15,15]; //image x,y offsets from cursor position in pixels. Enter 0,0 for no offset
var displayduration=0; //duration in seconds image should remain visible. 0 for always.
var currentimageheight = 450;	// maximum image size.
var currentimagewidth = 450; //maximum image width

if (document.getElementById || document.all){
	document.write('<div id="trailimageid">');
	document.write('</div>');
}

function gettrailobj(){
if (document.getElementById)
return document.getElementById("trailimageid").style
else if (document.all)
return document.all.trailimagid.style
}

function gettrailobjnostyle(){
if (document.getElementById)
return document.getElementById("trailimageid")
else if (document.all)
return document.all.trailimagid
}


function truebody(){
return (!window.opera && document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body
}

function showtrailfromdiv(theDiv,width,height){
	var el = document.getElementById(theDiv);
	var html = "";
	
	if(el)
	{
		html = el.innerHTML;
		width = (el.offsetWidth + 14);
		height = (el.offsetHeight + 15);
	}
	
	if (height > 0){
		currentimageheight = height;
	}
	
	if (width > 0){
		currentimagewidth = width;
	}

	document.onmousemove=followmouse;

	newHTML = '<div style="padding: 0px; margin: 0px; background-color: #FFF; border: 2px solid #5b6781; width: '+currentimagewidth+'px; height: '+currentimageheight+'px;">';

	newHTML = newHTML + '<div style="padding: 7px; margin: 0px;">' + html + '</div>';

	newHTML = newHTML + '</div>';
	gettrailobjnostyle().innerHTML = newHTML;
	gettrailobj().display="inline";
}

function showtrailfromdiv2(theDiv,width,height){
	if (height > 0){
		currentimageheight = height;
	}
	
	if (width > 0){
		currentimagewidth = width;
	}
	
	var el = document.getElementById(theDiv);
	var html = "";
	
	if(el)
	{
		html = el.innerHTML;
	}

	document.onmousemove=followmouse;

	newHTML = '<div style="padding: 0px; margin: 0px; background-color: #FFF; border: 1px solid #5b6781; width: '+currentimagewidth+'px; height: '+currentimageheight+'px;">';

	newHTML = newHTML + '<div style="padding: 7px; margin: 0px;">' + html + '</div>';

	newHTML = newHTML + '</div>';
	gettrailobjnostyle().innerHTML = newHTML;
	gettrailobj().display="inline";
}

function showtrailtext(text,width,height){
	if (height > 0){
		currentimageheight = height;
	}
	
	if (width > 0){
		currentimagewidth = width;
	}

	document.onmousemove=followmouse;

	newHTML = '<div style="padding: 0px; margin: 0px; background-color: #FFF; border: 1px solid #5b6781; width: '+currentimagewidth+'px; height: '+currentimageheight+'px;">';

	newHTML = newHTML + '<div style="padding: 20px; margin: 0px;">' + text + '</div>';

	newHTML = newHTML + '</div>';
	gettrailobjnostyle().innerHTML = newHTML;
	gettrailobj().display="inline";
}

function showtrail(imagename,width,height){
	if (height > 0){
		currentimageheight = height;
	}
	
	if (width > 0){
		currentimagewidth = width;
	}

	document.onmousemove=followmouse;

	newHTML = '<div style="padding: 0px; margin: 0px; background-color: #FFF; border: 1px solid #5b6781; width: '+currentimagewidth+'px; height: '+currentimageheight+'px;">';

	newHTML = newHTML + '<div align="center" style="padding: 0px; margin: 0px;">';
	newHTML = newHTML + '<img src="' + imagename + '" border="0" style="margin: 0px; padding: 0px; vertical-align:top; width: '+currentimagewidth+'px; height: '+currentimageheight+'px;"></div>';

	newHTML = newHTML + '</div>';
	gettrailobjnostyle().innerHTML = newHTML;
	gettrailobj().display="inline";
}

function hidetrail(){
	gettrailobj().innerHTML = " ";
	gettrailobj().display="none"
	document.onmousemove=""
	gettrailobj().left="-500px"

}

function getScrollingPosition()
{
var position = [0, 0];
if (typeof window.pageYOffset != 'undefined')
{
position = [
window.pageXOffset,
window.pageYOffset
];
}
else if (typeof document.documentElement.scrollTop
!= 'undefined' && document.documentElement.scrollTop > 0)
{
position = [
document.documentElement.scrollLeft,
document.documentElement.scrollTop
];
}
else if (typeof document.body.scrollTop != 'undefined')
{
position = [
document.body.scrollLeft,
document.body.scrollTop
];
}
return position;
}

function followmouse(e){

	var xcoord=offsetfrommouse[0]
	var ycoord=offsetfrommouse[1]

	var docwidth=document.all? truebody().scrollLeft+truebody().clientWidth : pageXOffset+window.innerWidth-15
	var docheight=document.all? Math.min(truebody().scrollHeight, truebody().clientHeight) : Math.min(window.innerHeight)

	//if (document.all){
	//	gettrailobjnostyle().innerHTML = 'A = ' + truebody().scrollHeight + '<br>B = ' + truebody().clientHeight;
	//} else {
	//	gettrailobjnostyle().innerHTML = 'C = ' + document.body.offsetHeight + '<br>D = ' + window.innerHeight;
	//}
	
	var scrollpos = getScrollingPosition();

	if (typeof e != "undefined"){
		if (docwidth - e.pageX < (currentimagewidth + 38)){
			xcoord = e.pageX - xcoord - (currentimagewidth + 58); // Move to the left side of the cursor
		} else {
			xcoord += e.pageX;
		}
		if (docheight - e.pageY < (currentimageheight + 38)){
			ycoord += e.pageY - Math.max(0,(38 + currentimageheight + e.pageY - docheight - scrollpos[1]));
		} else {
			ycoord += e.pageY;
		}

	} else if (typeof window.event != "undefined"){
		if (docwidth - event.clientX < (currentimagewidth + 38)){
			xcoord = event.clientX + truebody().scrollLeft - xcoord - (currentimagewidth + 58); // Move to the left side of the cursor
		} else {
			xcoord += truebody().scrollLeft+event.clientX
		}
		if (docheight - event.clientY < (currentimageheight + 38)){
			ycoord += event.clientY + truebody().scrollTop - Math.max(0,(38 + currentimageheight + event.clientY - docheight));
		} else {
			ycoord += truebody().scrollTop + event.clientY;
		}
	}

	if(ycoord < 0) { ycoord = ycoord*-1; }
	gettrailobj().left=xcoord+"px"
	gettrailobj().top=ycoord+"px"

}