import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CepService } from 'src/app/services/cep.service';

const CPF_REGEX = '[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  public disableFields: boolean = false;

  registerForm: FormGroup
  user = {
    nome: '',
    username: '',
    idade: 0,
    endereco: '',
    cpf: '',
    email: ''

  };
  submitted = false;
  constructor(private userService: UserService,
    private fb: FormBuilder,
    private cepService: CepService) { }

  ngOnInit(): void {
    this.registerForm = this.buildForm();
  }

  saveUser(): void {
    const userData = {
      name: this.nome.value,
      username: this.username.value,
      idade: this.idade.value,
      endereco: this.concatAddres(),
      cpf: this.cpf.value,
      email: this.email.value

  };



    // {
    //   cep: this.cep.value,
    //   logradouro: this.logradouro.value,
    //   complemento: this.complemento.value,
    //   bairro: this.bairro.value,
    //   localidade: this.localidade.value,
    //   uf: this.uf.value
    // }
    console.log(userData);
    this.userService.create(userData)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          this.registerForm.reset();
          this.enableAdressFields();
        },
        error => {
          console.log(error);
        });
  }

  concatAddres(){
    return this.cep.value + ", " +
          this.logradouro.value + ", " +
          this.numero.value + ", " +
          this.bairro.value + ", " +
          this.complemento.value + ", " +
          this.localidade.value + ", " +
          this.uf.value;
  }

  disableAdressFields(){
    this.registerForm.controls['logradouro'].disable();
    this.registerForm.controls['bairro'].disable();
    this.registerForm.controls['localidade'].disable();
    this.registerForm.controls['uf'].disable();
  }

  enableAdressFields(){
    this.registerForm.controls['logradouro'].enable();
    this.registerForm.controls['complemento'].enable();
    this.registerForm.controls['bairro'].enable();
    this.registerForm.controls['localidade'].enable();
    this.registerForm.controls['uf'].enable();
  }

  validateCep() {
    this.cepService.validateCep(this.registerForm.get('cep').value)
      .subscribe(
        response => {
          console.log(response);
          this.registerForm.patchValue({
            logradouro: response.logradouro,
            complemento: response.complemento,
            bairro: response.bairro,
            localidade: response.localidade,
            uf: response.uf,
          });
          this.disableAdressFields();
        },
        error => {
          console.log(error);
          this.registerForm.patchValue({
            logradouro: '',
            complemento: '',
            bairro: '',
            localidade: '',
            uf: '',
          });
          this.enableAdressFields();
        });
      // this.registerForm.get('username').setValue('luquinha')
  }

  newUser(): void {
    this.submitted = false;
    this.user = {
      nome: '',
      username: '',
      idade: 0,
      endereco: '',
      cpf: '',
      email: ''
    };
  }

  buildForm() {
    return this.fb.group({
      nome: new FormControl('', [
        Validators.required,
        // Validators.pattern(NAME_REGEX),
        Validators.minLength(3),
        Validators.maxLength(140)]),
      username: new FormControl('',[Validators.required]),
      idade: new FormControl('', [Validators.required]),
      cep: new FormControl('',[Validators.required, Validators.minLength(8)]),
      logradouro: new FormControl('',[Validators.required]),
      numero: new FormControl(''),
      complemento: new FormControl(''),
      bairro: new FormControl('',[Validators.required]),
      localidade: new FormControl('',[Validators.required]),
      uf: new FormControl('',[Validators.required]),
      cpf: new FormControl('', [
        Validators.required,
        Validators.pattern(CPF_REGEX),
        Validators.minLength(14),
        Validators.maxLength(14)]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  get nome() {
    return this.registerForm.get('nome');
  }

  get username() {
    return this.registerForm.get('username');
  }

  get idade () {
    return this.registerForm.get('idade');
  }

  get cep() {
    return this.registerForm.get('cep');
  }

  get logradouro() {
    return this.registerForm.get('logradouro');
  }

  get numero() {
    return this.registerForm.get('numero');
  }
  get complemento() {
    return this.registerForm.get('complemento');
  }

  get bairro() {
    return this.registerForm.get('bairro');
  }

  get localidade() {
    return this.registerForm.get('localidade');
  }

  get uf() {
    return this.registerForm.get('uf');
  }

  get cpf() {
    return this.registerForm.get('cpf');
  }

  get email() {
    return this.registerForm.get('email');
  }

}
