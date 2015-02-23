;(function($){

    var defConfig = {
        // input-event for observing
        event: 'change',
        // event owns
        controls: 'input:not([type=text]), select',
        // elements for observing
        elements: '[data-condition]',
        // Defauls handler for visibility check
        handler: function(){
            var $this = $(this);
            var defaultData = {
                condition: false
            };
            var data = $.extend(defaultData, $this.data());
            var condition = data.condition;
            if(!condition){
                return false;
            }
            var $matched = $(condition);
            return ($matched.length != 0);
        }
    };

    var self = function(config){

        var conf = $.extend({}, defConfig, config);
        var $area = (this.selector == '') ? $(document) : $(this.selector);

        var observed = true;
        var observer = {
            start: function(){
                observed = true;
            },
            stop: function(){
                observed = false;
            },
            isRunned: function(){
                return observed;
            }
        };

        function handleCondition(){
            var $this = $(this);
            var elConf = $.extend({
                customHandler: false
            }, conf, $this.data());
            var handler = elConf.handler;
            var condition = elConf.condition;
            var customHandler = elConf.customHandler;

            if(customHandler){
                handler = customHandler;
            }else if(condition && condition.match("return") != null){
                eval("handler = function(){" + condition + "}");
                $this.data('customHandler', handler);
            }

            var visible = handler.call($this);

            if(visible){
                $this.show();
            }else{
                $this.hide();
            }
        }

        function onObserveEvent(){
            if(!observer.isRunned()){
                return false;
            }
            observer.stop();
            var $elements = $area.find(conf.elements);
            $elements.each(handleCondition);
            observer.start();
        }

        $area.bind("DOMSubtreeModified", onObserveEvent);
        $area.on(conf.event, conf.controls, onObserveEvent);
        $area.on('keyup', '[type=text], textarea', onObserveEvent);

        onObserveEvent();

        return self;
    };

    $.fn.vo = self;

})(jQuery);