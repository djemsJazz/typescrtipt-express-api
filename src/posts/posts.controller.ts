import {
  Router, Request, Response, NextFunction,
} from 'express';
import PostInterface from './post.interface';
import PostModel from './posts.model';
import Controller from '../interfaces/controller.interface';
import EntityNotFoundException from '../exceptions/EntityNotFoundException';

class PostsController implements Controller {
  public path = '/posts';

  public router: Router = Router();

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

  getPostById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const post = await PostModel.findById(id);
      if (!post) {
        throw new EntityNotFoundException(id);
      }
      return res.status(200).send(post);
    } catch (error) {
      return next(error);
    }
  };
}

export default PostsController;
