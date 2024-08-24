import { Component, inject, input, OnInit } from '@angular/core';
import { H1Component } from "../../h1/h1.component";
import { H2Component } from "../../h2/h2.component";
import { InputDesplegableComponent } from "../input-desplegable/input-desplegable.component";
import { ButtonComponent } from "../../button/button.component";
import { CheckboxComponent } from "../checkbox/checkbox.component";
import { MatDialog } from '@angular/material/dialog';
import { ModalRolesComponent } from '../modal-roles/modal-roles.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RolesSend } from '../../../Core/Interfaces/interfacesSend/roles-send';
import {  RolesService } from "../../../Core/services/roles.service";
import { Router , ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-form-roles-create',
  standalone: true,
  imports: [
    H1Component,
    H2Component,
    InputDesplegableComponent,
    ButtonComponent,
    CheckboxComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './form-roles-create.component.html',
  styleUrl: './form-roles-create.component.css'
})
export class FormRolesCreateComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  private RolesService =  inject(RolesService);
  private Navigation = inject(Router);
  private rutaDecision = inject(ActivatedRoute)
  edit:boolean = false;
  selectedOptions = [];
  FormResult:RolesSend = { name: '', description: '', actions: []};

  constructor() { }

  ngOnInit(): void {
    let id = this.rutaDecision.snapshot.paramMap.get('id');

    if (id !== 'new') {
      this.edit = true
      this.getRolId(+id!);
    }

  }

  openDialog(): void {
    this.dialog.open(ModalRolesComponent, {
      data: {},
    }).afterClosed().subscribe(result => {
      this.selectedOptions = result;
    });
  }

  userForm: FormGroup = new FormGroup({
    NameRol: new FormControl(''),
    DescriptionRol: new FormControl(''),
    actions: new FormControl([])
  });

  getRolId(id:number){
    const objEdit = {Name:'', description: ''}
    this.RolesService.getRolesId(id).subscribe({ 
      next: (resp) =>{
        this.userForm.get('NameRol')?.setValue(resp.role?.name);
        this.userForm.get('DescriptionRol')?.setValue(resp.role?.description);
      },
      error: (resp )=> {
        console.log(resp)
      }
    })
  }

  onSaveRol(){
    const arrayActions = this.selectedOptions.map(Number);
    this.FormResult.name = this.userForm.get('NameRol')?.value
    this.FormResult.description = this.userForm.get('DescriptionRol')?.value
    this.FormResult.actions = [...arrayActions];
  
    console.log(this.userForm.value);
 
    this.RolesService.CreateRol(this.FormResult).subscribe( resp =>{
      console.log(resp)
      this.Navigation.navigateByUrl('/gestionRoles');

    })
  }

  updateRol( ){
    let idRol = this.rutaDecision.snapshot.paramMap.get('id');
    const arrayActions = this.selectedOptions.map(Number);
    this.FormResult.name = this.userForm.get('NameRol')?.value;
    this.FormResult.description = this.userForm.get('DescriptionRol')?.value;
    this.FormResult.actions = [...arrayActions];

    this.RolesService.UpdateRol(+idRol!,this.FormResult).subscribe({
      next: (resp) => {
        console.log(resp);
        this.Navigation.navigateByUrl('/gestionRoles');
      }
    })

  }

}