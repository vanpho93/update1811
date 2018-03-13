import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { StoryService } from '../services/story.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  storyForm: FormGroup;
  constructor(private fb: FormBuilder, private storyService: StoryService) { }

  ngOnInit() {
    this.storyForm = this.fb.group({
      content: ''
    });
  }
  
  createStory() {
    const { content } = this.storyForm.value;
    this.storyService.createStory(content)
    .then(story => alert(JSON.stringify(story)))
    .catch(error => console.log(error));
  }
}
