import PostModel from '../models/Post.js'

export const getLastTags = async (req, res) => {
    try {
        const posts = await PostModel.find().limit(5).exec()
        const tags = posts.map(post => post.tags).flat().slice(0, 5)
        res.json(tags)
    } catch (err) {
        res.status(500).json({message: 'Не вдалось завантажити теги'})
    }
}

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate({path: 'user'}).exec()
        res.json(posts)
    } catch (err) {
        res.status(500).json({message: 'Не вдалось завантажити пости'})
    }
}

export const getOne = async (req, res) => {
    try {
        const postsId = req.params.id;
        const updatedPost = await PostModel.findOneAndUpdate(
            { _id: postsId },
            { $inc: { viewsCount: 1 } },
            { new: true }
        ).populate('user');
        if (!updatedPost) {
            return res.status(404).json({ message: 'Пост не знайдено' });
        }
        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: 'Не вдалось знайти пост' });
    }
};

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags.split(','),
            user: req.userId,
        })
        const post = await doc.save()
        res.json(post)
    } catch (err) {
        res.status(500).json({message: 'Не вдалось створити пост'})
    }
}

export const remove = async (req, res) => {
    try {
        const postId = req.params.id
        const deletedPost = await PostModel.findOneAndDelete(postId)
        if(!deletedPost) {
            return res.status(404).json({ message: 'Не вдалось найти пост' });
        }
        res.json({message: 'Пост успішно видалений'})
    } catch (err) {
        res.status(500).json({ message: 'Не вдалось видалити пост' });
    }
}

export const update = async (req, res) => {
    try {
        const postId = req.params.id
        const updatedPost = await PostModel.findOneAndUpdate(
        {
                _id: postId
              },
    {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                user: req.userId,
                tags: req.body.tags.split(','),
            },
            {new: true}
        )
       res.json(updatedPost)
    } catch (err) {
        res.status(500).json({message: 'Не вдалось оновити пост'})
    }
}