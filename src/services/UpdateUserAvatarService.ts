interface Request {
    user_id: string;
    avatarFilename: string;
}

export default class UpdateUserAvatarService {
    public async execute({ user_id, avatarFilename}: Request): Promise<void> {
        
    }
}