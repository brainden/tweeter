$(document).ready(function() {
  $('.text1').keyup(function () {
   $('.counter').html((140 - $(this).val().length));
  }); 

});
  





