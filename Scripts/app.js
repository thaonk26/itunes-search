function searchSongs(){
 var params = {
   term: encodeURIComponent($('#command_line').val()),
   country: 'US',
   media: 'music',
   entity: 'musicTrack',
   //attribute: 'artistTerm,albumTerm,songTerm,musicTrackTerm',
   limit: 20,
   callback: 'itunesSearch'
 };
 var params = urlEncode(params);

 var url = 'http://itunes.apple.com/search?' + params;
 var html = '<script src="' + url + '"><\/script>';
 $('head').append(html);
}

function urlEncode(obj) {
 var save = '';
 for (var key in obj) {
   save += encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]) + '&';
 }
 if (save.length > 0) {
   save = save.substr(0, save.length - 1);
 }

 return (save);
}

function itunesSearch(arg){
	var object = arg.results;
	var url = "";

		for(var i = 0; i < object.length; i++){
			var temp = object[i];
			var obj = {
				artistName: temp.artistName,
				trackName: temp.trackName,
				trackViewUrl: temp.trackViewUrl,
				previewUrl: temp.previewUrl,
				trackPrice: temp.trackPrice,
				collectionPrice: temp.collectionPrice,
				releaseDate: temp.releaseDate,
				primaryGenreName: temp.primaryGenreName,
				artworkUrl100: temp.artworkUrl100
			}
			object[i] = obj;
			var test = object[i].artistName;
			// url += "<div id='song-searched'>";
			// url += '<img id="icon" src="[z]"><\/img>'.replace('[z]', temp.artworkUrl100);
			// url += 'Genre: <span class="spacer">[z]<\/span><br>'.replace('[z]', temp.primaryGenreName);
			// url += 'Artist Name: <span class ="spacer">[z]<\/span> '.replace('[z]', temp.artistName);
			// url += '<a href="[z]">Full Album<\/a><br>'.replace('[z]', temp.trackViewUrl);
			// url += 'Track Name: <span class="spacer">[z]<\/span><br>'.replace('[z]', temp.trackName);
			// url += 'Track Price: <span class="spacer">[z]<\/span><br>'.replace('[z]', temp.trackPrice);
			// url += 'Release Date: <span class="spacer">[z]<\/span><br>'.replace('[z]', getFormattedDate(temp.releaseDate));
			// url += 'Preview Track: <span class="spacer"><audio controls preload="none" style="width:480px;">'
			// url += '<source src="[z]" type="audio/mp4" \/><\/audio><\/span><br>'.replace('[z]', temp.previewUrl);
			// url += '<\/div>'



			url += '<tr>';
			url += '<td><span class="spacer">[z]</span></td>'.replace('[z]', temp.trackName);
			url += '<td><span class="spacer"><a href="[z]">[x]</a></span></td>'.replace('[z]', temp.trackViewUrl).replace('[x]', temp.artistName);
			url += '<td><span class="spacer">[z]</span></td>'.replace('[z]', temp.trackPrice);
			url += '<td><span class="spacer">[z]</span></td>'.replace('[z]', getFormattedDate(temp.releaseDate));
			url += '<td><span class="spacer"><audio controls preload="none" style="width:480px;">'
			url += '<source src="[z]" type="audio/mp4" /></audio></span></td></tr>'.replace('[z]', temp.previewUrl);

			// url += '<span class="spacer">[z]<\/span>'.replace('[z]', temp.primaryGenreName);
			// url += '<span class="spacer">[z]<\/span> '.replace('[z]', temp.artistName);

		}
		// $('#table').clone().insertBefore("#placeholder").fadeIn(1000);
$("#placeholder").append(url);
$('#pagination').easyPaginate({
     paginateElement: 'div',
     elementsPerPage: 5,
     effect: 'fade'
 });
}
function getFormattedDate(date){
	var newDate = date.split('T');
	return newDate[0];
}