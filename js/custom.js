/* custom behavior */
(function ($) {
  $.fn.valign = function() {
	  return this.each(function(i){
      var self = $(this), h = self.height(),
        mtop = (0.5 * parseFloat(self.parent().height())) - (0.5 * parseFloat(h));
      if (mtop < 0) {
        mtop = 0;
      }
      self.css('margin-top', mtop);
	  });
  };
})(jQuery);

(function($){ $('.container').valign(); })(jQuery);
