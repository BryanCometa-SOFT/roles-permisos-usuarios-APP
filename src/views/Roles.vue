<template lang="">
    <div>
      <h3 class="pt-3">Listado de Roles</h3>
      <div class="d-flex justify-content-end mb-3">
        <button class="btn btn-primary"  data-toggle="modal" data-target="#createEditRol" v-on:click="resetForm()"><i class="bi bi-plus-circle"></i> Crear Rol</button>
      </div>
      <table class="table table-striped shadow">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in listRol" :key="item">
            <td>
              {{ item.id }}
            </td>
            <td>
              {{ item.nombre }}
            </td>
            <td>
              <button class="btn btn-warning mx-2" data-toggle="modal" data-target="#createEditRol" v-on:click="setDataEditRol(item)"><i class="bi bi-pencil"></i></button>
              <button class="btn btn-danger mx-2" v-on:click="delRol(item.id)"><i class="bi bi-trash3"></i></button>
            </td>
          </tr>
        </tbody>
      </table>

      <!--Modal Crear Editar Permiso-->
      <div class="modal fade" id="createEditRol" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{isEditRol ? "Editar":"Crear"}} Rol</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
              <div class="form-group text-left">
                <label class="pb-2">Nombre</label>
                <input type="text" class="form-control" v-model="rolData.nombre">
              </div>
              <div class="form-group px-3 text-left row">
                <label class="pb-2">Selección los permisos</label>

                <v-select
                  :options="listPermisos"
                  v-model="rolData.permisos"
                  :reduce="(option) => option.id.toString()"
                  class="w-100"
                  label="permiso"
                  multiple>
                  <template #no-options>Sin opciones</template>
                </v-select>

                  <pre class="language-json"><code>{{ value  }}</code></pre>
              </div>
            </div>
            <div class="modal-footer d-flex justify-content-end">
              <button type="button" v-if="!isEditRol" class="btn btn-primary" v-on:click="savePermisos()">Guardar</button>
              <button type="button" v-else class="btn btn-warning" v-on:click="editPermiso()">Editar Permiso</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
</template>
<script>
import Swal from 'sweetalert2/dist/sweetalert2.js'
export default {
  name: 'RolesAdmin',
  data() {
    return {
      listRol:{},
      listPermisos:{},
      rolData: {
        nombre: null,
        permisos: null,
      },
      isEditRol: false,
    }
  },
  components:{

  },
  methods: {
    getList() {
      this.axios.get("roles").then((response) => {
        console.log(response.data);
        this.listRol = response.data;
      })
    },
    getListPermisos() {
      this.axios.get("permisos").then((response) => {
        this.listPermisos = response.data;
        console.log(response.data);
      });
    },

    savePermisos(){
      if(!this.rolData.permisos || !this.rolData.nombre){
        Swal.fire({
          title: 'Error',
          text: "Todos los campos son obligatorios",
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        return;
      }
      console.log(this.rolData)
      this.axios.post("roles",this.rolData).then((response) => {
        console.log(response.data);
        Swal.fire({
          title: 'Registro Exitoso',
          text: 'El Rol se guardó correctamente',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      }).catch(error => {
        Swal.fire({
          title: 'Error',
          text: error.response.data.mensaje ? error.response.data.mensaje:"Hubo un error al registrar el Rol",
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      });
      this.getList();
      this.resetForm();
    },

    setDataEditRol(data){
      this.isEditRol = true;
      const permisosIds = [];
      data.permisos.forEach(element => {
        permisosIds.push(element.id_permiso.toString());
      });
      this.rolData = {
        id: data.id,
        nombre: data.nombre,
        permisos: permisosIds,
      };
      console.log(this.rolData);
    },

    editPermiso(){
      if(!this.rolData.id || !this.rolData.nombre || !this.rolData.permisos ){
        Swal.fire({
          title: 'Error',
          text: "Todos los campos son obligatorios",
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        return;
      }

      this.axios.put("roles",this.rolData).then((response) => {
        console.log(response)
        Swal.fire({
          title: 'Registro Exitoso',
          text: 'El Rol se actualizó correctamente',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        this.getList();
      }).catch(error => {
        Swal.fire({
          title: 'Error',
          text: error.response.data.mensaje ? error.response.data.mensaje:"Hubo un error al actualizar el Rol",
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      });
      this.resetForm();
      this.getList();
    },

    delRol(id){
      this.axios.delete("roles/"+id).then((response) => {
        console.log(response)
        Swal.fire({
          title: 'Eliminación Exitosa',
          text: 'El Rol se eliminó correctamente',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        this.getList();
      }).catch(error => {
        Swal.fire({
          title: 'Error',
          text: error.response.data.mensaje ? error.response.data.mensaje:"Hubo un error al eliminar el Rol",
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      });
    },

    resetForm(){
      this.rolData = {
        nombre: null,
        permisos: null,
      },
      this.isEditRol = false;
    }
  },
  created() {
    this.getList();
    this.getListPermisos();
  },
    
}
</script>
<style lang="">
    
</style>