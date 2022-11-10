<template>
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
        <button class="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavId">
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                <li class="nav-item">
                    <router-link class="nav-link" to="/">Inicio</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/usuarios">Usuarios</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/permisos">Permisos</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/roles">Roles</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>
<script>
export default {
    name: 'BarraNavegacion',
    
}
</script>
<style lang="">
    
</style>