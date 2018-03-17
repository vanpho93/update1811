import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProfileComponent } from './profile/profile.component';
import { MessagesComponent } from './messages/messages.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StoryComponent } from './story/story.component';
// reducers
import { checkedReducer } from './ngrx/checked';
import { userReducer } from './ngrx/user';
import { storiesReducer } from './ngrx/stories';
import { friendsReducer } from './ngrx/friends';
import { inCommingRequestsReducer } from './ngrx/incommingRequests';
import { sentRequestsReducer } from './ngrx/sentRequests';
import { otherUsersReducer } from './ngrx/otherUsers';
// guards
import { MustLoggedInGuard } from './must-logged-in.guard';
import { MustBeGuestGuard } from './must-be-guest.guard';
// service
import { UserService } from './services/user.service';
import { StoryService } from './services/story.service';
import { RequestWithToken } from './services/request-with-token.service';
import { FriendService } from './services/friend.service';

const routesConfig: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [MustLoggedInGuard] },
  { path: 'messages', component: MessagesComponent, canActivate: [MustLoggedInGuard] },
  { path: 'signin', component: SignInComponent, canActivate: [MustBeGuestGuard] },
  { path: 'signup', component: SignUpComponent, canActivate: [MustBeGuestGuard] },
  { path: 'password', component: ForgotPasswordComponent, canActivate: [MustBeGuestGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ProfileComponent,
    MessagesComponent,
    SignUpComponent,
    SignInComponent,
    ForgotPasswordComponent,
    PageNotFoundComponent,
    StoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routesConfig),
    StoreModule.forRoot({
      user: userReducer,
      checked: checkedReducer,
      stories: storiesReducer,
      friends: friendsReducer,
      otherUsers: otherUsersReducer,
      sentRequests: sentRequestsReducer,
      incommingRequests: inCommingRequestsReducer
    })
  ],
  providers: [
    MustLoggedInGuard,
    MustBeGuestGuard,
    RequestWithToken,
    UserService,
    StoryService,
    FriendService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
