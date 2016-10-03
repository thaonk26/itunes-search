var timer;

$(document).ready(function() {
	$('#command_line').keyup(function(event) {
			var input = $('#command_line').val();
			input = input.toLowerCase().replace(/\s+/g, '');
			clearTimeout(timer);
		if(input != ''){
			timer = setTimeout("searchSongs()", 400);
		}else {
			clear_all();
		}
	})
	$('#selectType').change(function() {
		clearTimeout(timer);
		if(input != '') timer = setTimeout("searchSongs()", 400);
		else clear_all();
	});
});




function searchSongs(){
var select = $('#selectType').val();

 var params = {
   term: encodeURIComponent($('#command_line').val()),
   country: 'US',
   media: select,
   limit: 150,
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
	var table = "";
	$('#command_line').addClass('loader');
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
			// table += "<div id='song-searched'>";
			// table += '<img id="icon" src="[z]"><\/img>'.replace('[z]', temp.artworkUrl100);
			// table += 'Genre: <span class="spacer">[z]<\/span><br>'.replace('[z]', temp.primaryGenreName);
			// table += 'Artist Name: <span class ="spacer">[z]<\/span> '.replace('[z]', temp.artistName);
			// table += '<a href="[z]">Full Album<\/a><br>'.replace('[z]', temp.trackViewUrl);
			// table += 'Track Name: <span class="spacer">[z]<\/span><br>'.replace('[z]', temp.trackName);
			// table += 'Track Price: <span class="spacer">$[z]<\/span><br>'.replace('[z]', temp.trackPrice);
			// table += 'Release Date: <span class="spacer">[z]<\/span><br>'.replace('[z]', getFormattedDate(temp.releaseDate));
			// table += 'Preview Track: <span class="spacer"><audio controls preload="none" style="width:480px;">'
			// table += '<source src="[z]" type="audio/mp4" \/><\/audio><\/span><br>'.replace('[z]', temp.previewUrl);
			// table += '<\/div>'



			table += '<tr class="pagination-sm">';
			table += '<td><span class="spacer"><img id="icon" src="[z]"></img></span></td>'.replace('[z]', temp.artworkUrl100);
			table += '<td><span class="spacer">[z]</span></td>'.replace('[z]', temp.trackName);
			table += '<td><span class="spacer"><a href="[z]">[x]</a></span></td>'.replace('[z]', temp.trackViewUrl).replace('[x]', temp.artistName);
			table += '<td><span class="spacer">$[z]</span></td>'.replace('[z]', temp.trackPrice);
			table += '<td><span class="spacer">[z]</span></td>'.replace('[z]', getFormattedDate(temp.releaseDate));
			table += '<td><span class="spacer"><audio controls preload="none" style="width:480px;">'
			table += '<source src="[z]" type="audio/mp4" /></audio></span></td></tr>'.replace('[z]', temp.previewUrl);
		}
		// $('#table').clone().insertBefore("#placeholder").fadeIn(1000);
$("#placeholder").append(table);
$('#placeholder').easyPaginate({
     paginateElement: 'tr',
     elementsPerPage: 6,
     effect: 'default'
 });
$('.Title').fadeIn(1000);
 $('#command_line').removeClass('loader');
}
function getFormattedDate(date){
	var newDate = date.split('T');
	return newDate[0];
}
function clear_all(){
	$('#command_line').val('');
	$('#placeholder').html('');
	$('.spacer').html('');
	$('.easyPaginateNav').html('');
}