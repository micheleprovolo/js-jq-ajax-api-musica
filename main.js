// DESCRIZIONE:
// Attraverso una chiamata ajax all’Api di boolean avremo a disposizione una decina di dischi musicali.
// Servendoci di handlebars stampiamo tutto a schermo. In questo momento non è importante la parte grafica.
// Chiamata:
// https://flynn.boolean.careers/exercises/api/array/music
// Layout base (per chi non vuole implementarne uno suo):
// https://bitbucket.org/booleancareers/ex-dischi-musicali-layout


$(document).ready(function () {


	$.ajax({
		url: "https://flynn.boolean.careers/exercises/api/array/music",
		method: "GET",
		success: function (data) {
			// console.log("success", data.response);

			//questo ciclo for mi restituisce ogni singolo oggetto
			for (var i = 0; i < data.response.length; i++) {
				console.log(data.response[i]);

				// source restituisce il contenuto dello script di handlebars
				var source = $(".record").text();
				// console.log(source);
				var template = Handlebars.compile(source);

				//salvo in context un oggetto che ha come chiave gli elementi del mio template HB
				//e come valore i relativi dati dell'API
				var context = {
					img: data.response[i].poster,
					title: data.response[i].title,
					author: data.response[i].author,
					genre: data.response[i].genre,
					year: data.response[i].year
				};
				var html = template(context);
				// console.log(html);

				//appendo in un contenitore html qualunque il contenuto dell'oggetto suddetto
				$(".cds-container").append(html);
			}
		},
		error: function (stato) {
			console.log("c'è stato un errore: " + stato);
		}


	});

});

//l'API mi ritorna un array di 10 oggetti: ognuno corrisponde ad un disco