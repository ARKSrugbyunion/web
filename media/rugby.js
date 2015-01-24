/******* VARIABLES *********/

var gstrActiveLayer = ""
var is;

/******* Browser detection *********/
function Is (){
    var agt=navigator.userAgent.toLowerCase();
    this.major		= parseInt(navigator.appVersion);
    this.minor		= parseFloat(navigator.appVersion);
    this.nav		= ((agt.indexOf('mozilla')!=-1) && (agt.indexOf('spoofer')==-1) && (agt.indexOf('compatible') == -1) && (agt.indexOf('opera')==-1) && (agt.indexOf('webtv')==-1) && (agt.indexOf('hotjava')==-1));
    this.nav4		= (this.nav && (this.major == 4));
    this.nav6up		= (this.nav && (this.major >= 5));
    this.ie			= ((agt.indexOf("msie") != -1) && (agt.indexOf("opera") == -1));
    this.ie4		= (this.ie && (this.major == 4) && (agt.indexOf("msie 5")==-1) );
    this.ie4up		= (this.ie && (this.major >= 4));
    this.mac		= (agt.indexOf("mac")!=-1);
}
is = new Is(); 
/******* End Browser detection ******/		

function Popup(strURL, intWidth, intHeight)	
{
	var intLeft = (screen.width - intWidth) / 2;
	var intTop = (screen.height - intHeight - 35) / 2;
	NewChild = window.open(strURL,'_blank','toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=1,resizable=1,width=' + intWidth + ',height=' + intHeight + ',top=' + intTop + ',left=' + intLeft)
}

function PopupGallery(strURL)	
{
	NewChild = window.open(strURL,'gallery','toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=1,resizable=1,width=600,height=400,top=10,left=10')	
//	var intScreenWidth = screen.width //Users screen width
//	var intScreenHeight = screen.height //Users screen height
//	var blnScrollBar = "0"
/*
	if (
	intWidth = intWidth + 30
	intHeight = intHeight + 140
	var intLeft = (intScreenWidth - intWidth) / 2;
	var intTop = (intScreenHeight - intHeight - 35) / 2;


	if (intScreenWidth < intWidth){
		intWidth = intScreenWidth - 80;
		intLeft = 5;
		blnScrollBar = "1"
	}
	if (intScreenHeight < intHeight){
		intHeight = intScreenHeight - 80;
		intTop = 5;
		blnScrollBar = "1"
	}
*/	

}

// ***** BANNER ADD SCRIPT *********

var intBannerNo = 0;
var intTotalBanners = 0;
var bannerAdds = new Array();
var intOldAdd;
var intAddDuration = 5000; //Time between Banner adds [in mIlliseconds]
var strContent
var blnIsBanners = false

function BannerAd(imageSRC,strURL){
	this.imageSRC = imageSRC;
	this.strURL = strURL;
}
function addBanner(imageSRC,strURL){
	bannerAdds [bannerAdds .length] = new BannerAd (imageSRC,strURL);
	intTotalBanners++;
	blnIsBanners = true;
}

function WriteBannerAdd(){
	if (blnIsBanners){
		if (is.ie4up){ // IE get banner rotation
			document.write('<span id="BannerImage" name="BannerImage"></span>');
			PopulateSpan()
		}else{	// Everyone else doesnt
			intBannerNo = GetBannerNumber()
			document.write('<a href="' + bannerAdds[intBannerNo].strURL + '" target="_blank"><image src="' + bannerAdds[intBannerNo].imageSRC +'" border="0"></a>')
		}
	}	
}
function PopulateSpan(){
	var spanObj = document.all.BannerImage
	intBannerNo = GetBannerNumber()
	while (intOldAdd == intBannerNo){
		intBannerNo = GetBannerNumber()
	}	
	strContent = '<a href="' + bannerAdds[intBannerNo].strURL + '" target="_blank"><image src="' + bannerAdds[intBannerNo].imageSRC +'" border="0"></a>'
	spanObj.innerHTML = strContent
	if (intTotalBanners > 1){
		setTimeout("PopulateSpan()",intAddDuration)
	}
	intOldAdd = intBannerNo
}
function GetBannerNumber(){
	return Math.floor(Math.random() * intTotalBanners)
}




function SwapNavClass(strID, strClassName){
	//alert(strID + " " + strClassName)
	obj = getObj(strID)
	obj.className = strClassName;
}

function getObj(id){
	if(document.getElementById){
		return document.getElementById(id);
	}else{
		return document.all[id];
	} 
}
function GoURL(strURL){
	document.location.href=strURL
}

