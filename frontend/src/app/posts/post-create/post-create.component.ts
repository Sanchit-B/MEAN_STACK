import { Component, OnDestroy, OnInit, } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';
import { mimeType } from './mime-type.validator';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit, OnDestroy {

  postForm: FormGroup;
  mode = 'create';
  postId: string;
  post: Post;
  isLoading = false;
  imagePeview: string;
  authStatusSub: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    public postsService: PostsService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {

    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(
        authstatus => {
          this.isLoading = false;
        }
      );

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
            imagePath: postData.imagePath,
            creator: postData.creator
          };

          this.postForm = this.formBuilder.group({
            title: [this.post.title && this.post.title !== undefined ? this.post.title : '', Validators.required],
            content: [this.post.content && this.post.content !== undefined  ? this.post.content : '', Validators.required],
            image: [this.post.imagePath, Validators.required, mimeType]
          });

          this.isLoading = false;
        });
      } else {
        this.mode = 'create';
        this.postId = null;
        this.post = {
          id: null,
          title: '',
          content: '',
          imagePath: null,
          creator: null
        };

        this.postForm = this.formBuilder.group({
          title: [this.post.title && this.post.title !== undefined ? this.post.title : '', Validators.required],
          content: [this.post.content && this.post.content !== undefined  ? this.post.content : '', Validators.required],
          image: [this.post.imagePath, Validators.required, mimeType]
        });
      }
    });



  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.postForm.patchValue({image: file});
    // this.postForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePeview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSavePost() {
    if (this.postForm.valid) {

      this.isLoading = true;
      if (this.mode === 'create') {
        this.postsService.addPosts(
          this.postForm.get('title').value,
          this.postForm.get('content').value,
          this.postForm.get('image').value
        );
        this.isLoading = false;
      } else {
        this.postsService.updatePost(
          this.postId,
          this.postForm.get('title').value,
          this.postForm.get('content').value,
          this.postForm.get('image').value
        );
        this.isLoading = false;
      }
      this.postForm.reset();
    } else {
      return;
    }
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
