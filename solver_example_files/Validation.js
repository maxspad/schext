function HasValue(str)
{
	if(str==null) return false;
	return (Trim(str) != "");
}

function IsLength(str, len)
{
	if(str==null) return false;
	return (str!=null && str.length==len);
}

var numb = '0123456789';
var lwr = 'abcdefghijklmnopqrstuvwxyz';
var upr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function IsValid(str, val) 
{
	if (str == null) return false;
	
	if (str == "") return true;
	
	for (i=0; i<str.length; i++)
	{
		if (val.indexOf(str.charAt(i),0) == -1) return false;
	}
	
	return true;
}

function IsNumeric(str) {return IsValid(str,numb);}

function IsLower(str) {return IsValid(str,lwr);}

function IsUpper(str) {return IsValid(str,upr);}

function IsAlpha(str) {return IsValid(str,lwr+upr);}

function IsAlphaNumeric(str) {return IsValid(str,lwr+upr+numb);}

function IsSqlSafe(str) //don't want to allow -- or /* */ sql comments, also must remember to encode single quotes ' => ''
{
	if(str==null) return false;
	return ((str.indexOf("--")==-1) && (str.indexOf("/*")==-1) && (str.indexOf("*/")==-1));
}

function Trim(sString) 
{
	while (sString.substring(0,1) == ' ' || sString.substring(0,1) == '\n'
	|| sString.substring(0,1) == '\r' || sString.substring(0,1) == '\t')
	{
		sString = sString.substring(1, sString.length);
	}
	while (sString.substring(sString.length-1, sString.length) == ' ' ||
	sString.substring(sString.length-1, sString.length) == '\n' ||
	sString.substring(sString.length-1, sString.length) == '\r' ||
	sString.substring(sString.length-1, sString.length) == '\t')
	{
		sString = sString.substring(0,sString.length-1);
	}

	return sString;
}

<!-- This script and many more are available free online at -->
<!-- The JavaScript Source!! http://javascript.internet.com -->

<!-- V1.1.3: Sandeep V. Tamhankar (stamhankar@hotmail.com) -->
<!-- Original:  Sandeep V. Tamhankar (stamhankar@hotmail.com) -->
<!-- Changes:
/* 1.1.4: Fixed a bug where upper ASCII characters (i.e. accented letters
international characters) were allowed.

1.1.3: Added the restriction to only accept addresses ending in two
letters (interpreted to be a country code) or one of the known
TLDs (com, net, org, edu, int, mil, gov, arpa), including the
new ones (biz, aero, name, coop, info, pro, museum).  One can
easily update the list (if ICANN adds even more TLDs in the
future) by updating the knownDomsPat variable near the
top of the function.  Also, I added a variable at the top
of the function that determines whether or not TLDs should be
checked at all.  This is good if you are using this function
internally (i.e. intranet site) where hostnames don't have to 
conform to W3C standards and thus internal organization e-mail
addresses don't have to either.
Changed some of the logic so that the function will work properly
with Netscape 6.

1.1.2: Fixed a bug where trailing . in e-mail address was passing
(the bug is actually in the weak regexp engine of the browser; I
simplified the regexps to make it work).

1.1.1: Removed restriction that countries must be preceded by a domain,
so abc@host.uk is now legal.  However, there's still the 
restriction that an address must end in a two or three letter
word.

1.1: Rewrote most of the function to conform more closely to RFC 822.

1.0: Original  */
// -->

<!-- Begin
function emailCheck (emailStr) {

if(emailStr==null) return false;

/* The following variable tells the rest of the function whether or not
to verify that the address ends in a two-letter country or well-known
TLD.  1 means check it, 0 means don't. */

var checkTLD=1;

/* The following is the list of known TLDs that an e-mail address must end with. */

var knownDomsPat=/^(com|net|org|edu|int|mil|gov|arpa|biz|aero|name|coop|info|pro|museum)$/;

/* The following pattern is used to check if the entered e-mail address
fits the user@domain format.  It also is used to separate the username
from the domain. */

var emailPat=/^(.+)@(.+)$/;

/* The following string represents the pattern for matching all special
characters.  We don't want to allow special characters in the address. 
These characters include ( ) < > @ , ; : \ " . [ ] */

var specialChars="\\(\\)><@,;:\\\\\\\"\\.\\[\\]";

/* The following string represents the range of characters allowed in a 
username or domainname.  It really states which chars aren't allowed.*/

var validChars="\[^\\s" + specialChars + "\]";

/* The following pattern applies if the "user" is a quoted string (in
which case, there are no rules about which characters are allowed
and which aren't; anything goes).  E.g. "jiminy cricket"@disney.com
is a legal e-mail address. */

var quotedUser="(\"[^\"]*\")";

/* The following pattern applies for domains that are IP addresses,
rather than symbolic names.  E.g. joe@[123.124.233.4] is a legal
e-mail address. NOTE: The square brackets are required. */

var ipDomainPat=/^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/;

/* The following string represents an atom (basically a series of non-special characters.) */

var atom=validChars + '+';

/* The following string represents one word in the typical username.
For example, in john.doe@somewhere.com, john and doe are words.
Basically, a word is either an atom or quoted string. */

var word="(" + atom + "|" + quotedUser + ")";

// The following pattern describes the structure of the user

var userPat=new RegExp("^" + word + "(\\." + word + ")*$");

/* The following pattern describes the structure of a normal symbolic
domain, as opposed to ipDomainPat, shown above. */

var domainPat=new RegExp("^" + atom + "(\\." + atom +")*$");

/* Finally, let's start trying to figure out if the supplied address is valid. */

/* Begin with the coarse pattern to simply break up user@domain into
different pieces that are easy to analyze. */

var matchArray=emailStr.match(emailPat);

if (matchArray==null) {

/* Too many/few @'s or something; basically, this address doesn't
even fit the general mould of a valid e-mail address. */

//alert("Email address seems incorrect (check @ and .'s)");
return false;
}
var user=matchArray[1];
var domain=matchArray[2];

// Start by checking that only basic ASCII characters are in the strings (0-127).

for (i=0; i<user.length; i++) {
if (user.charCodeAt(i)>127) {
//alert("Ths username contains invalid characters.");
return false;
   }
}
for (i=0; i<domain.length; i++) {
if (domain.charCodeAt(i)>127) {
//alert("Ths domain name contains invalid characters.");
return false;
   }
}

// See if "user" is valid 

if (user.match(userPat)==null) {

// user is not valid

//alert("The username doesn't seem to be valid.");
return false;
}

/* if the e-mail address is at an IP address (as opposed to a symbolic
host name) make sure the IP address is valid. */

var IPArray=domain.match(ipDomainPat);
if (IPArray!=null) {

// this is an IP address

for (var i=1;i<=4;i++) {
if (IPArray[i]>255) {
//alert("Destination IP address is invalid!");
return false;
   }
}
return true;
}

// Domain is symbolic name.  Check if it's valid.
 
var atomPat=new RegExp("^" + atom + "$");
var domArr=domain.split(".");
var len=domArr.length;
for (i=0;i<len;i++) {
if (domArr[i].search(atomPat)==-1) {
//alert("The domain name does not seem to be valid.");
return false;
   }
}

/* domain name seems valid, but now make sure that it ends in a
known top-level domain (like com, edu, gov) or a two-letter word,
representing country (uk, nl), and that there's a hostname preceding 
the domain or country. */

if (checkTLD && domArr[domArr.length-1].length!=2 && 
domArr[domArr.length-1].search(knownDomsPat)==-1) {
//alert("The address must end in a well-known domain or two letter " + "country.");
return false;
}

// Make sure there's a host name preceding the domain.

if (len<2) {
//alert("This address is missing a hostname!");
return false;
}

// If we've gotten this far, everything's valid!
return true;
}

//  End -->