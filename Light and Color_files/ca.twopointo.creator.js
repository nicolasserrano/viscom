
function scrollWin(){
	$('html, body').animate({
	scrollTop: $("#flavorLogo").offset().top
	}, 1000, 'easeOutExpo');
}

function turnVideoCommentModeOn () {
	$('#videoCommentText').hide();
	$('#videoHold').animate( { width: "hide" }, 500, 'easeInQuint', function() {
		$('#videoHold').empty();
		$('#videoCommentVideo').show();
		$('#videoCommentHold').animate( { width: "show" }, 500, 'easeOutQuint');
		loadVideoComments();
		$( "#tabs" ).tabs('select', 2);
	});
}


function turnTextCommentModeOn () {
	$('#videoCommentVideo').hide();
	$('#videoHold').animate( { width: "hide" }, 500, 'easeInQuint', function() {
		$('#videoHold').empty();
		$('#videoCommentText').show();
		$('#videoCommentHold').animate( { width: "show" }, 500, 'easeOutQuint');
		loadVideoComments();
		$( "#tabs" ).tabs('select', 2);
	});
}


function turnCommentModeOff () {
	$('#videoCommentText, #videoCommentVideo, #videoCommentHold').hide();
	$('#videoHold').animate( { width: "show" }, 500, 'easeOutQuint', function () { });
	
}


function RestCache() {
	this.urlCache = new Array();
	this.getCachedObject = function(url) {
		if (url in this.urlCache) {
			return this.urlCache[url];
		} else {
			return null;
		}
	};
	
	this.inCache = function(url) {
		return (url in this.urlCache);
	};
	
	this.registerInCache = function(url, data) {
		this.urlCache[url] = data;
	};

}


function streamItemDecorator() {
        this.decorate = function (streamItem, containerTemplate) {


                currentContainer = $(containerTemplate).children().clone(true, true);
                if (currentContainer.find('.targetUrl').length) {
                        currentContainer.find('.targetUrl').attr({'href':streamItem.link, 'rel':streamItem.link});
                }
                if (currentContainer.find('.rootKey').length) {
                        currentContainer.find('.rootKey').html(streamItem.id);
                }
                if (currentContainer.find('.childSynopsis').length) {
                        currentContainer.find('.childSynopsis').html(streamItem.firstChildSynopsis);
                }
                if (currentContainer.find('.createdBy').length) {
                        currentContainer.find('.createdBy').html(streamItem.createdBy);
                }
                if (currentContainer.find('.ogImage').length) {
                        currentContainer.find('.ogImage').attr({'src':streamItem.picture, 'alt':streamItem.name});
                }
                if (currentContainer.find('.articleTitle').length) {
                        currentContainer.find('.articleTitle').html(streamItem.name);
                }
                if (currentContainer.find('.longDescription').length) {
                        currentContainer.find('.longDescription').html(streamItem.description);
                }
                if (currentContainer.find('.synopsis').length) {
                        currentContainer.find('.synopsis').html(streamItem.synopsis);
                }
                if (currentContainer.find('.keywords').length) {
                        currentContainer.find('.keywords').html(streamItem.keywords);
                }
                if (currentContainer.find('.title').length) {
                        currentContainer.find('.title').html(streamItem.name);
                }
                if (currentContainer.find('.rootKey').length) {
                        currentContainer.find('.rootKey').html(streamItem.rootKey);
                }
                if (currentContainer.find('.createdTime').length) {
                        currentContainer.find('.createdTime').html(streamItem.createdTime);
                }
                if (currentContainer.find('.rawAnalytics').length) {
                        currentContainer.find('.rawAnalytics').html(streamItem.analyticsHistory);
                }
                return $('<li></li>').addClass(streamItem.styleKey).append(currentContainer);
        };

}


function contentDecorator() {
	this.decorate = function (contentNode, containerTemplate) {
		currentContainer = $(containerTemplate).children().clone(true, true);
		if (currentContainer.find('.articleTitle').length) {
			currentContainer.find('.articleTitle').html(contentNode.articleTitle);
		}
		if (currentContainer.find('.longDescription').length) {
			currentContainer.find('.longDescription').html(contentNode.longDescription);
		}
		if (currentContainer.find('.synopsis').length) {
			currentContainer.find('.synopsis').html(contentNode.synopsis);
		}
		if (currentContainer.find('.keywords').length) {
			currentContainer.find('.keywords').html(contentNode.keywords);
		}
		if (currentContainer.find('.title').length) {
			currentContainer.find('.title').html(contentNode.title);
		}
		if (currentContainer.find('.rootKey').length) {
			currentContainer.find('.rootKey').html(contentNode.rootKey);
		}
		if (currentContainer.find('.displayTime').length) {
			currentContainer.find('.displayTime').html(contentNode.formattedDisplayTime);
		}
		if (currentContainer.find('.parentTitle').length) {
			currentContainer.find('.parentTitle').html(contentNode.parentNode.title);
		}
		if (currentContainer.find('.numberOfViews').length) {
			currentContainer.find('.numberOfViews').html(contentNode.numberOfViews);
		}
		if (currentContainer.find('.numberOfComments').length) {
			currentContainer.find('.numberOfComments').html(contentNode.numberOfComments);
		}
		if (currentContainer.find('.targetUrlText').length) {
			currentContainer.find('.targetUrlText').attr({'href':VIEW_PATH+contentNode.rootKey, 'rel':contentNode.rootKey}).html(contentNode.title);
		}
		if (currentContainer.find('.targetUrl').length) {
			currentContainer.find('.targetUrl').attr({'href':VIEW_PATH+contentNode.rootKey, 'rel':contentNode.rootKey});
		}
		if (currentContainer.find('.childTargetUrl').length) {
			currentContainer.find('.childTargetUrl').attr({'href':VIEW_PATH+contentNode.firstChildRootKey, 'rel':contentNode.firstChildRootKey});
		}
		if (currentContainer.find('.childSynopsis').length) {
			currentContainer.find('.childSynopsis').html(contentNode.firstChildSynopsis);
		}
		if (currentContainer.find('.createdBy').length) {
			currentContainer.find('.createdBy').html(contentNode.createdBy);
		}
		if (currentContainer.find('.ogImage').length) {
			currentContainer.find('.ogImage').attr({'src':contentNode.ogImage, 'alt':contentNode.title});
		}
		if (currentContainer.find('.parentOgImage').length) {
			currentContainer.find('.parentOgImage').attr({'src':contentNode.parentNode.ogImage, 'alt':contentNode.parentNode.title});
		}
		if (currentContainer.find('.duration').length) {
			duration = durationInMinutesAndSeconds(contentNode.duration);
			currentContainer.find('.duration').html(duration.minutes + ':' + duration.seconds);
		}
		if (currentContainer.find('.numChildren').length) {
			originalHtml = currentContainer.find(".numChildren").html();
			currentContainer.find(".numChildren").html(originalHtml + " " + contentNode.numChildren);
		}
		return $('<li></li>').addClass(contentNode.styleKey).append(currentContainer);
	};
}


function getUnorderedList() {
	return $('<ul></ul>');
}

function durationInMinutesAndSeconds(durationInMillis) {
	secVar0 = Math.floor(durationInMillis/1000);                           
	minVar = Math.floor(secVar0/60);  
	secVar = secVar0 % 60;
	secVar = String('0'+secVar).slice(-2);
	return {minutes: minVar, seconds: secVar};
}

// Takes the json object, and html decorator element (template), and a decorator function, and returns the decorated data.
function decorateRestReturn (jsonData, decoratorElement, decorator) {
  	var unorderedList = getUnorderedList();
  	
  	$.each(jsonData , function (key, elementData) {
  		unorderedList.append(decorator.decorate(elementData, decoratorElement));
  	});
	
  	return unorderedList;
}

function populateContainerList(postUrl, targetElement, decoratorElement, decorator, returnedElementsCount, callBack, overrideCache) {
	var restDataArrayIndex = encodeURIComponent(postUrl.substring(postUrl.lastIndexOf("restfuldispatch/")+16));

	$.ajax({
		url: postUrl,
		cache: true,
		dataType: "script",
		data: {
			returnedElementsCount: returnedElementsCount, 
			flavorKey: FLAVOR_KEY,
			restDataArrayIndex: restDataArrayIndex
		},
		success: function() {
			// If non-empty restData..
			if (!jQuery.isEmptyObject(REST_DATA_ARRAY[restDataArrayIndex])) {
				targetElement.append(decorateRestReturn(REST_DATA_ARRAY[restDataArrayIndex], decoratorElement, decorator)).fadeIn();
			} else {
				targetElement.addClass('emptyJsonObject').fadeIn();
			}
			
			if(callBack) {
			  	callBack();
		  	}
		}
	});
}

function displayContextPreviewWrapper (theElement) {
	theElement = theElement.parent().parent();
	$('#contextPreviewWrapper').show();
	
	if (theElement.find('a.targetUrl').length) {
		$('#contextPreviewWrapper').find('.startMediaPlay').attr({'href':theElement.find('a.targetUrl').attr('href')});
	} else if (theElement.find('a.childTargetUrl').length) {
		$('#contextPreviewWrapper').find('.startMediaPlay').attr({'href':theElement.find('a.childTargetUrl').attr('href')});
	}
	$('#contextPreviewWrapper').find('.contextPreviewTitle').html(theElement.find('.title').html());
	$('#contextPreviewWrapper').find('.contextPreviewParentChannelTitle').html(''+getLocale('CHANNEL')+' / <span class="black">'+theElement.find('.parentTitle').html()+'</span>');
	$('#contextPreviewWrapper').find('.contextPreviewParentPlaylistTitle').html(''+getLocale('PLAYLIST')+' / <span class="black">'+theElement.find('.parentTitle').html()+'</span>');
	$('#contextPreviewWrapper').find('.contextPreviewSynopsis').html(theElement.find('.synopsis').html());
	$('#contextPreviewWrapper').find('.contextPreviewImage').attr({'src':theElement.find('.ogImage').attr('src')});
	$('#contextPreviewWrapper').find('li.contextVideoStatsComments span').html(theElement.find('.numberOfComments').html());
	$('#contextPreviewWrapper').find('li.contextVideoStatsViews span').html(theElement.find('.numberOfViews').html());
//	$('#contextPreviewWrapper').find('li.contextVideoStatsLikes span').html(mediaObject.getLikeCount());
//	$('#contextPreviewWrapper').find('li.contextVideoStatsFavorited span').html(mediaObject.getFavoriteCount());
	$("#contextPreviewWrapper").position({
		  my: "left top",
		  at: "left top",
		  offset: "-25 -25",
		  of: theElement,
		  collision: "fit"
		});

}

function getLocale(wordKey) {
	if (localeSettings[wordKey]) return localeSettings[wordKey];
	else return wordKey;
}



function checkUserAgent(vs) {
    var pattern = new RegExp(vs, 'i');
    return !!pattern.test(navigator.userAgent);
}

function limitChars(textid, limit, infodiv)
{
	var text = $('#'+textid).val(); 
	var textlength = text.length;

	if(textlength > limit)
	{
		$('#' + infodiv).html('You cannot write more then '+limit+' characters!');
		$('#'+textid).val(text.substr(0,limit));
		return false;
	}
	else
	{
		$('#' + infodiv).html((limit - textlength) +' characters left.');
		return true;
	}
}



(function($){
	
	$.fn.populateByKeyword = function (keywords, decoratorElement, returnedElementsCount, callBack) {
		var element = this;
		var postUrl = SCRIPT_CDN_URL+'/restfuldispatch/nodeListByKeywords/'+keywords;
		var decorator = new contentDecorator();
		element.html('').hide();
		populateContainerList(postUrl, element, decoratorElement, decorator, returnedElementsCount, callBack);
	};

	$.fn.populateByNetworkStream = function (streamDirective, decoratorElement, returnedElementsCount, callBack) {
		var element = this;
		var postUrl = SCRIPT_CDN_URL+'/restfuldispatch/networkStream/'+streamDirective;
		var decorator = new streamItemDecorator();
		element.html('').hide();
		populateContainerList(postUrl, element, decoratorElement, decorator, returnedElementsCount, callBack);
	};

	$.fn.populateByShare15 = function (url, callBack) {
		var element = this;
		$.ajax({
			url: url,
			cache: false,
			crossDomain: true,
			dataType: "html",
			data: {
				flavorKey: FLAVOR_KEY
			},
			success: function(html) {
					element.append(html);
				if(callBack) {
					callBack();
				}
			}
		});

	};

	$.fn.populateByNumberOfViews = function (parameters, decoratorElement, returnedElementsCount, callBack) {
		var element = this;
	    var postUrl = SCRIPT_CDN_URL+'/restfuldispatch/nodeListByNumberOfViews/'+parameters;
	    var decorator = new contentDecorator();
	    element.html('').hide();
	    populateContainerList(postUrl, element, decoratorElement, decorator, returnedElementsCount, callBack);

	};

	$.fn.populateByAnnouncement = function (parameters, decoratorElement, returnedElementsCount, callBack) {
		var element = this;
	    var postUrl = SCRIPT_CDN_URL+'/restfuldispatch/nodeListByAnnouncement/'+parameters;
	    var decorator = new contentDecorator();
	    element.html('').hide();
	    populateContainerList(postUrl, element, decoratorElement, decorator, returnedElementsCount, callBack);

	};

	$.fn.populateByLatest = function (keywords, decoratorElement, returnedElementsCount, callBack) {
		var element = this;
	    var postUrl = SCRIPT_CDN_URL+'/restfuldispatch/nodeListByLatest/'+keywords;
	    var decorator = new contentDecorator();
	    element.html('').hide();
	    populateContainerList(postUrl, element, decoratorElement, decorator, returnedElementsCount, callBack);

	};

	$.fn.populateByChildren = function (rootKey, decoratorElement, returnedElementsCount, callBack) {
		var element = this;
		if (!rootKey) {
			rootKey = CURRENTNODE_ROOT_KEY;
		}
	    var postUrl = SCRIPT_CDN_URL+'/restfuldispatch/nodeListByChildren/'+rootKey;
	    var decorator = new contentDecorator();
	    element.html('').hide();
	    populateContainerList(postUrl, element, decoratorElement, decorator, returnedElementsCount, callBack);

	};
	
	$.fn.populateByChildrenArchive = function (rootKey, archiveFilterKeyword, decoratorElement, returnedElementsCount, callBack) {
		var element = this;
		if (!rootKey) {
			rootKey = CURRENTNODE_ROOT_KEY;
		}
	    var postUrl = SCRIPT_CDN_URL+'/restfuldispatch/nodeListByChildren/'+encodeURIComponent(rootKey+'&keywords='+archiveFilterKeyword);
	    var decorator = new contentDecorator();
	    element.html('').hide();
	    populateContainerList(postUrl, element, decoratorElement, decorator, returnedElementsCount, callBack);

	};	
	
	$.fn.populateByKeywordAndParent = function (parentId, keywords, decoratorElement, returnedElementsCount, callBack) {
		var element = this;
	    var postUrl = SCRIPT_CDN_URL+'/restfuldispatch/nodeListByKeywordAndParent/'+ encodeURIComponent(parentId+'&keywords='+keywords);
	    var decorator = new contentDecorator();
	    element.html('').hide();
	    populateContainerList(postUrl, element, decoratorElement, decorator, returnedElementsCount, callBack);
	};	

	$.fn.populateByGroupKey = function (groupKey, decoratorElement, returnedElementsCount, callBack) {
		var element = this;
	    var postUrl = SCRIPT_CDN_URL+'/restfuldispatch/nodeListByGroupKey/'+groupKey;
	    var decorator = new contentDecorator();
	    element.html('').hide();
	    populateContainerList(postUrl, element, decoratorElement, decorator, returnedElementsCount, callBack);
	};
	
	$.fn.populateByStyleKey = function (styleKey, decoratorElement, returnedElementsCount, callBack) {
		var element = this;
	    var postUrl = SCRIPT_CDN_URL+'/restfuldispatch/nodeListByStyleKey/'+styleKey;
	    var decorator = new contentDecorator();
	    element.html('').hide();
	    populateContainerList(postUrl, element, decoratorElement, decorator, returnedElementsCount, callBack);
	};
	
	$.fn.populateFromNodeGroup = function (groupKey, lastElementDispayedId, decoratorElement, returnedElementsCount, callBack) {
		var element = this;
	    var postUrl = SCRIPT_CDN_URL+'/restfuldispatch/nextNodeFromGroup/'+groupKey+'&last='+lastElementDispayedId;
	    var decorator = new contentDecorator();
	    element.html('').hide();
	    populateContainerList(postUrl, element, decoratorElement, decorator, returnedElementsCount, callBack);
	};
	
})(jQuery);



if (typeof Object.create !== 'function') {
	Object.create = function (o) {
		function F() {}
		F.prototype = o;
		return new F();
	};
}

(function($) {
	// ie alias
	var headache = $.browser.msie && $.browser.version.substr(0,1)<9;

	// carousel
	var Carousel = {
		settings: {
			itemsPerPage: 1,
			itemsPerTransition: 1,
			noOfRows: 1,
			pagination: true,
			nextPrevLinks: true,
			speed: 'normal',
			easing: 'swing'
		},
		init: function(el, options) {
			if (!el.length) {return false;}
			this.options = $.extend({}, this.settings, options);
			this.itemIndex = 0;	
			this.container = el;
			this.runner = this.container.find('ul');
			this.items = this.runner.children('li');
			this.noOfItems = this.items.length;
			this.setRunnerWidth();
			if (this.noOfItems <= this.options.itemsPerPage) {return false;} // bail if there are too few items to paginate
			this.insertMask();
			this.noOfPages = Math.ceil((this.noOfItems - this.options.itemsPerPage) / this.options.itemsPerTransition) + 1;
			if (this.options.pagination) {this.insertPagination();}
			if (this.options.nextPrevLinks) {this.insertNextPrevLinks();}
			this.updateBtnStyles();
		},
		insertMask: function() {
			this.runner.wrap('<div class="mask" />');
			this.mask = this.container.find('div.mask');

			// set mask height so items can be of varying height
			var maskHeight = this.runner.outerHeight(true);
			this.mask = this.container.find('div.mask');
			this.mask.height(maskHeight);
		},
		setRunnerWidth: function() {
			this.noOfItems = Math.round(this.noOfItems / this.options.noOfRows);
			var width =  this.items.outerWidth(true) * this.noOfItems;
			this.runner.width(width);
		},
		insertPagination: function() {
			var i, links = [];
			this.paginationLinks = $('<ol class="pagination-links" />');
			for (i = 0; i < this.noOfPages; i++) {
				links[i] = '<li><a href="#item-' + i + '">' + (i + 1) + '</a></li>';
			}
			this.paginationLinks
				.append(links.join(''))
				.appendTo(this.container)
				.find('a')
					.bind('click.carousel', $.proxy(this, 'paginationHandler'));
		},
		paginationHandler: function(e) {
			this.itemIndex = e.target.hash.substr(1).split('-')[1] * this.options.itemsPerTransition;
			this.animate();
			return false;
		},
		insertNextPrevLinks: function() {
			this.prevLink = $('<a href="#" class="prev">Prev</a>')
								.bind('click.carousel', $.proxy(this, 'prevItem'))
								.appendTo(this.container);
			this.nextLink = $('<a href="#" class="next">Next</a>')
								.bind('click.carousel', $.proxy(this, 'nextItem'))
								.appendTo(this.container);
		},
		nextItem: function() {
			this.itemIndex = this.itemIndex + this.options.itemsPerTransition;
			this.animate();
			return false;
		},
		prevItem: function() {
			this.itemIndex = this.itemIndex - this.options.itemsPerTransition;
			this.animate();
			return false;
		},
		updateBtnStyles: function() {
			if (this.options.pagination) {
				this.paginationLinks
					.children('li')
						.removeClass('current')
						.eq(Math.ceil(this.itemIndex / this.options.itemsPerTransition))
							.addClass('current');
			}

			if (this.options.nextPrevLinks) {
				this.nextLink
					.add(this.prevLink)
						.removeClass('disabled');
				if (this.itemIndex === (this.noOfItems - this.options.itemsPerPage)) {
					this.nextLink.addClass('disabled');
				} 
				else if (this.itemIndex === 0) {
					this.prevLink.addClass('disabled');
				}
			}
		},
		animate: function() {
			var nextItem, pos;
			// check whether there are enough items to animate to
			if (this.itemIndex > (this.noOfItems - this.options.itemsPerPage)) {
				this.itemIndex = this.noOfItems - this.options.itemsPerPage; // go to last panel - items per transition
			}
			if (this.itemIndex < 0) {
				this.itemIndex = 0; // go to first
			}
			nextItem = this.items.eq(this.itemIndex);
			pos = nextItem.position();
			
			if (headache) {
				this.runner
					.stop()
					.animate({left: -pos.left}, this.options.speed, this.options.easing);
			}
			else {
				this.mask
					.stop()
					.animate({scrollLeft: pos.left}, this.options.speed, this.options.easing);
			}
			this.updateBtnStyles();
		}
	};

	// bridge
	$.fn.carousel = function(options) {
		return this.each(function() {
			var obj = Object.create(Carousel);
			obj.init($(this), options);
			$.data(this, 'carousel', obj);
		});
	};
})(jQuery);





$(document).ready(function() {
	$('a.startMediaPlay').live('click', function () {
		var theLink = $(this);
		$('html, body').animate({
			scrollTop: $("body").offset().top
			}, 1000, 'easeOutExpo', function () {
				window.location = theLink.attr('href');
			});
		return false;
	});


	$("#contextPreviewWrapper").hover(function () {}, function () {$(this).hide();$(this).find('img').attr({'src':''});});

	$("#contextPreviewWrapper").click(function () {
		if (checkUserAgent('iphone') || checkUserAgent('ipad')) {
			$(this).hide();
		}
	});
	
	
	
	$('a.mediaLink').live('click', function () {
		if (checkUserAgent('iphone') || checkUserAgent('ipad')) {
			displayContextPreviewWrapper($(this));
			return false;
		} 
	});

	
	$('a.showContextPreview').live('mouseover', function () {
    	displayContextPreviewWrapper($(this));
    	return false;
	});
	
    $('.mediaInfoBox').live('mouseover', function() {
	    	$(this).find('.mediaThumbPlayButton').show();
    });
	
    $('.mediaInfoBox').live('mouseout', function() {
	    	$(this).find('.mediaThumbPlayButton').hide();
    });
	
    $('.mediaThumbContainer').live('mouseover', function() {
		if (checkUserAgent('iphone') || checkUserAgent('ipad')) {
			// do nothing yet
		} else {
	    	$(this).find('.mediaThumbPlayButton').show();
	    	$(this).find('.contextPreviewInfo').show();
		}

    });
    
    $('.mediaThumbContainer').live('mouseleave', function() {
    	$(this).find('.mediaThumbPlayButton').hide();
    	$(this).find('.contextPreviewInfo').hide();
    });


	$("#mvnLogo").click(function() {
			$(".mvnChannelsNav")
    var slideToggle = this;
    if ($(".mvnChannelsNav").is(':visible')) {
        $(".mvnChannelsNav").slideUp(function() {
            $(slideToggle).removeClass('activeMvnNetworkSlideDown'); 
        }); 
    }     
    else {
        $(".mvnChannelsNav").slideDown();
        $(slideToggle).addClass('activeMvnNetworkSlideDown'); 
    }
});






//   $('p.articleLinkActivator').click( function(){ $('div.slideOutNav').css({'display': 'block'}); });



});
