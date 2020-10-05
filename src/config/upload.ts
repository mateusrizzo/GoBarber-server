import path from 'path';
import crypto from 'crypto';
import multer, { Options } from 'multer';

export default <Options>{
    strorage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'temp'),
        filename (request, file, callback) {
            const fileHash = crypto.randomBytes(10).toString('HEX');
            const fileName = `${fileHash}-${file.originalname}`;

            return callback(null, fileName);
        }
    }),
}