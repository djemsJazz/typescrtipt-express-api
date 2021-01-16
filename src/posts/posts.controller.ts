import { Router, Request, Response } from 'express';
import PostInterface from './post.interface';
import postModel from './posts.model';
import Controller from '../interfaces/controller.interface';
import Post from './post.interface';

class PostsController implements Controller {
  public path: string = '/posts';
  public router: Router = Router();

  private posts: PostInterface[] = [
    {
      author: "Djamel",
      content: "Welcome to my first Express & Typscript app :)",
      title: "My first Express & Typscript app"
    }
  ];

  constructor() {
    this.initializeRoutes();
  };

  private initializeRoutes = () => {
    this.router.post(this.path, this.createPost);
    this.router.get(this.path, this.getAllPosts);
    this.router.get(`${this.path}/:id`, this.getPostById);
  }

  getAllPosts = (req: Request, res: Response) => {
    postModel.find()
      .then((posts: Post[]) => {
        return res.status(201).send(posts);
      }).catch((err: Error) => {
        return res.status(400).send(err);
      })
  };

  createPost = (req: Request, res: Response) => {
    const newPost: PostInterface = req.body;
    const createdPost = new postModel(newPost);
    createdPost.save()
      .then(() => {
        return res.status(201).send(createdPost);
      }).catch((err) => {
        return res.status(400).send(err);
      })
  };

  getPostById = (req: Request, res: Response) => {
    const { id } = req.params;
    postModel.findById(id)
      .then((post: Post) => {
        return res.status(200).send(post)
      }).catch((err: Error) => {
        return res.status(400).send(err)
      })
  }
}

export default PostsController;