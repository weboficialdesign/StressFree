/* ==========================================================
   STRESSFREE
   SCRIPT.JS
========================================================== */


/* ==========================================================
   CONFIGURACIÓN GENERAL
========================================================== */


const WHATSAPP_NUMBER = "56976980531";



/* ==========================================================
   CATÁLOGO DE PRODUCTOS
========================================================== */


/*
    PARA AGREGAR OTRO PRODUCTO:

    {
        id: 5,
        name: "Nombre",
        category: "mecanico",
        categoryName: "Mecánico",
        price: 4990,
        description: "Descripción",
        images: [
            "imagenes/imagen.png"
        ]
    }

*/


const products = [


    /* ======================================================
       PRODUCTO 1
       MECÁNICO
    ====================================================== */

    {

        id: 1,

        name: "Mecánico StressFree",

        category: "mecanico",

        categoryName: "Mecánico",

        price: 9990,

        description:
            "Un modelo completo con engranajes, ruedas, deslizadores y diferentes mecanismos para explorar. Ideal para liberar tensión durante el trabajo, estudio o tiempos de descanso.",

        images: [

            "imagenes/mecanic_Imagenes.png"

        ]

    },



    /* ======================================================
       PRODUCTO 2
       FINGERCLIP
    ====================================================== */

    {

        id: 2,

        name: "FingerClip",

        category: "mecanico",

        categoryName: "Mecánico",

        price: 1990,

        description:
            "Diseño compacto y sencillo para realizar movimientos repetitivos. Perfecto para tener cerca mientras estudias, trabajas o necesitas unos minutos para desconectarte.",

        images: [

            "imagenes/FingerClip_Imagenes.png"

        ]

    },



    /* ======================================================
       PRODUCTO 3
       STAR
    ====================================================== */

    {

        id: 3,

        name: "Star StressFree",

        category: "movimiento",

        categoryName: "Movimiento",

        price: 4990,

        description:
            "Diseño en forma de estrella con múltiples niveles de movimiento. Gírala y explora sus diferentes posiciones mientras buscas relajarte y recuperar el foco.",

        images: [

            "imagenes/estrella_Imagenes.png"

        ]

    },



    /* ======================================================
       PRODUCTO 4
       PIRÁMIDE

       IMPORTANTE:
       El producto se llama PIRÁMIDE en la web,
       pero el archivo continúa llamándose
       Triangulo_Imagenes.png
    ====================================================== */

    {

        id: 4,

        name: "Pirámide StressFree",

        category: "movimiento",

        categoryName: "Movimiento",

        price: 4990,

        description:
            "Pirámide de movimiento continuo formada por diferentes capas móviles. Manipúlala mientras trabajas o estudias para disfrutar un momento de relajación y concentración.",

        images: [

            "imagenes/Triangulo_Imagenes.png"

        ]

    }

];



/* ==========================================================
   ELEMENTOS DEL DOM
========================================================== */


const productsContainer =
    document.getElementById("products-container");


const modal =
    document.getElementById("product-modal");


const modalContent =
    document.getElementById("modal-product-content");


const modalClose =
    document.getElementById("modal-close");


const modalOverlay =
    document.getElementById("modal-overlay");


/* ==========================================================
   FORMATO DE PRECIO CHILE
========================================================== */


function formatPrice(price) {

    return new Intl.NumberFormat(

        "es-CL",

        {

            style: "currency",

            currency: "CLP",

            maximumFractionDigits: 0

        }

    ).format(price);

}



/* ==========================================================
   RENDERIZAR PRODUCTOS
========================================================== */


function renderProducts(filter = "todos") {


    productsContainer.innerHTML = "";


    const filteredProducts =

        filter === "todos"

            ? products

            : products.filter(

                product =>
                    product.category === filter

            );



    filteredProducts.forEach(

        product => {


            const card =
                document.createElement("article");


            card.className =
                "product-card";



            card.innerHTML = `


                <div class="product-media">

                    <img
                        src="${product.images[0]}"
                        alt="${product.name}"
                        loading="lazy"
                    >


                    <span class="product-category">

                        ${product.categoryName}

                    </span>

                </div>



                <div class="product-content">


                    <h3 class="product-title">

                        ${product.name}

                    </h3>


                    <p class="product-description">

                        ${product.description}

                    </p>



                    <div class="product-footer">


                        <div class="product-price">

                            ${formatPrice(product.price)}

                        </div>



                        <div class="product-actions">

                            <button
                                class="product-button"
                                onclick="openProduct(${product.id})"
                            >

                                Ver modelo

                            </button>

                        </div>


                    </div>


                </div>

            `;


            productsContainer.appendChild(card);

        }

    );

}



/* ==========================================================
   FILTROS
========================================================== */


const filterButtons =
    document.querySelectorAll(".filter-button");



filterButtons.forEach(

    button => {


        button.addEventListener(

            "click",

            () => {


                filterButtons.forEach(

                    btn =>
                        btn.classList.remove("active")

                );


                button.classList.add("active");


                const filter =
                    button.dataset.filter;


                renderProducts(filter);

            }

        );

    }

);



/* ==========================================================
   ABRIR PRODUCTO
========================================================== */


function openProduct(id) {


    const product =

        products.find(

            item =>
                item.id === id

        );


    if (!product) {

        return;

    }



    const thumbnailsHTML =

        product.images.length > 1

            ?

            product.images

                .map(

                    image => `

                        <img
                            src="${image}"
                            alt="${product.name}"
                            class="modal-thumbnail"
                            onclick="changeModalImage('${image}')"
                        >

                    `

                )

                .join("")

            :

            "";



    modalContent.innerHTML = `


        <div class="modal-product">


            <div class="modal-media">


                <img
                    src="${product.images[0]}"
                    id="modal-main-image"
                    class="modal-main-image"
                    alt="${product.name}"
                >


                ${
                    thumbnailsHTML

                        ?

                        `

                            <div class="modal-thumbnails">

                                ${thumbnailsHTML}

                            </div>

                        `

                        :

                        ""
                }


            </div>



            <div class="modal-info">


                <span class="section-tag">

                    ${product.categoryName}

                </span>


                <h2>

                    ${product.name}

                </h2>


                <p>

                    ${product.description}

                </p>


                <div class="modal-price">

                    ${formatPrice(product.price)}

                </div>



                <div class="modal-buttons">


                    <button
                        class="btn btn-primary"
                        onclick="selectProduct(${product.id})"
                    >

                        Quiero este modelo

                    </button>



                    <a
                        class="whatsapp-button"
                        href="${getWhatsappLink(product)}"
                        target="_blank"
                    >

                        Consultar por WhatsApp

                    </a>


                </div>


            </div>


        </div>

    `;



    modal.classList.add("active");


    document.body.classList.add(
        "modal-open"
    );

}



/* ==========================================================
   CAMBIAR IMAGEN DEL MODAL
========================================================== */


function changeModalImage(image) {


    const mainImage =
        document.getElementById(
            "modal-main-image"
        );


    if (mainImage) {

        mainImage.src =
            image;

    }

}



/* ==========================================================
   CERRAR MODAL
========================================================== */


function closeModal() {


    modal.classList.remove(
        "active"
    );


    document.body.classList.remove(
        "modal-open"
    );

}



modalClose.addEventListener(

    "click",

    closeModal

);



modalOverlay.addEventListener(

    "click",

    closeModal

);



document.addEventListener(

    "keydown",

    event => {


        if (
            event.key === "Escape"
        ) {

            closeModal();

        }

    }

);



/* ==========================================================
   SELECCIONAR PRODUCTO
========================================================== */


function selectProduct(id) {

    const product = products.find(item => item.id === id);

    if (!product) {
        return;
    }

    closeModal();

    const messageField = document.getElementById("mensaje");

    if (messageField) {
        const line = `1 ${product.name}`;
        messageField.value = messageField.value.trim()
            ? messageField.value.trim() + "\n" + line
            : line;
    }

    document.getElementById("contacto").scrollIntoView({
        behavior: "smooth"
    });

    setTimeout(() => {
        if (messageField) messageField.focus();
    }, 500);
}


/* ==========================================================
   WHATSAPP DE PRODUCTO
========================================================== */


function getWhatsappLink(product) {


    const message =

        `Hola StressFree, quiero consultar por el modelo ${product.name} (${formatPrice(product.price)}).`;



    return (

        "https://wa.me/" +

        WHATSAPP_NUMBER +

        "?text=" +

        encodeURIComponent(
            message
        )

    );

}



/* ==========================================================
   MENÚ MÓVIL
========================================================== */


const menuButton =
    document.getElementById(
        "menu-button"
    );


const nav =
    document.getElementById(
        "nav"
    );



menuButton.addEventListener(

    "click",

    () => {

        nav.classList.toggle(
            "active"
        );

    }

);



document
    .querySelectorAll(
        ".nav a"
    )

    .forEach(

        link => {


            link.addEventListener(

                "click",

                () => {

                    nav.classList.remove(
                        "active"
                    );

                }

            );

        }

    );



/* ==========================================================
   INICIALIZACIÓN
========================================================== */


renderProducts();


/* ==========================================================
   POPUP DATOS DE TRANSFERENCIA
========================================================== */

function openTransferModal() {
    const modal = document.getElementById("transfer-modal");
    if (!modal) return;

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("transfer-modal-open");
}

function closeTransferModal() {
    const modal = document.getElementById("transfer-modal");
    if (!modal) return;

    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("transfer-modal-open");
}

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closeTransferModal();
    }
});
