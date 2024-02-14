if ('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0)
{
	window.addEventListener("touchstart", function(){
			var topLevelMenuLinks = document.getElementById("main-nav-top").querySelectorAll("a.main-nav__link:not(:last-child), a.main-nav__sublink--hasdrop");
			
			for (i = 0; i < topLevelMenuLinks.length; ++i) {
				topLevelMenuLinks[i].href = '#';
			}
		},
		{ once: true });
	
	if(window.PointerEvent) {
		window.addEventListener("pointerdown", function(e){
			if(e.pointerType=='touch' || e.pointerType=='pen')
			{
				var topLevelMenuLinks = document.getElementById("main-nav-top").querySelectorAll("a.main-nav__link:not(:last-child), a.main-nav__sublink--hasdrop");
				
				for (i = 0; i < topLevelMenuLinks.length; ++i) {
					topLevelMenuLinks[i].href = '#';
				}
			}
		},
		{ once: true });
	}
}