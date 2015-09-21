(function () {

  'use strict';
  
  // Open lightbox view
  document.getElementById('lightbox').addEventListener('click', function (event) {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById("lightbox-container").style.display = 'block';
    slider.init(); // start slider with the first image
  }, false);
	
  // Close lightbox view
  document.getElementById('overlay').addEventListener('click', function (event) {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById("lightbox-container").style.display = 'none';
    nodeLoop(document.querySelectorAll('#lightbox-gallery div'), function (el) {
      el.classList.remove('active'); // Hide previous image
    });
  }, false);
  
  // Next Image
  document.querySelector('.next').addEventListener('click', function () {
    counter++;
    slider.changeImage();
  }, false);

  // Previous Image 
  document.querySelector('.prev').addEventListener('click', function () {
    counter--;
    slider.changeImage();
  }, false);


  var counter;

  var slider = {
    // Select first image from the nodeList
    init: function () {
      counter = 0; // Reset counter    
      var e = document.querySelectorAll("#lightbox-gallery div")[counter];
      e.classList.add('active');
    },
    changeImage: function () {
      // Get all images
      var images = document.querySelectorAll('#lightbox-gallery div');
      var length = images.length;

      // Choose the index of the picture by using modulo operator
      var item = Math.abs(counter % length);

      // Loop through nodeList  
      nodeLoop(images, function (el) {
        el.classList.remove('active');
      });
  
      // Display image
      images[item].classList.add('active');
    }
  };
  
  // Function for looping through nodeList items (not actually an array)
  function nodeLoop(list, callback) {
    Array.prototype.forEach.call(list, callback);
  };

})();
  
 