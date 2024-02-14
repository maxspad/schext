var existingOnLoad = null;

if(typeof document.body.onload == "function") {
	existingOnLoad = document.body.onload;
}

window.onload = function() {
    /**/
    /* page */
    /**/
    
    /**/
    /* secondary nav */
    /**/
    /*jQuery('.secondary-nav__title--clickable').on('click', function() {
        jQuery(this).next().slideToggle(250);
        jQuery(this).toggleClass('secondary-nav__title--opened');
    });*/
    
     jQuery('.secondary-nav__title--clickable').click(function() {
        jQuery(this).next().slideToggle(250);
        jQuery(this).toggleClass('secondary-nav__title--opened');
        
        var link_accord = jQuery(this).attr("data-accord_class");
        var opened = jQuery(this).hasClass('secondary-nav__title--opened') ? 1 : 0;
        jQuery.ajax({
            url: 'ajax_link_accordion_update.php',
            type: 'POST',
            data: {link_accord: link_accord, opened: opened}
        })
    });
    
    jQuery('.data-nav__title--clickable').click(function() {
        jQuery(this).next().slideToggle(250);
        jQuery(this).toggleClass('data-nav__title--opened');
    });
    
    /**/
    /* page title */
    /**/
    if( jQuery('.page-title').length ) {
        jQuery('.content').css('margin-top', 40 + jQuery('.page-title').outerHeight());
    }
    else {
        jQuery('.content').css('margin-top', 40 + jQuery('.content__main > h3').outerHeight());
    }
    
    jQuery('html').get(0).style.setProperty("--print-top",'-' + jQuery('.content').css('margin-top'));
    
    
    /**/
    /* multiselect */
    /**/
    /* //commented out by Blake on 8/11/20 as we are not using the dreamten multiselect inputs yet, so this avoids having to make this code work with jquery 1.3.2 or 1.4.2 that we have in use in places
    jQuery('.checkbox__input').on('change', function() {
        var lbl = '';
        var mltslct = jQuery(this).closest('.multiselect');
        var tggl = mltslct.find('.multiselect__toggle');
        var amnt = mltslct.find('.checkbox__input:checked').length;
        
        console.log(amnt);
        if (amnt > 1) {
            lbl = amnt + ' selected';
        }
        else if (amnt > 0) {
            lbl = mltslct.find('.checkbox__input:checked ~ .checkbox__label').text();
        }
        else {
            lbl = tggl.data('placeholder');
        }
        tggl.text(lbl);
    });
    jQuery('.multiselect__search').on('input', function() {
        var phrs = jQuery(this).val().toLowerCase();
        var mltslct = jQuery(this).closest('.multiselect');
        mltslct.find('.checkbox__label').each(function() {
            console.log(jQuery(this).text().indexOf(phrs));
            if( jQuery(this).text().toLowerCase().indexOf(phrs) == -1 ) {
                jQuery(this).parent().hide();
            }
            else {
                jQuery(this).parent().show();
            }
        });
    });
    jQuery('.multiselect__toggle').on('click', function() {
        jQuery(this).next().toggleClass('multiselect__dropdown--active');
    });
    jQuery('.multiselect__link--all').on('click', function() {
        var mltslct = jQuery(this).closest('.multiselect');
        mltslct.find('.checkbox__input').prop('checked', true);
        mltslct.find('.checkbox__input').eq(0).trigger('change');
    });
    jQuery('.multiselect__link--clear').on('click', function() {
        var mltslct = jQuery(this).closest('.multiselect');
        mltslct.find('.checkbox__input').prop('checked', false);
        mltslct.find('.checkbox__input').eq(0).trigger('change');
    });
    jQuery('.multiselect__link--close').on('click', function() {
        jQuery(this).closest('.multiselect__dropdown').removeClass('multiselect__dropdown--active');
    });*/
    
    /* Pull in any existing body onload tags */
    if(existingOnLoad !== null)
    	existingOnLoad();
}