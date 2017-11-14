
// Created on Aug 19, 2009 by nhorvath
// TWOPOINTO INC.
// All Rights Reserved - Unauthorized Use Prohibited
// For information contact licensing@twopointo.com
 

var g_callbackSpan;
var g_followUpFunction;
var g_urlHistory = new Array();


function makePOSTRequest(url, parameters, callbackSpan, followUpFunction) {
   g_callbackSpan = callbackSpan;
   g_followUpFunction = followUpFunction;
   http_request = false;
   if (window.XMLHttpRequest) { // Mozilla, Safari,...
      http_request = new XMLHttpRequest();
      if (http_request.overrideMimeType) {
      	// set type accordingly to anticipated content type
         //http_request.overrideMimeType('text/xml');
         http_request.overrideMimeType('text/html');
      }
   } else if (window.ActiveXObject) { // IE
      try {
         http_request = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (e) {
         try {
            http_request = new ActiveXObject("Microsoft.XMLHTTP");
         } catch (e) {}
      }
   }
   if (!http_request) {
      alert('Cannot create XMLHTTP instance');
      return false;
   }
   
   http_request.onreadystatechange = alertContents;
   http_request.open('POST', url, true);
   http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
   http_request.setRequestHeader("Content-length", parameters.length);
   http_request.setRequestHeader("Connection", "close");
   http_request.send(parameters);
}


function alertContents() {
  if (http_request.readyState == 4) {
      if (http_request.status == 200) {
		 if (document.getElementById(g_callbackSpan)) {
	         result = http_request.responseText;
	         document.getElementById(g_callbackSpan).innerHTML = result;
         }
         eval(g_followUpFunction);
      } else {
         throw ('TwoPointo Ajax Error: - could not perform post');
      }
   }
}


function twoPointOAjaxFormProcessor(theFormId, actionUrl, preProcessorFunction, followUpFunction, callbackSpan) {
	var parameterString = '';

	if (theFormId) {
	  if (verifyForm(document.getElementById(theFormId))) {
		  // get element array using the specified preProcessorFunction
		  argumentHash = eval(preProcessorFunction);
		  
		  for (var fieldName in argumentHash) {
		  	parameterString += fieldName+"="+encodeURIComponent(argumentHash[fieldName])+"&";
		  }
	  } else {
	  	  return false;
	  }
	}
	else {
		argumentHash = eval(preProcessorFunction);
		  
		for (var fieldName in argumentHash) {
		  	parameterString += fieldName+"="+encodeURIComponent(argumentHash[fieldName])+"&";
		}
	}
	
	// to avoid caching
	parameterString += "nxtilepost=true&decache=" + (Math.round((Math.random()*9)+1));
	
	 makePOSTRequest(actionUrl, parameterString, callbackSpan, followUpFunction);


}


function twoPointOTileLoader(targetAction, targetSpan, followUpFunction, title) {

	if (title) {
		var elementIndex = g_urlHistory.length;
	    g_urlHistory[elementIndex] = new Array();
	    
	    g_urlHistory[elementIndex]['targetAction'] = targetAction;
	    g_urlHistory[elementIndex]['targetSpan'] = targetSpan;
	    g_urlHistory[elementIndex]['followUpFunction'] = followUpFunction;
	    g_urlHistory[elementIndex]['title'] = title;
    	updateBreadCrumbs();
    }
   // var callAudit = 'twoPointOAjaxFormProcessor(\''+theFormId+, actionUrl, preProcessorFunction, followUpFunction, callbackSpan)';
	var parameterString = '';
	twoPointOAjaxFormProcessor('', targetAction, '', followUpFunction,  targetSpan);
	
}


function preProcessFormData () {
	var formFields = new Array();
	
	if (typeof tinyMCE !== "undefined") { 
		tinyMCE.triggerSave(); 
	}

	for(i=0; i<theForm.elements.length; i++) {
		if (theForm.elements[i].type == "radio") {
			if (theForm.elements[i].checked) {
         		formFields[theForm.elements[i].name] = theForm.elements[i].value;
         	}
		}
		else if (theForm.elements[i].type == "checkbox") {
			if (theForm.elements[i].checked) {
         		formFields[theForm.elements[i].name] = 1;
         	}
         	else {
				formFields[theForm.elements[i].name] = 0;
			}
        } 
        else {
         	formFields[theForm.elements[i].name] = theForm.elements[i].value;
        }
  	} 
	
	return formFields;
}


function showSaveProgress() {

}

function hideSaveProgress() {

}

function loadContent(elementSelector, sourceUrl) {
	$(""+elementSelector+"").load(""+sourceUrl+"");
}


/********** AUTO LOGOFF WITH TIMEOUT **********/


// adjust this value if necessary
var timer;

function resetLogoutInterval (logoutIntervalMinutes, url) {
	clearInterval(timer);

	timer = setInterval("autoLogout('"+url+"')", logoutIntervalMinutes*60*1000);
}


function autoLogout (url) {
	window.location=url;
}


/********** DATE PICKER **********/


$(".datePickerYear, .datePickerMonth").live('change', function() {
	id = $(this).attr('id');
	
	// Date comes in a trio of 'selects' with id's: [idPrefix]_year, [idPrefix]_month, [idPrefix]_day
	idPrefix = id.substr(0, id.lastIndexOf('_'));
	year = $("#"+idPrefix+"_year").val();
	month = $("#"+idPrefix+"_month").val();
	day = $("#"+idPrefix+"_day").val();
	daysInSelectedMonth = daysInMonth(month, year);
	
	// Make sure that the previously selected day is not larger than the total number of days for the newly selected month
	if (day > daysInSelectedMonth) day = daysInSelectedMonth;
	
	if (month != "" && year != "") {
		var options = '<option value=""></option>';
		
		for (var i = 1; i <= daysInSelectedMonth; i++) {
			options += '<option value="'+i+'"';
			if (i == day) options += ' selected';
			options += '>'+i+'</option>';
		}
		
		$("#"+idPrefix+"_day").html(options);
	}
});


function daysInMonth(iMonth, iYear)
{
	return 32 - new Date(iYear-1, iMonth-1, 32).getDate();
}

// Used by getCookies()
if (typeof String.prototype.trimLeft !== "function") {
    String.prototype.trimLeft = function() {
        return this.replace(/^\s+/, "");
    };
}

//Used by getCookies()
if (typeof String.prototype.trimRight !== "function") {
    String.prototype.trimRight = function() {
        return this.replace(/\s+$/, "");
    };
}

//Used by getCookies()
if (typeof Array.prototype.map !== "function") {
    Array.prototype.map = function(callback, thisArg) {
        for (var i=0, n=this.length, a=[]; i<n; i++) {
            if (i in this) a[i] = callback.call(thisArg, this[i]);
        }
        return a;
    };
}

function getCookies() {
    var c = document.cookie, v = 0, cookies = {};
    if (document.cookie.match(/^\s*\$Version=(?:"1"|1);\s*(.*)/)) {
        c = RegExp.$1;
        v = 1;
    }
    if (v === 0) {
        c.split(/[,;]/).map(function(cookie) {
            var parts = cookie.split(/=/, 2),
                name = decodeURIComponent(parts[0].trimLeft()),
                value = parts.length > 1 ? decodeURIComponent(parts[1].trimRight()) : null;
            cookies[name] = value;
        });
    } else {
        c.match(/(?:^|\s+)([!#$%&'*+\-.0-9A-Z^`a-z|~]+)=([!#$%&'*+\-.0-9A-Z^`a-z|~]*|"(?:[\x20-\x7E\x80\xFF]|\\[\x00-\x7F])*")(?=\s*[,;]|$)/g).map(function($0, $1) {
            var name = $0,
                value = $1.charAt(0) === '"'
                          ? $1.substr(1, -1).replace(/\\(.)/g, "$1")
                          : $1;
            cookies[name] = value;
        });
    }
    return cookies;
}

function getCookie(name) {
    return getCookies()[name];
}

function followUpGeneric () {

}


function setCookie( name, value, expires, path, domain, secure ) {
	// set time, it's in milliseconds
	var today = new Date();
	today.setTime( today.getTime() );
	
	if ( expires ) {
		expires = expires * 1000 * 60 * 60 * 24;
	}
	var expires_date = new Date( today.getTime() + (expires) );
	
	document.cookie = name + "=" +escape( value ) +
	( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) +
	( ( path ) ? ";path=" + path : "" ) +
	( ( domain ) ? ";domain=" + domain : "" ) +
	( ( secure ) ? ";secure" : "" );
}


function deleteCookie( name, path, domain ) {
if ( getCookie( name ) ) document.cookie = name + "=" +
( ( path ) ? ";path=" + path : "") +
( ( domain ) ? ";domain=" + domain : "" ) +
";expires=Thu, 01-Jan-1970 00:00:01 GMT";
}

