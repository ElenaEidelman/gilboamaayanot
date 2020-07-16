(function($) {
  
  "use strict";  

  $(window).on('load', function() {

    //debugger
      let turHeight = document.getElementById('turHeight');
      if(turHeight != null ){
      document.getElementById('birthdayHeight').style.height = turHeight.offsetHeight + 'px' ;
      }
  $('#preloader').fadeOut();

  });      

}(jQuery));