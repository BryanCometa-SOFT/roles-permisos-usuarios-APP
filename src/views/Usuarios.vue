<template lang="">
    <div>
      <h3 class="pt-3">Listado de Usuarios</h3>
      <div class="d-flex justify-content-end mb-3">
        <button class="btn btn-primary" data-toggle="modal" data-target="#createEditUser" v-on:click="resetForm()"><i class="bi bi-plus-circle"></i> Crear Usuario</button>
      </div>
      <table class="table table-striped shadow">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>telefono</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in listUsuarios" :key="item">
            <td>{{ item.id }}</td>
            <td>{{ item.nombre }}</td>
            <td>{{ item.apellido }}</td>
            <td>{{ item.telefono }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.id_rol.nombre }}</td>
            <td>
              <button class="btn btn-warning mx-2" data-toggle="modal" data-target="#createEditUser" v-on:click="setDataEditUser(item)"><i class="bi bi-pencil"></i></button>
              <button class="btn btn-danger mx-2" v-on:click="delUser(item.id)"><i class="bi bi-trash3"></i></button>
            </td>
          </tr>
        </tbody>
      </table>

      <!--Modal Crear Editar Usuario-->
      <div class="modal fade" id="createEditUser" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{isEditUser ? "Editar":"Crear"}} usuario</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click="resetForm()">
                  <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
              <div class="form-group text-left">
                <label class="pb-2">Nombre</label>
                <input type="text" class="form-control" v-model="userData.nombre">
              </div>
              <div class="form-group text-left">
                <label>Apellido</label>
                <input type="text" class="form-control" v-model="userData.apellido">
              </div>
              <div class="form-group text-left">
                <label>Teléfono</label>
                <input type="text" class="form-control" v-model="userData.telefono">
              </div>
              <div class="form-group text-left">
                <label>Correo</label>
                <input type="text" class="form-control" v-model="userData.email">
              </div>
              <div class="form-group text-left">
                <label>Rol</label>
                <select class="form-control" v-model="userData.id_rol.id">
                  <option v-for="item in listRol" :key="item" :value="item.id">{{item.nombre}}</option>
                </select>
              </div> 
            </div>
            <div class="modal-footer d-flex justify-content-end">
              <button v-if="!isEditUser" type="button" class="btn btn-primary" v-on:click="saveUser()">Guardar</button>
              <button v-else type="button" class="btn btn-warning" v-on:click="editUser()">Editar Usuario</button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import Swal from 'sweetalert2/dist/sweetalert2.js'
export default {
  name: 'UsuarioAdmin',
  data() {
    return {
      listUsuarios:{},
      listRol:{},
      userData: {
        nombre: null,
        apellido: null,
        email: null,
        telefono: null,
        id_rol: {},
      },
      isEditUser:false,
    }
  },
  methods: {
    getList() {
      this.axios.get("usuarios").then((response) => {
        this.listUsuarios = response.data;
        console.log(response.data)
      })
    },
    getListRol() {
      this.axios.get("roles").then((response) => {
        console.log(response.data);
        this.listRol = response.data;
      })
    },
    saveUser(){
      const data = this.userData; 
      data.password = "12345678";

      if(!data.nombre || !data.apellido || !data.email || !data.email || !data.id_rol.id  ){
        Swal.fire({
          title: 'Error',
          text: "Todos los campos son obligatorios",
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        return;
      }

      data.id_rol = data.id_rol.id;
      this.axios.post("usuarios",data).then((response) => {
        console.log(response)
        Swal.fire({
          title: 'Registro Exitoso',
          text: 'El usuario se guardó correctamente',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        this.getList();
      }).catch(error => {
        Swal.fire({
          title: 'Error',
          text: error.response.data.mensaje ? error.response.data.mensaje:"Hubo un error al registrar el usuario",
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      });
      this.resetForm();
    },
    setDataEditUser(data){
      this.isEditUser = true;
      this.userData = data;
      console.log(this.userData);
    },
    editUser(){
      console.log(this.userData);
      const data = {
        id: this.userData.id,
        nombre: this.userData.nombre,
        apellido: this.userData.apellido,
        email: this.userData.email,
        telefono: this.userData.telefono,
        id_rol: this.userData.id_rol.id,
        password : "12345678"
      }

      if(!data.id || !data.nombre || !data.apellido || !data.email || !data.email || !data.id_rol  ){
        Swal.fire({
          title: 'Error',
          text: "Todos los campos son obligatorios",
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        return;
      }

      this.axios.put("usuarios",data).then((response) => {
        console.log(response)
        Swal.fire({
          title: 'Registro Exitoso',
          text: 'El usuario se actualizó correctamente',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        this.getList();
      }).catch(error => {
        Swal.fire({
          title: 'Error',
          text: error.response.data.mensaje ? error.response.data.mensaje:"Hubo un error al actualizar el usuario",
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      });
      this.resetForm();


    },
    delUser(id){
      this.axios.delete("usuarios/"+id).then((response) => {
        console.log(response)
        Swal.fire({
          title: 'Eliminación Exitosa',
          text: 'El usuario se eliminó correctamente',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        this.getList();
      }).catch(error => {
        Swal.fire({
          title: 'Error',
          text: error.response.data.mensaje ? error.response.data.mensaje:"Hubo un error al eliminar el usuario",
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      });
    },
    resetForm(){
      this.userData = {
        nombre: null,
        apellido: null,
        email: null,
        telefono: null,
        id_rol: {},
      };
      this.isEditUser = false;
    }
  },
  created() {
    this.getList();
    this.getListRol();
  },
    
}
</script>
<style lang="">
    
</style>