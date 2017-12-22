import { NgModule } from '@angular/core';

import { LoginModule } from './authentication/login/login.module';
import { RegisterModule } from './authentication/register/register.module';
import { ForgotPasswordModule } from './authentication/forgot-password/forgot-password.module';
@NgModule({
    imports: [
        // Auth
        LoginModule,
        RegisterModule,
        ForgotPasswordModule,
        // Errors
//        Error404Module,
 //       Error500Module,


        // Pricing
  //      PricingModule,

        // Profile
  //      ProfileModule,

        // Search
   //     SearchModule,

        // Faq
    //    FaqModule,

        // Knowledge base
     //   KnowledgeBaseModule
    ]
})
export class PagesModule
{
}
