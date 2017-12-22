import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseConfigService } from '../../../../../core/services/config.service';
import { fuseAnimations } from '../../../../../core/animations';

import { Router } from '@angular/router';
import { AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
    selector   : 'fuse-register',
    templateUrl: './register.component.html',
    styleUrls  : ['./register.component.scss'],
    animations : fuseAnimations
})
export class FuseRegisterComponent implements OnInit
{
    registerForm: FormGroup;
    registerFormErrors: any;

    public form: FormGroup;
    public name: AbstractControl;
    public email: AbstractControl;
    public password: AbstractControl;
    public repeatPassword: AbstractControl;
    public passwords: FormGroup;
    error: any;
    signuperror: boolean = false;
    public submitted: boolean = false;


    constructor (
        private fuseConfig: FuseConfigService,
        private formBuilder: FormBuilder,

        public af: AngularFireAuth,
        private router: Router,
        fb: FormBuilder
/*
        this.form = fb.group({
          'name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
          'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
          'passwords': fb.group({
            'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
          }, {validator: EqualPasswordsValidator.validate('password', 'repeatPassword')})
        });

        this.name = this.form.controls['name'];
        this.email = this.form.controls['email'];
        this.passwords = <FormGroup> this.form.controls['passwords'];
        this.password = this.passwords.controls['password'];
        this.repeatPassword = this.passwords.controls['repeatPassword'];

        */

    )
    {
        this.fuseConfig.setSettings({
            layout: {
                navigation: 'none',
                toolbar   : 'none',
                footer    : 'none'
            }
        });

        this.registerFormErrors = {
            name           : {},
            email          : {},
            password       : {},
            passwordConfirm: {}
        };
    }

    ngOnInit()
    {

        this.registerForm = this.formBuilder.group({
            name           : ['', Validators.required],
            email          : ['', [Validators.required, Validators.email]],
            password       : ['', Validators.required],
            passwordConfirm: ['', [Validators.required, confirmPassword]]
        });

        this.registerForm.valueChanges.subscribe(() => {
            this.onRegisterFormValuesChanged();
        });


    }

    onRegisterFormValuesChanged()
    {
        for ( const field in this.registerFormErrors )
        {
            if ( !this.registerFormErrors.hasOwnProperty(field) )
            {
                continue;
            }

            // Clear previous errors
            this.registerFormErrors[field] = {};

            // Get the control
            const control = this.registerForm.get(field);

            if ( control && control.dirty && !control.valid )
            {
                this.registerFormErrors[field] = control.errors;
            }
        }
    }

///Added code by Roajer


loginFb() {
  this.af.auth.signInWithPopup(
    new firebase.auth.FacebookAuthProvider
  ).then(
      (success) => {

      this.router.navigate(['/pages/dashboard']);
    }).catch(
      (err) => {
      this.error = err;
    })
}


loginGoogle() {
  this.af.auth.signInWithPopup(
    new firebase.auth.GoogleAuthProvider ).then(
      (success) => {
       this.router.navigate(['/pages/dashboard']);
    }).catch(
      (err) => {
      this.error = err;
    })
}

/*

public onSubmit(values: Object): void {

    this.submitted = true;
    this.signuperror = false;
    if (this.form.valid) {
      console.log(this.form.value.email,this.form.value.passwords.password);
     this.af.auth.createUserWithEmailAndPassword(this.form.value.email,this.form.value.passwords.password).then(
        (success) => {
       console.log(success);

       var user = firebase.auth().currentUser;
       user.sendEmailVerification().then(function() {
         // Email sent.
       }).catch(function(error) {
         console.log(error);
       });

        this.router.navigate(['/pages/configure'])
      }).catch(
        (err) => {
       this.error = err;
       this.signuperror = true;
        console.log("error"+err);
      })
    }
  }

  */





/// code End Roajer



}

function confirmPassword(control: AbstractControl)
{
    if ( !control.parent || !control )
    {
        return;
    }

    const password = control.parent.get('password');
    const passwordConfirm = control.parent.get('passwordConfirm');

    if ( !password || !passwordConfirm )
    {
        return;
    }

    if ( passwordConfirm.value === '' )
    {
        return;
    }

    if ( password.value !== passwordConfirm.value )
    {
        return {
            passwordsNotMatch: true
        };
    }
}
