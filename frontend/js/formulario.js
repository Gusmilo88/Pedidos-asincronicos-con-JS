const $ = (id) => document.getElementById(id)
const urlBase = "http://localhost:3031/api/movies/"

window.onload = async () => {

    let query = new URLSearchParams(location.search);
    let id = query.has("id") && query.get("id");

    try {
        
        let response = await fetch(urlBase + id);
        let pelicula = await response.json();
        let {title, rating, awards, length = duration, release_date} = pelicula.data

        let dateFormat = moment(release_date).format("YYYY-MM-DD");

        $("title").value = title;
        $("rating").value = rating;
        $("awards").value = awards;
        $("length").value = duration;
        $("release_date").value = dateFormat;

    } catch (error) {
        console.error
    }
        document.querySelector(".formulario").addEventListener("submit", (e) => {
            e.preventDefault();
            try {
                let response = await fetch(urlBase + "update/" + id, {
                    method: "PUT",
                    body : JSON.stringify( {
                        title : $("title").value,
                        // rating : $("rating").value,
                        // awars : $("awards").value,
                        // length : $("length").value,
                        // release_date : $("release_date").value
                    }),
                    headers : {
                        "Content-Type" : "application/json"
                    }
                });
                let result = await response.json()
                console.log(result);
            } catch (error) {
                
            }
        })
}