	function showWaitPanel(panelToHide, panelToShow)
	{
		var buttonsPanel = $('#'+panelToHide);
		var waitPanel = $('#'+panelToShow);
		
		if(buttonsPanel != null && waitPanel != null)
		{
			buttonsPanel.hide();
			waitPanel.show();
		}
	}
	
	function swapElements(elToHide, elToShow)
	{
		var toHide = $('#'+elToHide);
		var toShow = $('#'+elToShow);
		
		if(toHide != null && toShow != null)
		{
			toHide.hide();
			toShow.show();
		}
	}
	
	function toggleElement(elName)
	{
		var el = $('#'+elName);
		
		if(el != null)
		{
			if(el.css("display") == 'none')
			{
				el.show();
			}
			else
			{
				el.hide();
			}
		}
	}
	
	function setElementVisible(elName,visible)
	{
		var el = $('#'+elName);
		
		if(el != null)
		{
			if(visible)
			{
				el.show();
			}
			else
			{
				el.hide();
			}
		}
	}
	
	function toggleElementsByClass(className,linkID,linkShowHTML,linkHideHTML)
	{
	  	var els = $('.'+className);
	  	
	  	if(els != null && els.length > 0)
	  	{
			var i;
			
			//isVisible based on first element of this class
			var isVisible = (els[0].css("display") == 'none') ? false : true;
			
			for (i=0;i<els.length;i++)
			{
				if(els[i].css("display") == 'none')
				{
					els[i].show();
				}
				else
				{
					els[i].hide();
				}
			}
			
			if(linkID != null && linkID != "" && linkShowHTML != null && linkShowHTML != "" && linkHideHTML != null && linkHideHTML != "")
			{
				var theLink = $('#'+linkID);
				
				if(theLink != null)
				{
				  	if(theLink.innerHTML == linkShowHTML)
				  	{
						theLink.innerHTML = linkHideHTML;
					}
					else if(theLink.innerHTML == linkHideHTML)
					{
					  	theLink.innerHTML = linkShowHTML;
					}
					//else base it on the first element
					else if(isVisible)
					{
						theLink.innerHTML = linkHideHTML;
					}
					else
					{
						theLink.innerHTML = linkShowHTML;
					}
				}
			}
		}
	}
	
	function toggleElementsByClass2(className)
	{
	  	$('.'+className).toggle();
	}
	
	function getCheckboxGroupByName(name)
	{
		return $("input[type='checkbox'][name='"+name+"']");
	}
	
	function setCheckboxGroupEnabledByName(name,enabled)
	{
		if(enabled)
			$("input[type='checkbox'][name='"+name+"']").removeAttr("disabled");
		else
			$("input[type='checkbox'][name='"+name+"']").attr("disabled","disabled");
	}
	
	function setCheckboxGroupCheckedByName(name,isChecked)
	{
		if(isChecked)
			$("input[type='checkbox'][name='"+name+"']").attr("checked",true);
		else
			$("input[type='checkbox'][name='"+name+"']").attr("checked",false);
	}
	
	function setElementsByClassVisible(className,isVisible)
	{
		if(isVisible)
	  		var els = $('.'+className).show();
	  	else
	  		var els = $('.'+className).hide();
	}
	
	function htmlspecialchars(str)
	{
		if (typeof(str) == "string")
		{
			str = str.replace(/&/g, "&amp;"); /* must do &amp; first */
			str = str.replace(/"/g, "&quot;");
			str = str.replace(/'/g, "&#039;");
			str = str.replace(/</g, "&lt;");
			str = str.replace(/>/g, "&gt;");
		}
		return str;
	}
	
	function showOnZero(userID,elemID)
	{
		var value = $("#"+userID).prop("value");
		var elem = $("#"+elemID);
		if(value == 0 && value != null && value != "")
		{
			elem.show();
		}
		else
		{
			elem.hide();
		}
	}