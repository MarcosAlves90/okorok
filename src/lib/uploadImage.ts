import { v2 as cloudinary } from 'cloudinary';

const MAX_AVATAR_SIZE = 5 * 1024 * 1024; // 5 MB

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
    api_key: process.env.CLOUDINARY_API_KEY || '',
    api_secret: process.env.CLOUDINARY_API_SECRET || '',
});

// Faz upload de um arquivo de imagem para o Cloudinary e retorna a URL
export async function uploadImage(file: File, folder: string): Promise<string | null> {
    const buffer = Buffer.from(await file.arrayBuffer());

    if (buffer.length > MAX_AVATAR_SIZE) throw new Error('Avatar muito grande (max 5MB)');
    if (!file.type.startsWith('image/')) throw new Error('Tipo de arquivo inválido');

    const dataUri = `data:${file.type};base64,${buffer.toString('base64')}`;

    const res = await cloudinary.uploader.upload(dataUri, {
        folder: `okorok/${folder}`,
        resource_type: 'image',
    });

    return res.secure_url || res.url || null;
}
