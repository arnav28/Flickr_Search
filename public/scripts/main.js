(function () {

	'use strict';
	
	// Flickr api key (public)
	var api_key = "9ca03cd4970ae0a2d4bf3b2c45902bc9";
	
	// Get search value on form submit and initiate search
	document.getElementById('search-form').addEventListener('submit', function (event) {
		event.preventDefault();
		var searchText = document.getElementById('searchBox').value; // Get value from search form
		if (searchText) {
			element.hide("controls"); // Hide gallery controls
			document.getElementById('gallery').innerHTML = ""; // Remove previously loaded images	
			animate();
			element.show("results");
			setTimeout(function () {
				element.show("loading"); // Show loading icon
				new Search(searchText);		// Start search 		
			}, 500);
		}
	});
	
	// Animate search box and flikr logo
	function animate() {
		document.getElementById('logo').style.display = 'none';
		document.getElementById('search').classList.add('search-active');
	};
	
	// Search	
	function Search(text) {
		this.flickrCall(text);
	};

	Search.prototype = {
		flickrCall: function (searchText) {
			var src = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + api_key + "&text=" + searchText + "&format=json&jsoncallback=onComplete&per_page=40";
			// Include script
			var script = document.createElement("script");
			script.src = src;
			document.body.appendChild(script);
		},
		loadPhotos: function (l, photos) {
			var galleryPics = "";
			var lightboxPics = "";
			// Loop through the results and create dom element for each image
			for (var i = 0; i < l; i++) {
				var photo = photos.photo[i];
				// Create url (Flickr docs)
				var src = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg";
				galleryPics += "<div><img src='" + src + "' alt='Flickr Image' height='300' width='300' /></div>";
				lightboxPics += "<div><p class='title'>" + photo.title + "</p><img src='" + src + "' alt='Flickr Image'/></div>";
			}
			element.hide("loading"); // Hide loading
			document.getElementById("gallery").innerHTML = galleryPics;
			document.getElementById("lightbox-gallery").innerHTML = lightboxPics;
			element.show("controls"); // Show controls
		}
	}
	
	
	// Callback function to retrieve images - (should be in global scope)
	window.onComplete = function (result) {
		if (result.stat == "ok") {
			var length = result.photos.photo.length;
			if (length > 0) {
				Search.prototype.loadPhotos(length, result.photos);
			} else {
				element.hide("loading"); // Hide loading icon
				document.getElementById("gallery").innerHTML = "<p class='message'>No images based on your search...try something else</p>"; // Display no results message
			}
		} else {
			element.hide("loading"); // Hide loading icon
			document.getElementById("gallery").innerHTML = "<p class='message'>Oops...try again</p>"; // Display error message
		}
	};
	
	// Hide/show elements
	var element = {
		show: function (id) {
			document.getElementById(id).style.display = 'block';
		},
		hide: function (id) {
			document.getElementById(id).style.display = 'none';
		}
	};

})();
