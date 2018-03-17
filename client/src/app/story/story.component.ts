import { Component, OnInit, Input } from '@angular/core';
import { Story } from '../types';
import { StoryService } from '../services/story.service';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {
  @Input() storyInfo: Story;
  comment = '';
  constructor(private storyService: StoryService) { }

  ngOnInit() {
  }

  addComment() {
    this.storyService.createComment(this.comment, this.storyInfo._id)
    .then(() => this.comment = '');
  }

  likeStory() {
    this.storyService.likeStory(this.storyInfo._id);
  }
}
