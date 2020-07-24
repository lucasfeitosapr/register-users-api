import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

const CPF_REGEX = '[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
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
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.buildForm();
  }

  // send() {
  //   console.log(new Date(this.birthdate.value));
  //   const registrationData: Registration = {
  //     name: this.name.value,
  //     cpf: this.cpf.value,
  //     selectedUf: this.selectedUf.value,
  //     birthdate: formatDate(moment(this.birthdate.value, 'DD-MM-YYYY').toDate(), 'yyyy-MM-dd', 'en-US'),
  //     email: this.email.value
  //   };

    // this.preregistration.register(registrationData)
    // .subscribe((response) => {
    //   console.log(response.data);
    // });


  saveUser(): void {
    const userData = {
      name: this.nome.value,
      username: this.username.value,
      idade: this.idade.value,
      endereco: this.logradouro.value,
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
        },
        error => {
          console.log(error);
        });
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
      cep: new FormControl('',[Validators.required]),
      logradouro: new FormControl('',[Validators.required]),
      complemento: new FormControl('',[Validators.required]),
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
