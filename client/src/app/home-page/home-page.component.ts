import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { StoryService } from '../services/story.service';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState, Story, User } from '../types';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {
  storyForm: FormGroup;
  stories: Observable<Story[]>;
  user: Observable<User>;
  constructor(
    private fb: FormBuilder,
    private storyService: StoryService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.storyForm = this.fb.group({ content: '' });
    this.stories = this.store.select('stories');
    this.user = this.store.select('user');
  }
  
  createStory() {
    const { content } = this.storyForm.value;
    this.storyService.createStory(content)
    .catch(error => console.log(error))
    .then(() => this.storyForm.patchValue({ content: '' }));
  }
}
