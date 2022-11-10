<template lang="">
  <div>
    <h3 class="pt-3">Listado de Permisos</h3>
    <div class="d-flex justify-content-end mb-3">
      <button class="btn btn-primary" data-toggle="modal" data-target="#createEditPermiso" v-on:click="resetForm()"><i class="bi bi-plus-circle"></i> Crear Permiso</button>
    </div>
    <table class="table table-striped shadow">
      <thead>
        <tr>
          <th>Id</th>
          <th>Nombre</th>
          <th>Apellido</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in listPermiso" :key="item">
          <td>
            {{ item.id }}
          </td>
          <td>
            {{ item.permiso }}
          </td>
          <td>
            <button class="btn btn-warning mx-2" data-toggle="modal" data-target="#createEditPermiso" v-on:click="setDataEditPermiso(item)"><i class="bi bi-pencil"></i></button>
            <button class="btn btn-danger mx-2" v-on:click="delPermiso(item.id)"><i class="bi bi-trash3"></i></button>
          </td>
        </tr>
      </tbody>
    </table>
    <!--Modal Crear Editar Permiso-->
    <div class="modal fade" id="createEditPermiso" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{isEditPermiso ? "Editar":"Crear"}} Permiso</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click="resetForm()">
                <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <div class="modal-body">
            <div class="form-group text-left">
              <label class="pb-2">Nombre</label>
              <input type="text" class="form-control" v-model="permisoData.permiso">
            </div>
          </div>
          <div class="modal-footer d-flex justify-content-end">
            <button v-if="!isEditPermiso" type="button" class="btn btn-primary" v-on:click="savePermiso()">Guardar</button>
            <button v-else type="button" class="btn btn-warning" v-on:click="editPermiso()">Editar Permiso</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Swal from 'sweetalert2/dist/sweetalert2.js'
export default {
  name: "PermisosVista",
  data() {
    return {
      listPermiso: {},
      permisoData: {
        permiso: null,
      },
      isEditPermiso:false,
    };
  },
  methods: {
    getList() {
      this.axios.get("permisos").then((response) => {
        this.listPermiso = response.data;
        console.log(response.data);
      });
    },
    savePermiso(){
      const data = this.permisoData; 
      if(!data.permiso){
        Swal.fire({
          title: 'Error',
          text: "Todos los campos son obligatorios",
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        return;
      }
      this.axios.post("permisos",data).then((response) => {
        console.log(response)
        Swal.fire({
          title: 'Registro Exitoso',
          text: 'El permiso se guardó correctamente',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        this.getList();
      }).catch(error => {
        Swal.fire({
          title: 'Error',
          text: error.response.data.mensaje ? error.response.data.mensaje:"Hubo un error al registrar el permiso",
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      });
      this.resetForm();
    },
    setDataEditPermiso(data){
      this.isEditPermiso = true;
      console.log(data)
      this.permisoData = data;
      console.log(this.permisoData);
    },
    editPermiso(){
      console.log(this.permisoData);
      const data = {
        id: this.permisoData.id,
        permiso: this.permisoData.permiso,
      }

      if(!data.id || !data.permiso  ){
        Swal.fire({
          title: 'Error',
          text: "Todos los campos son obligatorios",
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        return;
      }

      this.axios.put("permisos",data).then((response) => {
        console.log(response)
        Swal.fire({
          title: 'Registro Exitoso',
          text: 'El permiso se actualizó correctamente',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        this.getList();
      }).catch(error => {
        Swal.fire({
          title: 'Error',
          text: error.response.data.mensaje ? error.response.data.mensaje:"Hubo un error al actualizar el permiso",
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      });
      this.resetForm();


    },
    delPermiso(id){
      this.axios.delete("permisos/"+id).then((response) => {
        console.log(response)
        Swal.fire({
          title: 'Eliminación Exitosa',
          text: 'El permiso se eliminó correctamente',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        this.getList();
      }).catch(error => {
        Swal.fire({
          title: 'Error',
          text: error.response.data.mensaje ? error.response.data.mensaje:"Hubo un error al eliminar el permiso",
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      });
    },
    resetForm(){
      this.permisoData = {
        permiso: null,
      };
      this.isEditPermiso = false;
    }
  },
  created() {
    this.getList();
  },
};
</script>
<style lang=""></style>
