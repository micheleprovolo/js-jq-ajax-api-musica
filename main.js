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
			//capisco che il response è un array di oggetti


			//questo ciclo for mi restituisce ogni singolo oggetto dell'array
			for (var i = 0; i < data.response.length; i++) {
				// come esempio per capire prendo in considerazione il valore della proprietà title dell'oggetto dentro l'array
				console.log(data.response[i].title);

				//con ciclo for in sui singoli oggetti che stanno ciclando tramite il ciclo for
				var oggetto = data.response[i]
				var x;
				for (x in oggetto) {
					console.log(x + " : " + oggetto[x]);
				}

				// source restituisce il contenuto dello script di handlebars
				var source = $(".record").text();
				// console.log(source);
				var template = Handlebars.compile(source);

				//salvo in context un oggetto che ha come chiave gli elementi del mio template HB
				//e come valore i relativi dati dell'API
				var context = {
					poster: data.response[i].poster,
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