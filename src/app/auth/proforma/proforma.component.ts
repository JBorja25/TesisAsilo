import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource } from '@angular/material/tree';
import * as moment from 'moment';



interface medicosServicios{
  name: string,
  value?:any,
  children?:medicosServicios[]
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-proforma',
  templateUrl: './proforma.component.html',
  styleUrls: ['./proforma.component.scss']
})
export class ProformaComponent implements OnInit {
  //vnetos generales
  selectedDay: string = '';
  selectedDa: string = '';
  selectedDays: string = '';

  treeControl  = new NestedTreeControl<medicosServicios>(node => node.children);
  dataSource = new MatTreeNestedDataSource<medicosServicios>();
  treeControlAdi  = new NestedTreeControl<medicosServicios>(node => node.children);
  dataSourceAdi = new MatTreeNestedDataSource<medicosServicios>();

  fecha: any = moment().format('DD-MM-YYYY');

  ubicacionObj: any = {};
  tipoHabitacionObj: any = {};
  amobladoObj: any = {};
  cuidadoFisicoObj : any  = {};
  cuidadoCogObj: any = {};
  sumaTotalServMedicos: number = 0;
  sumaTotalServAdicionales: number = 0;

  sumaTotalProforma: number = 0;

  tipoHabitacionBool: boolean = false;
  ubicacionBool: boolean = false;
  amobladoBool: boolean = false;
  cuidadoFisicoBool: boolean = false;
  cambioCognitivoBool: boolean = false;

  numhijos:number=0;
  numhijosObj:number=0;

  firstFormGroup: FormGroup;
  SecondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  FourthFormGroup: FormGroup;

  suma:number=0;
                    
  serviciosMedicos: medicosServicios[] = [
    {
      name: 'Servicios Medicos',
      children: [
        {name:'Oxigeno',value:20}, 
        {name:'Terapias Respiratorias',value:30}, 
        {name: 'Terapias Musculares',value:25}, 
        {name: 'Cuidados Postoperatorios',value:35}, 
        {name: 'Dialisis',value:35}, 
        {name: 'Sondas',value:25}, 
        {name: 'Ostomias',value:35}, 
        {name: 'Terapias Cognitivas',value:30}, 
        {name: 'Terapias Diabetes',value:15}, 
      ]
    }
                              
                            ]
  servicioMedAux:any[] = [];
  //
  serviciosAdicionales: medicosServicios[] = [
    {
      name:' Servicios adicionales',
      children: [
        
        {name:'Peluqueria',value:8},  
        {name:'Entrega de Medicamentos',value:7},  
        {name:'Acompañamiento a Citas Medicas',value:20},  
        {name:'Dieta Especial',value:30},  
        {name:'Cama Hospitalaria',value:50},  
      ]
    }
                                ]
  
  servicioAdiAux:any[] = [];

  tipoHabitacion: any[] = [
    {tipo: 'Individual', value:350 },
    {tipo: 'Compartida', value: 325},
    {tipo: 'Individual con banio privado', value: 375}
  ]
  cuidadoFisico: any[] = [
    {tipo: 'Es independiente', value:0 },
    {tipo: 'Se le Dificulta', value: 25},
    {tipo: 'Acompañamiento Permanente', value: 50}
  ];

  cuidadoCog: any[] = [
    { cuidado: 'Capacidad Mental Plena', value: 0},
    { cuidado: 'Deterioro Mental Moderado', value: 25},
    { cuidado: 'Demencia Severa', value: 50}
  ];

  amoblado: any[] = [
    { amoblado: 'Si', value: 30 },
    { amoblado: 'No', value: 0 }
  ]
  
  ubicaciones: any[] = [
    { ubi: 'Norte', value: 50 },
    { ubi: 'Sur', value: 25 },
    { ubi: 'Valle', value: 100 },
    { ubi: 'Centro', value: 75 }
  ]
  
  
    //eventos imput


  habitacion: string = '';
  fisico: string = '';
  servicio: string[] = [];
  cognitivo: string = '';
  medico: string = '';

  constructor(
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  

  crearFormulario(){
    this.firstFormGroup = this._fb.group({
      selectUbi: ['', Validators.required],
      habitaciones: ['', Validators.required]
    });

    this.SecondFormGroup = this._fb.group({
      amobladoType: ['', Validators.required],
      cuidadoFisicoForm: ['', Validators.required]
    });
    this.thirdFormGroup = this._fb.group({
      servMed: ['', Validators.required],
      servCogni: ['', Validators.required]
    });

    this.FourthFormGroup = this._fb.group({
      servAdicionales: ['', Validators.required],
      hijos: ['', Validators.required]
    });
  }


  //eventos generales
  selectChangeHandler (event: any) {
    //update the ui
    console.log(event);
    this.ubicacionBool = true;
    
    this.ubicacionObj = this.ubicaciones.find((v, index) => {
      if(index == parseInt(event.value)){
        return v;
      }
      
    });
    
    
    
    
    // this.selectedDay = event.target.value;
  }
  selectChangeHandle (event: any) {
    //update the ui
    this.amobladoBool = true;
    this.selectedDa = event.target.value;
    this.amobladoObj = this.amoblado.find((v, index) => index == parseInt(event.target.value) && v);
    // (condicion) ? valor_verdadero : valor_false`
    if(this.selectedDa == '0'){
      this.sumaTotalProforma += this.amobladoObj.value;
    }else{
      this.sumaTotalProforma -= 30;
      // this.sumaTotalProforma -=this.amobladoObj.value;
    }
  }
  selectChangeHandlr (event: any) {
    //update the ui
    this.selectedDays = event.target.value;
  }

  inputTipoHabitacion(){
    // console.log(this.habitacion);
    this.tipoHabitacionBool = true;
    this.tipoHabitacionObj = this.tipoHabitacion.find((v, index) => index==parseInt(this.habitacion) && v);
    if(this.ubicacionBool && this.amobladoBool && this.cuidadoFisicoBool){
      this.sumaTotalProforma = 0;
      this.sumaTotalProforma = this.tipoHabitacionObj.value + this.ubicacionObj.value + this.amobladoObj.value + this.cuidadoFisicoObj.value;
    }else{
      // this.sumaTotalProforma = 0;
      this.sumaTotalProforma += this.tipoHabitacionObj.value;
    }
  }
  //eventos del imput
  // funciona paraobtener el valor de los ervicios medicos
  serviciosmedicos(evento :any){
    console.log(evento.checked);
    console.log(evento.source);
    console.log(this.thirdFormGroup.get('servMed').value);
    
    console.log(evento.source.value);
    if(evento.checked){
      let findObj = this.serviciosMedicos.map((valor)=>{
        return valor.children.find((v) =>{
          return (v.name === evento.source.value) && v
        })
      })
      console.log(findObj);
      
      this.servicioMedAux.push(...findObj);

    }else{
      // let findObj = this.serviciosMedicos.find((v, index) => v === evento.source.value && v)
      let index = this.servicioMedAux.findIndex((v, index) => v.name == evento.source.value);
      this.servicioMedAux.splice(index, 1);
    }

    
    console.log(this.servicioMedAux);
    
    /* this.serviciosMedicos.forEach((v, index) => {
      console.log(v, index)
      console.log(evento.target.value);
      
    }); */
    /* if(evento.target.checked){
      // console.log('entra agregar', this.servicio.find((v, index) => index === i), i);
      
      this.servicioMedAux.push(this.serviciosMedicos.find((v, index) => index===parseInt(evento.target.value) && v));
      console.log(this.servicioMedAux);
      this.sumaTotalServMedicos = 0;
      for(let i = 0; i < this.servicioMedAux.length; i++){
        this.sumaTotalServMedicos += this.servicioMedAux[i].value;
      }
    }else{
      console.log('entra borrar');
      let findObj = this.serviciosMedicos.find((v, index) => index === parseInt(evento.target.value) && v)
      let index = this.servicioMedAux.findIndex((v, index) => v == findObj);
      console.log(index);
      
      this.servicioMedAux.splice(index, 1);
      this.sumaTotalServMedicos = 0;
      for(let i = 0; i < this.servicioMedAux.length; i++){
        this.sumaTotalServMedicos -= this.servicioMedAux[i].value;
      }
      
      console.log(this.servicioMedAux);
      this.sumaTotalProforma +=this.sumaTotalServMedicos;
      
    }

    if (this.ubicacionBool  && this.tipoHabitacionBool && this.amobladoBool) {
      this.sumaTotalProforma = 0;
      this.sumaTotalProforma=   this.cuidadoFisicoObj.value +this.tipoHabitacionObj.value + this.amobladoObj.value + this.ubicacionObj.value + this.sumaTotalServMedicos;
      
    } else {
      this.sumaTotalProforma += this.cuidadoFisicoObj.value;

    } */
    
    
  }
  serviciosadicionales(evento :any){
    console.log(evento.checked);
    console.log(evento.source.value);
    if(evento.checked){
      let findObj = this.serviciosAdicionales.map((valor)=>{
        return valor.children.find((v) =>{
          return (v.name === evento.source.value) && v
        })
      })
      console.log(findObj);
      
      this.servicioAdiAux.push(...findObj);

    }else{
      // let findObj = this.serviciosMedicos.find((v, index) => v === evento.source.value && v)
      let index = this.servicioAdiAux.findIndex((v, index) => v.name == evento.source.value);
      this.servicioAdiAux.splice(index, 1);
    }

    /* this.serviciosMedicos.forEach((v, index) => {
      console.log(v, index)
      console.log(evento.target.value);
      
    }); */
    /* if(evento.checked){
      // console.log('entra agregar', this.servicio.find((v, index) => index === i), i);
      this.servicioAdiAux.push(this.serviciosAdicionales.find((v,index) => v===evento.source.value.value && v));
      console.log(this.servicioAdiAux);
      this.sumaTotalServAdicionales = 0;
      for(let i = 0; i < this.servicioAdiAux.length; i++){
        this.sumaTotalServAdicionales += this.servicioAdiAux[i].value;
      }
    }else{
      console.log('entra borrar');
      let findObj = this.serviciosAdicionales.find((v, index) => v === (evento.source.value.value) && v)
      let index = this.servicioAdiAux.findIndex(v => v == findObj);
      this.servicioAdiAux.splice(index, 1);
      this.sumaTotalServAdicionales = 0;
      for(let i = 0; i < this.servicioAdiAux.length; i++){
        this.sumaTotalServAdicionales -= this.servicioAdiAux[i].value;
      }
      console.log(this.servicioAdiAux);
      this.sumaTotalProforma += this.sumaTotalServAdicionales;
      
    }

    if (this.ubicacionBool  && this.tipoHabitacionBool && this.amobladoBool) {
      this.sumaTotalProforma = 0;
      this.sumaTotalProforma=   this.cuidadoFisicoObj.value +this.tipoHabitacionObj.value + this.amobladoObj.value + this.ubicacionObj.value + this.sumaTotalServMedicos + this.sumaTotalServAdicionales;
      
    } else {
      this.sumaTotalProforma += this.cuidadoFisicoObj.value;

    } */
    
    
  }

  cuidadoFisicofunction(){
    this.cuidadoFisicoBool=true;
    this.cuidadoFisicoObj = this.cuidadoFisico.find((v, index) => index=== parseInt(this.fisico) && v);

    if (this.ubicacionBool  && this.tipoHabitacionBool && this.amobladoBool ) {
      this.sumaTotalProforma = 0;
      this.sumaTotalProforma=   this.cuidadoFisicoObj.value +this.tipoHabitacionObj.value + this.amobladoObj.value + this.ubicacionObj.value;
      
    } else {
      this.sumaTotalProforma += this.cuidadoFisicoObj.value;

    }
  }

  cambioCognitivo(){
    this.cambioCognitivoBool=true;
    this.cuidadoCogObj = this.cuidadoCog.find((v, index) => index=== parseInt(this.cognitivo) && v);
    

    if (this.ubicacionBool  && this.tipoHabitacionBool && this.amobladoBool  && this.cuidadoFisicoBool) {
      this.sumaTotalProforma = 0;
      this.sumaTotalProforma=this.cuidadoCogObj.value +this.tipoHabitacionObj.value+this.amobladoObj.value+ this.ubicacionObj.value+this.cuidadoFisicoObj.value;
      
    } else {
      this.sumaTotalProforma +=this.cuidadoCogObj.value;
  }
  }

  calcular(){
    
    let sumaTotalMedicos: number = 0;
    let sumaTotalAdi: number = 0;
    let sumaAuxMed: number = 0;
    let sumaAuxAdi: number = 0;
     this.ubicacionObj = this.ubicaciones.find((v, index) => (index === this.firstFormGroup.value.selectUbi) && v);
    this.tipoHabitacionObj = this.tipoHabitacion.find((v, index) => index === this.firstFormGroup.value.habitaciones && v);
    this.amobladoObj = this.amoblado.find((v, index) => index === this.SecondFormGroup.value.amobladoType && v);
    this.cuidadoFisicoObj = this.cuidadoFisico.find((v, index) => index === this.SecondFormGroup.value.cuidadoFisicoForm && v);
     this.cuidadoCogObj = this.cuidadoCog.find((v, index) => index === this.thirdFormGroup.value.servCogni && v);
    console.log(this.servicioMedAux);
    console.log(this.servicioAdiAux);
    this.sumaTotalServMedicos = 0;
    this.sumaTotalServAdicionales = 0;
    for(let i=0; i<this.servicioMedAux.length; i++){
      this.sumaTotalServMedicos += this.servicioMedAux[i].value;
    }
    for(let i=0; i<this.servicioAdiAux.length; i++){
      this.sumaTotalServAdicionales += this.servicioAdiAux[i].value;
    }

    this.suma = this.ubicacionObj.value + this.tipoHabitacionObj.value + this.amobladoObj.value +this.cuidadoFisicoObj.value + this.cuidadoCogObj.value + this.sumaTotalServMedicos + this.sumaTotalServAdicionales;

    console.log(this.servicioMedAux);
    

    console.log( this.suma );
    let servicios: medicosServicios[] = [
      {
        name: 'Servicios Medicos ' + '('+ this.servicioMedAux.length +')',
        children: this.servicioMedAux
      }
    ];
    let adicionales: medicosServicios[] = [
      {
        name: 'Servicios adicionales ' + '('+ this.servicioAdiAux.length +')',
        children: this.servicioAdiAux
      }
    ];
    console.log(adicionales);
    
    
    this.numhijos   =this.FourthFormGroup.get('hijos').value;
    
    
    this.dataSource.data = servicios;
    this.dataSourceAdi.data= adicionales;
    console.log(this.dataSourceAdi);
    

    // console.log(this.servicioMedAux, this.servicioAdiAux);
    // console.log(cog);
    
    // console.log(ubicaciones.value + hab.value);
    
    /*console.log(this.ubicacionObj);
    console.log(this.tipoHabitacionObj);
    console.log(this.amobladoObj);
    console.log(this.cuidadoFisicoObj);
    console.log(this.cuidadoCogObj);
    console.log(this.servicioAdiAux);
    console.log(this.servicioMedAux);
    console.log(this.FourthFormGroup.get('hijos')?.value);*/
    
  }
  hasChild = (_: number, node: medicosServicios) => node.children && node.children.length > 0;
  hasChildAdi = (_: number, node: medicosServicios) => node.children && node.children.length > 0;

  cambioStep(step: any){
    console.log(step);
    console.log(step.selectedIndex);
    if((step.steps.length -1) === 4 && this.FourthFormGroup.get('hijos')?.value){
      this.calcular();
    }
    
  }

}
