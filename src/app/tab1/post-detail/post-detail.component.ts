import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { PostModel } from 'src/app/shared/models/post';
import { WordpressService } from 'src/app/shared/providers/wp.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailsComponent implements OnInit {
  title = 'Post Details';
  post: PostModel & { img$: Observable<string>; } = null;
  logoUrl = '/assets/App-logo.png';

  constructor(private actRoute: ActivatedRoute, private wpSvc: WordpressService) { }

  ngOnInit() {
    this.actRoute.params.pipe(
      mergeMap(data => {
        const postId = +data['postId'];

        return this.getPost(postId);
      })
    ).subscribe(post => {
      console.log(post);
      this.post = {
        ...post,
        img$: this.wpSvc.getMediaForPost(post.id)
      };
      this.title = this.title.concat(` ${this.post.title.rendered}`);
    });
  }

  private getPost(id: number) {
    return this.wpSvc.getPostById(id);
  }


}