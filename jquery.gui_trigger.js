(function($){

    $.fn.gui_trigger = function(opts){

        var $el = $(this);
        var conf = $.extend({
            target: 'body'
        }, opts, $el.data());


        $(conf.target).on('change', this.selector, function(){
            console.log("autoinit", this);
        });

        $(selector).trigger('change');
    }

})(jQuery);

jQuery(function($){

    $('input.foobar').gui_trigger();

});
