document.addEventListener("DOMContentLoaded", function () {
    const allItems = [
        { id: "item1", text: "Fui ministro de Guerra y posterior a eso fui general en jefe del ejército de Oriente", match: "1", img: "imagenes/zaragoza.png", imgDesc: "Ignacio Zaragoza" },
        { id: "item2", text: "Fui presidente de México durante el enfrentamiento bélico entre Francia y México", match: "2", img: "imagenes/beni.png", imgDesc: "Benito Juárez" },
        { id: "item3", text: "General en jefe del ejército francés que dirige a sus tropas en dirección a la ciudad de Puebla para la conquista de la república mexicana en 1862", match: "3", img: "imagenes/lorencez.png", imgDesc: "Charles Ferdinand Latrille" },
        { id: "item4", text: "General conservador que decide cambiar de bando previamente en la batalla del 5 de mayo", match: "4", img: "imagenes/miguel.png", imgDesc: "Miguel Negrete" },
        { id: "item5", text: "Comandante de la caballería mexicana y de la brigada de Oaxaca", match: "5", img: "imagenes/porfilio.png", imgDesc: "Porfirio Díaz" },
        { id: "item6", text: "Buscaba expandir su dominio en México para aprovechar los recursos naturales.", match: "6", img: "imagenes/napoleon.png", imgDesc: "Napoleón III" },
        { id: "item7", text: "General que apoyó en la estrategia de resistencia y contraataque", match: "7", img: "imagenes/mejia.png", imgDesc: "Ignacio Mejía" },
        { id: "item8", text: "Fui una arma empleada por las fuerzas mexicanas principalmente por los campesinos de la cuidad de Puebla", match: "8", img: "imagenes/machete.png", imgDesc: "Machete" },
        { id: "item9", text: "Fui artillería de los dos bandos y logré detener varios intentos de avance francés y desmoralizar a sus tropas", match: "9", img: "imagenes/cañon.png", imgDesc: "Cañon" },
        { id: "item10", text: "Estaba hecha principalmente de madera y tenía un cuchillo en la parte superior para el combate cuerpo a cuerpo.", match: "10", img: "imagenes/bayoneta.png", imgDesc: "Bayoneta" },
        { id: "item11", text: "Fui el medio de telecomunicación entre el presidente en turno y el general Ignacio Zaragoza al finalizar la batalla.", match: "11", img: "imagenes/telegrama.png", imgDesc: "Telegrama" },
        { id: "item12", text: "Me disparaban desde media y larga distancia, y tenía que recargar después de recuperar el aliento.", match: "12", img: "imagenes/rifle.png", imgDesc: "Rifle" },
        { id: "item13", text: "Se vestían fez rojo, chaqueta azul, pantalones bombachos rojos, fajín, polainas negras, cinturón, cartuchera y fusil.", match: "13", img: "imagenes/zuavo.png", imgDesc: "Soldado Zuavo" },
        { id: "item14", text: "Arma principalmente echa de metal utilizada por la caballeria", match: "14", img: "imagenes/sable.png", imgDesc: "Sable" }
    ];
    
    
    let selectedPairs = [];
    let matches = {};
    let aciertos = 0;
    let desaciertos = 0;

    function seleccionarParesAleatorios() {
        selectedPairs = allItems.sort(() => 0.5 - Math.random()).slice(0, 7);
    }

    function generarJuego() {
        const rowNumbers = document.querySelector(".row.numbers");
        const rowImages = document.querySelector(".row.images");

        rowNumbers.innerHTML = "";
        rowImages.innerHTML = "";

        const shuffledTexts = [...selectedPairs].sort(() => 0.5 - Math.random());
        const shuffledImages = [...selectedPairs].sort(() => 0.5 - Math.random());

        shuffledTexts.forEach(pair => {
            let numberDiv = document.createElement("div");
            numberDiv.classList.add("item");
            numberDiv.setAttribute("draggable", "true");
            numberDiv.setAttribute("id", pair.id);
            numberDiv.setAttribute("data-match", pair.match);
            numberDiv.textContent = pair.text;
            rowNumbers.appendChild(numberDiv);
        });

        shuffledImages.forEach(pair => {
            let imageDiv = document.createElement("div");
            imageDiv.classList.add("target");
            imageDiv.setAttribute("data-id", pair.match);

            let img = document.createElement("img");
            img.setAttribute("src", pair.img);
            img.setAttribute("alt", `Seña ${pair.text}`);

            let description = document.createElement("p");
            description.textContent = pair.imgDesc;
            description.classList.add("description");

            imageDiv.appendChild(img);
            imageDiv.appendChild(description);
            rowImages.appendChild(imageDiv);
        });

        agregarEventos();
    }

    function agregarEventos() {
        const items = document.querySelectorAll(".item");
        const targets = document.querySelectorAll(".target");

        items.forEach(item => {
            item.addEventListener("dragstart", (e) => {
                e.dataTransfer.setData("text", e.target.id);
            });
        });

        targets.forEach(target => {
            target.addEventListener("dragover", (e) => {
                e.preventDefault();
            });

            target.addEventListener("drop", (e) => {
                e.preventDefault();
                let itemId = e.dataTransfer.getData("text");
                let draggedItem = document.getElementById(itemId);

                if (matches[target.dataset.id] === target.dataset.id) {
                    return; // Evita cambiar una relación correcta
                }

                matches[target.dataset.id] = draggedItem.dataset.match;
                draggedItem.style.visibility = "hidden";
                target.classList.add("occupied");

                if (draggedItem.dataset.match === target.dataset.id) {
                    target.style.border = "3px solid green";
                    aciertos++;
                } else {
                    target.style.border = "3px solid red";
                    desaciertos++;

                    setTimeout(() => {
                        draggedItem.style.visibility = "visible";
                        target.style.border = "1px solid black";
                        target.classList.remove("occupied");
                        delete matches[target.dataset.id];
                    }, 1000);
                }

                document.getElementById("aciertos").textContent = aciertos;
                document.getElementById("desaciertos").textContent = desaciertos;

                setTimeout(() => {
                    if (verificarJuegoCompletado()) {
                        Swal.fire({
                            title: "¡Felicidades!",
                            text: "Has completado el juego correctamente.",
                            icon: "success",
                            timer: 5000,
                            showConfirmButton: false
                        });

                        setTimeout(() => {
                            window.location.href = "index.html"; 
                        }, 5000);
                    }
                }, 500);
            });
        });
    }

    function verificarJuegoCompletado() {
        return document.querySelectorAll(".target.occupied").length === 7;
    }

    function iniciarJuego() {
        aciertos = 0;
        desaciertos = 0;
        matches = {};
        document.getElementById("aciertos").textContent = aciertos;
        document.getElementById("desaciertos").textContent = desaciertos;

        seleccionarParesAleatorios();
        generarJuego();
    }

    iniciarJuego();
});