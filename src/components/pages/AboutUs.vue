<script>
export default {
    name: "AboutUs"
}
</script>

<template>
    <!-- Inizio Container -->
    <div class="container">
        <!-- Inizio Row -->
        <div class="row justify-content-md-center">
            <div class="col-lg-3 col-md-6 col-sm-12 mb-3">
                <div class="card h-100">
                    <div class="background_img">
                        <div class="img1">
                            <img src="../../assets/img/Luca.jpg" alt="" />
                        </div>
                    </div>
                    <div class="card-header">
                        <h4 class="card-title text-center">Luca Pertosa</h4>
                        <p class="card-subtitle text-center">
                            Jr. Full Stack Web Developer
                        </p>
                    </div>
                    <div class="card-body">
                        <p class="card-text text-center">
                            Sono uno sviluppatore web con una vasta gamma di esperienze lavorative nel mio bagaglio.
                            Appassionato di fitness, filosofia e tecnologie, utilizzo quest'ultima passione per arricchire
                            il mio lavoro e offrire soluzioni creative e innovative.
                        </p>
                    </div>
                    <div class="card-footer">
                        <div class="text-center">
                            <a href="https://github.com/LucaPertosa" target="_blank">
                                <font-awesome-icon :icon="['fab', 'github']" class="me-3" />
                            </a>
                            <a href="https://www.linkedin.com/in/luca-pertosa-dev/" target="_blank">
                                <font-awesome-icon :icon="['fab', 'linkedin']" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12 mb-3">
                <div class="card h-100">
                    <div class="background_img">
                        <div class="img1">
                            <img src="../../assets/img/Stefano.jpg" alt="" />
                        </div>
                    </div>
                    <div class="card-header">
                        <h4 class="card-title text-center">Stefano Martino</h4>
                        <p class="card-subtitle text-center">
                            Jr. Full Stack Web Developer
                        </p>
                    </div>
                    <div class="card-body">
                        <p class="card-text text-center">
                            Sono un junior sviluppatore web con molte esperienze lavorative. Appassionato di gaming, del mondo del calcio e dell'informatica in generale. Pronto sempre a nuove sfide e ad arricchire il mio bagaglio culturale.
                        </p>
                    </div>
                    <div class="card-footer">
                        <div class="text-center">
                            <a href="https://github.com/StefanoM98" target="_blank">
                                <font-awesome-icon :icon="['fab', 'github']" class="me-3" />
                            </a>
                            <a href="https://www.linkedin.com/in/stefano-martino-758513280/" target="_blank">
                                <font-awesome-icon :icon="['fab', 'linkedin']" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12 mb-3">
                <div class="card h-100">
                    <div class="background_img">
                        <div class="img1">
                            <img src="../../assets/img/Luigi.jpg" alt="" />
                        </div>
                    </div>
                    <div class="card-header">
                        <h4 class="card-title text-center">Luigi De Filippo</h4>
                        <p class="card-subtitle text-center">
                            Jr. Full Stack Web Developer
                        </p>
                    </div>
                    <div class="card-body">
                        <p class="card-text text-center">
                            A seguito degli studi e dopo aver lavorato per due anni con la piattaforma Wordpress la passione per la tecnologia e la voglia di mettermi in gioco hanno avuto la meglio spingendomi ad aumentare le mie competenze in ambito informatico.
                        </p>
                    </div>
                    <div class="card-footer">
                        <div class="text-center">
                            <a href="https://github.com/Luigidefilippo" target="_blank">
                                <font-awesome-icon :icon="['fab', 'github']" class="me-3" />
                            </a>
                            <a href="https://www.linkedin.com/in/luigidefilippo/" target="_blank">
                                <font-awesome-icon :icon="['fab', 'linkedin']" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12 mb-3">
                <div class="card h-100">
                    <div class="background_img">
                        <div class="img1">
                            <img src="../../assets/img/diego.png" alt="" />
                        </div>
                    </div>
                    <div class="card-header">
                        <h4 class="card-title text-center">Diego Giardina</h4>
                        <p class="card-subtitle text-center">
                            Jr. Full Stack Web Developer
                        </p>
                    </div>
                    <div class="card-body">
                        <p class="card-text text-center">
                            Da sempre appassionato di tecnologia, ho deciso di trasformare la mia passione in una carriera e diventare uno sviluppatore web, alimentando la mia creatività per creare esperienze digitali coinvolgenti e innovative.
                        </p>
                    </div>
                    <div class="card-footer">
                        <div class="text-center">
                            <a href="https://github.com/diegoG82" target="_blank">
                                <font-awesome-icon :icon="['fab', 'github']" class="me-3" />
                            </a>
                            <a href="https://www.linkedin.com/in/diegog82/" target="_blank">
                                <font-awesome-icon :icon="['fab', 'linkedin']" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Fine Row -->
    </div>
</template>

<style lang="scss" scoped>
@use "../../style/partials/variables.scss" as *;

.container {
    margin-top: 7rem;
}

p {
    color: $dark_color;
}

.card {
    border-radius: 15px;
    color: $dark_accent_color;

    &:hover {
        transform: scale(1.05);
        transition: 0.3s;
    }
}

.background_img {
    height: 200px;
    background-image: url(../../assets/img/back2card.jpg);
    background-size: cover;
    border-radius: 15px 15px 0 0;
}

.row {
    padding-bottom: 5rem;
}

.img1 {
    position: relative;
    width: 100%;
    height: 100%;
}

.img1 img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 140px;
    height: 140px;
    border-radius: 50%;
    border: 2px solid $dark_accent_color;
    object-fit: cover;
}

i {
    color: $dark_accent_color;
    font-size: 15px;
    padding: 0 10px;
}

@media screen and (max-width: 768px) {
    .responsive {
        margin-top: 90px;
    }
}

@media screen and (max-width: 991px) {
    .medium {
        margin-top: 6rem;
    }
}</style>