import { Router, Request, Response } from 'express';
import PostInterface from './post.interface';
import PostModel from './posts.model';
import Controller from '../interfaces/controller.interface';

class PostsController implements Controller {
  public path = '/posts';

  public router: Router = Router();

  private posts: PostInterface[] = [
    {
      author: 'Djamel',
      content: 'Welcome to my first Express & Typscript app :)',
      title: 'My first Express & Typscript app',
    },
  ];

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    this.router.post(this.path, this.createPost);
    this.router.get(this.path, this.getAllPosts);
    this.router.get(`${this.path}/:id`, this.getPostById);
  };

  getAllPosts = (req: Request, res: Response) => {
    PostModel.find()
      .then((posts: PostInterface[]) => res.status(201).send(posts)).catch((err: Error) => res.status(400).send(err));
  };

  createPost = (req: Request, res: Response) => {
    const newPost: PostInterface = req.body;
    const createdPost = new PostModel(newPost);
    createdPost.save()
      .then(() => res.status(201).send(createdPost)).catch((err) => res.status(400).send(err));
  };

  getPostById = (req: Request, res: Response) => {
    const { id } = req.params;
    PostModel.findById(id)
      .then((post: PostInterface) => res.status(200).send(post)).catch((err: Error) => res.status(400).send(err));
  };
}

export default PostsController;
